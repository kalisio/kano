module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.WEATHERLINK',
    description: 'Layers.WEATHERLINK_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          WEATHERLINK: 'Observations Weatherlink',
          WEATHERLINK_DESCRIPTION: 'Données "en temps réel" mesurées aux stations - Weatherlink',
        },
        Legend: {
          WEATHERLINK_OBSERVATIONS_LABEL: 'Réseau Weatherlink - Observations',
          WEATHERLINK_STATIONS_LABEL: 'Réseau Weatherlink - Stations',
          WEATHERLINK_OBSERVATION: 'Dernière observation : Vitesse et direction du vent, précipitation, humidité et température',
          WEATHERLINK_OLD_OBSERVATION: 'Observation datée de plus de 15 minutes',
          WEATHERLINK_STATION: 'Station',
        },
        Variables: {
          WEATHERLINK_WIND_SPEED: 'Vitesse',
          WEATHERLINK_WIND_DIRECTION: 'Direction',
          WEATHERLINK_PRECIPITATIONS: 'Précipitations',
          WEATHERLINK_TEMPERATURE: 'Température',
          WEATHERLINK_HUMIDITY: 'Humidité'
        }
      },                
      en: {
        Layers: {
          WEATHERLINK: 'Weatherlink Observations',
          WEATHERLINK_DESCRIPTION: 'Real-time data measured at stations - Weatherlink'
        },
        Legend: {
          WEATHERLINK_OBSERVATIONS_LABEL: 'Weatherlink network - Observations',
          WEATHERLINK_STATIONS_LABEL: 'Weatherlink network - Stations',
          WEATHERLINK_OBSERVATION: 'Last measurement : Speed and direction of wind, precipitation, humidity and temperature',
          WEATHERLINK_OLD_OBSERVATION: 'Measurement dated more than 6 minutes ago',
          WEATHERLINK_STATION: 'Station',
        },
        Variables: {
          WEATHERLINK_WIND_SPEED: 'Speed',
          WEATHERLINK_WIND_DIRECTION: 'Direction',
          WEATHERLINK_PRECIPITATIONS: 'Precipitations',
          WEATHERLINK_TEMPERATURE: 'Temperature',
          WEATHERLINK_HUMIDITY: 'Humidity'
        } 
      }     
    },
    tags: [       
      'weather', 'measure'
    ],
    legend: [{
      type: 'symbols',
      label: 'Legend.WEATHERLINK_OBSERVATIONS_LABEL',
      minZoom: 8,
      content: {
        observations: [
          { symbol: { 'media/KShape': { options: { shape: 'circle', color: '#0B7599', radius: 10, stroke: { color: 'transparent', width: 2 }, icon: { classes: 'fa fa-thermometer-half', color: 'white',  size: 10} } } }, 
            label: 'Legend.WEATHERLINK_OBSERVATION' 
          }
        ],
        windbard: [
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-0.svg' } }, label: '0-2 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-5.svg' } }, label: '3-7 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-10.svg' } }, label: '8-12 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-15.svg' } }, label: '13-17 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-20.svg' } }, label: '18-22 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-25.svg' } }, label: '23-27 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-30.svg' } }, label: '28-32 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-35.svg' } }, label: '33-37 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-40.svg' } }, label: '38-42 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-45.svg' } }, label: '43-47 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-50.svg' } }, label: '48-52 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-55.svg' } }, label: '53-57 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-60.svg' } }, label: '58-62 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-65.svg' } }, label: '63-67 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-70.svg' } }, label: '68-72 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-75.svg' } }, label: '73-77 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-80.svg' } }, label: '78-82 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-85.svg' } }, label: '83-87 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-90.svg' } }, label: '88-92 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-95.svg' } }, label: '93-97 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-100.svg' } }, label: '98-102 kts' },
          { symbol: { 'QIcon': { name: 'img:kdk/wind-speed-105.svg' } }, label: '103-107 kts' },
        ],
        exceptions: [
          { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'black', radius: 10, stroke: { color: 'transparent', width: 2 }, icon: { classes: 'fa fa-thermometer-half', color: 'white',  size: 10} } } }, 
            label: 'Legend.WEATHERLINK_OLD_OBSERVATION' 
          }
        ]
      }
    }, {
      type: 'symbols',
      label: 'Legend.WEATHERLINK_STATIONS_LABEL',
      maxZoom: 8,
      content: {
        stations: [
          { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'white', radius: 10, stroke: { color: 'black', width: 2 }, icon: { classes: 'fa fa-thermometer-half', color: 'black',  size: 10} } } }, 
            label: 'Legend.WEATHERLINK_STATION' 
          }
        ]
      }
    }],
    attribution: '© <a href="https://www.weatherlink.com/">Weatherlink</a>',
    type: 'OverlayLayer',
    service: 'weatherlink-observations',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    probeService: 'weatherlink-stations',
    featureId: 'station_id',
    featureIdType: 'number',
    featureLabel: 'name',
    from: 'P-7D',
    to: 'PT-15M',
    every: 'PT15M',
    queryFrom: 'PT-60M',
    variables: [
      {
        name: 'temperature',
        label: 'Variables.WEATHERLINK_TEMPERATURE',
        unit:'degC',
        range: [-50, 50],
        chartjs: {
          backgroundColor: 'rgba(255, 215, 0, 128)',
          borderColor: 'rgb(255, 215, 0)',
          fill: false
        }
      },
      {
        name: 'humidity',
        label: 'Variables.WEATHERLINK_HUMIDITY',
        unit: '%',
        range: [0, 100],
        chartjs: {
          backgroundColor: 'rgba(63, 63, 63, 128)',
          borderColor: 'rgb(63, 63, 63)',
          fill: false
        }
      },
      {
        name: 'windDirection',
        label: 'Variables.WEATHERLINK_WIND_DIRECTION',
        unit: 'deg',
        range: [0, 360],
        chartjs: {
          backgroundColor: 'rgba(191, 191, 63, 128)',
          borderColor: 'rgb(191, 191, 63)',
          fill: false
        }
      },
      {
        name: 'windSpeed',
        label: 'Variables.WEATHERLINK_WIND_SPEED',
        unit: 'm/s',
        range: [0, 60],
        chartjs: {
          backgroundColor: 'rgba(255, 159, 64, 128)',
          borderColor: 'rgb(255, 159, 64)',
          fill: false
        }
      },
      {
        name: 'precipitations',
        label: 'Variables.WEATHERLINK_PRECIPITATIONS',
        unit: 'mm/h',
        range: [0, 50],
        chartjs: {
          backgroundColor: 'rgba(54, 162, 235, 128)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false
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
        maxClusterRadius: 50,
        disableClusteringAtZoom: 10 
      },
      style: {
        point: {
          shape: 'circle',
          radius: 15,
          opacity: 1,
          color: `<% if (_.has(properties, 'temperature') ||
                         _.has(properties, 'humidity') ||
                         _.has(properties, 'windDirection') ||
                         _.has(properties, 'windSpeed') ||
                         _.has(properties, 'precipitations')) { %>#0B7599<% }
                      else if (feature.measureRequestIssued) { %>black<% }
                      else { %>white<% } %>`,
          stroke: {
            color: `<% if (_.has(properties, 'temperature') ||
                           _.has(properties, 'humidity') ||
                           _.has(properties, 'windDirection') ||
                           _.has(properties, 'windSpeed') ||
                           _.has(properties, 'precipitations')) { %>transparent<% }
                      else if (feature.measureRequestIssued) { %>white<% }
                      else { %>black<% } %>`,
            width: 2,
          },
          icon: {
            color: `<% if (_.has(properties, 'temperature') ||
                           _.has(properties, 'humidity') ||
                           _.has(properties, 'windDirection') ||
                           _.has(properties, 'windSpeed') ||
                           _.has(properties, 'precipitations')) { %>white<% }
                      else if (feature.measureRequestIssued) { %>white<% }
                      else { %>black<% } %>`,
            classes: 'fa fa-thermometer-half',
          }
        }},
      template: ['style.point.color', 'style.point.stroke.color', 'style.point.icon.color'],
      popup: {
        pick: [
          'name'
        ]
      },
      tooltip: {
        template: `<% if (_.has(properties, 'temperature')) { %>Température : <%= properties.temperature.toFixed(2) %> °C</br><% }
                   if (_.has(feature, 'time.temperature')) { %><%= new Date(feature.time.temperature).toLocaleString() %></br><% }
                   if (_.has(properties, 'humidity')) { %>Humidité : <%= properties.humidity.toFixed(2) %> %</br><% }
                   if (_.has(feature, 'time.humidity')) { %><%= new Date(feature.time.humidity).toLocaleString() %></br><% }
                   if (_.has(properties, 'windDirection')) { %>Direction du vent : <%= properties.windDirection.toFixed(2) %> °</br><% }
                   if (_.has(feature, 'time.windDirection')) { %><%= new Date(feature.time.windDirection).toLocaleString() %></br><% }
                   if (_.has(properties, 'windSpeed')) { %>Vitesse du vent : <%= properties.windSpeed.toFixed(2) %> m/s</br><% }
                   if (_.has(feature, 'time.windSpeed')) { %><%= new Date(feature.time.windSpeed).toLocaleString() %></br><% }
                   if (_.has(properties, 'precipitations')) { %>Précipitations: <%= properties.precipitations.toFixed(2) %> mm/h</br><% }
                   if (_.has(feature, 'time.precipitations')) { %><%= new Date(feature.time.precipitations).toLocaleString() %></br><% } %>`
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
        template: `<% if (_.has(properties, 'temperature')) { %>Température : <%= properties.temperature.toFixed(2) %> °C\n<% }` +
                  `if (_.has(feature, 'time.temperature')) { %><%= new Date(feature.time.temperature).toLocaleString() %>\n<% }` +
                  `if (_.has(properties, 'humidity')) { %>Humidité : <%= properties.humidity.toFixed(2) %> %\n<% }` +
                  `if (_.has(feature, 'time.humidity')) { %><%= new Date(feature.time.humidity).toLocaleString() %>\n<% }` +
                  `if (_.has(properties, 'windDirection')) { %>Direction du vent : <%= properties.windDirection.toFixed(2) %> °\n<% }` +
                  `if (_.has(feature, 'time.windDirection')) { %><%= new Date(feature.time.windDirection).toLocaleString() %>\n<% }` +
                  `if (_.has(properties, 'windSpeed')) { %>Vitesse du vent : <%= properties.windSpeed.toFixed(2) %> m/s\n<% }` +
                  `if (_.has(feature, 'time.windSpeed')) { %><%= new Date(feature.time.windSpeed).toLocaleString() %>\n<% }` +
                  `if (_.has(properties, 'precipitations')) { %>Précipitations = <%= properties.precipitations.toFixed(2) %> mm/h\n<% }` +
                  `if (_.has(feature, 'time.precipitations')) { %><%= new Date(feature.time.precipitations).toLocaleString() %>\n<% } %>`
      }
    }
  }]
}
