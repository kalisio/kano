module.exports = function () {
    return [{
      name: 'Sublegends.SENSOR',
      i18n: {
        fr: {
          Sublegends: {
            SENSOR: 'Capteurs'
          }
        },
        en: {
          Sublegends: {
            SENSOR: 'Sensors'
          }
        }
      },
      headerClass: 'bg-grey-3 text-weight-regular',
      options: { open: true, filter: { type: 'OverlayLayer' , tags: { $in: ['sensor'] } } }
    }]
  }