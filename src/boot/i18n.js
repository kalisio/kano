import { createI18n } from 'vue-i18n'
import { utils as kCoreUtils } from '@kalisio/kdk/core.client'
import config from 'config'

export default async ({ app }) => {
  // Define the locale to be used
  const fallbackLocale = kCoreUtils.getAppFallbackLocale()
  const locale = kCoreUtils.getAppLocale()
  // Create i18n instance using the translation bundles
  app.use(createI18n({
    locale,
    fallbackLocale,
    messages: await kCoreUtils.loadTranslations(['core', 'map', 'app'], locale, fallbackLocale),
    silentFallbackWarn: true
  }))
}
