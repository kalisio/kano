module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.HUBEAU_HYDRO',
    description: 'Layers.HUBEAU_HYDRO_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          HUBEAU_HYDRO: 'Hub\'Eau (hydro)',
          HUBEAU_HYDRO_DESCRIPTION: 'Données hydrométriques'
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
          HUBEAU_HYDRO: 'Hub\'Eau (hydro)',
          HUBEAU_HYDRO_DESCRIPTION: 'Hydrometric data'
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
    service: 'hubeau-hydro-observations',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'hubeau-hydro-stations',
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
      minFeatureZoom: 12,
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
    name: 'Layers.HUBEAU_PIEZO',
    description: 'Layers.HUBEAU_PIEZO_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          HUBEAU_PIEZO: 'Hub\'Eau (piezo)',
          HUBEAU_PIEZO_DESCRIPTION: 'Données piézométriques'
        },
        Variables: {
          PN: 'Profondeur de la nappe',
          NEN: 'Niveau de la nappe (cote NGF)'
        }
      },
      en: {
        Layers: {
          HUBEAU_PIEZO: 'Hub\'Eau (piezo)',
          HUBEAU_PIEZO_DESCRIPTION: 'Piezometric data'
        },
        Variables: {
          PN: 'Phreatic zone depth',
          NEN: 'Zone height (NGF)'
        }
      }
    },
    tags: [
      'hydrography', 'measure'
    ],
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/hubeau-hydrometrie-icon.png',
    attribution: '',
    type: 'OverlayLayer',
    service: 'hubeau-piezo-observations',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'hubeau-piezo-stations',
    featureId: 'bss_id',
    from: 'P-7D',
    to: 'PT-10M',
    every: 'PT1H',
    queryFrom: 'PT-2H',
    variables: [
      {
        name: 'profondeur_nappe',
        label: 'Variables.PN',
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
        name: 'niveau_eau_ngf',
        label: 'Variables.NEN',
        units: [
          'm'
        ],
        range: [0, 1000],
        step: 10,
        chartjs: {
          backgroundColor: 'rgba(54, 162, 235, 128)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false
        }
      }
    ],
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: true,
      minZoom: 8,
      minFeatureZoom: 12,
      cluster: { disableClusteringAtZoom: 18 },
      'marker-color': `<% if (_.has(properties, 'niveau_eau_ngf') || _.has(properties, 'profondeur_nappe') || _.has(feature, 'time.niveau_eau_ngf') || _.has(feature, 'time.profondeur_nappe')) { %>#00a9ce<% }
                          else if (feature.measureRequestIssued) { %>orange<% }
                          else { %>grey<% } %>`,
      'icon-color': 'white',
      'icon-classes': 'fa fa-tint',
      'icon-x-offset': 1,
      template: ['marker-color'],
      popup: {
        pick: [
          'libelle_pe',
          'bss_id'
        ]
      },
      tooltip: {
        template: `<% if (_.has(properties, 'profondeur_nappe')) { %>H = <%= Units.format(properties.profondeur_nappe, 'm', 'm') %></br><% }
                   if (_.has(feature, 'time.profondeur_nappe')) { %><%= Time.format(feature.time.profondeur_nappe, 'time.long') + ' - ' + Time.format(feature.time.profondeur_nappe, 'date.short') %></br><% }
                   if (_.has(properties, 'niveau_eau_ngf')) { %>Q = <%= Units.format(properties.niveau_eau_ngf, 'm') %></br><% }
                   if (_.has(feature, 'time.niveau_eau_ngf')) { %><%= Time.format(feature.time.niveau_eau_ngf, 'time.long') + ' - ' + Time.format(feature.time.niveau_eau_ngf, 'date.short') %></br><% } %>`
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
          'libelle_pe',
          'bss_id'
        ]
      },
      tooltip: {
        template: '<% if (_.has(properties, \'profondeur_nappe\')) { %>H = <%= Units.format(properties.profondeur_nappe, \'m\', \'m\') %>\n<% }' +
                  'if (_.has(feature, \'time.profondeur_nappe\')) { %><%= Time.format(feature.time.profondeur_nappe, \'time.long\') + \' - \' + Time.format(feature.time.profondeur_nappe, \'date.short\') %>\n<% }' +
                  'if (_.has(properties, \'niveau_eau_ngf\')) { %>Q = <%= Units.format(properties.niveau_eau_ngf, \'m\') %>\n<% }' +
                  'if (_.has(feature, \'time.niveau_eau_ngf\')) { %><%= Time.format(feature.time.niveau_eau_ngf, \'time.long\') + \' - \' + Time.format(feature.time.niveau_eau_ngf, \'date.short\') %>\n<% } %>'
      }
    }
  }]
}
