module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.CESIUM_ELLIPSOID',
    description: 'Standard Ellipsoid',
    i18n: {
      fr: {
        Layers: {
          CESIUM_ELLIPSOID: 'Ellipsoide',
          CESIUM_ELLIPSOID_DESCRIPTION: 'Ellipsoide WGS84'
        }
      },
      en: {
        Layers: {
          CESIUM_ELLIPSOID: 'Ellipsoid',
          CESIUM_ELLIPSOID_DESCRIPTION: 'WGS84 ellipsoid'
        }
      }
    },
    tags: [
      'terrain'
    ],
    iconUrl: 'Cesium/Widgets/Images/TerrainProviders/Ellipsoid.png',
    icon: 'fiber_manual_record',
    attribution: '',
    default: true,
    type: 'TerrainLayer',
    cesium: {
      type: 'Ellipsoid',
      isVisible: true
    }
  },
  {
    name: 'Layers.CESIUM_TERRAIN',
    description: 'Layers.CESIUM_TERRAIN_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          CESIUM_TERRAIN: 'Terrain Cesium',
          CESIUM_TERRAIN_DESCRIPTION: 'Modèle de terrain mondial de Cesium'
        }
      },
      en: {
        Layers: {
          CESIUM_TERRAIN: 'Cesium Terrain',
          CESIUM_TERRAIN_DESCRIPTION: 'World wide elevation model from Cesium'
        }
      }
    },
    tags: [
      'terrain'
    ],
    iconUrl: 'Cesium/Widgets/Images/TerrainProviders/CesiumWorldTerrain.png',
    icon: 'terrain',
    attribution: 'High-resolution, mesh-based terrain for the entire globe.\nBy https://cesiumjs.org',
    type: 'TerrainLayer',
    cesium: {
      type: 'Cesium',
      requestWaterMask: 'true',
      requestVertexNormals: 'true'
    }
  }]
}
