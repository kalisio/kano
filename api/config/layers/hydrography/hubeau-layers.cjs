module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.HUBEAU_HYDRO',
    description: 'Layers.HUBEAU_HYDRO_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          HUBEAU_HYDRO: 'Hub\'Eau Hydrométrie',
          HUBEAU_HYDRO_DESCRIPTION: 'Observations hydrométriques'
        },
        Legend: {
          HUBEAU_HYDRO_OBSERVATIONS_LABEL: 'Hub\'Eau - Observations',
          HUBEAU_HYDRO_STATIONS_LABEL: 'Hub\'Eau - Stations',
          HUBEAU_HYDRO_MEASUREMENT: 'Dernière mesure : Hauteur d\'eau (H) / Débit (Q)',
          HUBEAU_HYDRO_OLD_MEASUREMENT: 'Mesure datée de plus de 30 minutes',
          HUBEAU_HYDRO_STATION: 'Station'
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
          HUBEAU_HYDRO: 'Hub\'Eau Hydrometry',
          HUBEAU_HYDRO_DESCRIPTION: 'Hydrometric observations'
        },
        Legend: {
          HUBEAU_HYDRO_OBSERVATIONS_LABEL: 'Hub\'Eau - Observations',
          HUBEAU_HYDRO_STATIONS_LABEL: 'Hub\'Eau - Stations',
          HUBEAU_HYDRO_MEASUREMENT: 'Last measurement: Water height (H) / Flow rate (Q)',
          HUBEAU_HYDRO_OLD_MEASUREMENT: 'Measurement dated more than 30 minutes ago',
          HUBEAU_HYDRO_STATION: 'Station'
        },
        Variables: {
          H: 'Water level',
          Q: 'Water flow rate',
          HP_RNN: 'Water level - RNN prediction',
          HP_XGB: 'Water level - XGB prediction'
        }
      }
    },
    tags: [
      'hydrography', 'measure'
    ],
    legend: [{
      type: 'symbols',
      label: 'Legend.HUBEAU_HYDRO_OBSERVATIONS_LABEL',
      minZoom: 11,
      content: {
        observations: [
          { symbol: { 'media/KShape': { options: { shape: 'circle', color: '#00a9ce', radius: 10, icon: { classes: 'fa fa-tint', color: 'white',  size: 10} } } }, 
            label: 'Legend.HUBEAU_HYDRO_MEASUREMENT' 
          }
        ],
        exceptions: [
          { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'black', radius: 10, icon: { classes: 'fa fa-tint', color: 'white', size: 10 } } } }, 
            label: 'Legend.HUBEAU_HYDRO_OLD_MEASUREMENT' 
          }
        ]
      }
    }, {
      type: 'symbols',
      label: 'Legend.HUBEAU_HYDRO_STATIONS_LABEL',
      maxZoom: 10,
      content: {
        stations: [
          { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'white', radius: 10, stroke: { color: 'black', width: 2 }, icon: { classes: 'fa fa-tint', color: 'black', size: 10 } } } }, 
            label: 'Legend.HUBEAU_HYDRO_STATION' 
          }
        ]
      }
    }],
    attribution: '',
    type: 'OverlayLayer',
    service: 'hubeau-hydro-observations',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'hubeau-hydro-stations',
    featureId: 'code_station',
    featureLabel: 'name',
    from: 'P-7D',
    to: 'PT-10M',
    every: 'PT10M',
    queryFrom: 'PT-30M',
    variables: [
      {
        name: 'H',
        label: 'Variables.H',
        unit: 'm',
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
        unit: 'm^3/s',
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
        unit: 'm',
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
        unit: 'm',
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
      cluster: { 
        maxClusterRadius: 40,
        disableClusteringAtZoom: 18 
      },
      style: {
        point: {
          marker: 'circle',
          radius: 15,
          opacity: 1,
          color: `<% if (_.has(properties, 'H') || _.has(properties, 'Q') || _.has(feature, 'time.H') || _.has(feature, 'time.Q')) { %>#00a9ce<% }
                    else if (feature.measureRequestIssued) { %>black<% }
                    else { %>white<% } %>`,
          stroke: {
            color: `<% if (_.has(properties, 'H') || _.has(properties, 'Q') || _.has(feature, 'time.H') || _.has(feature, 'time.Q')) { %>transparent<% }
                      else if (feature.measureRequestIssued) { %>white<% }
                      else { %>black<% } %>`,
            width: 2
          },
          icon: {
            color: `<% if (_.has(properties, 'H') || _.has(properties, 'Q') || _.has(feature, 'time.H') || _.has(feature, 'time.Q'))  { %>white<% }
                      else if (feature.measureRequestIssued) { %>white<% }
                      else { %>black<% } %>`,
            classes: 'fas fa-tint',
          }
        }
      },
      template: ['style.point.color', 'style.point.stroke.color', 'style.point.icon.color', 'style.point.text.label'],
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
          HUBEAU_PIEZO: 'Hub\'Eau Piezométrie',
          HUBEAU_PIEZO_DESCRIPTION: 'Données piézométriques'
        },
        Variables: {
          PN: 'Profondeur de la nappe',
          NEN: 'Niveau de la nappe (cote NGF)'
        }
      },
      en: {
        Layers: {
          HUBEAU_PIEZO: 'Hub\'Eau Piezometry',
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
    to: 'PT-6H',
    every: 'PT1H',
    queryFrom: 'PT-12H',
    variables: [
      {
        name: 'profondeur_nappe',
        label: 'Variables.PN',
        unit: 'm',
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
        unit: 'm',
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
      minFeatureZoom: 11,
      cluster: { disableClusteringAtZoom: 18 },
      'marker-type': 'shapeMarker',
      'marker-fill': `<% if (_.has(properties, 'niveau_eau_ngf') || _.has(properties, 'profondeur_nappe') || _.has(feature, 'time.niveau_eau_ngf') || _.has(feature, 'time.profondeur_nappe')) { %>#00a9ce<% }
                          else if (feature.measureRequestIssued) { %>orange<% }
                          else { %>grey<% } %>`,
      'icon-color': 'white',
      'icon-classes': 'fa fa-tint',
      template: ['marker-fill'],
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
