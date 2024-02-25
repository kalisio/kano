module.exports = function ({ wmtsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [
    {
      name: 'Layers.AWC_METARS',
      description: 'Layers.AWC_METARS_DESCRIPTION',
      i18n: {
        fr: {
          Layers: {
            AWC_METARS: 'Données METAR',
            AWC_METARS_DESCRIPTION: 'Données METAR'
          },
          Legend: {
            AWC_METARS_OBSERVATIONS: 'Observations METAR',
            AWC_METARS_STATIONS: 'Stations METAR',
            AWC_METARS_OBSERVATION: 'Dernière mesure : Température / Point de rosée / Rafale / Vitesse du vent / Direction du vent / Visiblité',
            AWC_METARS_CLOUDCOVER_CAVOK: 'Ciel clair',
            AWC_METARS_CLOUDCOVER_FEW: 'Ciel avec quelques nuages',
            AWC_METARS_CLOUDCOVER_SCT: 'Ciel avec des nuages épars',
            AWC_METARS_CLOUDCOVER_BKN: 'Ciel nuageux',
            AWC_METARS_CLOUDCOVER_OVC: 'Ciel couvert',
            AWC_METARS_CLOUDCOVER_NO_DATA: 'Aucune information de couverture nuageuse',
            AWC_METARS_OLD_OBSERVATION: 'Mesure datée de plus de 5 heures',  
            AWC_METARS_STATION: 'Station'
          },
          Variables: {
            AWC_METARS_TEMPERATURE: 'Température',
            AWC_METARS_DEWPOINT: 'Point de rosée',
            AWC_METARS_WIND_SPEED: 'Vitesse',
            AWC_METARS_WIND_DIRECTION: 'Direction',
            AWC_METARS_WIND_GUST: 'Rafales',
            AWC_METARS_VISIBILITY: 'Visiblité'
          }
        },
        en: {
          Layers: {
            AWC_METARS: 'METAR Data',
            AWC_METARS_DESCRIPTION: 'METAR Data'
          },
          Legend: {
            AWC_METARS_OBSERVATIONS: 'METAR Observations',
            AWC_METARS_STATIONS: 'METAR Stations',
            AWC_METARS_OBSERVATION: 'Last measurement: Temperature / Dewpoint / Gust / Wind speed / Wind direction / Visiblity',
            AWC_METARS_CLOUDCOVER_CAVOK: 'Clear sky',
            AWC_METARS_CLOUDCOVER_FEW: 'Sky with some clouds',
            AWC_METARS_CLOUDCOVER_SCT: 'Sky with scattered clouds',
            AWC_METARS_CLOUDCOVER_BKN: 'Cloudy sky',
            AWC_METARS_CLOUDCOVER_OVC: 'Covered sky',            
            AWC_METARS_CLOUDCOVER_NO_DATA: 'No cloud cover data',
            AWC_METARS_OLD_OBSERVATION: 'Measurement dated more than 5 hours ago',
            AWC_METARS_STATION: 'Station'
          },
          Variables: {
            AWC_METARS_TEMPERATURE: 'Temperature',
            AWC_METARS_DEWPOINT: 'Dew point',
            AWC_METARS_WIND_SPEED: 'Speed',
            AWC_METARS_WIND_DIRECTION: 'Direction',
            AWC_METARS_WIND_GUST: 'Gust',
            AWC_METARS_VISIBILITY: 'Visibility'
          }
        }
      },
      tags: [
        'weather', 'measure'
      ],
      legend: [{
        type: 'symbols',
        label: 'Legend.AWC_METARS_OBSERVATIONS',
        minZoom: 8,
        content: {
          observations: [
            { symbol: { 'media/KShape': { options: { shape: 'circle', color: '#666666', radius: 10 } } }, 
              label: 'Legend.AWC_METARS_OBSERVATION' 
            }
          ],
          symobology: [
            { symbol: { 'media/KShape': { options: { shape: 'circle', color: '#666666', radius: 10, icon: { classes: 'fa fa-sun', color: '#FE9929' } } } },
              label: 'Legend.AWC_METARS_CLOUDCOVER_CAVOK' 
            },
            { symbol: { 'media/KShape': { options: { shape: 'circle', color: '#666666', radius: 10, icon: { classes: 'fa fa-cloud-sun', color: '#FED98E' } } } },
              label: 'Legend.AWC_METARS_CLOUDCOVER_FEW' 
            },
            { symbol: { 'media/KShape': { options: { shape: 'circle', color: '#666666', radius: 10, icon: { classes: 'fa fa-cloud-sun', color: '#FFFFD4' } } } },
              label: 'Legend.AWC_METARS_CLOUDCOVER_SCT' 
            },
            { symbol: { 'media/KShape': { options: { shape: 'circle', color: '#666666', radius: 10, icon: { classes: 'fa fa-cloud', color: '#F1EEF6' } } } },
               label: 'Legend.AWC_METARS_CLOUDCOVER_BKN' 
            },
            { symbol: { 'media/KShape': { options: { shape: 'circle', color: '#666666', radius: 10, icon: { classes: 'fa fa-cloud', color: '#BDC9E1' } } } }, 
              label: 'Legend.AWC_METARS_CLOUDCOVER_OVC' 
            },
            { symbol: { 'media/KShape': { options: { shape: 'circle', color: '#666666', radius: 10 } } },
              label: 'Legend.AWC_METARS_CLOUDCOVER_NO_DATA' 
            }
          ],
          exceptions: [
            { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'black', radius: 10, icon: { classes: 'fa fa-cloud-sun-rain', color: 'white', size: 10 } } } }, 
              label: 'Legend.AWC_METARS_OLD_OBSERVATION' 
            }
          ]
        }
      }, {
        type: 'symbols',
        label: 'Legend.AWC_METARS_STATIONS',
        maxZoom: 7,
        content: {
          stations: [
            { symbol: { 'media/KShape': { options: { shape: 'circle', color: 'white', radius: 10, stroke: { color: 'black', width: 2 }, icon: { classes: 'fa fa-cloud-sun-rain', color: 'black', size: 10 } } } }, 
              label: 'Legend.AWC_METARS_STATION' 
            }
          ]
        }
      }],
      attribution: '',
      type: 'OverlayLayer',
      service: 'awc-metars',
      dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
      probeService: 'awc-stations',
      featureId: 'icao',
      featureIdType: 'string',
      featureLabel: 'name',
      from: 'P-7D',
      to: 'PT',
      every: 'PT30M',
      queryFrom: 'PT-5H',
      variables: [
        {
          name: 'temperature',
          label: 'Variables.AWC_METARS_TEMPERATURE',
          unit: 'degC',
          range: [-50, 50],
          chartjs: {
            backgroundColor: '#510861',
            borderColor: '#510861',
            fill: false
          }
        },
        {
          name: 'dewpoint',
          label: 'Variables.AWC_METARS_DEWPOINT',
          unit: 'degC',
          range: [-50, 50],
          chartjs: {
            backgroundColor: '#D566ed',
            borderColor: '#D566ed',
            fill: false
          }
        },
        {
          name: 'windSpeed',
          label: 'Variables.AWC_METARS_WIND_SPEED',
          unit: 'kt',
          range: [0, 70],
          step: 1,
          chartjs: {
            backgroundColor: '#E38020',
            borderColor: '#E38020',
            fill: false,
            yAxis: {
              ticks: {
                min: 0
              }
            }
          }
        },
        {
          name: 'windGust',
          label: 'Variables.AWC_METARS_WIND_GUST',
          unit: 'kt',
          range: [0, 100],
          step: 1,
          chartjs: {
            backgroundColor: '#Dd350b',
            borderColor: '#Dd350b',
            fill: false,
            yAxis: {
              ticks: {
                min: 0
              }
            }
          }
        },
        {
          name: 'windDirection',
          label: 'Variables.AWC_METARS_WIND_DIRECTION',
          unit: 'deg',
          range: [0, 360],
          step: 1,
          chartjs: {
            backgroundColor: '#3F7FBF',
            borderColor: '#3F7FBF',
            fill: false
          }
        },
        {
          name: 'visibility',
          label: 'Variables.AWC_METARS_VISIBILITY',
          unit: 'mi',
          range: [0, 10000],
          step: 1,
          chartjs: {
            backgroundColor: '#4a9029',
            borderColor: '#4a9029',
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
          maxClusterRadius: 36,
          disableClusteringAtZoom: 18 
        },
        style: {
          point: {
            shape: 'circle',
            radius: 15,
            opacity: 1,
            color: `<% if (_.has(properties, 'rawOb')) { %>#666666<% }
                      else if (feature.measureRequestIssued) { %>black<% }
                      else { %>white<% } %>`,
            stroke: {
              color: `<% if (_.has(properties, 'rawOb')) { %>transparent<% }
                        else if (feature.measureRequestIssued) { %>white<% }
                        else { %>black<% } %>`,
              width: 2,
            },
            icon: {
              color:  `<% if (_.get(properties, 'cloudCover') === 'FEW') { %>#FED98E<% }
                          else if (_.get(properties, 'cloudCover') === 'SCT') { %>#FFFFD4<% }
                          else if (_.get(properties, 'cloudCover') === 'BKN') { %>#F1EEF6<% }
                          else if (_.get(properties, 'cloudCover') === 'OVC') { %>#BDC9E1<% }
                          else if (_.has(properties, 'cloudCover')) { %>#FE9929<% }
                          else if (_.has(properties, 'rawOb') && !_.has(properties, 'cloudCover')) { %>transparent<% }
                          else if (feature.measureRequestIssued) { %>white<% }
                          else { %>black<% } %>`,
              size: 13,
              classes: `<% if (_.get(properties, 'cloudCover') === 'FEW') { %>fa fa-cloud-sun<% }
                          else if (_.get(properties, 'cloudCover') === 'SCT') { %>fa fa-cloud-sun<% }
                          else if (_.get(properties, 'cloudCover') === 'BKN') { %>fa fa-cloud<% }
                          else if (_.get(properties, 'cloudCover') === 'OVC') { %>fa fa-cloud<% }
                          else if (_.has(properties, 'cloudCover')) { %>fa fa-sun<% }
                          else { %>fa fa-cloud-sun-rain<% } %>`
            }
          }
        } ,
        template: ['style.point.color', 'style.point.stroke.color', 'style.point.icon.color', 'style.point.icon.classes'],
        popup: {
          pick: [
            'name'
          ]
        },
        tooltip: {
          template: `<% if (!_.isNil(_.get(properties, 'temperature'))) { %>Température = <%= Units.format(properties.temperature, 'degC') %></br><% }
                    if (!_.isNil(_.get(properties, 'dewpoint'))) { %>Point de rosée = <%= Units.format(properties.dewpoint, 'degC') %></br><% }
                    if (!_.isNil(_.get(properties, 'windDirection'))) { %>Direction du vent = <%= Units.format(properties.windDirection, 'deg') %></br><% }
                    if (!_.isNil(_.get(properties, 'windSpeed'))) { %>Vitesse du vent = <%= Units.format(properties.windSpeed, 'kt') %></br><% }
                    if (!_.isNil(_.get(properties, 'windGust'))) { %>Vitesse de rafale = <%= Units.format(properties.windGust, 'kt') %></br><% }
                    if (!_.isNil(_.get(properties, 'visibility'))) { %>Visiblité = <%= Units.format(properties.visibility, 'mi') %></br><% }
                    if (!_.isNil(_.get(feature, 'time.temperature'))) { %><%= Time.format(feature.time.temperature, 'time.long') + ' - ' + Time.format(feature.time.temperature, 'date.short') %></br><% } %>`
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
          template: '<% if (_.has(properties, \'temperature\')) { %>Température = <%= Units.format(properties.temperature, \'degC\') %>\n<% }' +
                    'if (_.has(properties, \'dewpoint\')) { %>Point de rosée = <%= Units.format(properties.dewpoint, \'degC\') %>\n<% }' +
                    'if (_.has(properties, \'windDirection\')) { %>Direction du vent = <%= Units.format(properties.windDirection, \'degC\') %>\n<% }' +
                    'if (_.has(properties, \'windSpeed\')) { %>Vitesse du vent = <%= Units.format(properties.windSpeed, \'kt\') %>\n<% }' +
                    'if (_.has(properties, \'windGust\')) { %>Vitesse de rafale = <%= Units.format(properties.windGust, \'kt\') %>\n<% }' +
                    'if (_.has(properties, \'visibility\')) { %>Visibilité = <%= Units.format(properties.visibility, \'mi\') %>\n<% }' +
                    'if (_.has(feature, \'time.temperature\')) { %><%= Time.format(feature.time.temperature, \'time.long\') + \' - \' + Time.format(feature.time.temperature, \'date.short\') %>\n<% } %>'
        }
      }
    }
  ]
}
