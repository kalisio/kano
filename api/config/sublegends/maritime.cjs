module.exports = function () {
  return [{
    name: 'Sublegends.MARITIME',
    i18n: {
      fr: {
        Sublegends: {
          MARITIME: 'Maritime'
        }
      },
      en: {
        Sublegends: {
          MARITIME: 'Maritime'
        }
      }
    },
    order: 90,
    headerClass: 'bg-grey-3 text-weight-regular',
    options: {
      open: true,
      filter: {
        type: 'OverlayLayer',
        tags: { $in: ['maritime'] }
      }
    }
  }]
}