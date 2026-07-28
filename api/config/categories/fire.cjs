module.exports = function ({ domain }) {
  return [{
    name: 'Categories.FIRE_LAYERS',
    i18n: {
      fr: {
        Categories: {
          FIRE_LAYERS: 'Incendies'
        }
      },
      en: {
        Categories: {
          FIRE_LAYERS: 'Fires'
        }
      }
    },
    icon: 'las la-fire',
    options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['fire'] } } }
  }]
}