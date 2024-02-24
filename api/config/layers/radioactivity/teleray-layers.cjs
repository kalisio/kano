module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.TELERAY',
    description: 'Layers.TELERAY_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          TELERAY: 'Téléray',
          TELERAY_DESCRIPTION: 'Réseau Téléray'
        },
        Legend: {
          TELERAY_MEASUREMENTS_LABEL: 'Téléray - Mesures',
          TELERAY_PROBES_LABEL: 'Téléray - Balises',
          TELERAY_VALID_MEASUREMENT: 'Mesure validée automatiquement par rapport à la valeur moyenne',
          TELERAY_AWAITING_MEASUREMENT_VALIDATION: 'Mesure non validée automatiquement, en attente d’une validation manuelle IRSN',
          TELERAY_INVALID_MEASUREMENT: 'Mesure invalidée manuellement par l’IRSN (balise temporairement en panne)',
          TELERAY_OLD_MEASUREMENT: 'Mesure datée de plus de 1 heure',
          TELERAY_PROBE: 'Balise'
        },
        Variables: {
          TELERAY_GAMMA_DOSE_RATE: 'Débit de dose gamma ambiant'
        },
      },
      en: {
        Layers: {
          TELERAY: 'Téléray',
          TELERAY_DESCRIPTION: 'Gamma dose rate'
        },
        Legend: {
          TELERAY_MEASUREMENTS_LABEL: 'Téléray - Measurements',
          TELERAY_PROBES_LABEL: 'Téléray - Probes',
          TELERAY_VALID_MEASUREMENT: 'Measurement automatically validated against the average value',
          TELERAY_AWAITING_MEASUREMENT_VALIDATION: 'Measurement not validated automatically, awaiting manual validation IRSN en cours de vérification',
          TELERAY_INVALID_MEASUREMENT: 'Measurement manually invalidated by IRSN (sensor temporarily broken)',
          TELERAY_OLD_MEASUREMENT: 'Measurement dated more than 1 hour ago',
          TELERAY_PROBE: 'Probe'
        },
        Variables: {
          TELERAY_GAMMA_DOSE_RATE: 'Ambient gamma dose rate'
        },
      }
    },
    tags: [
      'radioactivity', 'measure'
    ],
    legend: [{
      type: 'variables',
      label: 'Legend.TELERAY_MEASUREMENTS_LABEL',
      minZoom: 8,
    }, {
      type: 'symbols',
      minZoom: 8,
      content: {
        measurements: [
          { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'white', radius: 10, stroke: { color: 'orange', width: 2 } } } }, 
            label: 'Legend.TELERAY_AWAITING_MEASUREMENT_VALIDATION' 
          },
          { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'white', radius: 10, stroke: { color: 'grey', width: 2 } } } }, 
            label: 'Legend.TELERAY_INVALID_MEASUREMENT' 
          }
        ],
        exceptions: [
          { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'black', radius: 10, icon: { classes: 'fa fa-radiation', color: 'white', size: 10 } } } }, 
            label: 'Legend.TELERAY_OLD_MEASUREMENT' 
          }
        ]
      }
    }, {
      type: 'symbols',
      label: 'Legend.TELERAY_PROBES_LABEL',
      maxZoom: 7,
      content: {
        stations: [
          { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'white', radius: 10, stroke: { color: 'black', width: 2 }, icon: { classes: 'fa fa-radiation', color: 'black', size: 10 } } } }, 
            label: 'Legend.TELERAY_PROBE' 
          }
        ]
      }
    }],
    attribution: '<a href="https://irsn.fr/">IRSN</a>',
    type: 'OverlayLayer',
    service: 'teleray-measurements',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'teleray-sensors',
    featureId: 'irsnId',
    featureIdType: 'number',
    featureLabel: 'name',
    from: 'P-7D',
    to: 'PT-10M',
    every: 'PT10M',
    queryFrom: 'PT-1H',
    variables: [
      {
        name: 'value',
        label: 'Variables.TELERAY_GAMMA_DOSE_RATE',
        unit: 'nsvh',
        range: [0, 5000],
        step: 5,
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
      minZoom: 6,
      minFeatureZoom: 8,
      cluster: { 
        maxClusterRadius: 28,
        disableClusteringAtZoom: 18 
      },
      style: {
        point: {
          shape: 'circle',
          radius: 15,
          opacity: 1,
          color: `<% if (['VA', 'NV', 'NVA'].includes(properties.libelle)) { %><%= variables.value.colorScale(properties.value).hex() %><% }
                      else if (feature.measureRequestIssued) { %>black<% }
                      else { %>white<% } %>`,
          stroke: {
            color: `<% if (properties.libelle === 'VA') { %>transparent<% }
                      else if (properties.libelle === 'NVA') { %>orange<% }
                      else if (properties.libelle === 'NV') { %>grey<% }
                      else if (feature.measureRequestIssued) { %>white<% }
                      else { %>black<% } %>`,
            width: 2
          },
          icon: {
            color: `<% if (['VA', 'NV', 'NVA'].includes(properties.libelle)) { %>transparent<% }
                      else if (feature.measureRequestIssued) { %>white<% }
                      else { %>black<% } %>`,
            classes: 'fa fa-radiation',
          },
          text: {
            label: `<% if (['VA', 'NV', 'NVA'].includes(properties.libelle)) { %><%= Units.format(properties.value, 'nsvh', undefined, { symbol: false }) %><% }
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
                    <%= Time.format(properties.measureDateFormatted, 'time.long') + ' - ' + Time.format(properties.measureDateFormatted, 'date.short') %><% } %>`
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
                  '<%= Time.format(properties.measureDateFormatted, \'time.long\') + \' - \' + Time.format(properties.measureDateFormatted, \'date.short\') %><% } %>'
      }
    }
  }]
}
