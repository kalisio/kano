module.exports = function ({ domain }) {
  return [{
    name: 'Categories.SHOT_LAYERS',
    i18n: {
      fr: {
        Categories: {
          SHOT_LAYERS: 'Prises de vues'
        }
      },
      en: {
        Categories: {
          SHOT_LAYERS: 'Captured views'
        }
      }
    },
    icon: 'las la-street-view',
    options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['shot'] } } }
  }]
}
