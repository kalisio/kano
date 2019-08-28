import _ from 'lodash'
import path from 'path'
import fs from 'fs-extra'
import zlib from 'zlib'
import kCore, { permissions } from '@kalisio/kdk-core'
import kMap, { createCatalogService, createFeaturesService } from '@kalisio/kdk-map'
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
        version: packageInfo.version,
        cesium: app.get('cesium')
      }
      if (process.env.BUILD_NUMBER) {
        response.buildNumber = process.env.BUILD_NUMBER
      }
      res.json(response)
    })
    await app.configure(kCore)
    // Register permission for storage service if defined
    if (app.getService('storage')) {
      permissions.defineAbilities.registerHook((subject, can, cannot) => {
        can('service', 'storage')
        can('all', 'storage')
      })
    }
    await app.configure(kMap)
    // Create a global catalog service
    createCatalogService.call(app)
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
        app.logger.info('Initializing default user (email = ' + defaultUser.email + ', password = ' + defaultUser.password + ')')
        await usersService.create(defaultUser)
      }
    }
  }

  // Helper to register service and permissions for a layer
  function createFeaturesServiceForLayer (options) {
    const service = createFeaturesService.call(app, options)
    // Register permission for it
    permissions.defineAbilities.registerHook((subject, can, cannot) => {
      can('service', options.collection)
      can('all', options.collection)
    })
    return service
  }

  const catalogService = app.getService('catalog')
  const catalog = app.get('catalog')

  const defaultServices = catalog ? catalog.services || [] : []
  const services = await catalogService.find({ query: { type: 'service' }, paginate: false })
  for (let i = 0; i < defaultServices.length; i++) {
    const defaultService = defaultServices[i]
    const createdService = _.find(services, { name: defaultService.name })
    if (!createdService) {
      app.logger.info('Adding default service (name = ' + defaultService.name + ')')
      await catalogService.create(defaultService)
    } else {
      app.logger.info('Reusing default service (name = ' + defaultService.name + ')')
    }
  }

  const defaultLayers = catalog ? catalog.layers || [] : []
  const layers = await catalogService.find({ query: { type: 'layer' }, paginate: false })
  for (let i = 0; i < defaultLayers.length; i++) {
    const defaultLayer = defaultLayers[i]
    const createdLayer = _.find(layers, { name: defaultLayer.name })
    if (!createdLayer) {
      app.logger.info('Adding default layer (name = ' + defaultLayer.name + ')')
      await catalogService.create(defaultLayer)
    } else {
      app.logger.info('Reusing default layer (name = ' + defaultLayer.name + ')')
    }
    // Check if service(s) are associated to this layer
    let featuresService
    if (defaultLayer.service) {
      featuresService = createFeaturesServiceForLayer({
        collection: defaultLayer.service,
        featureId: defaultLayer.featureId,
        history: defaultLayer.history,
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
    if (!createdLayer && featuresService && defaultLayer.fileName) {
      // Cleanup
      await featuresService.remove(null, { query: {} })
      if (path.extname(defaultLayer.fileName) === '.gz') {
        const extractedFileName = path.join(path.dirname(defaultLayer.fileName), path.basename(defaultLayer.fileName, '.gz'))
        console.log(extractedFileName)
        fs.createReadStream(defaultLayer.fileName)
          .pipe(zlib.createGunzip())
          .pipe(fs.createWriteStream(extractedFileName))
          .on('close', async () => {
            const geojson = fs.readJsonSync(extractedFileName)
            await featuresService.create(geojson.features)
          })
          .on('error', (error) => { console.log(error) })
      } else {
        const geojson = fs.readJsonSync(defaultLayer.fileName)
        await featuresService.create(geojson.features)
      }
    }
  }

  // Service to store user features
  const featuresService = createFeaturesServiceForLayer({ collection: 'features' })
  app.configureService('features', featuresService, servicesPath)
}
