module.exports = function () {
  return [{
    name: 'Sublegends.INFRASTRUCTURE',
    i18n: {
      fr: {
        Sublegends: {
          INFRASTRUCTURE: 'Infrastructures'
        }
      },
      en: {
        Sublegends: {
          INFRASTRUCTURE: 'Infrastructures'
        }
      }
    },
    headerClass: 'bg-grey-3 text-weight-regular',
    options: { open: true, filter: { type: 'OverlayLayer' , tags: { $in: ['infrastructure'] } } }
  }]
}