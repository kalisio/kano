import _ from 'lodash'
import 'whatwg-fetch'
import config from 'config'
import postRobot from 'post-robot'
import utils from '../utils'
import appHooks from '../main.hooks'
import services from '../services'
import plugin from '../vue-kdk'
import { kalisio, beforeGuard, authenticationGuard, Theme } from '@kalisio/kdk/core.client'
import { CanvasDrawContext } from '@kalisio/kdk/map.client'

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

export default async ({ app, router, Vue }) => {
  await utils.sendEmbedEvent('kano-ready')

  const api = kalisio()

  // Setup app hooks
  api.hooks(appHooks)
  // Then all services
  services.call(api)

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

  Vue.use(plugin, { api })

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
