import { createI18n } from 'vue-i18n'
import { utils as kCoreUtils } from '@kalisio/kdk/core.client'
import config from 'config'

export default async ({ app }) => {
  // Define the locale to be used
  const fallbackLocale = config.fallbackLocale || 'en'
  const locale = kCoreUtils.getAppLocale()
  // Create I18n instance using the translation bundles [core, app]
  app.use(createI18n({
    locale,
    fallbackLocale,
    messages: await kCoreUtils.loadTranslations(['core', 'app'], locale, fallbackLocale)
  }))
}
