import logger from 'winston'
import { kalisio } from 'kCore'

const fs = require('fs-extra')
const https = require('https')
const proxyMiddleware = require('http-proxy-middleware')

const feathers = require('feathers')
const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./main.hooks')

export class Server {
  constructor () {
    this.app = kalisio()
    // Serve pure static assets
    if (process.env.NODE_ENV === 'production') {
      this.app.use('/', feathers.static('../dist'))
    }
    // In dev this is done by the webpack server

    // Define HTTP proxies to your custom API backend. See /config/index.js -> proxyTable
    // https://github.com/chimurai/http-proxy-middleware
    const proxyTable = this.app.get('proxyTable')
    Object.keys(proxyTable).forEach(context => {
      let options = proxyTable[context]
      if (typeof options === 'string') {
        options = { target: options }
      }
      this.app.use(proxyMiddleware(context, options))
    })
  }

  async run () {
    // First try to connect to DB
    await this.app.db.connect()

    // Set up our services (see `services/index.js`)
    await this.app.configure(services)
    // Register authorisation, perspective, etc. hooks
    this.app.hooks(appHooks)
    // Configure middleware (see `middleware/index.js`) - always has to be last
    this.app.configure(middleware)

    // Last lauch server
    const httpsConfig = this.app.get('https')
    if (httpsConfig) {
      const port = httpsConfig.port
      let server = https.createServer({
        key: fs.readFileSync(httpsConfig.key),
        cert: fs.readFileSync(httpsConfig.cert)
      }, this.app)
      logger.info('Configuring HTTPS server at port ' + port.toString())
      await server.listen(port)
    } else {
      const port = this.app.get('port')
      logger.info('Configuring HTTP server at port ' + port.toString())
      await this.app.listen(port)
    }
  }
}
