import logger from 'loglevel'
import kdkCore from '@kalisio/kdk/core.client'
import kdkMap, { utils as kMapUtils } from '@kalisio/kdk/map.client'

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
    await kMapUtils.createOfflineServices()
  } catch (error) {
    logger.error(error.message)
  }
}
