function createLegendSymbol (color) {
  return { 
    'media/KShape': { 
      shape: 'rect', width: 20, height: 20, fill: color
    } 
  }
}

module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.VIGICRUES',
    description: 'Layers.VIGICRUES_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          VIGICRUES: 'Vigicrues',
          VIGICRUES_DESCRIPTION: 'Carte de vigilance crues',
          VIGICRUES_VIGILANCE_1: 'Pas de vigilance particulière requise',
          VIGICRUES_VIGILANCE_2: 'Risque de crue génératrice de débordements',
          VIGICRUES_VIGILANCE_3: 'Risque de crue génératrice de débordements importants',
          VIGICRUES_VIGILANCE_4: 'Risque de crue majeure',
          VIGICRUES_VIGILANCE_undefined: 'Aucune donnée'
        },
        Variables: {
          VIGILANCE: 'Vigilance'
        }
      },
      en: {
        Layers: {
          VIGICRUES: 'Vigicrues',
          VIGICRUES_DESCRIPTION: 'Flooding warnings',
          VIGICRUES_VIGILANCE_1: 'No flood risk',
          VIGICRUES_VIGILANCE_2: 'Flood risk',
          VIGICRUES_VIGILANCE_3: 'Important flood risk',
          VIGICRUES_VIGILANCE_4: 'Major flood risk',
          VIGICRUES_VIGILANCE_undefined: 'No data'
        },
        Variables: {
          VIGILANCE: 'Vigilance'
        }
      }
    },
    tags: [
      'hydrography', 'forecast'
    ],
    legend: {
      type: 'symbols',
      label: 'Layers.VIGICRUES',
      content: {
        symbols: [
          { symbol: createLegendSymbol('green'), label: 'Layers.VIGICRUES_VIGILANCE_1' },
          { symbol: createLegendSymbol('yellow'), label: 'Layers.VIGICRUES_VIGILANCE_2' },
          { symbol: createLegendSymbol('orange'), label: 'Layers.VIGICRUES_VIGILANCE_3' },
          { symbol: createLegendSymbol('red'), label: 'Layers.VIGICRUES_VIGILANCE_4' }
        ]
      }
    },
    attribution: '',
    type: 'OverlayLayer',
    service: 'vigicrues-forecasts',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'vigicrues-sections',
    featureId: 'gid',
    featureLabel: 'name',
    featureIdType: 'number',
    from: 'P-7D',
    to: 'PT-15M',
    every: 'PT15M',
    queryFrom: 'PT-6H',
    variables: [
      {
        name: 'NivSituVigiCruEnt',
        label: 'Variables.VIGILANCE',
        units: [
          'niveau'
        ],
        range: [1, 4],
        step: 1,
        chartjs: {
          backgroundColor: 'rgba(11, 117, 169, 128)',
          borderColor: 'rgb(11, 117, 169)',
          fill: false,
          yAxis: {
            ticks: {
              min: 1,
              max: 4,
              stepSize: 1
            }
          }
        }
      }
    ],
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: true,
      minZoom: 10,
      staticGeometry: true,
      stroke: `<% if (properties.NivSituVigiCruEnt === 1) { %>green<% }
        else if (properties.NivSituVigiCruEnt === 2) { %>yellow<% }
        else if (properties.NivSituVigiCruEnt === 3) { %>orange<% }
        else if (properties.NivSituVigiCruEnt === 4) { %>red<% }
        else { %>black<% } %>`,
      'stroke-width': 8,
      'stroke-opacity': 0.5,
      template: ['stroke'],
      tooltip: {
        template: `<% if (_.has(properties, 'name') && _.has(properties, 'NivSituVigiCruEnt')) { %>
                    <%= properties.name %><br><%= $t('Layers.VIGICRUES_VIGILANCE_' + properties.NivSituVigiCruEnt) %>
                  <% } %>`,
        options: { permanent: false, sticky: true }
      }
    },
    cesium: {
      type: 'geoJson',
      realtime: true,
      'stroke-width': 4,
      'stroke-opacity': 0.5,
      entityStyle: {
        polyline: {
          clampToGround: false,
          material: `Cesium.Color.<% if (properties.NivSituVigiCruEnt === 1) { %>GREEN<% }
                    else if (properties.NivSituVigiCruEnt === 2) { %>YELLOW<% }
                    else if (properties.NivSituVigiCruEnt === 3) { %>ORANGE<% }
                    else if (properties.NivSituVigiCruEnt === 4) { %>RED<% }
                    else { %>BLACK<% } %>`
        },
        template: ['polyline.material']
      },
      tooltip: {
        template: '<% if (_.has(properties, \'name\') && _.has(properties, \'NivSituVigiCruEnt\')) { %>' +
                  '<%= properties.name %>\n<%= $t(\'Layers.VIGICRUES_VIGILANCE_\' + properties.NivSituVigiCruEnt) %>' +
                  '<% } %>',
        options: { sticky: true }
      }
    }
  }]
}
