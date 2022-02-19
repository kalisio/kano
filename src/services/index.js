import logger from 'loglevel'
import kCore from '@kalisio/kdk/core.client'
import kMap from '@kalisio/kdk/map.client'

export default function () {
  const api = this

  // Set up our plugin services
  try {
    api.configure(kCore)
    api.configure(kMap)
    // Restore previous settings if any
    const settingsService = api.getService('settings')
    if (settingsService) settingsService.restoreSettings()
  } catch (error) {
    logger.error(error.message)
  }
}
