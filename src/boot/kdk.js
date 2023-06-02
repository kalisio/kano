import _ from 'lodash'
import config from 'config'
import { Notify } from 'quasar'
import postRobot from 'post-robot'
import utils from '../utils'
import appHooks from '../app.hooks'
import services from '../services'
import { KanoRouter } from '../router'
import { initializeApi, i18n, utils as kdkCoreUtils, Store, Layout, Events, Theme, beforeGuard, authenticationGuard } from '@kalisio/kdk/core.client'
import { Geolocation, CanvasDrawContext } from '@kalisio/kdk/map.client'

// those are imported to make them available in
// canvas layer's draw context
import destination from '@turf/destination'
// import circle from '@turf/circle'

const kanoLib = {
  // make turf functions available from canvas layer
  turf: {
    destination
    // circle
  }
}

CanvasDrawContext.merge(kanoLib)

function updateThemeColors () {
  const theme = config.theme
  // Default theme override
  if (theme) Theme.apply(theme)
}

postRobot.on('setLocalStorage', async (event) => {
  _.forOwn(event.data, (value, key) => {
    window.localStorage.setItem(key, (typeof value === 'object' ? JSON.stringify(value) : value))
  })
})
postRobot.on('unsetLocalStorage', async (event) => {
  _.forEach(event.data, (key) => {
    window.localStorage.removeItem(key)
  })
})
postRobot.on('setConfiguration', async (event) => {
  _.forOwn(event.data, (value, key) => {
    _.set(config, key, value)
  })
  updateThemeColors()
})

export default async ({ app, router }) => {
  // Required to make injections reactively linked to the provider
  // https://vuejs.org/guide/components/provide-inject.html#working-with-reactivity
  app.config.unwrapInjectedRef = true

  // Keep the router around since we need it to setup
  // postrobot listeners (see. utils.js setupEmbedApi)
  KanoRouter.set(router)

  await utils.sendEmbedEvent('kano-ready')

  // Initiate the client
  const api = initializeApi()
  // Setup app hooks
  api.hooks(appHooks)
  // Then all services
  services.call(api)

  // Initializes i18n
  await i18n.initialize(app, ['core', 'map', 'app', 'plugin'])

  // Add a generic function that can be used from the iframe API
  // to access all service operations easily, eg operation 'get' on service 'catalog'
  const serviceOperation = async (options) => {
    // Extract service/operation from options
    let { operation, service, args } = options
    service = api.getService(service)
    if (!service) throw new Error(`Cannot find service ${service}`)
    operation = service[operation]
    if (!operation || (typeof operation !== 'function')) throw new Error(`Cannot find service operation ${operation}`)
    const result = await operation.bind(service)(...args)
    return result
  }

  postRobot.on('api', async (event) => {
    const result = await serviceOperation(event.data)
    return result
  })

  await utils.sendEmbedEvent('api-ready')

  // Register global properties to the the vue app
  app.config.globalProperties.$store = Store
  app.config.globalProperties.$layout = Layout
  app.config.globalProperties.$events = Events
  app.config.globalProperties.$api = api
  app.config.globalProperties.$can = api.can
  app.config.globalProperties.$notify = Notify.create
  app.config.globalProperties.$tie = i18n.tie.bind(i18n)
  app.config.globalProperties.$geolocation = Geolocation
  app.config.globalProperties.$config = function (path, defaultValue) {
    return _.get(config, path, defaultValue)
  }

  // Register global components
  app.component('KAction', await kdkCoreUtils.loadComponent('KAction'))
  app.component('KPanel', await kdkCoreUtils.loadComponent('KPanel'))
  app.component('KStamp', await kdkCoreUtils.loadComponent('KStamp'))
  app.component('KModal', await kdkCoreUtils.loadComponent('KModal'))
  app.component('KDialog', await kdkCoreUtils.loadComponent('KDialog'))
  app.component('KForm', await kdkCoreUtils.loadComponent('form/KForm'))
  app.component('KPage', await kdkCoreUtils.loadComponent('layout/KPage'))
  app.component('KTour', await kdkCoreUtils.loadComponent('app/KTour'))
  app.component('KWelcome', await kdkCoreUtils.loadComponent('app/KWelcome'))
  app.component('KLayersPanel', await kdkCoreUtils.loadComponent('catalog/KLayersPanel'))

  // Register global properties
  // FIXME: This is used for testing purpose, don't know how to access this from Puppeteer otherwise
  global.$store = app.config.globalProperties.$store
  global.$layout = app.config.globalProperties.$layout
  global.$api = app.config.globalProperties.$api

  // Add global guard
  beforeGuard.registerGuard(authenticationGuard)

  updateThemeColors()

  api.on('authenticated', (data) => {
    // Store API gateway token if any
    if (data.gatewayToken) api.get('storage').setItem(config.gatewayJwt, data.gatewayToken)
    utils.sendEmbedEvent('kano-login')
  })
  api.on('logout', (data) => {
    // Remove API gateway token if any
    api.get('storage').removeItem(config.gatewayJwt)
    utils.sendEmbedEvent('kano-logout')
  })
}
