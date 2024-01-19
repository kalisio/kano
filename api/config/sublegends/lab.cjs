module.exports = function () {
  return [{
    name: 'Sublegends.LAB',
    i18n: {
      fr: {
        Sublegends: {
          LAB: 'LAB - GSR'
        }
      },
      en: {
        Sublegends: {
          LAB: 'LAB - GSR'
        }
      }
    },
    headerClass: 'bg-grey-3 text-weight-regular',
    options: { open: true, filter: { type: 'OverlayLayer' , tags: { $in: ['lab'] } } }
  }]
}