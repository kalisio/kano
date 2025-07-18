import kCore, { createDefaultUsers, createDefaultTags, decorateDistributedService, permissions } from '@kalisio/kdk/core.api.js'
import kMap, { createCatalogFeaturesServices, createDefaultCatalogLayers, createFeaturesService, createDefaultStyles } from '@kalisio/kdk/map.api.js'
import makeDebug from 'debug'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const modelsPath = path.join(__dirname, 'models')
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
        // Jump from remote service descriptor to actual service instance
        service = decorateDistributedService.call(app, service)
        // Register default permissions for it
        debug('Registering permissions for remote service ', service.name)
        permissions.defineAbilities.registerHook((subject, can, cannot) => {
          can('service', service.name)
          can('read', service.name)
          if (service.name === 'probes') can('create', service.name)
        })
        // We then need to update abilities cache
        const authorisationService = app.getService('authorisations')
        if (authorisationService) authorisationService.clearAbilities()
      }
    })
    await app.configure(kCore)
    await app.configureService('authentication', app.getService('authentication'), servicesPath)
    await app.configureService('users', app.getService('users'), servicesPath)
    await app.configure(kMap)
  } catch (error) {
    app.logger.error(error.message)
  }

  // Create app services
  const configurationsService = await app.createService('configurations', { modelsPath, servicesPath })

  // Configure app hooks on the built-in catalog service
  const catalogService = app.getService('catalog')
  await app.configureService('catalog', catalogService, servicesPath)

  // Service to store user features first as catalog layers use it
  const featuresService = await createFeaturesService.call(app, { collection: 'features' })
  await app.configureService('features', featuresService, servicesPath)
  // Restore also any service used by layers
  await createCatalogFeaturesServices.call(app)

  // Initialize defaults
  await configurationsService.createDefaultConfigurations(app)
  await createDefaultUsers.call(app)
  await createDefaultCatalogLayers.call(app)
  await createDefaultStyles.call(app)
  await createDefaultTags.call(app)

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
