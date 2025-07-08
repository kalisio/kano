module.exports = function ({ domain }) {
  return [{
    name: 'Categories.WEATHER_FORECAST_LAYERS',
    i18n: {
      fr: {
        Categories: {
          WEATHER_FORECAST_LAYERS: 'Prévisions météorologiques'
        }
      },
      en: {
        Categories: {
          WEATHER_FORECAST_LAYERS: 'Weather forecasts'
        }
      }
    },
    icon: 'las la-cloud-sun-rain',
    order: 80,
    component: 'catalog/KWeatherLayersSelector',
    options: { exclusive: true, filter: { type: 'OverlayLayer', tags: { $all: ['weather', 'forecast'] } } }
  },
  {
    name: 'Categories.WEATHER_MEASURE_LAYERS',
    i18n: {
      fr: {
        Categories: {
          WEATHER_MEASURE_LAYERS: 'Observations météorologiques'
        }
      },
      en: {
        Categories: {
          WEATHER_MEASURE_LAYERS: 'Weather observations'
        }
      }
    },
    icon: 'las la-satellite',
    options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $all: ['weather', 'measure'] } } }
  }]
}
