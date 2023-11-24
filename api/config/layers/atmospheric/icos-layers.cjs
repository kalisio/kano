module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.ICOS',
    description: 'Layers.ICOS_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          ICOS: 'ICOS',
          ICOS_DESCRIPTION: 'Integrated Carbon Observation System'
        },
        Variables: {
          RADON: 'Radon',
          CO: 'Monoxyde de carbone (CO)',
          CO2: 'Dioxyde de carbone (CO²)',
          CH4: 'Méthane (CH4)'
        }
      },
      en: {
        Layers: {
          ICOS: 'ICOS',
          ICOS_DESCRIPTION: 'Integrated Carbon Observation System'
        },
        Variables: {
          RADON: 'Radon',
          CO: 'Carbon monoxide (CO)',
          CO2: 'Carbon dioxide (CO²)',
          CH4: 'Methane (CH4)'
        }
      }
    },
    tags: [
      'atmospheric', 'measure'
    ],
    attribution: "<a href='https://data.icos-cp.eu/'>ICOS</a>",
    type: 'OverlayLayer',
    service: 'icos-observations',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'icos-stations',
    featureId: 'stationId',
    featureLabel: 'stationName',
    from: 'P-7D',
    to: 'PT-1H',
    every: 'PT1H',
    queryFrom: 'PT-24H',
    variables: [
      {
        name: 'rn',
        label: 'Variables.RADON',
        units: [
          'Bq/m3'
        ],
        range: [0, 500],
        step: 10,
        chartjs: {
          backgroundColor: 'rgba(11, 117, 169, 128)',
          borderColor: 'rgb(11, 117, 169)',
          fill: false
        }
      },
      {
        name: 'co',
        label: 'Variables.CO',
        units: [
          'ppm'
        ],
        range: [0, 10000],
        step: 100,
        chartjs: {
          backgroundColor: 'rgba(255, 99, 132, 128)',
          borderColor: 'rgb(255, 99, 132)',
          fill: false
        }
      },
      {
        name: 'co2',
        label: 'Variables.CO2',
        units: [
          'ppm'
        ],
        range: [0, 10000],
        step: 100,
        chartjs: {
          backgroundColor: 'rgba(81, 186, 153, 128)',
          borderColor: 'rgb(81, 186, 153)',
          fill: false
        }
      },
      {
        name: 'ch4',
        label: 'Variables.CH4',
        units: [
          'ppm'
        ],
        range: [0, 10000],
        step: 100,
        chartjs: {
          backgroundColor: 'rgba(40, 44, 32, 128)',
          borderColor: 'rgb(40, 44, 32)',
          fill: false
        }
      }
    ],
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: true,
      minZoom: 5,
      minFeatureZoom: 6,
      cluster: { disableClusteringAtZoom: 18 },
      'marker-type': 'shapeMarker',
      'marker-fill': `<% if (_.has(properties, 'rn') ||
                              _.has(properties, 'co') ||
                              _.has(properties, 'co2') ||
                              _.has(properties, 'ch4')) { %>#138dce<% }
                          else if (feature.measureRequestIssued) { %>orange<% }
                          else { %>grey<% } %>`,
      'icon-classes': 'fas fa-ellipsis-v',
      template: ['marker-fill'],
      popup: {
        pick: [
          'stationName'
        ]
      },
      tooltip: {
        template: `<% if (_.has(properties, 'rn')) { %>RN = <%= Units.format(properties.rn, 'Bq/m3') %></br><% }
                   if (_.has(feature, 'time.rn')) { %><%= Time.format(feature.time.rn, 'time.long') + ' - ' + Time.format(feature.time.rn, 'date.short') %></br><% }
                   if (_.has(properties, 'co')) { %>CO = <%= Units.format(properties.co, 'ppm') %></br><% }
                   if (_.has(feature, 'time.co')) { %><%= Time.format(feature.time.co, 'time.long') + ' - ' + Time.format(feature.time.co, 'date.short') %></br><% }
                   if (_.has(properties, 'co2')) { %>CO2 = <%= Units.format(properties.co2, 'ppm') %></br><% }
                   if (_.has(feature, 'time.co2')) { %><%= Time.format(feature.time.co2, 'time.long') + ' - ' + Time.format(feature.time.co2, 'date.short') %></br><% }
                   if (_.has(properties, 'ch4')) { %>CH4 =<%= Units.format(properties.ch4, 'ppm') %></br><% }
                   if (_.has(feature, 'time.ch4')) { %><%= Time.format(feature.time.ch4, 'time.long') + ' - ' + Time.format(feature.time.ch4, 'date.short') %></br><% } %>`
      }
    },
    cesium: {
      type: 'geoJson',
      realtime: true,
      cluster: { pixelRange: 50 },
      'marker-symbol': 'lighthouse',
      'marker-color': '#180EF1',
      popup: {
        pick: [
          'stationName'
        ]
      },
      tooltip: {
        template: '<% if (_.has(properties, \'rn\')) { %>RN = <%= Units.format(properties.rn, \'Bq/m3\') %>\n<% }' +
                  'if (_.has(feature, \'time.rn\')) { %><%= Time.format(feature.time.rn, \'time.long\') + \' - \' + Time.format(feature.time.rn, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'co\')) { %>CO = <%= Units.format(properties.co, \'ppm\') %>\n<% }' +
                  'if (_.has(feature, \'time.co\')) { %><%= Time.format(feature.time.co, \'time.long\') + \' - \' + Time.format(feature.time.co, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'co2\')) { %>CO2 = <%= Units.format(properties.co2, \'ppm\') %>\n<% }' +
                  'if (_.has(feature, \'time.co2\')) { %><%= Time.format(feature.time.co2, \'time.long\') + \' - \' + Time.format(feature.time.co2, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'ch4\')) { %>CH4 =<%= Units.format(properties.ch4, \'ppm\') %>\n<% }' +
                  'if (_.has(feature, \'time.ch4\')) { %><%= Time.format(feature.time.ch4, \'time.long\') + \' - \' + Time.format(feature.time.ch4, \'date.short\') %>\n<% } %>'
      }
    }
  }]
}
