module.exports = function ({ domain }) {
  return [{
    name: 'Categories.MARITIME_LAYERS',
    i18n: {
      fr: {
        Categories: {
          MARITIME_LAYERS: 'Maritime'
        }
      },
      en: {
        Categories: {
          MARITIME_LAYERS: 'Maritime'
        }
      }
    },
    icon: 'las la-ship',
    options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['maritime'] } } }
  }]
}