import logger from 'loglevel'
import kdkCore from '@kalisio/kdk/core.client'
import kdkMap, { utils as kMapUtils } from '@kalisio/kdk/map.client.map'

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
    kMapUtils.createOfflineServices()
  } catch (error) {
    logger.error(error.message)
  }
}
