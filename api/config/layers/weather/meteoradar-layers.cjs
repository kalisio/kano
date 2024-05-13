
module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  let layers = []
  const flavor = process.env.NODE_APP_INSTANCE || 'dev'
  if (s3Url) {
    layers.push({
      name: 'Layers.METEORADAR',
      description: 'Layers.METEORADAR_DESCRIPTION',
      i18n: {
        fr: {
          Layers: {
            METEORADAR: 'Précipitations Météo-France',
            METEORADAR_DESCRIPTION: 'Cumuls de lames d\'eau estimés à partir de données radar'
          },
          Variables: {
            RAIN_FALL: 'Radar des précipitations'
          }
        },
        en: {
          Layers: {
            METEORADAR: 'Météo-France Precipitations',
            METEORADAR_DESCRIPTION: 'Estimated precipitations from radar data'
          },
          Variables: {
            RAIN_FALL: 'Precipitations radar'
          }
        }
      },
      tags: [
        'weather', 'measure'
      ],
      attribution: 'Radar © <a href="http://www.meteofrance.com">Météo-France</a>',
      type: 'OverlayLayer',
      variables: [
        {
          name: 'rainFall',
          label: 'Variables.RAIN_FALL',
          unit: 'Force',
          chartjs: {
            backgroundColor: 'rgba(54, 162, 235, 128)',
            borderColor: 'rgb(54, 162, 235)',
            fill: false
          },
          chromajs: {
            colors: [
              '#FFFFFF00',
              '#483D88',
              '#0000CD',
              '#1E90FF',
              '#ADD8E6',
              '#556B2F',
              '#3CB371',
              '#7FFFD4',
              '#7FFF00',
              '#FFFF00',
              '#F0E68C',
              '#DEB887'
            ],
            classes: [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12
            ]
          }
        }
      ],
      legend: {
        type: 'variables'
      },
      time_based: {
        sources: [{
          from: 'P-60D',
          to: 'PT-1H',
          every: 'PT15M',
          dynprops: {
            url: { strTemplate: '<% const folder = stepTime.format(\'YYYY/MM/DD\'); const file = stepTime.format(\'HHmm\') %>' + s3Url + '/scw/kalisio-archive-data/meteoradar/' + flavor + '/<%- folder %>/<%- file %>.tif?jwt=<%- jwtToken %>' }
          },
          geotiff: {}
        }]
      },
      leaflet: {
        type: 'tiledMeshLayer',
        resolutionScale: [2.0, 2.0],
        opacity: 0.6,
        cutUnder: 2
      }
    })
  }
  layers = layers.concat([{
    name: 'Layers.GSMAP_RAIN',
    description: 'Layers.GSMAP_RAIN_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          GSMAP_RAIN: 'Précipitations GSMap',
          GSMAP_RAIN_DESCRIPTION: 'Précipitations estimées à partir de données radar (mm/h)'
        }
      },
      en: {
        Layers: {
          GSMAP_RAIN: 'GSMap Precipitations',
          GSMAP_RAIN_DESCRIPTION: 'Estimated precipitations from radar data (mm/h)'
        }
      }
    },
    tags: ['weather', 'measure'],
    attribution: "Precipitation: <a href='https://sharaku.eorc.jaxa.jp/GSMaP/index.htm'>JAXA Realtime Rainfall Watch</a> (JAXA/EORC)",
    type: 'OverlayLayer',
    variables: [
      {
        name: 'precipitations',
        label: 'Variables.PRECIPITATIONS',
        unit: 'mm/hr',
        range: [0, 30],
        chartjs: {
          backgroundColor: 'rgba(54, 162, 235, 128)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          yAxis: {
            ticks: {
              min: 0
            }
          }
        },
        chromajs: {
          colors: [
            '#000096',
            '#0064ff',
            '#00b4ff',
            '#33db80',
            '#9beb4a',
            '#ffeb00',
            '#ffb300',
            '#ff6400',
            '#eb1e00',
            '#af0000'
          ],
          classes: [0.1, 0.5, 1.0, 2.0, 3.0, 5.0, 10.0, 15.0, 20.0, 25.0, 30.0]
        }
      }
    ],
    legend: {
      type: 'variables'
    },
    leaflet: {
      type: 'gsmapLayer',
      opacity: 0.4,
      product: 'rain'
    }
  },
  {
    name: 'Layers.GSMAP_RAIN12',
    description: 'Layers.GSMAP_RAIN12_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          GSMAP_RAIN12: 'Précipitations GSMap (12h)',
          GSMAP_RAIN12_DESCRIPTION: 'Précipitations estimées à partir de données radar (mm/12h)'
        }
      },
      en: {
        Layers: {
          GSMAP_RAIN12: 'GSMap Precipitations (12h)',
          GSMAP_RAIN12_DESCRIPTION: 'Estimated precipitations from radar data (mm/12h)'
        }
      }
    },
    tags: ['weather', 'measure'],
    attribution: "Precipitation12: <a href='https://sharaku.eorc.jaxa.jp/GSMaP/index.htm'>JAXA Realtime Rainfall Watch</a> (JAXA/EORC)",
    type: 'OverlayLayer',
    variables: [
      {
        name: 'precipitations',
        label: 'Variables.PRECIPITATIONS',
        unit: 'mm',
        range: [0, 300],
        chartjs: {
          backgroundColor: 'rgba(54, 162, 235, 128)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          yAxis: {
            ticks: {
              min: 0
            }
          }
        },
        chromajs: {
          colors: [
            '#000096',
            '#0064ff',
            '#00b4ff',
            '#33db80',
            '#9beb4a',
            '#ffeb00',
            '#ffb300',
            '#ff6400',
            '#eb1e00',
            '#af0000'
          ],
          classes: [0, 5, 10, 20, 30, 50, 100, 150, 200, 250, 300]
        }
      }
    ],
    legend: {
      type: 'variables'
    },
    leaflet: {
      type: 'gsmapLayer',
      opacity: 0.4,
      product: 'rain12'
    }
  },
  {
    name: 'Layers.GSMAP_RAIN24',
    description: 'Layers.GSMAP_RAIN24_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          GSMAP_RAIN24: 'Précipitations GSMap (24h)',
          GSMAP_RAIN24_DESCRIPTION: 'Précipitations estimées à partir de données radar (mm/24h)'
        }
      },
      en: {
        Layers: {
          GSMAP_RAIN24: 'GSMap Precipitations (24h)',
          GSMAP_RAIN24_DESCRIPTION: 'Estimated precipitations from radar data (mm/24h)'
        }
      }
    },
    tags: ['weather', 'measure'],
    attribution: "Precipitation24: <a href='https://sharaku.eorc.jaxa.jp/GSMaP/index.htm'>JAXA Realtime Rainfall Watch</a> (JAXA/EORC)",
    type: 'OverlayLayer',
    variables: [
      {
        name: 'precipitations',
        label: 'Variables.PRECIPITATIONS',
        unit: 'mm',
        range: [0, 300],
        chartjs: {
          backgroundColor: 'rgba(54, 162, 235, 128)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          yAxis: {
            ticks: {
              min: 0
            }
          }
        },
        chromajs: {
          colors: [
            '#000096',
            '#0064ff',
            '#00b4ff',
            '#33db80',
            '#9beb4a',
            '#ffeb00',
            '#ffb300',
            '#ff6400',
            '#eb1e00',
            '#af0000'
          ],
          classes: [0, 5, 10, 20, 30, 50, 100, 150, 200, 250, 300]
        }
      }
    ],
    legend: {
      type: 'variables'
    },
    leaflet: {
      type: 'gsmapLayer',
      opacity: 0.4,
      product: 'rain24'
    }
  },
  {
    name: 'Layers.GSMAP_RAIN72',
    description: 'Layers.GSMAP_RAIN72_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          GSMAP_RAIN72: 'Précipitations GSMap (72h)',
          GSMAP_RAIN72_DESCRIPTION: 'Précipitations estimées à partir de données radar (mm/72h)'
        }
      },
      en: {
        Layers: {
          GSMAP_RAIN72: 'GSMap Precipitations (72h)',
          GSMAP_RAIN72_DESCRIPTION: 'Estimated precipitations from radar data (mm/72h)'
        }
      }
    },
    tags: ['weather', 'measure'],
    attribution: "Precipitation72: <a href='https://sharaku.eorc.jaxa.jp/GSMaP/index.htm'>JAXA Realtime Rainfall Watch</a> (JAXA/EORC)",
    type: 'OverlayLayer',
    variables: [
      {
        name: 'precipitations',
        label: 'Variables.PRECIPITATIONS',
        unit: 'mm',
        range: [0, 600],
        chartjs: {
          backgroundColor: 'rgba(54, 162, 235, 128)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          yAxis: {
            ticks: {
              min: 0
            }
          }
        },
        chromajs: {
          colors: [
            '#000096',
            '#0064ff',
            '#00b4ff',
            '#33db80',
            '#9beb4a',
            '#ffeb00',
            '#ffb300',
            '#ff6400',
            '#eb1e00',
            '#af0000'
          ],
          classes: [0, 5, 10, 30, 50, 100, 200, 300, 400, 500, 600]
        }
      }
    ],
    legend: {
      type: 'variables'
    },
    leaflet: {
      type: 'gsmapLayer',
      opacity: 0.4,
      product: 'rain72'
    }
  },
  {
    name: 'Layers.GSMAP_CLOUD',
    description: 'Layers.GSMAP_CLOUD_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          GSMAP_CLOUD: 'Couverture nuageuse GSMap',
          GSMAP_CLOUD_DESCRIPTION: 'Couverture estimée à partir de données satellite'
        }
      },
      en: {
        Layers: {
          GSMAP_CLOUD: 'GSMap Cloud cover',
          GSMAP_CLOUD_DESCRIPTION: 'Estimated cover from satellite data'
        }
      }
    },
    tags: ['weather', 'measure'],
    attribution: "Cloud: <a href='https://sharaku.eorc.jaxa.jp/GSMaP/index.htm'>JAXA Realtime Rainfall Watch</a> (JAXA/EORC)",
    type: 'OverlayLayer',
    leaflet: {
      type: 'gsmapLayer',
      opacity: 0.6,
      product: 'ir'
    }
  }])
  return layers
}
