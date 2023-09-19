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
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/vigicrues-icon.png',
    attribution: '',
    type: 'OverlayLayer',
    service: 'vigicrues-forecasts',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'vigicrues-sections',
    featureId: 'gid',
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
  },
  {
    name: 'Layers.HUBEAU',
    description: 'Layers.HUBEAU_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          HUBEAU: 'Hub\'Eau',
          HUBEAU_DESCRIPTION: 'Données hydrométriques'
        },
        Variables: {
          H: 'Niveau d\'eau',
          Q: 'Débit d\'eau',
          HP_RNN: 'Niveau d\'eau - Prévision RNN',
          HP_XGB: 'Niveau d\'eau - Prévision XGB'
        }
      },
      en: {
        Layers: {
          HUBEAU: 'Hub\'Eau',
          HUBEAU_DESCRIPTION: 'Hydrometric data'
        },
        Variables: {
          H: 'Water level',
          Q: 'Water rate',
          HP_RNN: 'Water level - RNN prediction',
          HP_XGB: 'Water level - XGB prediction'
        }
      }
    },
    tags: [
      'hydrography', 'measure'
    ],
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/hubeau-hydrometrie-icon.png',
    attribution: '',
    type: 'OverlayLayer',
    service: 'hubeau-observations',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'hubeau-stations',
    featureId: 'code_station',
    from: 'P-7D',
    to: 'PT-10M',
    every: 'PT10M',
    queryFrom: 'PT-30M',
    variables: [
      {
        name: 'H',
        label: 'Variables.H',
        units: [
          'm'
        ],
        range: [0, 10],
        step: 0.1,
        chartjs: {
          backgroundColor: 'rgba(63, 63, 191, 128)',
          borderColor: 'rgb(63, 63, 191)',
          fill: false
        }
      },
      {
        name: 'Q',
        label: 'Variables.Q',
        units: [
          'm3/s'
        ],
        range: [0, 1000],
        step: 10,
        chartjs: {
          backgroundColor: 'rgba(54, 162, 235, 128)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false
        }
      },
      {
        name: 'HP_RNN',
        label: 'Variables.HP_RNN',
        units: [
          'm'
        ],
        range: [0, 10],
        step: 0.1,
        runTimes: true,
        chartjs: {
          backgroundColor: 'rgba(65, 105, 225, 128)',
          borderColor: 'rgb(65, 105, 225)',
          fill: false,
          borderDash: [10, 10]
        }
      },
      {
        name: 'HP_XGB',
        label: 'Variables.HP_XGB',
        units: [
          'm'
        ],
        range: [0, 10],
        step: 0.1,
        runTimes: true,
        chartjs: {
          backgroundColor: 'rgba(65, 105, 225, 128)',
          borderColor: 'rgb(65, 105, 225)',
          fill: false,
          borderDash: [10, 10]
        }
      }
    ],
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: true,
      minZoom: 8,
      minFeatureZoom: 11,
      cluster: { disableClusteringAtZoom: 18 },
      'marker-color': `<% if (_.has(properties, 'H') || _.has(properties, 'Q') || _.has(feature, 'time.H') || _.has(feature, 'time.Q')) { %>#00a9ce<% }
                          else if (feature.measureRequestIssued) { %>orange<% }
                          else { %>grey<% } %>`,
      'icon-color': 'white',
      'icon-classes': 'fa fa-tint',
      'icon-x-offset': 1,
      template: ['marker-color'],
      popup: {
        pick: [
          'name'
        ]
      },
      tooltip: {
        template: `<% if (_.has(properties, 'H')) { %>H = <%= Units.format(properties.H, 'm', 'm') %></br><% }
                   if (_.has(feature, 'time.H')) { %><%= Time.format(feature.time.H, 'time.long') + ' - ' + Time.format(feature.time.H, 'date.short') %></br><% }
                   if (_.has(properties, 'Q')) { %>Q = <%= Units.format(properties.Q, 'm^3/s') %></br><% }
                   if (_.has(feature, 'time.Q')) { %><%= Time.format(feature.time.Q, 'time.long') + ' - ' + Time.format(feature.time.Q, 'date.short') %></br><% } %>`
      }
    },
    cesium: {
      type: 'geoJson',
      realtime: true,
      cluster: { pixelRange: 50 },
      'marker-symbol': 'water',
      'marker-color': '#00a9ce',
      popup: {
        pick: [
          'name'
        ]
      },
      tooltip: {
        template: '<% if (_.has(properties, \'H\')) { %>H = <%= Units.format(properties.H, \'m\', \'m\') %>\n<% }' +
                  'if (_.has(feature, \'time.H\')) { %><%= Time.format(feature.time.H, \'time.long\') + \' - \' + Time.format(feature.time.H, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'Q\')) { %>Q = <%= Units.format(properties.Q, \'m^3/s\') %>\n<% }' +
                  'if (_.has(feature, \'time.Q\')) { %><%= Time.format(feature.time.Q, \'time.long\') + \' - \' + Time.format(feature.time.Q, \'date.short\') %>\n<% } %>'
      }
    }
  },
  {
    name: 'Layers.OPENAQ',
    description: 'Layers.OPENAQ_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OPENAQ: 'OpenAQ',
          OPENAQ_DESCRIPTION: 'Données de Qualité de l\'air'
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
          OPENAQ_DESCRIPTION: 'Air quality data'
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
        units: [
          'µg/m³'
        ],
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
        units: [
          'µg/m³'
        ],
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
        units: [
          'ppm'
        ],
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
        units: [
          'ppm'
        ],
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
        units: [
          'ppm'
        ],
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
        units: [
          'ppm'
        ],
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
        units: [
          'µg/m³'
        ],
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
      'marker-color': `<% if (_.has(properties, 'pm25') ||
                              _.has(properties, 'pm10') ||
                              _.has(properties, 'so2') ||
                              _.has(properties, 'no2') ||
                              _.has(properties, 'o3') ||
                              _.has(properties, 'co') ||
                              _.has(properties, 'bc')) { %>blue<% }
                        else if (feature.measureRequestIssued) { %>orange<% }
                        else { %>grey<% } %>`,
      'icon-color': 'white',
      'icon-classes': 'fa fa-heartbeat',
      'icon-x-offset': -2,
      template: ['marker-color'],
      popup: {
        pick: [
          'location'
        ]
      },
      tooltip: {
        template: `<% if (_.has(properties, 'pm25')) { %>PM2.5 = <%= Units.format(properties.pm25, 'µg/m³') %></br><% }
                   if (_.has(feature, 'time.pm25')) { %><%= Time.format(feature.time.pm25, 'time.long') + ' - ' + Time.format(feature.time.pm25, 'date.short') %></br><% }
                   if (_.has(properties, 'pm10')) { %>PM10 = <%= Units.format(properties.pm10, 'µg/m³') %></br><% }
                   if (_.has(feature, 'time.pm10')) { %><%= Time.format(feature.time.pm10, 'time.long') + ' - ' + Time.format(feature.time.pm10, 'date.short') %></br><% }
                   if (_.has(properties, 'so2')) { %>SO2 = <%= Units.format(properties.so2, 'ppm') %></br><% }
                   if (_.has(feature, 'time.so2')) { %><%= Time.format(feature.time.so2, 'time.long') + ' - ' + Time.format(feature.time.so2, 'date.short') %></br><% }
                   if (_.has(properties, 'no2')) { %>NO2 = <%= Units.format(properties.no2, 'ppm') %></br><% }
                   if (_.has(feature, 'time.no2')) { %><%= Time.format(feature.time.no2, 'time.long') + ' - ' + Time.format(feature.time.no2, 'date.short') %></br><% }
                   if (_.has(properties, 'o3')) { %>O3 = <%= Units.format(properties.o3, 'ppm') %></br><% }
                   if (_.has(feature, 'time.o3')) { %><%= Time.format(feature.time.o3, 'time.long') + ' - ' + Time.format(feature.time.o3, 'date.short') %></br><% }
                   if (_.has(properties, 'co')) { %>CO = <%= Units.format(properties.co, 'ppm') %></br><% }
                   if (_.has(feature, 'time.co')) { %><%= Time.format(feature.time.co, 'time.long') + ' - ' + Time.format(feature.time.co, 'date.short') %></br><% }
                   if (_.has(properties, 'bc')) { %>BC = <%= Units.format(properties.bc, 'µg/m³') %></br><% }
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
        template: '<% if (_.has(properties, \'pm25\')) { %>PM2.5 = <%= Units.format(properties.pm25, \'µg/m³\') %>\n<% }' +
                  'if (_.has(feature, \'time.pm25\')) { %><%= Time.format(feature.time.pm25, \'time.long\') + \' - \' + Time.format(feature.time.pm25, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'pm10\')) { %>PM10 = <%= Units.format(properties.pm10, \'µg/m³\') %>\n<% }' +
                  'if (_.has(feature, \'time.pm10\')) { %><%= Time.format(feature.time.pm10, \'time.long\') + \' - \' + Time.format(feature.time.pm10, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'so2\')) { %>SO2 = <%= Units.format(properties.so2, \'ppm\') %>\n<% }' +
                  'if (_.has(feature, \'time.so2\')) { %></br><%= Time.format(feature.time.so2, \'time.long\') + \' - \' + Time.format(feature.time.so2, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'no2\')) { %>NO2 = <%= Units.format(properties.no2, \'ppm\') %>\n<% }' +
                  'if (_.has(feature, \'time.no2\')) { %></br><%= Time.format(feature.time.no2, \'time.long\') + \' - \' + Time.format(feature.time.no2, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'o3\')) { %>O3 = <%= Units.format(properties.o3, \'ppm\') %>\n<% }' +
                  'if (_.has(feature, \'time.o3\')) { %></br><%= Time.format(feature.time.o3, \'time.long\') + \' - \' + Time.format(feature.time.o3, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'co\')) { %>CO = <%= Units.format(properties.co, \'ppm\') %>\n<% }' +
                  'if (_.has(feature, \'time.co\')) { %></br><%= Time.format(feature.time.co, \'time.long\') + \' - \' + Time.format(feature.time.co, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'bc\')) { %>BC = <%= Units.format(properties.bc, \'µg/m³\') %>\n<% }' +
                  'if (_.has(feature, \'time.bc\')) { %></br><%= Time.format(feature.time.bc, \'time.long\') + \' - \' + Time.format(feature.time.bc, \'date.short\') %>\n<% } %>'
      }
    }
  },
  {
    name: 'Layers.TELERAY',
    description: 'Layers.TELERAY_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          TELERAY: 'Téléray',
          TELERAY_DESCRIPTION: 'Débit de dose gamma ambiant'
        },
        Variables: {
          GAMMA_DOSE_RATE: 'Débit de dose gamma ambiant'
        }
      },
      en: {
        Layers: {
          TELERAY: 'Téléray',
          TELERAY_DESCRIPTION: 'Gamma dose rate'
        },
        Variables: {
          GAMMA_DOSE_RATE: 'Ambient gamma dose rate'
        }
      }
    },
    tags: [
      'radioactivity', 'measure'
    ],
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/teleray-icon.jpg',
    attribution: '',
    type: 'OverlayLayer',
    service: 'teleray-measurements',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'teleray-sensors',
    featureId: 'irsnId',
    featureIdType: 'number',
    featureLabel: 'name',
    from: 'P-7D',
    to: 'PT-10M',
    every: 'PT10M',
    queryFrom: 'PT-1H',
    variables: [
      {
        name: 'value',
        label: 'Variables.GAMMA_DOSE_RATE',
        units: [
          'nSv/h'
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
      minZoom: 6,
      minFeatureZoom: 9,
      cluster: { disableClusteringAtZoom: 18 },
      'marker-color': `<% if (properties.libelle === 'VA') { %>#138dce<% }
                          else if (properties.visibility === 'NV') { %>grey<% }
                          else if (feature.measureRequestIssued) { %>orange<% }
                          else { %>grey<% } %>`,
      'icon-classes': 'fa fa-radiation',
      'icon-x-offset': -2,
      'icon-color': '#FFF',
      template: ['marker-color'],
      popup: {
        pick: [
          'name'
        ]
      },
      tooltip: {
        template: `<% if (_.has(properties, 'value')) { %><%= Units.format(properties.value, 'nSv/h') %></br>
                   <%= Time.format(properties.measureDateFormatted, 'time.long') + ' - ' + Time.format(properties.measureDateFormatted, 'date.short') %><% } %>`
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
          'name'
        ]
      },
      tooltip: {
        template: '<% if (_.has(properties, \'value\')) { %><%= Units.format(properties.value, \'nSv/h\') %>\n' +
                  '<%= Time.format(properties.measureDateFormatted, \'time.long\') + \' - \' + Time.format(properties.measureDateFormatted, \'date.short\') %><% } %>'
      }
    }
  },
  {
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
    iconUrl: 'statics/openradiation-logo.png',
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
      'marker-color': '#78c0f0',
      'icon-color': 'white',
      'icon-classes': 'fa fa-radiation-alt',
      'icon-x-offset': -1,
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
  },
  {
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
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/icos-icon.png',
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
      'marker-color': `<% if (_.has(properties, 'rn') ||
                              _.has(properties, 'co') ||
                              _.has(properties, 'co2') ||
                              _.has(properties, 'ch4')) { %>#138dce<% }
                          else if (feature.measureRequestIssued) { %>orange<% }
                          else { %>grey<% } %>`,
      'icon-classes': 'fas fa-ellipsis-v',
      'icon-x-offset': 4,
      'icon-y-offset': 2,
      'icon-color': '#FFF',
      template: ['marker-color'],
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
