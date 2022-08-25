module.exports = function ({ domain }) {
  return [
    {
      name: 'Categories.BUSINESS_LAYERS',
      i18n: {
        fr: {
          Categories: {
            BUSINESS_LAYERS: 'Données métier'
          }
        },
        en: {
          Categories: {
            BUSINESS_LAYERS: 'Business data'
          }
        }
      },
      icon: 'las la-briefcase',
      options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['business'] } } }
    },
    {
      name: 'Categories.METEO_FORECAST_LAYERS',
      i18n: {
        fr: {
          Categories: {
            METEO_FORECAST_LAYERS: 'Prévisions météorologiques'
          }
        },
        en: {
          Categories: {
            METEO_FORECAST_LAYERS: 'Meteorological forecasts'
          }
        }
      },
      icon: 'las la-cloud-sun-rain',
      component: 'catalog/KWeatherLayersSelector',
      options: { exclusive: true, filter: { type: 'OverlayLayer', tags: { $all: ['weather', 'forecast'] } } }
    },
    {
      name: 'Categories.METEO_MEASURE_LAYERS',
      i18n: {
        fr: {
          Categories: {
            METEO_MEASURE_LAYERS: 'Observations météorologiques'
          }
        },
        en: {
          Categories: {
            METEO_MEASURE_LAYERS: 'Meteorological observations'
          }
        }
      },
      icon: 'las la-satellite',
      options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $all: ['weather', 'measure'] } } }
    },
    {
      name: 'Categories.ATMOSPHERIC_LAYERS',
      i18n: {
        fr: {
          Categories: {
            ATMOSPHERIC_LAYERS: 'Observations atmosphériques'
          }
        },
        en: {
          Categories: {
            ATMOSPHERIC_LAYERS: 'Atmospheric observations'
          }
        }
      },
      icon: 'las la-smog',
      options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['atmospheric'] } } }
    },
    {
      name: 'Categories.RADIOACTIVITY_LAYERS',
      i18n: {
        fr: {
          Categories: {
            RADIOACTIVITY_LAYERS: 'Radioactivité'
          }
        },
        en: {
          Categories: {
            RADIOACTIVITY_LAYERS: 'Radioactivity'
          }
        }
      },
      icon: 'las la-radiation',
      options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['radioactivity'] } } }
    },
    {
      name: 'Categories.HYDROGRAPHY_LAYERS',
      i18n: {
        fr: {
          Categories: {
            HYDROGRAPHY_LAYERS: 'Hydrographie'
          }
        },
        en: {
          Categories: {
            HYDROGRAPHY_LAYERS: 'Hydrography'
          }
        }
      },
      icon: 'las la-water',
      options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['hydrography'] } } }
    },
    {
      name: 'Categories.DEMOGRAPHY_LAYERS',
      i18n: {
        fr: {
          Categories: {
            DEMOGRAPHY_LAYERS: 'Démographie'
          }
        },
        en: {
          Categories: {
            DEMOGRAPHY_LAYERS: 'Demography'
          }
        }
      },
      icon: 'las la-users',
      options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['demography'] } } }
    },
    {
      name: 'Categories.CAPTURED_LAYERS',
      i18n: {
        fr: {
          Categories: {
            CAPTURED_LAYERS: 'Prises de vues'
          }
        },
        en: {
          Categories: {
            CAPTURED_LAYERS: 'Captured views'
          }
        }
      },
      icon: 'las la-street-view',
      options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['captured'] } } }
    },
    {
      name: 'Categories.ADMINISTRATIVE_LAYERS',
      i18n: {
        fr: {
          Categories: {
            ADMINISTRATIVE_LAYERS: 'Administratif'
          }
        },
        en: {
          Categories: {
            ADMINISTRATIVE_LAYERS: 'Administrative'
          }
        }
      },
      icon: 'las la-landmark',
      options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['administrative'] } } }
    },
    {
      name: 'Categories.INFRASTRUCTURE_LAYERS',
      i18n: {
        fr: {
          Categories: {
            INFRASTRUCTURE_LAYERS: 'Infrastructures'
          }
        },
        en: {
          Categories: {
            INFRASTRUCTURE_LAYERS: 'Infrastructures'
          }
        }
      },
      icon: 'las la-broadcast-tower',
      options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['infrastructure'] } } }
    },
    {
      name: 'Categories.BASE_LAYERS',
      i18n: {
        fr: {
          Categories: {
            BASE_LAYERS: 'Fonds cartographiques'
          }
        },
        en: {
          Categories: {
            BASE_LAYERS: 'Map backgrounds'
          }
        }
      },
      icon: 'las la-layer-group',
      component: 'catalog/KBaseLayersSelector',
      options: { filter: { type: 'BaseLayer' } }
    },
    {
      name: 'Categories.TERRAIN_LAYERS',
      i18n: {
        fr: {
          Categories: {
            TERRAIN_LAYERS: 'Topographie'
          }
        },
        en: {
          Categories: {
            TERRAIN_LAYERS: 'Topography'
          }
        }
      },
      icon: 'las la-mountain',
      options: { exclusive: true, filter: { type: 'TerrainLayer' } }
    }
  ]
}
