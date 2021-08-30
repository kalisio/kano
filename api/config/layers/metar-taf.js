module.exports = function ({ wmtsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [
    {
      name: 'Layers.METAR',
      description: 'Layers.METAR_DESCRIPTION',
      i18n: {
        fr: {
          Layers: {
            METAR: 'METAR',
            METAR_DESCRIPTION: 'Observations METAR'
          },
          Variables: {
            TEMPERATURE: 'Température',
            WIND_SPEED: 'Vitesse',
            WIND_DIRECTION: 'Direction',
            VISIBILITY: 'Visiblité'
          }
        },
        en: {
          Layers: {
            METAR: 'METAR',
            METAR_DESCRIPTION: 'METAR Observations'
          },
          Variables: {
            WIND_SPEED: 'Speed',
            WIND_DIRECTION: 'Direction',
            TEMPERATURE: 'Temperature',
            VISIBILITY: 'Visibility'
          }
        }
      },
      tags: [
        'measure'
      ],
      attribution: '',
      type: 'OverlayLayer',
      service: 'metar-taf-observations',
      dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
      probeService: 'metar-taf-stations',
      featureId: 'icao',
      featureIdType: 'string',
      from: 'P-7D',
      to: 'PT-15M',
      every: 'PT30M',
      queryFrom: 'P-1D',
      variables: [
        {
          name: 'temperature',
          label: 'Variables.TEMPERATURE',
          units: [
            'degC', 'degF', 'K'
          ],
          range: [-50, 50],
          chartjs: {
            backgroundColor: 'rgba(255, 215, 0, 128)',
            borderColor: 'rgb(255, 215, 0)',
            fill: false
          }
        },
        {
          name: 'windSpeed',
          label: 'Variables.WIND_SPEED',
          units: [
            'kts', 'm/s', 'km/h'
          ],
          range: [0, 70],
          step: 1,
          chartjs: {
            backgroundColor: 'rgba(255, 159, 64, 128)',
            borderColor: 'rgb(255, 159, 64)',
            fill: false,
            yAxis: {
              ticks: {
                min: 0
              }
            }
          },
          chromajs: {
            scale: 'RdYlBu',
            domain: [20, 3]
          }
        },
        {
          name: 'windDirection',
          label: 'Variables.WIND_DIRECTION',
          units: [
            'deg'
          ],
          range: [0, 360],
          step: 1,
          chartjs: {
            backgroundColor: 'rgba(191, 191, 63, 128)',
            borderColor: 'rgb(191, 191, 63)',
            fill: false
          }
        },
        {
          name: 'visibility',
          label: 'Variables.VISIBILITY',
          units: [
            'mi', 'km', 'm'
          ],
          range: [0, 10000],
          step: 1,
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
        minZoom: 8,
        cluster: { disableClusteringAtZoom: 18 },
        'marker-color': '#444444',
        'icon-color': `<% if (_.get(properties, 'cloudCover') === 'FEW') { %>#E2E73F<% }
          else if (_.get(properties, 'cloudCover') === 'SCT') { %>#DFE1B0<% }
          else if (_.get(properties, 'cloudCover') === 'BKN') { %>#B3B490<% }
          else if (_.get(properties, 'cloudCover') === 'OVC') { %>#828359<% }
          else { %>#FFBD00<% } %>`,
        'icon-classes': `<% if (_.get(properties, 'cloudCover') === 'FEW') { %>fas fa-cloud-sun<% }
          else if (_.get(properties, 'cloudCover') === 'SCT') { %>fas fa-cloud-sun<% }
          else if (_.get(properties, 'cloudCover') === 'BKN') { %>fas fa-cloud<% }
          else if (_.get(properties, 'cloudCover') === 'OVC') { %>fas fa-cloud<% }
          else { %>fas fa-sun<% } %>`,
          'icon-x-offset': -3,
        template: ['icon-color', 'icon-classes'],
        popup: {
          pick: [
            'name'
          ]
        },
        tooltip: {
          template: `<% if (_.has(properties, 'temperature')) { %>Température = <%= properties.temperature.toFixed(2) %> °C</br><% }
                    if (_.has(feature, 'time.temperature')) { %><%= new Date(feature.time.temperature).toLocaleString() %></br><% }
                    if (_.has(properties, 'windDirection')) { %>Direction du vent = <%= properties.windDirection.toFixed(2) %> °</br><% }
                    if (_.has(feature, 'time.windDirection')) { %><%= new Date(feature.time.windDirection).toLocaleString() %></br><% }
                    if (_.has(properties, 'windSpeed')) { %>Vitesse du vent = <%= properties.windSpeed.toFixed(2) %> kts</br><% }
                    if (_.has(feature, 'time.windSpeed')) { %><%= new Date(feature.time.windSpeed).toLocaleString() %></br><% } 
                    if (_.has(properties, 'visibility')) { %>Visibility = <%= properties.visibility.toFixed(2) %> mi</br><% }
                    if (_.has(feature, 'time.visibiity')) { %><%= new Date(feature.time.visibility).toLocaleString() %></br><% } %>`
        }
      },
      cesium: {
        type: 'geoJson',
        realtime: true,
        cluster: { pixelRange: 50 },
        'marker-symbol': 'air',
        'marker-color': '#0B7599',
        popup: {
          pick: [
            'name'
          ]
        },
        tooltip: {
          template: `<% if (_.has(properties, 'temperature')) { %>Température = <%= properties.temperature.toFixed(2) %> °C\n<% }` +
                    `if (_.has(feature, 'time.temperature')) { %><%= new Date(feature.time.temperature).toLocaleString() %>\n<% }` +
                    `if (_.has(properties, 'windDirection')) { %>Direction du vent = <%= properties.windDirection.toFixed(2) %> °\n<% }` +
                    `if (_.has(feature, 'time.windDirection')) { %><%= new Date(feature.time.windDirection).toLocaleString() %>\n<% }` +
                    `if (_.has(properties, 'windSpeed')) { %>Vitesse du vent = <%= properties.windSpeed.toFixed(2) %> kts\n<% }` +
                    `if (_.has(feature, 'time.windSpeed')) { %><%= new Date(feature.time.windSpeed).toLocaleString() %>\n<% }` + 
                    `if (_.has(properties, 'visibility')) { %>Visibilité = <%= properties.visibility.toFixed(2) %> mi\n<% }` +
                    `if (_.has(feature, 'time.visibility')) { %><%= new Date(feature.time.visibility).toLocaleString() %>\n<% } %>`
        }
      }
    }
  ]
}