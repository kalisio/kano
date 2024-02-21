import path from 'path'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import makeDebug from 'debug'
import kCore, { permissions, createDefaultUsers } from '@kalisio/kdk/core.api.js'
import kMap, { createFeaturesServiceForLayer, createDefaultCatalogLayers } from '@kalisio/kdk/map.api.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const servicesPath = path.join(__dirname, 'services')
const debug = makeDebug('kano:services')

export default async function () {
  const app = this

  // Set up our plugin services
  try {
    const packageInfo = fs.readJsonSync(path.join(__dirname, '../../package.json'))
    app.use(app.get('apiPath') + '/capabilities', (req, res, next) => {
      const response = {
        name: 'kano',
        domain: app.get('domain'),
        gateway: app.get('gateway'),
        // Allow to override version number for custom build
        version: (process.env.VERSION ? process.env.VERSION : packageInfo.version),
        cesium: app.get('cesium'),
        mapillary: app.get('mapillary')
      }
      if (process.env.BUILD_NUMBER) {
        response.buildNumber = process.env.BUILD_NUMBER
      }
      res.json(response)
    })
    app.on('service', service => {
      // Make remote services compliant with our internal app services so that permissions can be used
      if (service.key === 'weacast') {
        // Remote service are registered according to their path, ie with API prefix (but without trailing /)
        const remoteService = app.service(service.path)
        // Get name from service path without api prefix
        const name = service.path.replace(app.get('apiPath').substring(1) + '/', '')
        remoteService.name = name
        // As remote services have no context, from the internal point of view path = name
        // Unfortunately this property is already set and used by feathers-distributed and should not be altered
        // remoteService.path = name
        remoteService.app = app
        remoteService.getPath = function (withApiPrefix) { return (withApiPrefix ? app.get('apiPath') + '/' + name : name) }
        // Register default permissions for it
        debug('Registering permissions for remote service ', name)
        permissions.defineAbilities.registerHook((subject, can, cannot) => {
          can('service', name)
          can('read', name)
          if (name === 'probes') can('create', name)
        })
      }
    })
    await app.configure(kCore)
    await app.configureService('authentication', app.getService('authentication'), servicesPath)
    await app.configureService('users', app.getService('users'), servicesPath)
    await app.configure(kMap)
  } catch (error) {
    app.logger.error(error.message)
  }

  // Initialize defaults
  await createDefaultUsers.call(app)
  await createDefaultCatalogLayers.call(app)

  // Service to store user features
  const featuresService = await createFeaturesServiceForLayer.call(app, { collection: 'features' })
  await app.configureService('features', featuresService, servicesPath)

  // Event bus service
  app.declareService('events', {
    async create (data, params) {
      this.emit('event', data)
    }
  }, {
    events: ['event'],
    methods: ['create']
  })
}
