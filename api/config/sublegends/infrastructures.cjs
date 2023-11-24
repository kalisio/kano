module.exports = function () {
  return [{
    name: 'Sublegends.INFRASTRUCTURES',
    i18n: {
      fr: {
        Sublegends: {
          INFRASTRUCTURES: 'Infrastructures'
        }
      },
      en: {
        Sublegends: {
          INFRASTRUCTURES: 'Infrastructures'
        }
      }
    },
    headerClass: 'bg-grey-3 text-weight-regular',
    options: { open: true, filter: { type: 'OverlayLayer' , tags: { $in: ['infrastructures'] } } }
  }]
}