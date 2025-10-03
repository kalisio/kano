module.exports = function () {
  return [{
    name: 'Sublegends.WEATHER_FORECAST',
    i18n: {
      fr: {
        Sublegends: {
          WEATHER_FORECAST: 'Prévisions météorologiques'
        }
      },
      en: {
        Sublegends: {
          WEATHER_FORECAST: 'Weather forecasts'
        }
      }
    },
    order: 80,
    headerClass: 'bg-grey-3 text-weight-regular',
    options: { open: true, filter: { type: 'OverlayLayer' , tags: { $all: ['weather', 'forecast'] } } }
  }, {
    name: 'Sublegends.WEATHER_MEASURE',
    i18n: {
      fr: {
        Sublegends: {
          WEATHER_MEASURE: 'Observations météorologiques'
        }
      },
      en: {
        Sublegends: {
          WEATHER_MEASURE: 'Weather observations'
        }
      }
    },
    headerClass: 'bg-grey-3 text-weight-regular',
    options: { open: true, filter: { type: 'OverlayLayer' , tags: { $all: ['weather', 'measure'] } } }
  }]
}