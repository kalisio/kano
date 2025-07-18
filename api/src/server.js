import { kdk } from '@kalisio/kdk/core.api.js'
import distribution, { finalize } from '@kalisio/feathers-distributed'
import { automergeServer, createRootDocument } from '@kalisio/feathers-automerge-server'
import fs from 'fs-extra'
import _ from 'lodash'
import siftModule from 'sift'
import https from 'https'
import makeDebug from 'debug'
import path from 'path'
import { pathToFileURL } from 'url'
import proxyMiddleware from 'http-proxy-middleware'
import express from '@feathersjs/express'
import middlewares from './middlewares.js'
import services from './services.js'
import hooks from './hooks.js'
import channels from './channels.js'

const sift = siftModule.default
const debug = makeDebug('kano:server')

async function initializeAutomergeDocument(servicePath, query) {
  debug(`Initializing automerge document for ${servicePath} with query ${query}`)
  // Check if any query target this service
  if (query[servicePath]) {
    return app.getService(servicePath).find({
      paginate: false,
      query: query[servicePath]
    })
  } else {
    return []
  }
}
async function getAutomergeDocumentsForData(servicePath, data, documents) {
  debug(`Checking automerge documents for ${servicePath} with data ${data}`)
  // Check if any query target this service
  if (query[servicePath]) {
    return documents.filter(document => {
      const result = [data].filter(sift(document.query[servicePath]))
      return result.length > 0
    })
  } else {
    return []
  }
}

export class Server {
  constructor () {
    this.app = kdk()
    const app = this.app

    // Distribute services
    const distributionConfig = app.get('distribution')
  if (distributionConfig) app.configure(distribution(distributionConfig))

    // Serve pure static assets
    if (process.env.NODE_ENV === 'production') {
      this.app.use('/', express.static(this.app.get('distPath')))
    }
    // In dev this is done by the webpack server

    // Define HTTP proxies to your custom API backend. See /config/index.js -> proxyTable
    // https://github.com/chimurai/http-proxy-middleware
    const proxyTable = app.get('proxyTable') || {}
    if (proxyTable) {
      Object.keys(proxyTable).forEach(context => {
        let options = proxyTable[context]
        if (typeof options === 'string') {
          options = { target: options }
        }
        app.use(proxyMiddleware(context, options))
      })
    }
  }

  async run () {
    const app = this.app
    // First try to connect to DB
    await app.db.connect()
    // Set up our services
    await app.configure(services)
    // Synchronize services
    const automergeConfig = app.get('automerge')
    if (automergeConfig) {
      // Check for existing root document or initialize it
      const documentFilepath = path.join(automergeConfig.directory, 'document.automerge')
      try {
        if (fs.existsSync(documentFilepath)) {
          automergeConfig.rootDocumentId = fs.readFileSync(documentFilepath)
        } else {
          const document = await createRootDocument(automergeConfig.directory)
          fs.writeFileSync(documentFilepath, document.url)
          automergeConfig.rootDocumentId = document.url
        }
        Object.assign(automergeConfig, {
          initializeDocument: initializeAutomergeDocument,
          getDocumentsForData: getAutomergeDocumentsForData
        })
        debug('Initializing automerge with config', automergeConfig)
        await app.configure(automergeServer(automergeConfig))
      } catch (error) {
        app.logger.error('Unable to initialize automerge', error)
      }
    }
    // Register hooks
    app.hooks(hooks)
    // Register application setup and teardown hooks here
    app.hooks({
      setup: [],
      teardown: [
        async () => {
          await app.db.disconnect()
          app.logger.info('Server has been shut down')
        }
      ]
    })
    // Set up real-time event channels
    app.configure(channels)
    // Configure middlewares - always has to be last
    app.configure(middlewares)
    // Custom configuration entry point if any
    const pluginPath = app.get('pluginPath') || path.join(__dirname, 'plugin.js')
    if (fs.pathExistsSync(pluginPath)) {
      const pluginModule = await import(pathToFileURL(pluginPath))
      const plugin = pluginModule.default
      await app.configure(plugin)
    }

    // Last lauch server
    const httpsConfig = app.get('https')
    let expressServer
    if (httpsConfig) {
      const port = httpsConfig.port
      const server = https.createServer({
        key: fs.readFileSync(httpsConfig.key),
        cert: fs.readFileSync(httpsConfig.cert)
      }, app)
      app.logger.info('Configuring HTTPS server at port ' + port.toString())
      expressServer = await server.listen(port)
    } else {
      const port = app.get('port')
      app.logger.info('Configuring HTTP server at port ' + port.toString())
      expressServer = await app.listen(port)
    }
    expressServer.on('close', () => finalize(app))
    return expressServer
  }
}

export function createServer () {
  const server = new Server()

  const config = server.app.get('logs')
  const logPath = _.get(config, 'DailyRotateFile.dirname')
  if (logPath) {
    // This will ensure the log directory does exist
    fs.ensureDirSync(logPath)
  }

  process.on('unhandledRejection', (reason, p) =>
    server.app.logger.error('Unhandled Rejection: ', reason)
  )

  process.on('SIGINT', async () => {
    server.app.logger.info('Received SIGINT signal running teardown')
    await server.app.teardown()
    process.exit(0)
  })

  process.on('SIGTERM', async () => {
    server.app.logger.info('Received SIGTERM signal running teardown')
    await server.app.teardown()
    process.exit(0)
  })

  return server
}

export async function runServer (server) {
  const expressServer = await server.run()
  server.app.logger.info('Server started listening')
  return expressServer
}
