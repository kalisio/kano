module.exports = function ({ domain }) {
  return [{
    name: 'Categories.ADMINISTRATIVE_LAYERS',
    i18n: {
      fr: {
        Categories: {
          ADMINISTRATIVE_LAYERS: 'Administratif'
        }
      },
      en: {
        Categories: {
          ADMINISTRATIVE_LAYERS: 'Administrative'
        }
      }
    },
    icon: 'las la-landmark',
    options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['administrative'] } } }
  }]
}