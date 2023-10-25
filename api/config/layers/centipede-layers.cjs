module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.CENTIPEDE',
    description: 'Layers.CENTIPEDE_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          CENTIPEDE: 'Bases Centipede RTK',
          CENTIPEDE_DESCRIPTION: 'Bases du réseau Centipede RTK'
        },
        Variables: {
          ping: 'Status'
        },
        Sublegend: {
          VERIFIED_BASES: 'Bases vérifiées',
          BASES_BEING_VERIFIED: 'Bases en cours de vérification',
          INACTIVE_BASES: 'Bases inactives'
        }
      },
      en: {
        Layers: {
          CENTIPEDE: 'Centipede RTK\'s bases',
          CENTIPEDE_DESCRIPTION: 'Centipede RTK network bases'
        },
        Variables: {
          ping: 'Status'
        },
        Sublegend: {
          VERIFIED_BASES: 'Verified bases',
          BASES_BEING_VERIFIED: 'Bases being verified',
          INACTIVE_BASES: 'Inactive bases'
        }
      }
    },
    tags: [
      'infrastructure'
    ],
    attribution: "<a href='https://docs.centipede.fr/'>Centipede</a>",
    type: 'OverlayLayer',
    service: 'centipede-pings',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'centipede-bases',
    featureId: 'id',
    featureIdType: 'number',
    featureLabel: 'name',
    from: 'P-7D',
    to: 'PT-15M',
    every: 'PT5M',
    queryFrom: 'PT-12H',
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
    legend: {
      type: 'symbols',
      label: 'Layers.CENTIPEDE_DESCRIPTION',
      content: {
        symbols: [
          { symbol: { 'media/KShape': { type: 'rect', color: '#78b955' } }, label: 'Sublegend.VERIFIED_BASES' },
          { symbol: { 'media/KShape': { type: 'rect', color: '#d6bf3a' } }, label: 'Sublegend.BASES_BEING_VERIFIED' },
          { symbol: { 'media/KShape': { type: 'rect', color: '#f76454' } }, label: 'Sublegend.INACTIVE_BASES' }
        ]
      }
    },
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: true,
      minZoom: 6,
      'icon-classes': 'fa fa-map-pin',
      'icon-x-offset': 2,
      'marker-color': `<% if (properties.ping === 2 ) { %>#78b955<% } 
        else if (properties.ping === 1 ) { %>#d6bf3a<% }
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
        template: '<%= properties.name %>'
      }
    }
  },
  {
    name: 'Layers.CENTIPEDE_BUFFER',
    description: 'Layers.CENTIPEDE_BUFFER_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          CENTIPEDE_BUFFER: 'Couverture Centipede RTK',
          CENTIPEDE_BUFFER_DESCRIPTION: 'Centipede RTK network'
        }
      },
      en: {
        Layers: {
          CENTIPEDE_BUFFER: 'Centipede RTK\'s coverage',
          CENTIPEDE_BUFFER_DESCRIPTION: 'Centipede RTK network'
        }
      }
    },
    tags: [
      'infrastructure'
    ],
    attribution: "<a href='https://docs.centipede.fr/'>Centipeded/a>",
    type: 'OverlayLayer',
    leaflet: {
      type: 'kanvasLayer',
      userData: {
        radius: 50 // radius in km around centipede antennas
      },
      draw: [{
        layer: 'Layers.CENTIPEDE', // attached to Layers.CENTIPEDE geojson layer
        code: `
          const props = ctx.feature.properties

          // only draw buffer around antennas with ping === 2
          if (props.ping !== 2) return

          // feature position => buffer center
          const coords0 = {
            lat: ctx.feature.geometry.coordinates[1],
            lon: ctx.feature.geometry.coordinates[0]
          }
          // move 50km north from feature position => buffer border
          const border = ctx.turf.destination(ctx.feature.geometry, ctx.userData.radius, 0, { units: 'kilometers' })
          const coords1 = {
            lat: border.geometry.coordinates[1],
            lon: border.geometry.coordinates[0]
          }

          // project in canvas space
          const pos0 = ctx.latLonToCanvas(coords0)
          const pos1 = ctx.latLonToCanvas(coords1)
          const radius = ctx.len2(ctx.vec2(pos1, pos0))
          // build gradient to fill buffer
          const gradient = ctx.canvas.createRadialGradient(pos0.x, pos0.y, 5, pos0.x, pos0.y, radius)
          gradient.addColorStop(0, '#A7D49B80')
          gradient.addColorStop(1, '#A7D49B20')

          // draw buffer filled with gradient + stroked border
          ctx.canvas.beginPath()
          ctx.canvas.arc(pos0.x, pos0.y, radius, 0, 2 * ctx.Math.PI)
          ctx.canvas.fillStyle = gradient
          ctx.canvas.fill()
          // ctx.canvas.strokeStyle = '#92AC86'
          // ctx.canvas.stroke()
          `
      }]
    }
  }]
}

