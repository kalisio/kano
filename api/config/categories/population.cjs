module.exports = function ({ domain }) {
  return [{
    name: 'Categories.POPULATION_LAYERS',
    i18n: {
      fr: {
        Categories: {
          POPULATION_LAYERS: 'Population'
        }
      },
      en: {
        Categories: {
          POPULATION_LAYERS: 'Population'
        }
      }
    },
    icon: 'las la-users',
    options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['population'] } } }
  }]
}