module.exports = function ({ domain }) {
  return [{
    name: 'Categories.LAB_LAYERS',
    i18n: {
      fr: {
        Categories: {
          LAB_LAYERS: 'Little Alert Box'
        }
      },
      en: {
        Categories: {
          LAB_LAYERS: 'Little Alert Box'
        }
      }
    },
    icon: 'las la-wifi',
    options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['lab'] } } }
  }]
}
