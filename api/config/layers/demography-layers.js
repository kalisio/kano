module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url, storageUrl }) {
  return [{
    name: 'Layers.POPULATION',
    description: 'Layers.POPULATION_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          POPULATION: 'Population',
          POPULATION_DESCRIPTION: 'Carroyage INSEE (200m)'
        }
      },
      en: {
        Layers: {
          POPULATION: 'Population',
          POPULATION_DESCRIPTION: 'INSEE Squaring (200m)'
        }
      }
    },
    tags: [
      'demography'
    ],
    iconUrl: '',
    icon: 'las la-male',
    attribution: 'INSEE',
    type: 'OverlayLayer',
    service: 'population',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    featureId: 'fid',
    chromajs: {
      scale: 'OrRd',
      classes: [1, 475, 1387, 2887, 5225, 8750, 13800, 21337, 30987, 49675, 102138]
    },
    units: ['h.'],
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
  }, {
    name: 'Layers.POPULATION_DENSITY',
    description: 'Layers.POPULATION_DENSITY_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          POPULATION_DENSITY: 'Densité de population',
          POPULATION_DENSITY_DESCRIPTION: 'Carroyage INSEE (1Km and 200m)'
        }
      },
      en: {
        Layers: {
          POPULATION_DENSITY: 'Population density',
          POPULATION_DENSITY_DESCRIPTION: 'INSEE Squaring (1Km and 200m)'
        }
      }
    },
    tags: [
      'demography'
    ],
    iconUrl: '',
    icon: 'las la-th',
    attribution: 'INSEE',
    type: 'OverlayLayer',
    chromajs: {
      scale: [
        '#2b83ba',
        '#64abb0',
        '#9dd3a7',
        '#c7e9ad',
        '#edf8b9',
        '#ffedaa',
        '#fec980',
        '#f99e59',
        '#e85b3a',
        '#d7191c'
      ],
      classes: [1, 175, 615, 1424, 2745, 4540, 6956, 11156, 17670, 34824, 48450]
    },
    units: ['h./Km²'],
    leaflet: {
      type: 'tileLayer',
      source: `http://localhost:80/styles/population-density/{z}/{x}/{y}.png`,
      opacity: 0.5,
      minZoom: 9,
      maxZoom: 21,
      maxNativeZoom: 14
    }
  }]
}
