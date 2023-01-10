module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.RTE_GENERATION',
    description: 'Layers.RTE_GENERATION_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          RTE_GENERATION: 'Réseau RTE',
          RTE_GENERATION_DESCRIPTION: 'Puissance injectées par les unités de production électrique'
        },
        Variables: {
          POWER: 'Puissance'
        }
      },
      en: {
        Layers: {
          RTE_GENERATION: 'RTE network',
          RTE_GENERATION_DESCRIPTION: 'Power delivered by electrical production units'
        },
        Variables: {
          POWER: 'Power'
        }
      }
    },
    tags: [
      'infrastructure', 'measure'
    ],
    attribution: "<a href='https://data.rte-france.com/'>RTE</a>",
    type: 'OverlayLayer',
    service: 'rte-generation',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'rte-units',
    featureId: 'eicCode',
    from: 'P-2Y',
    to: 'PT-1H',
    every: 'PT1H',
    queryFrom: 'PT-24H',
    variables: [
      {
        name: 'power',
        label: 'Variables.POWER',
        units: [
          'MW'
        ],
        range: [0, 5000],
        step: 100,
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
      minFeatureZoom: 6,
      cluster: {
        type: 'DonutCluster',
        maxClusterRadius: 1,
        // disableClusteringAtZoom: 10,
        // spiderfyOnMaxZoom: true,
        spiderfyDistanceMultiplier: 2,
        options: {
          key: 'name',
          sumField: 'power',
          totalField: 'netPower_MW',
          style: {
            size: 40,
            fill: '#99d8c9',
            opacity: 1,
            weight: 7
          },
          //textClassName: 'donut-text',
          textContent: 'count',
          //legendClassName: 'donut-legend',
          legendContent: 'value',
          arcColorDict: ['#238b45']
        }
      },
      'marker-color': '<%= chroma.scale(\'Greens\').domain([-1, 1])((properties.power || 0) / properties.netPower_MW).hex() %>',
      'icon-classes': 'fas fa-bolt',
      'icon-x-offset': 2,
      'icon-color': '#FFF',
      template: ['marker-color'],
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