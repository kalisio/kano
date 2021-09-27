const jwtTemplate = (process.env.API_GATEWAY ? '?jwt=<%- jwtToken %>' : '')

module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url, storageUrl }) {
  return [{
    name: 'Layers.METEORADAR',
    description: 'Layers.METEORADAR_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          METEORADAR: 'Radar des précipitations',
          METEORADAR_DESCRIPTION: 'Cumuls de lames d\'eau estimés à partir de données radar (en mm/h)'
        },
        Variables: {
          RAIN_FALL: 'Radar des précipitations'
        }
      },
      en: {
        Layers: {
          METEORADAR: 'Precipitations radar',
          METEORADAR_DESCRIPTION: 'Estimated precipitations from radar imagery (mm/h)'
        },
        Variables: {
          RAIN_FALL: 'Precipitations radar'
        }
      }
    },
    tags: [
      'measure'
    ],
    attribution: 'Radar © <a href="http://www.meteofrance.com">Météo-France</a>',
    type: 'OverlayLayer',
    variables: [
      {
        name: 'rainFall',
        label: 'Variables.RAIN_FALL',
        units: [
          'mm/h'
        ],
        chartjs: {
          backgroundColor: 'rgba(54, 162, 235, 128)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false
        },
        chromajs: {
          scale: [
            "indigo",
            "mediumblue",
            "dodgerblue",
            "skyblue",
            "forestgreen",
            "mediumseagreen",
            "turquoise",
            "springgreen",
            "yellow",
            "palegoldenrod",
            "peachpuff",
            "orange",
            "saddlebrown",
            "red"
          ],
          classes: [ 0, 0.2, 0.6, 1.2, 2.1, 3.6, 6.5, 11.5, 20.5, 36.5, 64.8, 115.3, 205, 364.6, 500 ]
        }
      }
    ],
    time_based: {
      sources: [{
        from: 'P-60D',
        to: 'PT-1H',
        every: 'PT5M',
        dynprops: {
          url: { strTemplate: '<% const folder = stepTime.format(\'YYYY/MM/DD\'); const file = stepTime.format(\'HHmm\') %>' + storageUrl + '/scw/kalisio-archive-data/meteoradar/dev/<%- folder %>/<%- file %>.tif'  + jwtTemplate }
        },
        geotiff: {}
      }]
    },
    leaflet: {
      type: 'tiledMeshLayer',
      resolutionScale: [ 2.0, 2.0 ],
      opacity: 0.6,
      cutUnder: 0.1
    }
  }]
}
