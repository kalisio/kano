module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.OPENAQ',
    description: 'Layers.OPENAQ_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OPENAQ: 'OpenAQ',
          OPENAQ_DESCRIPTION: 'Données de Qualité de l\'air',
        },
        Legend: {
          OPENAQ_STATIONS_LABEL: 'OpenAQ - Stations',
          OPENAQ_MEASUREMENTS_LABEL: 'OpenAQ - Observations',
          OPENAQ_STATION: 'Station',
          OPENAQ_MEASUREMENT: 'Dernière mesure: Particules fines (PM10, PM2.5), Dioxyde de souffre, Monoxyde de carbone, Dioxyde d\'azote, Ozone, Noir de carbone',
          OPENAQ_OLD_MEASUREMENT: 'Mesure datée de plus de 1 jour'
        },
        Variables: {
          PM10: 'Particules fines (< 10µm, PM10)',
          PM25: 'Particules fines (< 2.5µm, PM2.5)',
          SO2: 'Dioxyde de soufre (SO2)',
          CO: 'Monoxyde de carbone (CO)s',
          NO2: 'Dioxyde d\'azote (NO2)',
          O3: 'Ozone (O3)',
          BC: 'Noir de carbone (BC)'
        }
      },
      en: {
        Layers: {
          OPENAQ: 'OpenAQ',
          OPENAQ_DESCRIPTION: 'Air quality data',
        },
        Legend: {
          OPENAQ_STATIONS_LABEL: 'OpenAQ - Stations',
          OPENAQ_MEASUREMENTS_LABEL: 'OpenAQ - Observations',
          OPENAQ_STATION: 'Station',
          OPENAQ_MEASUREMENT: 'Last measurement: Particulate matter (PM10, PM2.5), Sulfur dioxide, Carbon monoxide, Nitrogen dioxide, Ozone, Black carbon',
          OPENAQ_OLD_MEASUREMENT: 'Measurement dated more than 1 day ago'
        },
        Variables: {
          PM10: 'Particulate matter (< 10µm, PM10)',
          PM25: 'Particulate matter (< 2.5µm, PM2.5)',
          SO2: 'Sulfur dioxide (SO2)',
          CO: 'Carbon monoxide (CO)',
          NO2: 'Nitrogen dioxide (NO2)',
          O3: 'Ozone (O3)',
          BC: 'Black carbon (BC)'
        }
      }
    },
    tags: [
      'atmospheric', 'measure'
    ],
    legend: [{
      type: 'symbols',
      label: 'Legend.OPENAQ_MEASUREMENTS_LABEL',
      minZoom: 6,
      content: {
        observations: [
          { symbol: { 'media/KShape': { options: { shape: 'circle', color: '#0B75A9', radius: 10, icon: { classes: 'fa fa-heartbeat', color: 'white',  size: 10} } } }, 
            label: 'Legend.OPENAQ_MEASUREMENT' 
          }
        ],
        exceptions: [
          { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'black', radius: 10, icon: { classes: 'fa fa-heartbeat', color: 'white', size: 10 } } } }, 
            label: 'Legend.OPENAQ_OLD_MEASUREMENT' 
          }
        ]
      }
    }, {
      type: 'symbols',
      label: 'Legend.OPENAQ_STATIONS_LABEL',
      maxZoom: 5,
      content: {
        stations: [
          { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'white', radius: 10,  stroke: { color: 'black', width: 2 }, icon: { classes: 'fa fa-heartbeat', color: 'black',  size: 10} } } }, 
            label: 'Legend.OPENAQ_STATION' 
          }
        ]
      }
    }],  
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/openaq-icon.png',
    attribution: '',
    type: 'OverlayLayer',
    service: 'openaq-measurements',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'openaq-stations',
    featureId: 'location',
    featureLabel: 'name',
    from: 'P-7D',
    to: 'PT-15M',
    every: 'PT15M',
    queryFrom: 'P-1D',
    variables: [
      {
        name: 'pm25',
        label: 'Variables.PM25',
        unit: 'ug/m^3',
        range: [0, 100],
        chartjs: {
          backgroundColor: 'rgba(11, 117, 169, 128)',
          borderColor: 'rgb(11, 117, 169)',
          fill: false
        }
      },
      {
        name: 'pm10',
        label: 'Variables.PM10',
        unit: 'ug/m^3',
        range: [0, 200],
        chartjs: {
          backgroundColor: 'rgba(63, 63, 191, 128)',
          borderColor: 'rgb(63, 63, 191)',
          fill: false
        }
      },
      {
        name: 'co',
        label: 'Variables.CO',
        unit: 'ppm',
        range: [0, 10000],
        chartjs: {
          backgroundColor: 'rgba(255, 99, 132, 128)',
          borderColor: 'rgb(255, 99, 132)',
          fill: false
        }
      },
      {
        name: 'no2',
        label: 'Variables.NO2',
        unit: 'ppm',
        range: [0, 400],
        chartjs: {
          backgroundColor: 'rgba(81, 186, 153, 128)',
          borderColor: 'rgb(81, 186, 153)',
          fill: false
        }
      },
      {
        name: 'so2',
        label: 'Variables.SO2',
        unit: 'ppm',
        range: [0, 500],
        chartjs: {
          backgroundColor: 'rgba(40, 44, 32, 128)',
          borderColor: 'rgb(40, 44, 32)',
          fill: false
        }
      },
      {
        name: 'o3',
        label: 'Variables.O3',
        unit: 'ppm',
        range: [0, 400],
        chartjs: {
          backgroundColor: 'rgba(83, 134, 106, 128)',
          borderColor: 'rgb(83, 134, 106)',
          fill: false
        }
      },
      {
        name: 'bc',
        label: 'Variables.BC',
        unit: 'ug/m^3',
        range: [0, 400],
        chartjs: {
          backgroundColor: 'rgba(0, 0, 0, 128)',
          borderColor: 'rgb(0, 0, 0)',
          fill: false
        }
      }
    ],
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: true,
      minZoom: 4,
      minFeatureZoom: 7,
      cluster: { disableClusteringAtZoom: 18 },
      style: {
        point: {
          shape: 'circle',
          radius: 15,
          opacity: 1,
          color:  `<% if (_.has(properties, 'pm25') ||
                          _.has(properties, 'pm10') ||
                          _.has(properties, 'so2') ||
                          _.has(properties, 'no2') ||
                          _.has(properties, 'o3') ||
                          _.has(properties, 'co') ||
                          _.has(properties, 'bc')) { %>#138dce<% }
                else if (feature.measureRequestIssued) { %>black<% }
                else { %>white<% } %>`,
          stroke: {
            color:  `<% if (_.has(properties, 'pm25') ||
                            _.has(properties, 'pm10') ||
                            _.has(properties, 'so2') ||
                            _.has(properties, 'no2') ||
                            _.has(properties, 'o3') ||
                            _.has(properties, 'co') ||
                            _.has(properties, 'bc')) { %>transparent<% }
                  else if (feature.measureRequestIssued) { %>white<% }
                  else { %>black<% } %>`,
            width: 0
          },
          icon: {
            classes: 'fa fa-heartbeat',
            color:  `<% if (_.has(properties, 'pm25') ||
                            _.has(properties, 'pm10') ||
                            _.has(properties, 'so2') ||
                            _.has(properties, 'no2') ||
                            _.has(properties, 'o3') ||
                            _.has(properties, 'co') ||
                            _.has(properties, 'bc')) { %>white<% }
                  else if (feature.measureRequestIssued) { %>white<% }
                  else { %>black<% } %>`
          }
        }
      },
      template: ['style.point.color', 'style.point.stroke.color', 'style.point.icon.color'],
      popup: {
        pick: [
          'location'
        ]
      },
      tooltip: {
        template: `<% if (_.has(properties, 'pm25')) { %>PM2.5 = <%= Units.format(properties.pm25, 'ug/m^3') %></br><% }
                   if (_.has(feature, 'time.pm25')) { %><%= Time.format(feature.time.pm25, 'time.long') + ' - ' + Time.format(feature.time.pm25, 'date.short') %></br><% }
                   if (_.has(properties, 'pm10')) { %>PM10 = <%= Units.format(properties.pm10, 'ug/m^3') %></br><% }
                   if (_.has(feature, 'time.pm10')) { %><%= Time.format(feature.time.pm10, 'time.long') + ' - ' + Time.format(feature.time.pm10, 'date.short') %></br><% }
                   if (_.has(properties, 'so2')) { %>SO2 = <%= Units.format(properties.so2, 'ppm') %></br><% }
                   if (_.has(feature, 'time.so2')) { %><%= Time.format(feature.time.so2, 'time.long') + ' - ' + Time.format(feature.time.so2, 'date.short') %></br><% }
                   if (_.has(properties, 'no2')) { %>NO2 = <%= Units.format(properties.no2, 'ppm') %></br><% }
                   if (_.has(feature, 'time.no2')) { %><%= Time.format(feature.time.no2, 'time.long') + ' - ' + Time.format(feature.time.no2, 'date.short') %></br><% }
                   if (_.has(properties, 'o3')) { %>O3 = <%= Units.format(properties.o3, 'ppm') %></br><% }
                   if (_.has(feature, 'time.o3')) { %><%= Time.format(feature.time.o3, 'time.long') + ' - ' + Time.format(feature.time.o3, 'date.short') %></br><% }
                   if (_.has(properties, 'co')) { %>CO = <%= Units.format(properties.co, 'ppm') %></br><% }
                   if (_.has(feature, 'time.co')) { %><%= Time.format(feature.time.co, 'time.long') + ' - ' + Time.format(feature.time.co, 'date.short') %></br><% }
                   if (_.has(properties, 'bc')) { %>BC = <%= Units.format(properties.bc, 'ug/m^3') %></br><% }
                   if (_.has(feature, 'time.bc')) { %><%= Time.format(feature.time.bc, 'time.long') + ' - ' + Time.format(feature.time.bc, 'date.short') %></br><% } %>`
      }
    },
    cesium: {
      type: 'geoJson',
      realtime: true,
      cluster: { pixelRange: 50 },
      'marker-symbol': 'air',
      'marker-color': '#0B75A9',
      popup: {
        pick: [
          'location'
        ]
      },
      tooltip: {
        template: '<% if (_.has(properties, \'pm25\')) { %>PM2.5 = <%= Units.format(properties.pm25, \'ug/m^3\') %>\n<% }' +
                  'if (_.has(feature, \'time.pm25\')) { %><%= Time.format(feature.time.pm25, \'time.long\') + \' - \' + Time.format(feature.time.pm25, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'pm10\')) { %>PM10 = <%= Units.format(properties.pm10, \'ug/m^3\') %>\n<% }' +
                  'if (_.has(feature, \'time.pm10\')) { %><%= Time.format(feature.time.pm10, \'time.long\') + \' - \' + Time.format(feature.time.pm10, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'so2\')) { %>SO2 = <%= Units.format(properties.so2, \'ppm\') %>\n<% }' +
                  'if (_.has(feature, \'time.so2\')) { %></br><%= Time.format(feature.time.so2, \'time.long\') + \' - \' + Time.format(feature.time.so2, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'no2\')) { %>NO2 = <%= Units.format(properties.no2, \'ppm\') %>\n<% }' +
                  'if (_.has(feature, \'time.no2\')) { %></br><%= Time.format(feature.time.no2, \'time.long\') + \' - \' + Time.format(feature.time.no2, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'o3\')) { %>O3 = <%= Units.format(properties.o3, \'ppm\') %>\n<% }' +
                  'if (_.has(feature, \'time.o3\')) { %></br><%= Time.format(feature.time.o3, \'time.long\') + \' - \' + Time.format(feature.time.o3, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'co\')) { %>CO = <%= Units.format(properties.co, \'ppm\') %>\n<% }' +
                  'if (_.has(feature, \'time.co\')) { %></br><%= Time.format(feature.time.co, \'time.long\') + \' - \' + Time.format(feature.time.co, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'bc\')) { %>BC = <%= Units.format(properties.bc, \'ug/m^3\') %>\n<% }' +
                  'if (_.has(feature, \'time.bc\')) { %></br><%= Time.format(feature.time.bc, \'time.long\') + \' - \' + Time.format(feature.time.bc, \'date.short\') %>\n<% } %>'
      }
    }
  }]
}
