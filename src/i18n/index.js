import logger from 'loglevel'
import i18next from 'i18next'
import { utils as kCoreUtils } from 'kCore/client'

function resolveTranslation (module, locale) {
  let translation = module + '_' + locale + '.json'
  return import(`kCore/lib/client/i18n/${translation}`)
    .catch(errorCore => {
      return import(`kTeam/lib/client/i18n/${translation}`)
        .catch(errorTeam => {
          return import(`kNotify/lib/client/i18n/${translation}`)
            .catch(errorNotify => {
              return import(`kMap/lib/client/i18n/${translation}`)
                .catch(errorMap => {
                  return import(`kEvent/lib/client/i18n/${translation}`)
                    .catch(errorEvent => {
                      return import(`./${translation}`)
                        .catch(errorApp => {
                          console.log(errorCore, errorTeam, errorNotify, errorMap, errorEvent, errorApp)
                        })
                    })
                })
            })
        })
    })
}

export function configureI18n () {
  // Defines the modules to be loaded
  const modules = ['kCore', 'kTeam', 'kNotify', 'kMap', 'kEvent', 'kApp']
  try {
    // Retrieve the locale
    const locale = kCoreUtils.getLocale()
    // Initializes i18next
    i18next.init({
      lng: locale,
      fallbackLng: 'en',
      defaultNS: ['kdk']
    })
    // Build the translation resolvers
    const resolvers = modules.map(module => {
      return resolveTranslation(module, locale)
    })
    // Apply the resolvers and add the translation bundles to i18next
    Promise.all(resolvers).then((translations) => {
      translations.forEach((translation) => {
        i18next.addResourceBundle(locale, 'kdk', translation, true, true)
      })
    })
  }
  catch (error) {
    logger.error(error.message)
  }
}
