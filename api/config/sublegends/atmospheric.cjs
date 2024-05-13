module.exports = function () {
  return [{
    name: 'Sublegends.ATMOSPHERIC',
    i18n: {
      fr: {
        Sublegends: {
          ATMOSPHERIC: 'Observations atmosphériques'
        }
      },
      en: {
        Sublegends: {
          ATMOSPHERIC: 'Atmospheric observations'
        }
      }
    },
    headerClass: 'bg-grey-3 text-weight-regular',
    options: { open: true, filter: { type: 'OverlayLayer' , tags: { $in: ['atmospheric'] } } }
  }]
}