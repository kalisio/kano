module.exports = function ({ domain }) {
  return [{
    name: 'Categories.INFRASTRUCTURE_LAYERS',
    i18n: {
      fr: {
        Categories: {
          INFRASTRUCTURE_LAYERS: 'Infrastructures'
        }
      },
      en: {
        Categories: {
          INFRASTRUCTURE_LAYERS: 'Infrastructures'
        }
      }
    },
    icon: 'las la-broadcast-tower',
    options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['infrastructure'] } } }
  }]
}