module.exports = function () {
  return [{
    name: 'Sublegends.POPULATION',
    i18n: {
      fr: {
        Sublegends: {
          POPULATION: 'Population'
        }
      },
      en: {
        Sublegends: {
          POPULATION: 'Population'
        }
      }
    },
    order: 90,
    headerClass: 'bg-grey-3 text-weight-regular',
    options: { open: true, filter: { type: 'OverlayLayer' , tags: { $in: ['population'] } } }
  }]
}