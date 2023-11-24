module.exports = function ({ domain }) {
  return [{
    name: 'Categories.HYDROGRAPHY_LAYERS',
    i18n: {
      fr: {
        Categories: {
          HYDROGRAPHY_LAYERS: 'Hydrographie'
        }
      },
      en: {
        Categories: {
          HYDROGRAPHY_LAYERS: 'Hydrography'
        }
      }
    },
    icon: 'las la-water',
    options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['hydrography'] } } }
  }]
}