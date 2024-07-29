module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
      name: 'Layers.EURDEP',
      description: 'Layers.EURDEP_DESCRIPTION',
      i18n: {
        fr: {
          Layers: {
            EURDEP: 'EURDEP',
            EURDEP_DESCRIPTION: 'Mesures du Réseau de détection de la radioactivité en Europe',
          },
          Legend: {
            EURDEP_MEASUREMENTS_LABEL: 'EURDEP - Mesures',
            EURDEP_PROBES_LABEL: 'EURDEP - Balises',
            EURDEP_OLD_MEASUREMENT: 'Mesure datée de plus de 1 heure',
            EURDEP_PROBE: 'Balise'
          },
          Variables: {
            EURDEP_GAMMA_DOSE_RATE: 'Débit de dose gamma ambiant'
          }
        },
        en: {
          Layers: {
            EURDEP: 'EURDEP',
            EURDEP_DESCRIPTION: 'Radioactivity detection networks in Europe measurements',
          },
          Legend: {
            EURDEP_MEASUREMENTS_LABEL: 'EURDEP - Measurements',
            EURDEP_PROBES_LABEL: 'EURDEP - Probes',
            EURDEP_OLD_MEASUREMENT: 'Measurement dated more than 1 hour ago',
            EURDEP_PROBE: 'Probe'
          },
          Variables: {
            EURDEP_GAMMA_DOSE_RATE: 'Ambient gamma dose rate'        
          }
        }
      },      
      tags: [
        'radioactivity', 'measure'
      ],
      legend: [{
        type: 'variables',
        label: 'Legend.EURDEP_MEASUREMENTS_LABEL',
        minZoom: 8
      }, {
        type: 'symbols',
        minZoom: 8,
        content: {
          measurements: [
          ],
          exceptions: [
            { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'black', radius: 10, icon: { classes: 'fa fa-radiation', color: 'white', size: 10 } } } }, 
              label: 'Legend.EURDEP_OLD_MEASUREMENT' 
            }
          ]
        }
      }, {
        type: 'symbols',
        label: 'Legend.EURDEP_PROBES_LABEL',
        maxZoom: 7,
        content: {
          stations: [
            { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'white', radius: 10, stroke: { color: 'black', width: 2 }, icon: { classes: 'fa fa-radiation', color: 'black', size: 10 } } } }, 
              label: 'Legend.EURDEP_PROBE' 
            }
          ]
        }
      }],
      attribution: "<a href='https://remon.jrc.ec.europa.eu/About/Rad-Data-Exchange'></a>",
      type: 'OverlayLayer',
      dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
      probeService: 'eurdep-stations',
      service: 'eurdep-measures',
      featureId: 'code',
      featureLabel: 'name',
      from: 'P-7D',
      to: 'PT-10M',
      every: 'PT10M',
      queryFrom: 'PT-1H',
      variables: [
        {
          name: 'value',
          label: 'Variables.EURDEP_GAMMA_DOSE_RATE',
          unit: 'nsvh',
          range: [0, 2500],
          step: 100,
          chartjs: {
            backgroundColor: 'rgba(11, 117, 169, 128)',
            borderColor: 'rgb(11, 117, 169)',
            fill: false
          },
          chromajs: {
            colors: ['#1DAFAF', '#1D8BAF', '#1D66AF', '1D41AF', '#411DAF', '#661DAF'],
            classes: [0, 100, 200, 300, 500, 2000, Number.MAX_VALUE]
          }
        }
      ],
      leaflet: {
        type: 'geoJson',
        realtime: true,
        tiled: true,
        minFeatureZoom: 8,
        cluster: { 
          maxClusterRadius: 28,
          disableClusteringAtZoom: 18 },
        style: {
          point: {
            shape: 'circle',
            radius: 15,
            opacity: 1,
            color: `<% if (_.has(properties, 'value')) { %><%= variables.value.colorScale(properties.value).hex() %><% }
                      else if (feature.measureRequestIssued) { %>black<% }
                      else { %>white<% } %>`,
            stroke: {
              color: `<% if (_.has(properties, 'value')) { %>transparent<% }
                        else if (feature.measureRequestIssued) { %>white<% }
                        else { %>black<% } %>`,
              width: 2
            },
            icon: {
              color: `<% if (_.has(properties, 'value')) { %>transparent<% }
                        else if (feature.measureRequestIssued) { %>white<% }
                        else { %>black<% } %>`,
              classes: 'fa fa-radiation',
            },
            text: {
              label: `<% if (_.has(properties, 'value')) { %><%= Units.format(properties.value, 'nsvh', undefined, { symbol: false }) %><% }
                        else { %><% } %>`,
              color: 'white',
              classes: 'text-caption text-weight-medium'
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
          template: `<%= properties.name %></br>
                      <% if (_.has(properties, 'value')) { %><%= Units.format(properties.value, 'nsvh') %></br>
                      <%= Time.format(properties.begin, 'time.long') + ' - ' + Time.format(properties.begin, 'date.short') %><% } %>`
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
          template: '<% if (_.has(properties, \'value\')) { %><%= Units.format(properties.value, \'nsvh\') %>\n' +
                    '<%= Time.format(properties.begin, \'time.long\') + \' - \' + Time.format(properties.begin, \'date.short\') %><% } %>'
        }
      }
    }
  ]
}