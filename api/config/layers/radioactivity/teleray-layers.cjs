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
        Variables: {
          GAMMA_DOSE_RATE: 'Débit de dose gamma ambiant'
        },
        Legend: {
          MEASUREMENTS_LABEL: 'Téléray - Mesures (Débit de dose gamma ambiant)',
          PROBES_LABEL: 'Téléray - Balises',
          VALID_MEASUREMENT: 'Mesure validée automatiquement par rapport à la valeur moyenne',
          AWAITING_MEASUREMENT_VALIDATION: 'Mesure non validée automatiquement, en attente d’une validation manuelle IRSN',
          INVALID_MEASUREMENT: 'Mesure invalidée manuellement par l’IRSN (balise temporairement en panne)',
          OLD_MEASUREMENT: 'Dernière mesure > 1 heure',
          PROBE: 'Balise'
        }
      },
      en: {
        Layers: {
          TELERAY: 'Téléray',
          TELERAY_DESCRIPTION: 'Gamma dose rate'
        },
        Variables: {
          GAMMA_DOSE_RATE: 'Ambient gamma dose rate'
        },
        Legend: {
          MEASUREMENTS_LABEL: 'Téléray - Measurements (Gamma dose rate)',
          PROBES_LABEL: 'Téléray - Probes',
          VALID_MEASUREMENT: 'Measurement automatically validated against the average value',
          AWAITING_MEASUREMENT_VALIDATION: 'Measurement not validated automatically, awaiting manual validation IRSN en cours de vérification',
          INVALID_MEASUREMENT: 'Measurement manually invalidated by IRSN (sensor temporarily broken)',
          OLD_MEASUREMENT: 'Last measurement > 1 hour',
          PROBE: 'Probe'
        }
      }
    },
    tags: [
      'radioactivity', 'measure'
    ],
    legend: [{
      type: 'symbols',
      label: 'Legend.MEASUREMENTS_LABEL',
      minZoom: 9,
      content: {
        measurements: [
          { symbol: { 'media/KShape': { options: { shape: 'marker-pin', color: '#138dce', size: [20, 24], icon: { classes: 'fa fa-radiation', color: 'white', size: 10 } } } }, 
            label: 'Legend.VALID_MEASUREMENT' 
          },
          { symbol: { 'media/KShape': { options: { shape: 'marker-pin', color: '#a7bec9', size: [20, 24], icon: { classes: 'fa fa-radiation', color: 'white', size: 10 } } } }, 
            label: 'Legend.AWAITING_MEASUREMENT_VALIDATION' 
          },
          { symbol: { 'media/KShape': { options: { shape: 'marker-pin', color: 'grey', size: [20, 24], icon: { classes: 'fa fa-radiation', color: 'white', size: 10 } } } }, 
            label: 'Legend.INVALID_MEASUREMENT' 
          },
          { symbol: { 'media/KShape': { options: { shape: 'marker-pin', color: 'black', size: [20, 24], icon: { classes: 'fa fa-radiation', color: 'white', size: 10 } } } }, 
            label: 'Legend.OLD_MEASUREMENT' 
          }
        ],
      }
    }, {
      type: 'symbols',
      label: 'Legend.PROBES_LABEL',
      maxZoom: 8,
      content: {
        stations: [
          { symbol: { 'media/KShape': { options: { shape: 'marker-pin', color: 'white', size: [20, 24], stroke: { color: 'black', width: 2 }, icon: { classes: 'fa fa-radiation', color: 'black', size: 10 } } } }, 
            label: 'Legend.PROBE' 
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
        label: 'Variables.GAMMA_DOSE_RATE',
        units: [
          'nSv/h'
        ],
        range: [0, 500],
        step: 5,
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
      cluster: { disableClusteringAtZoom: 18 },
      'marker-color': `<% if (properties.libelle === 'VA') { %>#138dce<% }
                          else if (properties.libelle === 'NVA') { %>#a7bec9<% }
                          else if (properties.libelle === 'NV') { %>grey<% }
                          else if (feature.measureRequestIssued) { %>black<% }
                          else { %>white<% } %>`,
      'stroke-color': `<% if (['VA', 'NV', 'NVA'].includes(properties.libelle)) { %>transparent<% }
                          else if (feature.measureRequestIssued) { %>white<% }
                          else { %>black<% } %>`,
      'stroke-width': `<% if (['VA', 'NV', 'NVA'].includes(properties.libelle)) { %>0<% }
                          else if (feature.measureRequestIssued) { %>2<% }
                          else { %>2<% } %>`,
      'icon-color': `<% if (['VA', 'NV', 'NVA'].includes(properties.libelle)) { %>white<% }
                        else if (feature.measureRequestIssued) { %>white<% }
                        else { %>black<% } %>`,
      'icon-classes': 'fa fa-radiation',
      template: ['marker-color', 'fill-opacity', 'stroke-color', 'stroke-width', 'icon-color'],
      popup: {
        pick: [
          'name'
        ]
      },
      tooltip: {
        template: `<% if (_.has(properties, 'value')) { %><%= Units.format(properties.value, 'nSv/h') %></br>
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
        template: '<% if (_.has(properties, \'value\')) { %><%= Units.format(properties.value, \'nSv/h\') %>\n' +
                  '<%= Time.format(properties.measureDateFormatted, \'time.long\') + \' - \' + Time.format(properties.measureDateFormatted, \'date.short\') %><% } %>'
      }
    }
  }]
}
