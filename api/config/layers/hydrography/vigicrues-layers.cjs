function createLegendSymbol (color) {
  return { 
    'media/KShape': { 
      options: { shape: 'rect', size: [20, 20], color }
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
        },
        Variables: {
          VIGICRUES_RISK: 'Vigilance crue'
        },
        Legend: {
          VIGICRUES_RISK_1: 'Pas de vigilance particulière requise',
          VIGICRUES_RISK_2: 'Risque de crue génératrice de débordements',
          VIGICRUES_RISK_3: 'Risque de crue génératrice de débordements importants',
          VIGICRUES_RISK_4: 'Risque de crue majeure',
          VIGICRUES_OLD_DATA: 'Prevision datée de plus de 6 heures'
        }
      },
      en: {
        Layers: {
          VIGICRUES: 'Vigicrues',
          VIGICRUES_DESCRIPTION: 'Flood risk map'
        },
        Variables: {
          VIGICRUES_RISK: 'Flood risk'
        },
        Legend: {
          VIGICRUES_RISK_1: 'No flood risk',
          VIGICRUES_RISK_2: 'Flood risk',
          VIGICRUES_RISK_3: 'Important flood risk',
          VIGICRUES_RISK_4: 'Major flood risk',
          VIGICRUES_OLD_DATA: 'Forecast dated more than 6 hours ago'
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
        nominal: [
          { symbol: createLegendSymbol('green'), label: 'Legend.VIGICRUES_RISK_1' },
          { symbol: createLegendSymbol('yellow'), label: 'Legend.VIGICRUES_RISK_2' },
          { symbol: createLegendSymbol('orange'), label: 'Legend.VIGICRUES_RISK_3' },
          { symbol: createLegendSymbol('red'), label: 'Legend.VIGICRUES_RISK_4' }
        ],
        exceptions: [
          { symbol: createLegendSymbol('black'), label: 'Legend.VIGICRUES_OLD_DATA' }
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
        name: 'risk',
        label: 'Variables.VIGICRUES_RISK',
        unit: 'niveau',
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
      minZoom: 9,
      staticGeometry: true,
      style: {
        line: {
          color: `<% if (properties.risk === 1) { %>green<% }
            else if (properties.risk === 2) { %>yellow<% }
            else if (properties.risk === 3) { %>orange<% }
            else if (properties.risk === 4) { %>red<% }
            else { %>black<% } %>`,
          width: 6,
          opcacity: 0.5
        }
      },
      template: ['style.line.color'],
      tooltip: {
        template: `<% if (_.has(properties, 'name') && _.has(properties, 'risk')) { %>
                    <%= properties.name %><br><%= $t('Legend.VIGICRUES_RISK_' + properties.risk) %>
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
          material: `Cesium.Color.<% if (properties.risk === 1) { %>GREEN<% }
                    else if (properties.risk === 2) { %>YELLOW<% }
                    else if (properties.risk === 3) { %>ORANGE<% }
                    else if (properties.risk === 4) { %>RED<% }
                    else { %>BLACK<% } %>`
        },
        template: ['polyline.material']
      },
      tooltip: {
        template: '<% if (_.has(properties, \'name\') && _.has(properties, \'risk\')) { %>' +
                  '<%= properties.name %>\n<%= $t(\'Legend.VIGICRUES_RISK_\' + properties.risk) %>' +
                  '<% } %>',
        options: { sticky: true }
      }
    }
  }]
}
