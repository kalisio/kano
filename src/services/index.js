import logger from 'loglevel'
import kdkCore from '@kalisio/kdk/core.client'
import kdkMap from '@kalisio/kdk/map.client.map'
import localforage from 'localforage'
import service from '@kalisio/feathers-localforage'

async function createOfflineServices(api) {
  const services = await localforage.getItem('services')
  for (let serviceName in services) {
    api.createService(serviceName + '-offline', {service: service({
      id: '_id',
      name: serviceName,
      storage: ['IndexedDB']
    })})
  }
}

export default async function () {
  const api = this

  // Set up our plugin services
  try {
    await api.configure(kdkCore)
    await api.configure(kdkMap)
    // Override default service access method to handle offline mode
    const getServiceBase = api.getService
    api.getService = function (name, context) {
      // When offline use offline service version if any
      if (api.isDisconnected) {
        const service = getServiceBase(`${name}-offline`, context)
        if (!service) {
          throw new Error('Cannot retrieve offline service ' + name + ' for context ' + (typeof context === 'object' ? context._id : context))
        }
        return service
      } else {
        return getServiceBase(name, context)
      }
    }
    // TODO we use createService because of the custom methods
    // https://github.com/kalisio/kdk/issues/781
    api.createService('events', { methods: ['create'], events: ['event'] })
    // Restore previous settings if any
    const settingsService = api.getService('settings')
    if (settingsService) settingsService.restoreSettings()

    createOfflineServices(api)
  } catch (error) {
    logger.error(error.message)
  }
}
