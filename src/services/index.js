import logger from 'loglevel'
import kCore, { Store, LocalSettingsService, utils as kCoreUtils } from '@kalisio/kdk-core/client'
import kMap from '@kalisio/kdk-map/client'

export default function () {
  const api = this

  // Set up our plugin services
  try {
    api.configure(kCore)
    // Default time formatting settings
    Store.set('timeFormat', {
      time: {
        short: 'H[h]',
        long: 'HH:mm'
      },
      date: {
        short: 'DD/MM',
        long: 'dddd D'
      },
      year: {
        short: 'YY',
        long: 'YYYY'
      },
      utc: false,
      locale: kCoreUtils.getLocale()
    })
    const settingsService = api.createService('settings', {
      service: LocalSettingsService,
      propertyMapping: {
        shortTime: 'timeFormat.time.short',
        longTime: 'timeFormat.time.long',
        shortDate: 'timeFormat.date.short',
        longDate: 'timeFormat.date.long',
        shortYear: 'timeFormat.year.short',
        longYear: 'timeFormat.year.long',
        utc: 'timeFormat.utc'
      }
    })
    // Restore previous settings if any
    settingsService.restoreSettings()
    api.configure(kMap)
  } catch (error) {
    logger.error(error.message)
  }
}
