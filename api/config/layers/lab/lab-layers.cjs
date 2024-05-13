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
          ACCELERATION: 'Accélération',
          RADIOACTIVITY: 'Radioactivité'
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
          ACCELERATION: 'Acceleration',
          RADIOACTIVITY: 'Radioactivity'
        }
      }
    },
    tags: [
      'lab', 'measure'
    ],
    attribution: 'Global Smart Rescue',
    type: 'OverlayLayer',
    service: 'lab-observations',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    ttl: 7 * 24 * 60 * 60,
    probeService: 'lab-stations',
    featureId: 'id',
    from: 'P-7D',
    to: 'PT-6H',
    every: 'PT30S',
    queryFrom: 'PT-10M',
    variables: [
      {
        name: 'tmp_ow',
        label: 'Variables.TEMPERATURE',
        unit: 'degC',
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
        unit: 'hPa',
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
        unit: '%',
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
        unit: 'ug/m^3',
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
        unit: 'cd',
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
        unit: 'G',
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
      },
      {
        name: 'radioactivity_mrem',
        label: 'Variables.RADIOACTIVITY',
        unit: 'usvh',
        range: [0, 1],
        step: 0.1,
        chartjs: {
          backgroundColor: 'rgba(11, 117, 169, 128)',
          borderColor: 'rgb(11, 117, 169)',
          fill: false
        }
      }
    ],
    legend: {
      type: 'variables'
    },
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: true,
      // minZoom: 10,
      cluster: { disableClusteringAtZoom: 18 },
      'marker-color': `<% if (properties.flag_alert === 0) { %>green<% }
                          else if (properties.flag_alert === 1) { %>red<% }
                          else { %>dark<% } %>`,
      'icon-classes': 'fa fa-wifi',
      template: ['marker-fill'],
      tooltip: {
        template: '<%= properties.id %>: <%= properties.info_bulle %>'
      }
    },
    cesium: {
      type: 'geoJson',
      realtime: true,
      cluster: { pixelRange: 50 },
      'marker-symbol': 'lighthouse',
      'marker-color': '#180EF1',
      tooltip: {
        template: '<%= properties.id %>: <%= properties.info_bulle %>'
      }
    }
  }, {
    name: 'Layers.LAB_RADIOACTIVITY_MEASUREMENTS',
    description: 'Layers.LAB_RADIOACTIVITY_MEASUREMENTS_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          LAB_RADIOACTIVITY_MEASUREMENTS: 'LAB - Radioactivité - GSR',
          LAB_RADIOACTIVITY_MEASUREMENTS_DESCRIPTION: 'Mesures de Radioactivité via Little Alert Box'
        },
        Variables: {
          RADIOACTIVITY: 'Radioactivité'
        }
      },
      en: {
        Layers: {
          LAB_RADIOACTIVITY_MEASUREMENTS: 'LAB - Radioactivity - GSR',
          LAB_RADIOACTIVITY_MEASUREMENTS_DESCRIPTION: 'Little Alert Box Radioactivity Measurements'
        },
        Variables: {
          RADIOACTIVITY: 'Radioactivity'
        }
      }
    },
    tags: [
      'lab', 'measure'
    ],
    attribution: 'Global Smart Rescue',
    type: 'OverlayLayer',
    service: 'lab-measurements',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    ttl: 7 * 24 * 60 * 60,
    featureId: 'measureUuid',
    chronicleId: ['stationId', 'sensorId', 'sensorNumber'],
    from: 'P-7D',
    to: 'PT-30S',
    every: 'PT30S',
    queryFrom: 'PT-6H',
    variables: [
      {
        name: 'radioactivity_mrem',
        label: 'Variables.RADIOACTIVITY',
        unit: 'usvh',
        range: [0, 1],
        step: 0.1,
        chartjs: {
          backgroundColor: 'rgba(11, 117, 169, 128)',
          borderColor: 'rgb(11, 117, 169)',
          fill: false
        },
        chromajs: {
          colors: 'Greens',
          domain: [0,0.1,0.2,0.5,1,2,5,10,20,1000]
        }
      }
    ],
    legend: {
      type: 'variables'
    },
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: false,
      minZoom: 8,
      cluster: { disableClusteringAtZoom: 18 },
      'marker-type': 'shapeMarker',
      radius: 8,
      'stroke-width': 1,
      'stroke-color': 'black',
      'fill-opacity': 0.8,
      'fill': `<%= variables.radioactivity_mrem.colorScale(properties.radioactivity_mrem).hex() %>`,
      template: [
        'fill'
      ],
      tooltip: {
        template: `<%= properties.id + '/' + properties.sensorId %></br><% if (_.has(properties, 'radioactivity_mrem')) { %><%= Units.format(properties.radioactivity_mrem, 'usvh') %><% }
                    if (_.has(feature, 'time.radioactivity_mrem')) { %></br><%= Time.format(feature.time.radioactivity_mrem, 'time.long') + ' - ' + Time.format(feature.time.radioactivity_mrem, 'date.short') %><% } %>`
      }
    },
    cesium: {
      type: 'geoJson',
      realtime: true,
      cluster: { pixelRange: 50 },
      'marker-symbol': 'marker',
      'marker-color': '#78c0f0',
      tooltip: {
        template: '<%= properties.id + \'/\' + properties.sensorId %>\n<% if (_.has(properties, \'radioactivity_mrem\')) { %><%= Units.format(properties.radioactivity_mrem, \'usvh\') %><% }' +
                  'if (_.has(feature, \'time.radioactivity_mrem\')) { %>\n<%= Time.format(feature.time.radioactivity_mrem, \'time.long\') + \' - \' + Time.format(feature.time.radioactivity_mrem, \'date.short\') %><% } %>'
      }
    }
  }, {
    name: 'Layers.LAB_COV_MEASUREMENTS',
    description: 'Layers.LAB_COV_MEASUREMENTS_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          LAB_COV_MEASUREMENTS: 'LAB - C.O.V. - GSR',
          LAB_COV_MEASUREMENTS_DESCRIPTION: 'Mesures de Température via Little Alert Box'
        },
        Variables: {
          COV: 'Composés organiques volatils'
        }
      },
      en: {
        Layers: {
          LAB_COV_MEASUREMENTS: 'LAB - V.O.C. - GSR',
          LAB_COV_MEASUREMENTS_DESCRIPTION: 'Little Alert Box V.O.C. Measurements'
        },
        Variables: {
          COV: 'Volatile organic compounds'
        }
      }
    },
    tags: [
      'lab', 'measure'
    ],
    attribution: 'Global Smart Rescue',
    type: 'OverlayLayer',
    service: 'lab-measurements',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    ttl: 7 * 24 * 60 * 60,
    featureId: 'measureUuid',
    chronicleId: ['stationId', 'sensorId', 'sensorNumber'],
    from: 'P-7D',
    to: 'PT-30S',
    every: 'PT30S',
    queryFrom: 'PT-6H',
    variables: [
      {
        name: 'bme_gas',
        label: 'Variables.COV',
        unit: 'ug/m^3',
        range: [0, 1000],
        step: 5,
        chartjs: {
          backgroundColor: 'rgba(255, 99, 132, 128)',
          borderColor: 'rgb(255, 99, 132)',
          fill: false
        },
        chromajs: {
          scale: 'YlOrRd',
          domain: [0, 200]
        }
      }
    ],
    legend: {
      type: 'variables'
    },
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: false,
      minZoom: 8,
      cluster: { disableClusteringAtZoom: 18 },
      'marker-type': 'circleMarker',
      radius: 8,
      'stroke-width': 1,
      'stroke-color': 'black',
      'fill-opacity': 0.8,
      'fill-color': `<%= variables.bme_gas.colorScale(properties.bme_gas).hex() %>`,
      template: [
        'fill-color'
      ],
      tooltip: {
        template: `<%= properties.id + '/' + properties.sensorId %></br><% if (_.has(properties, 'bme_gas')) { %><%= Units.format(properties.bme_gas, 'ug/m^3') %><% }
                    if (_.has(feature, 'time.bme_gas')) { %></br><%= Time.format(feature.time.bme_gas, 'time.long') + ' - ' + Time.format(feature.time.bme_gas, 'date.short') %><% } %>`
      }
    },
    cesium: {
      type: 'geoJson',
      realtime: true,
      cluster: { pixelRange: 50 },
      'marker-symbol': 'marker',
      'marker-color': '#78c0f0',
      tooltip: {
        template: '<%= properties.id + \'/\' + properties.sensorId %>\n<% if (_.has(properties, \'bme_gas\')) { %><%= Units.format(properties.bme_gas, \'ug/m^3\') %><% }' +
                  'if (_.has(feature, \'time.bme_gas\')) { %>\n<%= Time.format(feature.time.bme_gas, \'time.long\') + \' - \' + Time.format(feature.time.bme_gas, \'date.short\') %><% } %>'
      }
    }
  }]
}
