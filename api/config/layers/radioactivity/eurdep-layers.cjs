module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
      name: 'Layers.EURDEP',
      description: 'Layers.EURDEP_DESCRIPTION',
      i18n: {
        fr: {
          Layers: {
            EURDEP: 'EURDEP',
            EURDEP_DESCRIPTION: 'Mesures du Réseau de détection de la radioactivité en Europe',
            EURDEP_AT: 'Autriche',  
            EURDEP_BE: 'Belgique',  
            EURDEP_BG: 'Bulgarie', 
            EURDEP_BY: 'Biélorussie',
            EURDEP_CAN: 'Canada',
            EURDEP_CH: 'Suisse',
            EURDEP_CY: 'Chypre', 
            EURDEP_CZ: 'République Tchèque',
            EURDEP_DE: 'Allemagne',
            EURDEP_DK: 'Danemark',
            EURDEP_EE: 'Estonie',
            EURDEP_ES: 'Espagne', 
            EURDEP_FI: 'Finlande',  
            EURDEP_FR: 'France',
            EURDEP_GB: 'Grande-Bretagne',
            EURDEP_GL: 'Groenland',
            EURDEP_GR: 'Grèce',
            EURDEP_HK: 'Honk-Kong',
            EURDEP_HR: 'Croatie',
            EURDEP_HU: 'Hongrie', 
            EURDEP_IE: 'Irlande', 
            EURDEP_IS: 'Islande', 
            EURDEP_IT: 'Italie',
            EURDEP_LT: 'Lituanie',  
            EURDEP_L1: 'Slovaquie',  
            EURDEP_LU: 'Luxembourg',  
            EURDEP_LV: 'Lettonie',
            EURDEP_MK: 'Macédoine du nord',
            EURDEP_MP: 'Bosnie-Herzégovine',  
            EURDEP_MT: 'Malte',
            EURDEP_NL: 'Pays-Bas',  
            EURDEP_NO: 'Norvège',
            EURDEP_PL: 'Pologne', 
            EURDEP_PT: 'Portugal', 
            EURDEP_RO: 'Roumanie', 
            EURDEP_RS: 'Serbie',
            EURDEP_RU: 'Russie', 
            EURDEP_SE: 'Suède',
            EURDEP_SI: 'Slovénie',  
            EURDEP_SK: 'Slovaquie',   
            EURDEP_TR: 'Turquie',
            EURDEP_UA: 'Ukraine' 
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
            EURDEP_AT: 'Austria',  
            EURDEP_BE: 'Belgium',  
            EURDEP_BG: 'Bulgaria', 
            EURDEP_BY: 'Belarus',
            EURDEP_CAN: 'Canada',
            EURDEP_CH: 'Switzerland',
            EURDEP_CY: 'Cyprus', 
            EURDEP_CZ: 'Czech Republic',
            EURDEP_DE: 'Germany',
            EURDEP_DK: 'Denmark',
            EURDEP_EE: 'Estonia',
            EURDEP_ES: 'Spain', 
            EURDEP_FI: 'Finland',  
            EURDEP_FR: 'France',
            EURDEP_GB: 'Great Britain',
            EURDEP_GL: 'Greenland',
            EURDEP_GR: 'Greece',
            EURDEP_HK: 'Honk Kong',
            EURDEP_HR: 'Croatia',
            EURDEP_HU: 'Hungary', 
            EURDEP_IE: 'Ireland', 
            EURDEP_IS: 'Iceland', 
            EURDEP_IT: 'Italy',
            EURDEP_LT: 'Lithuania',  
            EURDEP_L1: 'Slovakia',  
            EURDEP_LU: 'Luxembourg',  
            EURDEP_LV: 'Latvia',
            EURDEP_MK: 'North Macedonia',
            EURDEP_MP: 'Bosnia and Herzegovina',  
            EURDEP_MT: 'Malta',
            EURDEP_NL: 'Netherlands',  
            EURDEP_NO: 'Norway',
            EURDEP_PL: 'Poland', 
            EURDEP_PT: 'Portugal', 
            EURDEP_RO: 'Romania', 
            EURDEP_RS: 'Serbia',
            EURDEP_RU: 'Russia', 
            EURDEP_SE: 'Sweden',
            EURDEP_SI: 'Slovenia',  
            EURDEP_SK: 'Slovakia',   
            EURDEP_L1: 'Slovakia', 
            EURDEP_TR: 'Türkiye',
            EURDEP_UA: 'Ukraine'
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
      filters: [{
        label: 'Layers.EURDEP_AT',
        isActive: true,
        active: { 'properties.country': 'AT'},
        inactive: {}
      }, {
        label: 'Layers.EURDEP_BE',
        isActive: true,
        active: { 'properties.country': 'BE' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_BG',
        isActive: true,
        active: { 'properties.country': 'BG' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_BY',
        isActive: true,
        active: { 'properties.country': 'BY' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_CAN',
        isActive: true,
        active: { 'properties.country': 'CAN' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_CH',
        isActive: true,
        active: { 'properties.country': 'CH' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_CY',
        isActive: true,
        active: { 'properties.country': 'CY' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_CZ',
        isActive: true,
        active: { 'properties.country': 'CZ' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_DE',
        isActive: true,
        active: { 'properties.country': 'DE' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_EE',
        isActive: true,
        active: { 'properties.country': 'EE' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_ES',
        isActive: true,
        active: { 'properties.country': 'ES' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_FI',
        isActive: true,
        active: { 'properties.country': 'FI' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_FR',
        isActive: true,
        active: { 'properties.country': 'FR' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_GB',
        isActive: true,
        active: { 'properties.country': 'GB' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_GL',
        isActive: true,
        active: { 'properties.country': 'GL' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_GR',
        isActive: true,
        active: { 'properties.country': 'GR' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_HK',
        isActive: true,
        active: { 'properties.country': 'HK' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_HR',
        isActive: true,
        active: { 'properties.country': 'HR' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_HU',
        isActive: true,
        active: { 'properties.country': 'HU' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_IE',
        isActive: true,
        active: { 'properties.country': 'IE' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_IS',
        isActive: true,
        active: { 'properties.country': 'IS' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_IT',
        isActive: true,
        active: { 'properties.country': 'IT' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_LT',
        isActive: true,
        active: { 'properties.country': 'LT' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_L1',
        isActive: true,
        active: { 'properties.country': 'L1' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_LU',
        isActive: true,
        active: { 'properties.country': 'LU' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_LV',
        isActive: true,
        active: { 'properties.country': 'LV' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_MK',
        isActive: true,
        active: { 'properties.country': 'MK' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_MP',
        isActive: true,
        active: { 'properties.country': 'MP' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_MT',
        isActive: true,
        active: { 'properties.country': 'MT' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_NL',
        isActive: true,
        active: { 'properties.country': 'NL' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_NO',
        isActive: true,
        active: { 'properties.country': 'NO' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_PL',
        isActive: true,
        active: { 'properties.country': 'PL' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_PT',
        isActive: true,
        active: { 'properties.country': 'PT' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_RO',
        isActive: true,
        active: { 'properties.country': 'RO' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_RS',
        isActive: true,
        active: { 'properties.country': 'RS' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_RU',
        isActive: true,
        active: { 'properties.country': 'RU' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_SE',
        isActive: true,
        active: { 'properties.country': 'SE' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_SI',
        isActive: true,
        active: { 'properties.country': 'SI' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_SK',
        isActive: true,
        active: { 'properties.country': 'SK' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_TR',
        isActive: true,
        active: { 'properties.country': 'TR' },
        inactive: {}
      }, {
        label: 'Layers.EURDEP_UA',
        isActive: true,
        active: { 'properties.country': 'UA' },
        inactive: {}
      }],
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