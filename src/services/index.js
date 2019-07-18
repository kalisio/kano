import logger from 'loglevel'
import kCore, { LocalSettingsService } from '@kalisio/kdk-core/client'
import kMap from '@kalisio/kdk-map/client'

export default function () {
  const api = this
  console.log(api)

  // Set up our plugin services
  try {
    api.configure(kCore)
    api.configure(kMap)
    // Setup service for settings edition
    const settingsService = api.createService('settings', {
      service: LocalSettingsService,
      propertyMapping: {
        shortTime: 'timeFormat.time.short',
        longTime: 'timeFormat.time.long',
        shortDate: 'timeFormat.date.short',
        longDate: 'timeFormat.date.long',
        shortYear: 'timeFormat.year.short',
        longYear: 'timeFormat.year.long',
        utc: 'timeFormat.utc',
        location: 'locationFormat',
        restoreView: 'restore.view'
      }
    })
    // Restore previous settings if any
    settingsService.restoreSettings()
  } catch (error) {
    logger.error(error.message)
  }
}
