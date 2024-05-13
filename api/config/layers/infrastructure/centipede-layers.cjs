function createLegendSymbol (color) {
  return { 
    'media/KShape': { 
      options: {
        shape: 'circle', radius: 10, color, icon: { 
          classes: 'fa fa-map-pin', color: 'white', size: 10 
        }
      }
    } 
  }
}

module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.CENTIPEDE',
    description: 'Layers.CENTIPEDE_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          CENTIPEDE: 'Centipede RTK',
          CENTIPEDE_DESCRIPTION: 'Status du réseau Centipede RTK'
        },
        Legend: {
          CENTIPEDE_PINGS_LABEL: 'Centipède RTK - Statut des bases',
          CENTIPEDE_VERIFIED_BASES: 'Bases vérifiées',
          CENTIPEDE_BASES_BEING_VERIFIED: 'Bases en cours de vérification',
          CENTIPEDE_INACTIVE_BASES: 'Bases inactives',
          CENTIPEDE_OLD_PING: 'Status daté de plus de 6 heures',
          CENTIPEDE_BASES_LABEL: 'Réseau Centipède RTK - Bases',          
          CENTIPEDE_BASE: 'Base'
        },
        Variables: {
          CENTIPEDE_PING: 'Statut'
        }
      },
      en: {
        Layers: {
          CENTIPEDE: 'Centipede RTK',
          CENTIPEDE_DESCRIPTION: 'Centipede RTK network status'
        },
        Legend: {
          CENTIPEDE_PINGS_LABEL: 'Centipède RTK - Status of bases',
          CENTIPEDE_VERIFIED_BASES: 'Verified bases',
          CENTIPEDE_BASES_BEING_VERIFIED: 'Bases being verified',
          CENTIPEDE_INACTIVE_BASES: 'Inactive bases',
          CENTIPEDE_OLD_PING: 'Ping dated more than 6 hours ago',
          CENTIPEDE_BASES_LABEL: 'Centipède RTK Network - Bases',
          CENTIPEDE_BASE: 'Base'
        },
        Variables: {
          CENTIPEDE_PING: 'Status'
        }
      }
    },
    tags: [
      'infrastructure'
    ],
    legend: [{
      type: 'symbols',
      label: 'Legend.CENTIPEDE_PINGS_LABEL',
      minZoom: 9,
      content: {
        pings: [
          { symbol: createLegendSymbol('#78b955'), label: 'Legend.CENTIPEDE_VERIFIED_BASES' },
          { symbol: createLegendSymbol('#d6bf3a'), label: 'Legend.CENTIPEDE_BASES_BEING_VERIFIED' },
          { symbol: createLegendSymbol('#f76454'), label: 'Legend.CENTIPEDE_INACTIVE_BASES' }
        ],
        exceptions: [
          { symbol: createLegendSymbol('black'), label: 'Legend.CENTIPEDE_OLD_PING' }
        ],
      }
    }, {
      type: 'symbols',
      label: 'Legend.CENTIPEDE_BASES_LABEL',
      maxZoom: 8,
      content: {
        bases: [
          { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'white', radius: 10, stroke: { color: 'black', width: 2 }, icon: { classes: 'fa fa-map-pin', color: 'black', size: 10 } } } },
            label: 'Legend.CENTIPEDE_BASE' }
        ]
      }
    }],
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
    queryFrom: 'PT-6H',
    variables: [
      {
        name: 'ping',
        label: 'Variables.CENTIPEDE_PING',
        unit: '0: nok | 1: no info | 2: ok',
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
      minZoom: 6,
      minFeatureZoom: 9,
      cluster: { 
        maxClusterRadius: 28,
        disableClusteringAtZoom: 18 
      },
      style: {
        point: {
          shape: 'circle',
          radius: 15,
          opacity: 1,
          color: `<% if (properties.ping === 2 ) { %>#78b955<% } 
                    else if (properties.ping === 1 ) { %>#d6bf3a<% }
                    else if (properties.ping === 0 ) { %>#f76454<% }
                    else if (feature.measureRequestIssued) { %>black<% }
                    else { %>white<% } %>`,
          stroke: {
            color:  `<% if (_.has(properties, 'ping')) { %>transparent<% }
                      else if (feature.measureRequestIssued) { %>white<% }
                      else { %>black<% } %>`,
            width: `<% if (_.has(properties, 'ping')) { %>0<% }
                      else if (feature.measureRequestIssued) { %>1<% }
                      else { %>2<% } %>`,   
          },
          icon: {
            color: `<% if (_.has(properties, 'ping')) { %>white<% }
                      else if (feature.measureRequestIssued) { %>white<% }
                      else { %>black<% } %>`,
            classes: 'fa fa-map-pin'
          }
        }
      },
      template: ['style.point.color', 'style.point.stroke.color', 'style.point.stroke.width', 'style.point.icon.color'],
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
          CENTIPEDE_BUFFER_DESCRIPTION: 'Couverture du réseau Centipède RTK'
        },
        Legend: {
          CENTIPEDE_BUFFER_LABEL: 'Centipède RTK - Couverture du réseau',
          CENTIPEDE_BUFFER_SYMBOL_LABEL: 'Counverture du réseau'
        }
      },
      en: {
        Layers: {
          CENTIPEDE_BUFFER: 'Centipede RTK\'s coverage',
          CENTIPEDE_BUFFER_DESCRIPTION: 'Centipede RTK network converage'
        },
        Legend: {
          CENTIPEDE_BUFFER_LABEL: 'Centipède RTK - Network coverage',
          CENTIPEDE_BUFFER_SYMBOL_LABEL: 'Network coverage'
        }
      }
    },
    tags: [
      'infrastructure'
    ],
    legend: [{
      type: 'symbols',
      label: 'Legend.CENTIPEDE_BUFFER_LABEL',
      minZoom: 9,
      content: {
        buffer: [
          { symbol: { 'media/KShape': { options: { shape: 'circle', radius: 10, color: '#A7D49B80' } } },
            label: 'Legend.CENTIPEDE_BUFFER_SYMBOL_LABEL' 
          }
        ]
      }
    }],
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

