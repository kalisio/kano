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
          TEMPERATURE: 'Température',
          PRESSURE: 'Pression',
          HUMIDITY: 'Humidité',
          GAS: 'Gaz',
          LUMINOSITY: 'Luminosité',
          ACCELERATION: 'Accélération'
        }
      },
      en: {
        Layers: {
          LAB: 'LAB - GSR',
          LAB_DESCRIPTION: 'Little Alert Box'
        },
        Variables: {
          TEMPERATURE: 'Temperature',
          PRESSURE: 'Pressure',
          HUMIDITY: 'Humidity',
          GAS: 'Gas',
          LUMINOSITY: 'Luminosity',
          ACCELERATION: 'Acceleration'
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
    from: 'P-7D',
    to: 'PT-10M',
    every: 'PT10M',
    queryFrom: 'PT-1H',
    variables: [
      {
        name: 'tmp_ow',
        label: 'Variables.TEMPERATURE',
        units: [
          'degC'
        ],
        range: [-50, 127],
        step: 5,
        chartjs: {
          backgroundColor: 'rgba(255, 99, 132, 128)',
          borderColor: 'rgb(255, 99, 132)',
          fill: false
        }
      },
      {
        name: 'bme_pressure',
        label: 'Variables.PRESSURE',
        units: [
          'hPa'
        ],
        range: [-940, 1050],
        step: 10,
        chartjs: {
          backgroundColor: 'rgba(191, 191, 63, 128)',
          borderColor: 'rgb(191, 191, 63)',
          fill: false
        }
      },
      {
        name: 'bme_humidity',
        label: 'Variables.HUMIDITY',
        units: [
          '%'
        ],
        range: [0, 100],
        step: 10,
        chartjs: {
          backgroundColor: 'rgba(54, 162, 235, 128)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          yAxis: {
            ticks: {
              min: 0
            }
          }
        }
      },
      {
        name: 'bme_gas',
        label: 'Variables.GAS',
        units: [
          'mohm'
        ],
        range: [5, 50000],
        step: 5000,
        chartjs: {
          backgroundColor: 'rgba(255, 159, 64, 128)',
          borderColor: 'rgb(255, 159, 64)',
          fill: false
        }
      },
      {
        name: 'luminosity',
        label: 'Variables.LUMINOSITY',
        units: [
          'cd'
        ],
        range: [100, 5000],
        step: 500,
        chartjs: {
          backgroundColor: 'rgba(255, 215, 0, 128)',
          borderColor: 'rgb(255, 215, 0)',
          fill: false
        }
      },
      {
        name: 'acc_module',
        label: 'Variables.ACCELERATION',
        units: [
          'G'
        ],
        range: [0, 2],
        step: 0.2,
        chartjs: {
          backgroundColor: 'rgba(128, 128, 128, 128)',
          borderColor: 'rgb(128, 128, 128)',
          fill: false,
          yAxis: {
            ticks: {
              min: 0
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
      cluster: { disableClusteringAtZoom: 18 },
      'marker-color': `<% if (properties.flag_alert === 0) { %>green<% }
                          else if (properties.flag_alert === 1) { %>red<% }
                          else { %>dark<% } %>`,
      'icon-classes': 'fa fa-wifi',
      'icon-x-offset': -2,
      'icon-color': '#FFF',
      template: ['marker-color'],
      tooltip: {
        template: '<%= properties.info_bulle %>'
      }
    },
    cesium: {
      type: 'geoJson',
      realtime: true,
      cluster: { pixelRange: 50 },
      'marker-symbol': 'lighthouse',
      'marker-color': '#180EF1',
      tooltip: {
        template: '<%= properties.info_bulle %>'
      }
    }
  }]
}
