module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.FIRMS',
    description: 'Layers.FIRMS_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          FIRMS: 'FIRMS',
          FIRMS_DESCRIPTION: 'Points chauds (Fire Information for Resource Management System)'
        },
        Variables: {
          FIRE_RADIATIVE_POWER: 'Puissance radiative du feu'
        }
      },
      en: {
        Layers: {
          FIRMS: 'FIRMS',
          FIRMS_DESCRIPTION: 'Thermal hotspots (Fire Information for Resource Management System)'
        },
        Variables: {
          FIRE_RADIATIVE_POWER: 'Fire radiative power'
        }
      }
    },
    tags: [
      'fire', 'measure'
    ],
    icon: 'las la-fire',
    iconUrl: 'https://firms.modaps.eosdis.nasa.gov/images/nasa_logo_white.png',
    attribution: "<a href='https://www.earthdata.nasa.gov/learn/find-data/near-real-time/firms'>NASA FIRMS</a>",
    type: 'OverlayLayer',
    scope: 'user',
    variables: [
      {
        name: 'frp',
        label: 'Variables.FIRE_RADIATIVE_POWER',
        unit: 'MW',
        chartjs: {
          backgroundColor: 'rgba(54, 162, 235, 128)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false
        },
        chromajs: {
          colors: 'OrRd',
          domain: [0, 100]
        }
      }
    ],
    legend: {
      type: 'variables'
    },
    service: 'firms',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    from: 'P-7D',
    to: 'PT-1H',
    every: 'PT1H',
    queryFrom: 'PT-2H',
    leaflet: {
      type: 'geoJson',
      realtime: true,
      tiled: true,
      minZoom: 8,
      cluster: { disableClusteringAtZoom: 8 },
      style: {
        point: {
          shape: 'none',
          icon: {
            color: '<%= variables.frp.colorScale(properties.frp).hex() %>',
            classes: 'fa fa-fire',
            size: 12
          }
        }
      },
      template: ['style.point.icon.color'],
      type: 'heatmap',
      cfg: {
        valueField: 'frp',
        min: 0,
        max: 100
      },
      // The unit is in pixel, meaning
      // 1 pixel radius (2 pixel diameter) at zoom level 0
      // ...
      // 64 pixel radius (128 pixel diameter) at zoom level 6
      // ...
      // We'd like an event to cover a range expressed as Km
      // According to https://groups.google.com/forum/#!topic/google-maps-js-api-v3/hDRO4oHVSeM
      // this means 1 pixel at level 7 so at level 0 we get 1 / 2^7
      radius: 5 * 0.0078,
      minOpacity: 0,
      maxOpacity: 0.5,
      // scales the radius based on map zoom
      scaleRadius: true,
      // uses the data maximum within the current map boundaries
      // (there will always be a red spot with useLocalExtremas true)
      useLocalExtrema: true,
      // The higher the blur factor is, the smoother the gradients will be
      blur: 0.8
    },
    cesium: {
      type: 'geoJson',
      realtime: true,
      cluster: { pixelRange: 50 },
      style: {
        point: {
          shape: 'fire-station',
          color: '#f09078',
          opacity: 0.6,
          radius: 8,
          stroke: {
            width: 0,
            opacity: 0
          }
        }
      }
    }
  }]
}
