module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.POPULATION',
    description: 'Layers.POPULATION_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          POPULATION: 'Nombre d\'habitants',
          POPULATION_DESCRIPTION: 'Carroyage INSEE (1Km and 200m)'
        }
      },
      en: {
        Layers: {
          POPULATION: 'Number of inhabitants',
          POPULATION_DESCRIPTION: 'INSEE Squaring (1Km and 200m)'
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
        '#FFFFB2',
        '#FDD976',
        '#FEB554',
        '#FD8D3C',
        '#FC4E2A',
        '#E31A1C',
        '#B10026'
      ],
      classes: [1, 30, 100, 200, 400, 750, 1350, 4086]
    },
    units: ['h.'],
    leaflet: {
      type: 'tileLayer',
      source: `${tmsUrl}/population@GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png`,
      opacity: 0.5,
      minZoom: 10,
      maxZoom: 21,
      maxNativeZoom: 14,
      tms: true
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
        '#FFFFB2',
        '#FDD976',
        '#FEB554',
        '#FD8D3C',
        '#FC4E2A',
        '#E31A1C',
        '#B10026'
      ],
      classes: [1, 700, 2400, 5500, 11000, 20000, 36000, 110000]
    },
    units: ['h./Km²'],
    leaflet: {
      type: 'tileLayer',
      source: `${tmsUrl}/population-density@GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png`,
      opacity: 0.5,
      minZoom: 10,
      maxZoom: 21,
      maxNativeZoom: 14,
      tms: true
    }
  }, {
    name: 'Layers.POPULATION_DETAILS',
    description: 'Layers.POPULATION_DETAILS_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          POPULATION_DETAILS: 'Population par classe d\'age',
          POPULATION_DETAILS_DESCRIPTION: 'Carroyage INSEE (200m)'
        }
      },
      en: {
        Layers: {
          POPULATION_DETAILS: 'Population per age class',
          POPULATION_DETAILS_DESCRIPTION: 'INSEE Squaring (200m)'
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
      scale: [
        '#FFFFB2',
        '#FDD976',
        '#FEB554',
        '#FD8D3C',
        '#FC4E2A',
        '#E31A1C',
        '#B10026'
      ],
      classes: [1, 30, 100, 200, 400, 750, 1350, 4086]
    },
    units: ['h.'],
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: true,
      minZoom: 13,
      stroke: 0,
      'fill-color': "<%= chroma.scale(['#FFFFB2', '#FDD976', '#FEB554', '#FD8D3C', '#FC4E2A', '#E31A1C', '#B10026']).classes([1, 30, 100, 200, 400, 750, 1350, 4086])(properties.Ind).hex() %>",
      template: ['fill-color'],
      popup: {
        pick: []
      },
      tooltip: {
        template: '<table><tr><th>Total:</th><th><%= properties.Ind %></th></tr><tr><th>0-10:</th><th><%= properties.Ind_0_3 + properties.Ind_4_5 + properties.Ind_6_10 %></th></tr><tr><th>11-17:</th><th><%= properties.Ind_11_17 %></th></tr><tr><th>18-39:</th><th><%= properties.Ind_18_24 + properties.Ind_25_39 %></th></tr><tr><th>40-64:</th><th><%= properties.Ind_40_54 + properties.Ind_55_64 %></th></tr><tr><th>65+:</th><th><%= properties.Ind_65_79 + properties.Ind_80p %></th></tr></table>'
      }
    }
  }]
}
