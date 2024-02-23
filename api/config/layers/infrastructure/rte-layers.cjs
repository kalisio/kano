function createLegendSymbol (color) {
  return { 
    'media/KShape': {
      options: {
        shape: 'circle', radius: 10, color, icon: { 
          classes: 'fas fa-bolt', color: 'white', size: 10 
        }
      } 
    } 
  }
}

module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.RTE_GENERATION',
    description: 'Layers.RTE_GENERATION_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          RTE_GENERATION: 'Réseau RTE - Production Nucléaire',
          RTE_GENERATION_DESCRIPTION: 'Puissance injectée par les unités de production électrique'
        },
        Variables: {
          POWER: 'Puissance'
        },
        Sublegends: {
          ACTIVE_REACTOR: 'Réacteur actif',
          INACTIVE_REACTOR: 'Réacteur inactif'
        }
      },
      en: {
        Layers: {
          RTE_GENERATION: 'RTE network - Nuclear production',
          RTE_GENERATION_DESCRIPTION: 'Power delivered by electrical production units'
        },
        Variables: {
          POWER: 'Power'
        },
        Sublegends: {
          ACTIVE_REACTOR: 'Active reactor',
          INACTIVE_REACTOR: 'Inactive reactor'
        }
      }
    },
    tags: [
      'infrastructure', 'measure'
    ],
    legend: {
      type: 'symbols',
      label: 'Layers.RTE_GENERATION',
      content: {
        symbols: [
          { symbol: createLegendSymbol('green'), label: 'Sublegends.ACTIVE_REACTOR' },
          { symbol: createLegendSymbol('red'), label: 'Sublegends.INACTIVE_REACTOR' },
        ]
      }
    },
    attribution: "<a href='https://data.rte-france.com/'>RTE</a>",
    type: 'OverlayLayer',
    service: 'rte-generation',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'rte-units',
    featureId: 'eicCode',
    featureLabel: 'name',
    from: 'P-2Y',
    to: 'PT-1H',
    every: 'PT1H',
    queryFrom: 'PT-24H',
    variables: [
      {
        name: 'power',
        label: 'Variables.POWER',
        unit: 'MW',
        range: [0, 5000],
        step: 100,
        chartjs: {
          backgroundColor: 'rgba(11, 117, 169, 128)',
          borderColor: 'rgb(11, 117, 169)',
          fill: false
        }
      }
    ],
    // If we'd like add the unit active state to features
    processor: `<% if (_.has(properties, 'power')) properties.status = (properties.power > 50 ? 'active' : 'inactive') %>`,
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: true,
      minZoom: 6,
      minFeatureZoom: 6,
      cluster: {
        type: 'DonutCluster',
        maxClusterRadius: 1,
        // disableClusteringAtZoom: 10,
        // spiderfyOnMaxZoom: true,
        spiderfyDistanceMultiplier: 2,
        options: {
          // If we'd like to display the ratio between total power and current generation power
          /*
          key: 'name',
          sumField: 'power',
          totalField: 'netPower_MW',
          //textClassName: 'donut-text',
          textContent: 'count',
          //legendClassName: 'donut-legend',
          legendContent: 'value',
          arcColorDict: ['#238b45'],
          style: {
            size: 40,
            fill: '#99d8c9',
            opacity: 1,
            weight: 7
          },
          */
          // If we'd like to display the ratio between active/inactive units
          key: 'status',
          textTemplate: `<%= _.get(data, 'active.value', 0) %>/<%= sum %>`,
          hideLegend: true,
          title: { active: 'Actif', inactive: 'Inactif' },
          arcColorDict: { active: '#238b45', inactive: '#c61a09' },
          style: {
            size: 40,
            fill: '#99c0d8',
            opacity: 1,
            weight: 7
          }
        }
      },
      // If we'd like to color according to the unit power
      //'marker-color': '<%= chroma.scale(\'Greens\').domain([-1, 1])((properties.power || 0) / properties.netPower_MW).hex() %>',
      // If we'd like to color according to the unit active state
      style: {
        point: {        
          color: `<% if (properties.status === 'active') { %>green<% } else { %>red<% } %>`,
          opacity: 1,
          icon: {
            classes: 'fas fa-bolt',
            color: '#FFF'
          },
          stroke: {
            color: `<% if (properties.status === 'active') { %>green<% } else { %>red<% } %>`
          }
        }},
      template: ['style.point.color', 'style.point.stroke.color', 'style.point.stroke.width', 'style.point.icon.color'],
      popup: {
        pick: [
          'name'
        ]
      },
      tooltip: {
        template: `<% if (_.has(properties, 'power')) { %><%= properties.name + ': ' + Units.format(properties.power, 'MW') %></br>
                   <%= Time.format(feature.time, 'time.long') + ' - ' + Time.format(feature.time, 'date.short') %><% } %>`
      }
    },
    cesium: {
      type: 'geoJson',
      realtime: true,
      cluster: { pixelRange: 50 },
      'marker-symbol': 'charging-station',
      'marker-color': '#f1800e',
      popup: {
        pick: [
          'name'
        ]
      },
      tooltip: {
        template: '<% if (_.has(properties, \'power\')) { %><%= Units.format(properties.power, \'MW\') %>\n' +
                  '<%= Time.format(feature.time, \'time.long\') + \' - \' + Time.format(feature.time, \'date.short\') %><% } %>'
      }
    }
  }]
}
