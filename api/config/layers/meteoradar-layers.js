

module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  let layers = []
  const flavor = process.env.NODE_APP_INSTANCE || 'dev'
  if (s3Url) layers.push({
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
            "white",
            "#483D88",
            "#0000CD",
            "#1E90FF",
            "#ADD8E6",
            "#556B2F",
            "#3CB371",
            "#7FFFD4",
            "#7FFF00",
            "#FFFF00",
            "#F0E68C",
            "#DEB887"
          ],
          classes: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
        }
      }
    ],
    time_based: {
      sources: [{
        from: 'P-60D',
        to: 'PT-1H',
        every: 'PT15M',
        dynprops: {
          url: { strTemplate: '<% const folder = stepTime.format(\'YYYY/MM/DD\'); const file = stepTime.format(\'HHmm\') %>' + s3Url + '/scw/kalisio-archive-data/meteoradar/' + flavor + '<%- folder %>/<%- file %>.tif?jwt=<%- jwtToken %>' }
        },
        geotiff: {}
      }]
    },
    leaflet: {
      type: 'tiledMeshLayer',
      resolutionScale: [ 2.0, 2.0 ],
      opacity: 0.6,
      cutUnder: 2
    }
  })
  return layers
}
