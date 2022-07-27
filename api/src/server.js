import { kdk } from '@kalisio/kdk/core.api.js'
import distribution from '@kalisio/feathers-distributed'
import fs from 'fs-extra'
import _ from 'lodash'
import https from 'https'
import path from 'path'
import proxyMiddleware from 'http-proxy-middleware'
import express from '@feathersjs/express'
import middlewares from './middlewares.js'
import services from './services.js'
import hooks from './hooks.js'
import channels from './channels.js'

export class Server {
  constructor () {
    this.app = kdk()
    const app = this.app

    // Distribute services
    const distConfig = app.get('distribution')
    if (distConfig) app.configure(distribution(distConfig))

    // Serve pure static assets
    if (process.env.NODE_ENV === 'production') {
      app.use('/', express.static('../dist/spa'))
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
    // Register hooks
    app.hooks(hooks)
    // Set up real-time event channels
    app.configure(channels)
    // Configure middlewares - always has to be last
    app.configure(middlewares)
    // Custom configuration entry point if any
    const pluginPath = app.get('pluginPath') || path.join(__dirname, 'plugin.js')
    if (fs.pathExistsSync(pluginPath)) {
      const plugin = require(pluginPath)
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
    expressServer.on('close', () => distribution.finalize(app))
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

  return server
}

export async function runServer (server) {
  const expressServer = await server.run()
  server.app.logger.info('Server started listening')
  return expressServer
}
