module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.DYNAMIC_FLOOD',
    description: 'Layers.DYNAMIC_FLOOD_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          DYNAMIC_FLOOD: 'Risque submersion marine',
          DYNAMIC_FLOOD_DESCRIPTION: "Zones exposées à l'élévation du niveau de la mer"
        },
        Variables: {
         DYNAMIC_FLOOD_TERRAIN_ELEVATION : 'Élévation du terrain'
        },
        Levels: {
          DYNAMIC_FLOOD_SEA_LEVEL: 'Élévation du niveau de la mer'
        }
      },
      en: {
        Layers: {
          DYNAMIC_FLOOD: 'Flood risk areas',
          DYNAMIC_FLOOD_DESCRIPTION: 'Areas exposed to sea level rise'
        },
        Variables: {
          DYNAMIC_FLOOD_TERRAIN_ELEVATION: 'Terrain elevation'
        },
        Levels: {
          DYNAMIC_FLOOD_SEA_LEVEL: 'Sea level rise'
        }
      }
    },
    tags: [
      'hydrography'
    ],
    legend: [{
      type: 'variables',
      label: 'Layers.DYNAMIC_FLOOD'
    }],
    attribution: 'SRTM v4.1 © <a href="https://www.earthdata.nasa.gov/data/instruments/srtm">NASA</a> and <a href="https://srtm.csi.cgiar.org/">CGIAR-CSI<a>',
    type: 'OverlayLayer',
    variables: [
      {
        name: 'elevation',
        label: 'Variables.DYNAMIC_FLOOD_TERRAIN_ELEVATION',
        unit: 'm',
        chartjs: {
          backgroundColor: 'rgba(255, 215, 0, 128)',
          borderColor: 'rgb(255, 215, 0)',
          fill: false
        },
        chromajs: {
          colors: 'RdYlBu',
          domain: [ 300, 0 ]
        }
      }
    ],
    wcs: {
      url: `${wcsUrl}`,
      version: '1.0.0',
      coverage: 'srtm'
    },
    leaflet: {
      type: 'tiledMeshLayer',
      resolutionScale: [ 2.0, 2.0 ],
      opacity: 0.6,
      cutOver: 'levels',
    },
    levels: {
      unit: 'm',
      label: 'Levels.DYNAMIC_FLOOD_SEA_LEVEL',
      lazy: false,
      range : {
        min: 0,
        max: 300,
        interval: 5
      }
    }
  }]
}
