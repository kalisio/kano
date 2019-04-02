import logger from 'loglevel'
import i18next from 'i18next'
import config from 'config'
import { utils as kCoreUtils } from '@kalisio/kdk-core/client'
import { loadTranslation } from '../utils'

export async function configureI18n () {
  // Defines the modules to be loaded
  const modules = ['kCore', 'kMap', 'app']
  try {
    const localeConfig = config.locale || {}
    // Retrieve the locale
    const locale = kCoreUtils.getLocale()
    // Initializes i18next
    i18next.init({
      lng: localeConfig.default || locale,
      fallbackLng: localeConfig.fallback || 'en',
      defaultNS: ['kdk']
    })
    // Build the translation resolvers
    const translationResolvers = modules.map(module => {
      return loadTranslation(module, locale)
    })
    // Apply the resolvers and add the translation bundles to i18next
    let translations = await Promise.all(translationResolvers)
    translations.forEach((translation) => {
      i18next.addResourceBundle(locale, 'kdk', translation, true, true)
    })
  } catch (error) {
    logger.error(error.message)
  }
}
