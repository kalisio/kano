module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.OPENRADIATION',
    description: 'Layers.OPENRADIATION_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OPENRADIATION: 'OpenRadiation',
          OPENRADIATION_DESCRIPTION: 'Mesures OpenRadiation'
        },
        Legend: {
          OPENRADIATION_LABEL: 'OpenRadiation - Mesures'
        },
        Variables: {
          OPENRADIATION_GAMMA_DOSE_RATE: 'Débit de dose gamma ambiant'
        }
      },
      en: {
        Layers: {
          OPENRADIATION: 'OpenRadiation',
          OPENRADIATION_DESCRIPTION: 'OpenRadiation measurements'
        },
        Legend: {
          OPENRADIATION_LABEL: 'OpenRadiation - Measurements'
        },
        Variables: {
          OPENRADIATION_GAMMA_DOSE_RATE: 'Ambient gamma dose rate'
        }
      }
    },
    tags: [
      'radioactivity', 'measure'
    ],
    legend: {
      type: 'variables',
      label: 'Legend.OPENRADIATION_LABEL',
    },
    attribution: "<a href='https://openradiation.org'>OpenRadiation</a>",
    type: 'OverlayLayer',
    service: 'openradiation',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    featureId: 'reportUuid',
    from: 'P-7D',
    to: 'PT-10M',
    every: 'PT10M',
    queryFrom: 'PT-1H',
    variables: [
      {
        name: 'value',
        label: 'Variables.OPENRADIATION_GAMMA_DOSE_RATE',
        unit: 'usvh',
        range: [0, 250],
        step: 5,
        chartjs: {
          backgroundColor: 'rgba(11, 117, 169, 128)',
          borderColor: 'rgb(11, 117, 169)',
          fill: false
        },
        chromajs: {
          colors: ['#1DAFAF', '#1D8BAF', '#1D66AF', '1D41AF', '#411DAF', '#661DAF'],
          classes: [0, 0.1, 0.2, 0.3, 0.5, 2, Number.MAX_VALUE]
        }
      }
    ],
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: true,
      minZoom: 8,
      cluster: { disableClusteringAtZoom: 18 },
      style: {
        point: {
          shape: 'circle',
          radius: 15,
          opacity: 1,
          color: `<%= variables.value.colorScale(properties.value).hex() %>`,
          stroke: {
            color: 'transparent'
          },
          text: {
            label: `<%= Units.format(properties.value, 'usvh', undefined, { symbol: false }) %>`,
            color: 'white',
            classes: 'text-caption text-weight-medium'
          }
        }
      },
      template: ['style.point.color', 'style.point.text.label'],
      popup: {
        pick: [
          'userId'
        ]
      },
      tooltip: {
        template: `<%= properties.userId %></br>
                    <% if (_.has(properties, 'value')) { %><%= Units.format(properties.value, 'usvh') %><% }
                    if (_.has(feature, 'time.value')) { %></br><%= Time.format(feature.time.value, 'time.long') + ' - ' + Time.format(feature.time.value, 'date.short') %><% } %>`
      }
    },
    cesium: {
      type: 'geoJson',
      realtime: true,
      cluster: { pixelRange: 50 },
      'marker-symbol': 'air',
      'marker-color': '#78c0f0',
      popup: {
        pick: [
          'userId'
        ]
      },
      tooltip: {
        template: '<% if (_.has(properties, \'value\')) { %><%= Units.format(properties.value, \'usvh\') %><% }' +
                  'if (_.has(feature, \'time.value\')) { %>\n<%= Time.format(feature.time.value, \'time.long\') + \' - \' + Time.format(feature.time.value, \'date.short\') %><% } %>'
      }
    }
  }]
}