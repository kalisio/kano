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
      type: 'symbols',
      label: 'Layers.OPENRADIATION',
      content: {
        
      }
    },
    attribution: "<a href='https://openradiation.org'>OpenRadiation</a>",
    type: 'OverlayLayer',
    service: 'openradiation',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    featureId: 'reportUuid',
    from: 'P-7D',
    to: 'PT-15M',
    every: 'PT15M',
    queryFrom: 'PT-1H',
    variables: [
      {
        name: 'value',
        label: 'Variables.value',
        units: [
          'µSv/h'
        ],
        range: [0, 250],
        step: 5,
        chartjs: {
          backgroundColor: 'rgba(11, 117, 169, 128)',
          borderColor: 'rgb(11, 117, 169)',
          fill: false
        }
      }
    ],
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: true,
      minZoom: 8,
      cluster: { disableClusteringAtZoom: 21 },
      'marker-type': 'shapeMarker',
      'marker-fill': '#78c0f0',
      'icon-color': 'white',
      'icon-classes': 'fa fa-radiation-alt',
      popup: {
        pick: [
          'userId'
        ]
      },
      tooltip: {
        template: `<% if (properties.value) { %><%= properties.value.toFixed(2) %> µSv/h<% }
                    if (feature.time && feature.time.value) { %></br><%= Time.format(feature.time.value, 'time.long') + ' - ' + Time.format(feature.time.value, 'date.short') %><% } %>`
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
        template: '<% if (properties.value) { %>Valeur = <%= properties.value.toFixed(2) %> µSv/h<% } %>\n' +
                  'if (feature.time && feature.time.value) { %></br><%= Time.format(feature.time.value, \'time.long\') + \' - \' + Time.format(feature.time.value, \'date.short\') %><% } %>'
      }
    }
  }]
}