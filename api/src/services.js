import _ from 'lodash'
import fs from 'fs-extra'
import logger from 'winston'
import kCore from '@kalisio/kdk-core'
import { permissions } from '@kalisio/kdk-core'
import kMap, { createCatalogService, createFeatureService } from '@kalisio/kdk-map'
import packageInfo from '../../package.json'

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

  let usersService = app.getService('users')
  let defaultUsers = app.get('authentication').defaultUsers
  // Do not use exposed passwords on staging/prod environments
  if (defaultUsers && !process.env.NODE_APP_INSTANCE) {
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

  let catalogService = app.getService('catalog')
  let defaultLayers = await fs.readJson('./config/layers.json')
  const layers = await catalogService.find({ paginate: false })
  for (let i = 0; i < defaultLayers.length; i++) {
    const defaultLayer = defaultLayers[i]
    let createdLayer = _.find(layers, { name: defaultLayer.name })
    if (!createdLayer) {
      logger.info('Adding default layer (name = ' + defaultLayer.name + ')')
      await catalogService.create(defaultLayer)
    }
    // Check if a service is associated to this layer
    if (defaultLayer.service) {
      createFeatureService.call(app, defaultLayer.service)
      // Register permission for it
      permissions.defineAbilities.registerHook((subject, can, cannot) => {
        can('service', defaultLayer.service)
        can('all', defaultLayer.service)
      })
    }
  }
}
