module.exports = function ({ domain }) {
  return [{
    name: 'Categories.BUSINESS_LAYERS',
    i18n: {
      fr: {
        Categories: {
          BUSINESS_LAYERS: 'Données métier'
        }
      },
      en: {
        Categories: {
          BUSINESS_LAYERS: 'Business data'
        }
      }
    },
    icon: 'las la-briefcase',
    options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['business'] } } }
  }]
}
  