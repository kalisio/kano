module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.POPULATION',
    description: 'Layers.POPULATION_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          POPULATION: 'Population',
          POPULATION_DESCRIPTION: 'Nombre d\'individus'
        }
      },
      en: {
        Layers: {
          POPULATION: 'Population',
          POPULATION_DESCRIPTION: 'Number of persons'
        }
      }
    },
    tags: [
      'demography', 'administrative'
    ],
    iconUrl: '',
    icon: 'las la-th',
    attribution: 'Population © INSEE – données disponibles sous <a href="https://catalogue-donnees.insee.fr/">licence ouverte</a>',
    legend: [{
      type: 'symbols',
      label: 'Layers.POPULATION_DESCRIPTION',
      maxZoom: 12,
      content: {
        symbols: [
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FFFFB2' } } }, label: '1 - 400' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FDD976' } } }, label: '400 - 1500' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FEB554' } } }, label: '1500 - 3500' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FD8D3C' } } }, label: '3500 - 7000' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FC4E2A' } } }, label: '7000 - 12000' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#E31A1C' } } }, label: '12000 - 25000' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#B10026' } } }, label: '25000 - 110000' }
        ]
      }
    }, {
      type: 'symbols',
      label: 'Layers.POPULATION_DESCRIPTION',
      minZoom: 13,
      content: {
        symbols: [
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FFFFB2' } } }, label: '1 - 30' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FDD976' } } }, label: '30 - 100' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FEB554' } } }, label: '100 - 200' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FD8D3C' } } }, label: '200 - 400' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FC4E2A' } } }, label: '400 - 750' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#E31A1C' } } }, label: '750 - 1350' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#B10026' } } }, label: '1350 - 4086' }
        ]
      }
    }],
    type: 'OverlayLayer',
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
          POPULATION_DENSITY_DESCRIPTION: `Nombre d'individus par Km²`
        }
      },
      en: {
        Layers: {
          POPULATION_DENSITY: 'Population density',
          POPULATION_DENSITY_DESCRIPTION: 'Number of persons per Km²'
        }
      }
    },
    tags: [
      'demography', 'administrative'
    ],
    iconUrl: '',
    icon: 'las la-th',
    attribution: '© INSEE – données disponibles sous <a href="https://catalogue-donnees.insee.fr/">licence ouverte</a>',
    legend: [{
      type: 'symbols',
      label: 'Layers.POPULATION_DENSITY_DESCRIPTION',
      maxZoom: 12,
      content: {
        symbols: [
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FFFFB2' } } }, label: '1 - 400' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FDD976' } } }, label: '400 - 1500' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FEB554' } } }, label: '1500 - 3500' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FD8D3C' } } }, label: '3500 - 7000' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FC4E2A' } } }, label: '7000 - 12000' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#E31A1C' } } }, label: '12000 - 25000' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#B10026' } } }, label: '25000 - 110000' }
        ]
      }
    }, {
      type: 'symbols',
      label: 'Layers.POPULATION_DENSITY_DESCRIPTION',
      minZoom: 13,
      content: {
        symbols: [
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FFFFB2' } } }, label: '1 - 700' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FDD976' } } }, label: '700 - 2400' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FEB554' } } }, label: '2400 - 5500' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FD8D3C' } } }, label: '5500 - 11000' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FC4E2A' } } }, label: '11000 - 20000' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#E31A1C' } } }, label: '20000 - 36000' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#B10026' } } }, label: '36000 - 110000' }
        ]
      }
    }],
    type: 'OverlayLayer',
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
          POPULATION_DETAILS_DESCRIPTION: 'Nombre d\'individus'
        }
      },
      en: {
        Layers: {
          POPULATION_DETAILS: 'Population per age class',
          POPULATION_DETAILS_DESCRIPTION: 'Number of persons'
        }
      }
    },
    tags: [
      'demography', 'administrative'
    ],
    iconUrl: '',
    icon: 'las la-male',
    attribution: '© INSEE – données disponibles sous <a href="https://catalogue-donnees.insee.fr/">licence ouverte</a>',
    legend: [{
      type: 'symbols',
      label: 'Layers.POPULATION_DENSITY_DESCRIPTION',
      minZoom: 13,
      content: {
        symbols: [
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FFFFB2' } } }, label: '1 - 30' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FDD976' } } }, label: '30 - 100' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FEB554' } } }, label: '100 - 200' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FD8D3C' } } }, label: '200 - 400' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FC4E2A' } } }, label: '400 - 750' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#E31A1C' } } }, label: '750 - 1350' },
          { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#B10026' } } }, label: '1350 - 4086' }
        ]
      }
    }],
    type: 'OverlayLayer',
    service: 'population',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    featureId: 'fid',
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
