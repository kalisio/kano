import logger from 'loglevel'
import kdkCore, { hooks as kCoreHooks } from '@kalisio/kdk/core.client'
import kdkMap, { hooks as kMapHooks } from '@kalisio/kdk/map.client.map'
import { LocalForage } from '@kalisio/feathers-localforage'

async function createOfflineServices (api) {
  const services = await LocalForage.getItem('services')
  if (services) {
    const serviceNames = Object.keys(services)
    for (let i = 0; i < serviceNames.length; i++) {
      const serviceName = serviceNames[i]
      const service = services[serviceName]
      if (service.layerService) {
        await api.createOfflineService(serviceName, {
          snapshot: false,
          hooks: {
            before: {
              all: [kCoreHooks.removeServerSideParameters, kMapHooks.removeServerSideParameters],
              create: kMapHooks.referenceCountCreateHook,
              remove: kMapHooks.referenceCountRemoveHook
            },
            after: {
              find: [kMapHooks.geoJsonPaginationHook, kMapHooks.intersectBBoxHook]
            }
          }
        })
      } else {
        await api.createOfflineService(serviceName, {
          snapshot: false,
          hooks: {
            before: {
              all: [kCoreHooks.removeServerSideParameters, kMapHooks.removeServerSideParameters]
            }
          }
        })
      }
    }
  }
}

export default async function () {
  const api = this

  // Set up our plugin services
  try {
    await api.configure(kdkCore)
    await api.configure(kdkMap)

    // TODO we use createService because of the custom methods
    // https://github.com/kalisio/kdk/issues/781
    api.createService('events', { methods: ['create'], events: ['event'] })
    // Restore previous settings if any
    const settingsService = api.getService('settings')
    if (settingsService) settingsService.restoreSettings()
    // Create required services for offline mode
    createOfflineServices(api)
  } catch (error) {
    logger.error(error.message)
  }
}
