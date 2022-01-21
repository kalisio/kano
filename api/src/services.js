import _ from 'lodash'
import path from 'path'
import fs from 'fs-extra'
import zlib from 'zlib'
import request from 'superagent'
import kCore, { permissions } from '@kalisio/kdk/core.api'
import kMap, { createFeaturesService } from '@kalisio/kdk/map.api'
import packageInfo from '../../package.json'

const servicesPath = path.join(__dirname, 'services')

module.exports = async function () {
  const app = this

  // Set up our plugin services
  try {
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
        let remoteService = app.service(service.path)
        // Get name from service path without api prefix
        const name = service.path.replace(app.get('apiPath').substring(1) + '/', '')
        remoteService.name = name
        // As remote services have no context, from the internal point of view path = name
        // Unfortunately this property is already set and used by feathers-distributed and should not be altered
        //remoteService.path = name
        remoteService.app = app
        remoteService.getPath = function (withApiPrefix) { return (withApiPrefix ? app.get('apiPath') + '/' + name : name) }
        // Register default permissions for it
        permissions.defineAbilities.registerHook((subject, can, cannot) => {
          can('service', name)
          can('read', name)
          if (name === 'probes') can('create', name)
        })
      }
    })
    await app.configure(kCore)
    app.configureService('authentication', app.getService('authentication'), servicesPath)
    app.configureService('users', app.getService('users'), servicesPath)
    await app.configure(kMap)
  } catch (error) {
    app.logger.error(error.message)
  }

  const defaultUsers = app.get('authentication').defaultUsers
  // Do not use exposed passwords on staging/prod environments
  if (defaultUsers) {
    const usersService = app.getService('users')
    // Create default users if not already done
    const users = await usersService.find({ paginate: false })
    for (let i = 0; i < defaultUsers.length; i++) {
      const defaultUser = defaultUsers[i]
      const createdUser = _.find(users, { email: defaultUser.email })
      if (!createdUser) {
        app.logger.info('Initializing default user (email = ' + defaultUser.email + ')')
        await usersService.create(defaultUser)
      }
    }
  }

  // Helper to register service and permissions for a layer
  function createFeaturesServiceForLayer (options) {
    const service = createFeaturesService.call(app, options)
    // Register default permissions for it
    permissions.defineAbilities.registerHook((subject, can, cannot) => {
      can('service', options.collection)
      can('read', options.collection)
    })
    return service
  }

  const catalogService = app.getService('catalog')
  const catalog = app.get('catalog')

  const defaultLayers = catalog ? catalog.layers || [] : []
  const layers = await catalogService.find({ query: {}, paginate: false })
  for (let i = 0; i < defaultLayers.length; i++) {
    const defaultLayer = defaultLayers[i]
    const createdLayer = _.find(layers, { name: defaultLayer.name })
    try {
      if (!createdLayer) {
        app.logger.info('Adding default layer (name = ' + defaultLayer.name + ')')
        await catalogService.create(defaultLayer)
      } else {
        app.logger.info('Updating default layer (name = ' + defaultLayer.name + ')')
        await catalogService.update(createdLayer._id, defaultLayer)
      }
    } catch (error) {
      console.error(error)
    }
    // Check if service(s) are associated to this layer
    let featuresService
    if (defaultLayer.service) {
      featuresService = app.getService(defaultLayer.service)
      // Avoid create it twice as we can share services between different layers
      if (featuresService) continue
      featuresService = createFeaturesServiceForLayer({
        collection: defaultLayer.service,
        featureId: defaultLayer.featureId,
        featureIdType: defaultLayer.featureIdType,
        db: app.db.db(defaultLayer.dbName)
      })
    }
    if (defaultLayer.probeService) {
      createFeaturesServiceForLayer({
        collection: defaultLayer.probeService,
        db: app.db.db(defaultLayer.dbName)
      })
    }
    // And if we need to initialize some data as well
    if (!createdLayer && featuresService && (defaultLayer.url || defaultLayer.fileName)) {
      // Cleanup
      try {
        await featuresService.remove(null, { query: {} })
      } catch (error) {
        console.error(error)
      }
      // Data requested from external service ?
      if (defaultLayer.url) {
        try {
          const response = await request.get(defaultLayer.url)
          await featuresService.create(response.body.features)
        } catch (error) {
          console.error(error)
        }
      } else if (path.extname(defaultLayer.fileName) === '.gz') {
        const extractedFileName = path.join(path.dirname(defaultLayer.fileName), path.basename(defaultLayer.fileName, '.gz'))
        fs.createReadStream(defaultLayer.fileName)
          .pipe(zlib.createGunzip())
          .pipe(fs.createWriteStream(extractedFileName))
          .on('close', async () => {
            const geojson = fs.readJsonSync(extractedFileName)
            try {
              await featuresService.create(geojson.features)
            } catch (error) {
              console.error(error)
            }
          })
          .on('error', (error) => { console.log(error) })
      } else {
        const geojson = fs.readJsonSync(defaultLayer.fileName)
        try {
          await featuresService.create(geojson.features)
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  // Service to store user features
  const featuresService = createFeaturesServiceForLayer({ collection: 'features' })
  app.configureService('features', featuresService, servicesPath)
}
