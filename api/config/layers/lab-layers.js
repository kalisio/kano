module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.LAB',
    description: 'Layers.LAB_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          LAB: 'LAB - GSR',
          LAB_DESCRIPTION: 'Little Alert Box'
        },
        Variables: {
          VALUE: 'Valeur mesurée'
        }
      },
      en: {
        Layers: {
          LAB: 'LAB - GSR',
          LAB_DESCRIPTION: 'Little Alert Box'
        },
        Variables: {
          VALUE: 'Measured value'
        }
      }
    },
    tags: [
      'measure'
    ],
    attribution: 'Global Smart Rescue',
    type: 'OverlayLayer',
    service: 'lab-observations',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'lab-stations',
    featureId: 'id',
    featureIdType: 'number',
    from: 'P-7D',
    to: 'PT-10M',
    every: 'PT10M',
    queryFrom: 'PT-1H',
    variables: [
      {
        name: 'value',
        label: 'Variables.VALUE',
        units: [
          'unit'
        ],
        range: [0, 500],
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
      minZoom: 10,
      cluster: { disableClusteringAtZoom: 18 },
      'marker-color': `<% if (properties.status === 'OK') { %>green<% }
                          else if (properties.status === 'KO') { %>red<% }
                          else { %>dark<% } %>`,
      'icon-classes': 'fa fa-bell',
      'icon-x-offset': -2,
      'icon-color': '#FFF',
      template: ['marker-color'],
      tooltip: {
        template: `<%= properties.name %>: <%= properties.status || 'no status' %><% if (_.has(properties, 'value')) { %></br><%= properties.value.toFixed(2) %> unit<% } %>`
      }
    },
    cesium: {
      type: 'geoJson',
      realtime: true,
      cluster: { pixelRange: 50 },
      'marker-symbol': 'lighthouse',
      'marker-color': '#180EF1',
      tooltip: {
        template: '<%= properties.name %><% if (_.has(properties, \'value\')) { %>\n<%= properties.value.toFixed(2) %> unit<% } %>'
      }
    }
  }]
}
