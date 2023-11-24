module.exports = function ({ domain }) {
  return [{
    name: 'Categories.ATMOSPHERIC_LAYERS',
    i18n: {
      fr: {
        Categories: {
          ATMOSPHERIC_LAYERS: 'Observations atmosphériques'
        }
      },
      en: {
        Categories: {
          ATMOSPHERIC_LAYERS: 'Atmospheric observations'
        }
      }
    },
    icon: 'las la-smog',
    options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['atmospheric'] } } }
  }]
}
