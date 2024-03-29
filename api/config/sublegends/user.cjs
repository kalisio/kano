module.exports = function () {
  return [{
    name: 'Sublegends.USER',
    i18n: {
      fr: {
        Sublegends: {
          USER: 'Mes données'
        }
      },
      en: {
        Sublegends: {
          USER: 'My data'
        }
      }
    },
    headerClass: 'bg-grey-3 text-weight-regular',
    options: { open: true, filter: { type: 'OverlayLayer' , scope: 'user' } }
  }]
}