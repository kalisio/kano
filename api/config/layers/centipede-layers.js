module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.CENTIPEDE',
    description: 'Layers.CENTIPEDE_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          CENTIPEDE: 'Centipede RTK',
          CENTIPEDE_DESCRIPTION: 'Centipede RTK network'
        },
        Variables: {
          ping: 'Status'
        }
      },
      en: {
        Layers: {
          CENTIPEDE: 'Centipede RTK',
          CENTIPEDE_DESCRIPTION: 'Centipede RTK network'
        },
        Variables: {
          ping: 'Status'
        }
      }
    },
    tags: [
      'infrastructure'
    ],
    attribution: "<a href='https://openradiation.org'>OpenRadiation</a>",
    type: 'OverlayLayer',
    service: 'centipede-pings',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'centipede-bases',
    featureId: 'id',
    featureIdType: 'number',  
    from: 'P-7D',
    to: 'PT-15M',
    every: 'PT5M',
    queryFrom: 'PT-1H',
    variables: [
      {
        name: 'ping',
        label: 'Variables.ping',
        units: [
          '0: nok | 1: no info | 2: ok'
        ],
        range: [0, 1],
        step: 1,
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
      //'marker-type': 'circleMarker',
      //radius: 6,
      'icon-classes': 'fa fa-map-pin',
      'icon-x-offset': 2,
      'marker-color': `<% if (properties.ping && properties.ping === 2 ) { %>#78b955<% } 
        else if (properties.ping && properties.ping === 1 ) { %>#d6bf3a<% }
        else { %>#f76454<% } %>`,
      cluster: { disableClusteringAtZoom: 18 },
      template: ['marker-color'],
      popup: {
        pick: [
          'properties.name'
        ]
      },
      tooltip: {
        template: '<%= properties.name %>'
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
        template: '<% if (properties.value) { %>Valeur = <%= properties.value.toFixed(2) %> µSv/h<% } %>'
      }
    }
  }]
}