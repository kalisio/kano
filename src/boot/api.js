import 'whatwg-fetch'
import config from 'config'
import logger from 'loglevel'
import postRobot from 'post-robot'
import utils from '../utils'
import appHooks from '../main.hooks'
import services from '../services'
import plugin from '../vue-kdk'
import { kalisio, beforeGuard, authenticationGuard } from '@kalisio/kdk-core/client'

postRobot.on('setLocalStorage', async (event) => {
  _.forOwn(event.data, (value, key) => {
    window.localStorage.setItem(key, (typeof value === 'object' ? JSON.stringify(value) : value))
  })
})
postRobot.on('setConfiguration', async (event) => {
  _.forOwn(event.data, (value, key) => {
    _.set(config, key, value)
  })
})

utils.sendEmbedEvent('kano-ready')

export default async ({ app, router, Vue }) => {
  let api = kalisio()

  // Setup app hooks
  api.hooks(appHooks)
  // Then all services
  services.call(api)

  Vue.use(plugin, { api })

  // Add global guard
  beforeGuard.registerGuard(authenticationGuard)
}
