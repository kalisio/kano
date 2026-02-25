module.exports = function () {
  return [{
    name: 'Layers.PANORAMAX',
    description: 'Layers.PANORAMAX_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          PANORAMAX: 'Panoramax',
          PANORAMAX_DESCRIPTION: 'Couverture des prises de vues'
        }
      },
      en: {
        Layers: {
          PANORAMAX: 'Panoramax',
          PANORAMAX_DESCRIPTION: 'Panoramax images coverage'
        }
      }
    },
    tags: [
      'shot'
    ],
    attribution: 'Images from <a href="https://panoramax.fr">Panoramax</a>',
    type: 'OverlayLayer',
    leaflet: {
      type: 'panoramax',
      minZoom: 13
    }
  }]
}
