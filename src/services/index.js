import logger from 'loglevel'
import kdkCore, { utils as kCoreUtils } from '@kalisio/kdk/core.client'
import kdkMap from '@kalisio/kdk/map.client.map'

export default async function () {
  const api = this

  // Set up our plugin services
  try {
    await api.configure(kdkCore)
    await api.configure(kdkMap)

    // Declare additional services for the app
    api.createService('catalog')
    api.createService('projects')
    api.createService('features')
    api.createService('events', { methods: ['create'] })
    // Restore previous settings if any
    const settingsService = api.getService('settings')
    if (settingsService) settingsService.restoreSettings()
    // Create required services for offline mode
    await kCoreUtils.createOfflineServices()
    // Need to wait for authentication before initializing offline document
    // FIXME: Do it based on the 'login' event does not work fine due to interleaved async operations,
    // we now do this in the KDK session management to be sure of the operation order
    /*
    api.on('login', async () => {
      await kCoreUtils.setOfflineServicesDocumentHandle()
    })
    */
  } catch (error) {
    logger.error(error.message)
  }
}
