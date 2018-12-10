import _ from 'lodash'
import path from 'path'
import logger from 'winston'
import kCore, { permissions } from '@kalisio/kdk-core'
import kMap, { createCatalogService, createFeatureService } from '@kalisio/kdk-map'
import packageInfo from '../../package.json'

const servicesPath = path.join(__dirname, 'services')


module.exports = async function () {
  const app = this

  // Set up our plugin services
  try {
    app.use(app.get('apiPath') + '/capabilities', (req, res, next) => {
      let response = {
        name: 'kano',
        domain: app.get('domain'),
        version: packageInfo.version
      }
      if (process.env.BUILD_NUMBER) {
        response.buildNumber = process.env.BUILD_NUMBER
      }
      res.json(response)
    })
    await app.configure(kCore)
    await app.configure(kMap)
    // Create a global catalog service 
    createCatalogService.call(app)
  } catch (error) {
    logger.error(error.message)
  }

  // Configure the users service
  let usersService = app.getService('users')
  app.configureService('users', app.getService('users'), servicesPath)

  let defaultUsers = app.get('authentication').defaultUsers
  // Do not use exposed passwords on staging/prod environments
  if (defaultUsers) {
    // Create default users if not already done
    const users = await usersService.find({ paginate: false })
    for (let i = 0; i < defaultUsers.length; i++) {
      const defaultUser = defaultUsers[i]
      let createdUser = _.find(users, { email: defaultUser.email })
      if (!createdUser) {
        logger.info('Initializing default user (email = ' + defaultUser.email + ', password = ' + defaultUser.password + ')')
        await usersService.create(defaultUser)
      }
    }
  }

  // Helper to register service and permissions for a layer
  function createFeatureServiceForLayer(options) {
    createFeatureService.call(app, options)
    // Register permission for it
    permissions.defineAbilities.registerHook((subject, can, cannot) => {
      can('service', options.collection)
      can('all', options.collection)
    })
  }

  let catalogService = app.getService('catalog')
  const catalog = app.get('catalog')

  let defaultServices = catalog ? catalog.services || [] : []
  const services = await catalogService.find({ query: { type: 'service' }, paginate: false })
  for (let i = 0; i < defaultServices.length; i++) {
    const defaultService = defaultServices[i]
    let createdService = _.find(services, { name: defaultService.name })
    if (!createdService) {
      logger.info('Adding default service (name = ' + defaultService.name + ')')
      await catalogService.create(defaultService)
    } else {
      logger.info('Reusing default service (name = ' + defaultService.name + ')')
    }
  }

  let defaultLayers = catalog ? catalog.layers || [] : []
  const layers = await catalogService.find({ query: { type: 'layer' }, paginate: false })
  for (let i = 0; i < defaultLayers.length; i++) {
    const defaultLayer = defaultLayers[i]
    let createdLayer = _.find(layers, { name: defaultLayer.name })
    if (!createdLayer) {
      logger.info('Adding default layer (name = ' + defaultLayer.name + ')')
      await catalogService.create(defaultLayer)
    } else {
      logger.info('Reusing default layer (name = ' + defaultLayer.name + ')')
    }
    // Check if service(s) are associated to this layer
    if (defaultLayer.service) createFeatureServiceForLayer({
      collection: defaultLayer.service,
      featureId: defaultLayer.featureId,
      history: defaultLayer.history
    })
    if (defaultLayer.probeService) createFeatureServiceForLayer({
      collection: defaultLayer.probeService
    })
  }
}
