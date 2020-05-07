module.exports = function ({ wmtsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [
  {
    name: 'Layers.VIGICRUES',
    description: 'Layers.VIGICRUES_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          VIGICRUES: 'Vigicrues',
          VIGICRUES_DESCRIPTION: 'Carte de vigilance crues',
          VIGICRUES_LEVEL_1: 'Pas de vigilance particulière requise',
          VIGICRUES_LEVEL_2: 'Risque de crue génératrice de débordements',
          VIGICRUES_LEVEL_3: 'Risque de crue génératrice de débordements importants',
          VIGICRUES_LEVEL_4: 'Risque de crue majeure'
        }
      },
      en: {
        Layers: {
          VIGICRUES: 'Vigicrues',
          VIGICRUES_DESCRIPTION: 'Flooding warnings',
          VIGICRUES_LEVEL_1: 'No flood risk',
          VIGICRUES_LEVEL_2: 'Flood risk',
          VIGICRUES_LEVEL_3: 'Important flood risk',
          VIGICRUES_LEVEL_4: 'Major flood risk'
        }
      }
    },
    tags: [
      'measure'
    ],
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/vigicrues-icon.png',
    attribution: '',
    type: 'OverlayLayer',
    featureId: 'gid',
    service: 'vigicrues',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    from: 'PT-15M',
    to: 'PT-15M',
    every: 'PT15M',
    leaflet: {
      type: 'geoJson',
      realtime: true,
      popup: {
        pick: [
          'NomEntVigiCru'
        ]
      }
    },
    cesium: {
      type: 'geoJson',
      realtime: true,
      popup: {
        pick: [
          'NomEntVigiCru'
        ]
      }
    }
  },
  {
    name: 'Layers.HUBEAU',
    description: 'Layers.HUBEAU_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          HUBEAU: `Hub'Eau`,
          HUBEAU_DESCRIPTION: 'Données hydrométriques'
        },
        Variables: {
          H: `Niveau d'eau`,
          Q: `Débit d'eau`
        }
      },
      en: {
        Layers: {
          HUBEAU: `Hub'Eau`,
          HUBEAU_DESCRIPTION: 'Hydrometric data'
        },
        Variables: {
          H: 'Water level',
          Q: 'Water rate'
        }
      }
    },
    tags: [
      'measure'
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
      minZoom: 12,
      cluster: { disableClusteringAtZoom: 18 },
      'marker-color': '#00a9ce',
      'icon-color': 'white',
      'icon-classes': 'fa fa-tint',
      popup: {
        pick: [
          'name'
        ]
      },
      tooltip: {
        template: `<% if (properties.H) { %>H = <%= properties.H.toFixed(2) %> m</br><% }
                   if (feature.time && feature.time.H) { %><%= new Date(feature.time.H).toLocaleString() %></br><% }
                   if (properties.Q) { %>Q = <%= properties.Q.toFixed(2) %> m3/s</br><% }
                   if (feature.time && feature.time.Q) { %><%= new Date(feature.time.Q).toLocaleString() %></br><% } %>`
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
          'libelle_station'
        ]
      },
      tooltip: {
        template: `<% if (properties.H) { %>H = <%= properties.H.toFixed(2) %> m\n<% }
                   if (feature.time && feature.time.H) { %><%= new Date(feature.time.H).toLocaleString() %>\n<% }
                   if (properties.Q) { %>Q = <%= properties.Q.toFixed(2) %> m3/s\n<% }
                   if (feature.time && feature.time.Q) { %><%= new Date(feature.time.Q).toLocaleString() %>\n<% } %>`
      }
    }
  },
  {
    name: 'Layers.OPENAQ',
    description: 'Layers.OPENAQ_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OPENAQ: `OpenAQ`,
          OPENAQ_DESCRIPTION: `Pollution de l'air`
        },
        Variables: {
          PM10: 'Particules fines (< 10µm, PM10)',
          PM25: 'Particules fines (< 2.5µm, PM2.5)',
          SO2: 'Dioxyde de soufre (SO2)',
          CO: 'Monoxyde de carbone (CO)s',
          NO2: `Dioxyde d'azote (NO2)`,
          O3: 'Ozone (O3)',
          BC: 'Noir de carbone (BC)'
        }
      },
      en: {
        Layers: {
          OPENAQ: `OpenAQ`,
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
      'measure'
    ],
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/openaq-icon.png',
    attribution: '',
    type: 'OverlayLayer',
    service: 'openaq',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    featureId: 'location',
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
      minZoom: 10,
      cluster: { disableClusteringAtZoom: 18 },
      'marker-color': '#0B75A9',
      'icon-color': 'white',
      'icon-classes': 'fa fa-heartbeat',
      popup: {
        pick: [
          'location'
        ]
      },
      tooltip: {
        template: `<% if (properties.pm25) { %>PM2.5 = <%= properties.pm25.toFixed(2) %> µg/m³</br><% }
                   if (feature.time && feature.time.pm25) { %><%= new Date(feature.time.pm25).toLocaleString() %></br><% }
                   if (properties.pm10) { %>PM10 = <%= properties.pm10.toFixed(2) %> µg/m³</br><% }
                   if (feature.time && feature.time.pm10) { %><%= new Date(feature.time.pm10).toLocaleString() %></br><% }
                   if (properties.so2) { %>SO2 = <%= properties.so2.toFixed(2) %> ppm</br><% }
                   if (feature.time && feature.time.so2) { %><%= new Date(feature.time.so2).toLocaleString() %></br><% }
                   if (properties.no2) { %>NO2 = <%= properties.no2.toFixed(2) %> ppm</br><% }
                   if (feature.time && feature.time.no2) { %><%= new Date(feature.time.no2).toLocaleString() %></br><% }
                   if (properties.o3) { %>O3 = <%= properties.o3.toFixed(2) %> ppm</br><% }
                   if (feature.time && feature.time.o3) { %><%= new Date(feature.time.o3).toLocaleString() %></br><% }
                   if (properties.co) { %>CO = <%= properties.co.toFixed(2) %> ppm</br><% }
                   if (feature.time && feature.time.co) { %><%= new Date(feature.time.co).toLocaleString() %></br><% }
                   if (properties.bc) { %>BC = <%= properties.bc.toFixed(2) %> µg/m³</br><% }
                   if (feature.time && feature.time.bc) { %><%= new Date(feature.time.bc).toLocaleString() %></br><% } %>`
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
        template: `<% if (properties.pm25) { %>PM2.5 = <%= properties.pm25.toFixed(2) %> µg/m³\n<% }
                   if (feature.time && feature.time.pm25) { %><%= new Date(feature.time.pm25).toLocaleString() %>\n<% }
                   if (properties.pm10) { %>PM10 = <%= properties.pm10.toFixed(2) %> µg/m³\n<% }
                   if (feature.time && feature.time.pm10) { %><%= new Date(feature.time.pm10).toLocaleString() %>\n<% }
                   if (properties.so2) { %>SO2 = <%= properties.so2.toFixed(2) %> ppm\n<% }
                   if (feature.time && feature.time.so2) { %></br><%= new Date(feature.time.so2).toLocaleString() %>\n<% }
                   if (properties.no2) { %>NO2 = <%= properties.no2.toFixed(2) %> ppm\n<% }
                   if (feature.time && feature.time.no2) { %></br><%= new Date(feature.time.no2).toLocaleString() %>\n<% }
                   if (properties.o3) { %>O3 = <%= properties.o3.toFixed(2) %> ppm\n<% }
                   if (feature.time && feature.time.o3) { %></br><%= new Date(feature.time.o3).toLocaleString() %>\n<% }
                   if (properties.co) { %>CO = <%= properties.co.toFixed(2) %> ppm\n<% }
                   if (feature.time && feature.time.co) { %></br><%= new Date(feature.time.co).toLocaleString() %>\n<% }
                   if (properties.bc) { %>BC = <%= properties.bc.toFixed(2) %> µg/m³\n<% }
                   if (feature.time && feature.time.bc) { %></br><%= new Date(feature.time.bc).toLocaleString() %>\n<% } %>`
      }
    }
  },
  {
    name: 'Layers.TELERAY',
    description: 'Layers.TELERAY_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          TELERAY: `Téléray`,
          TELERAY_DESCRIPTION: `Débit de dose gamma ambiant`
        },
        Variables: {
          GAMMA_DOSE_RATE: 'Débit de dose gamma ambiant'
        }
      },
      en: {
        Layers: {
          TELERAY: `Téléray`,
          TELERAY_DESCRIPTION: 'Gamma dose rate'
        },
        Variables: {
          GAMMA_DOSE_RATE: 'Ambient gamma dose rate'
        }
      }
    },
    tags: [
      'measure'
    ],
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/teleray-icon.jpg',
    attribution: '',
    type: 'OverlayLayer',
    service: 'teleray-measurements',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'teleray-sensors',
    featureId: 'irsnId',
    featureIdType: 'number',
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
      'marker-color': `<% if (properties.libelle === 'VA') { %>darkblue<% }
                          else if (properties.visibility === 'NV') { %>orange<% }
                          else { %>dark<% } %>`,
      'icon-classes': `<% if (properties.libelle === 'VA') { %>fa fa-info-circle<% }
                          else if (properties.visibility === 'NV') { %>fa fa-question-circle<% }
                          else { %>fa fa-times-circle<% } %>`,
      'icon-color': '#FFF',
      template: ['marker-color', 'icon-classes'],
      popup: {
        pick: [
          'name'
        ]
      },
      tooltip: {
        template: `<% if (properties.value) { %>Dose = <%= properties.value.toFixed(2) %> nSv/h</br>
                   <%= new Date(properties.measureDateFormatted).toLocaleString() %><% } %>`
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
        template: `<% if (properties.value) { %>Dose = <%= properties.value.toFixed(2) %> nSv/h\n
                   <%= new Date(properties.measureDateFormatted).toLocaleString() %><% } %>`
      }
    }
  },
  {
    name: 'Layers.MAPILLARY',
    description: 'Layers.MAPILLARY_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          MAPILLARY: 'Mapillary',
          MAPILLARY_DESCRIPTION: 'Couverture des prises de vues'
        }
      },
      en: {
        Layers: {
          MAPILLARY: 'Mapillary',
          MAPILLARY_DESCRIPTION: 'Images coverage'
        }
      }
    },
    tags: [
      'captured'
    ],
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/mapillary-icon.jpg',
    attribution: 'Images from <a href="https://www.mapillary.com">Mapillary</a>, CC BY-SA',
    type: 'OverlayLayer',
    from: 'P-5Y',
    to: 'PT-0M',
    queryFrom: 'P-1Y',
    leaflet: {
      type: 'mapillary',
      url: 'https://a.mapillary.com',
      minZoom: 13,
      'stroke-color': '#40880a55',
      'stroke-width': 8
    }
  }]
}