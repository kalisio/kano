module.exports = function ({ domain }) {
    return [{
      name: 'Categories.SENSOR_LAYERS',
      i18n: {
        fr: {
          Categories: {
            SENSOR_LAYERS: 'Capteurs'
          }
        },
        en: {
          Categories: {
            SENSOR_LAYERS: 'Sensors'
          }
        }
      },
      icon: 'las la-satellite-dish',
      options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['sensor'] } } }
    }]
  }