module.exports = function () {
  return [{
    name: 'Layers.MAPILLARY',
    description: 'Layers.MAPILLARY_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          MAPILLARY: 'Mapillary',
          MAPILLARY_DESCRIPTION: 'Couverture des prises de vues'
        }
      },
      en: {
        Layers: {
          MAPILLARY: 'Mapillary',
          MAPILLARY_DESCRIPTION: 'Mapillary images coverage'
        }
      }
    },
    tags: [
      'shot'
    ],
    attribution: 'Images from <a href="https://www.mapillary.com">Mapillary</a>',
    type: 'OverlayLayer',
    leaflet: {
      type: 'mapillary',
      minZoom: 13
    }
  }]
}
