module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.K2',
    description: 'Layers.K2_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          K2: 'Terrain Kalisio',
          K2_DESCRIPTION: 'Modèle de terrain mondial à 30m de résolution'
        }
      },
      en: {
        Layers: {
          K2: 'Kalisio Terrain',
          K2_DESCRIPTION: 'World wide 30-meter resolution elevation model'
        }
      }
    },
    tags: [
      'terrain'
    ],
    iconUrl: 'Cesium/Widgets/Images/TerrainProviders/CesiumWorldTerrain.png',
    icon: 'terrain',
    attribution: 'High-resolution, mesh-based terrain for the entire globe.\nBy http://www.kalisio.com',
    type: 'TerrainLayer',
    cesium: {
      type: 'Cesium',
      url: k2Url,
      requestWaterMask: 'true',
      requestVertexNormals: 'true'
    }
  }]
}
