module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url, storageUrl }) {
  return [{
    name: 'Layers.POPULATION_INSEE',
    description: 'Layers.POPULATION_INSEE_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          POPULATION_INSEE: 'Population',
          POPULATION_INSEE_DESCRIPTION: 'Carroyage INSEE (200m)'
        }
      },
      en: {
        Layers: {
          POPULATION_INSEE: 'Population',
          POPULATION_INSEE_DESCRIPTION: 'INSEE Squaring (200m)'
        }
      }
    },
    tags: [
      'demography'
    ],
    iconUrl: '',
    icon: 'las la-users',
    attribution: '',
    type: 'OverlayLayer',
    service: 'population-insee',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    featureId: 'fid',
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: true,
      minZoom: 13,
      stroke: 0,
      'fill-color': "<%= chroma.scale('OrRd').classes([475, 1387, 2887, 5225, 8750, 13800, 21337, 30987, 49675, 102138])(25 * properties.Ind).hex() %>",
      template: ['fill-color'],
      popup: {
        pick: []
      },
      tooltip: {
        template: '<%= properties.Ind %> individus'
      }
    }
  }]
}
