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
        Variables: {
          value: 'Radioactivité ambiante'
        }
      },
      en: {
        Layers: {
          OPENRADIATION: 'OpenRadiation',
          OPENRADIATION_DESCRIPTION: 'OpenRadiation measurements'
        },
        Variables: {
          value: 'Ambient radioactivity'
        }
      }
    },
    tags: [
      'radioactivity', 'measure'
    ],
    legend: {
      type: 'variable'
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
        label: 'Variables.value',
        unit: 'usvh',
        range: [0, 250],
        step: 5,
        chartjs: {
          backgroundColor: 'rgba(11, 117, 169, 128)',
          borderColor: 'rgb(11, 117, 169)',
          fill: false
        },
        chromajs: {
          colors: 'Greens',
          classes: [0,0.01,0.05,0.1,0.2,0.5,1,10,20,1000]
        }
      }
    ],
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: true,
      minZoom: 8,
      cluster: { disableClusteringAtZoom: 18 },
      'marker-type': 'circleMarker',
      radius: 8,
      'stroke-width': 0,
      'stroke-opacity': 0,
      'fill-opacity': 1,
      'fill-color': `<%= variables.value.colorScale(properties.value).hex() %>`,
      template: [
        'fill-color'
      ],
      popup: {
        pick: [
          'userId'
        ]
      },
      tooltip: {
        template: `<% if (_.has(properties, 'value')) { %><%= Units.format(properties.value, 'usvh') %><% }
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