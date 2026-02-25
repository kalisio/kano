module.exports = function () {
  return [{
    name: 'Sublegends.ADMINISTRATIVE',
    i18n: {
      fr: {
        Sublegends: {
          ADMINISTRATIVE: 'Administratif'
        }
      },
      en: {
        Sublegends: {
          ADMINISTRATIVE: 'Administrative'
        }
      }
    },
    order: 90,
    headerClass: 'bg-grey-3 text-weight-regular',
    options: { open: true, filter: { type: 'OverlayLayer' , tags: { $in: ['administrative'] } } }
  }]
}