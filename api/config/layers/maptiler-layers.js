module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url, maptilerUrl }) {
  return [
    {
      name: 'Layers.MAPTILER_BRIGHT',
      description: 'Layers.MAPTILER_BRIGHT_DESCRIPTION',
      i18n: {
        fr: {
          Layers: {
            MAPTILER_BRIGHT: 'Maptiler (Clair)',
            MAPTILER_BRIGHT_DESCRIPTION: 'Données OpenStreetMap (Style clair)'
          }
        },
        en: {
          Layers: {
            MAPTILER_BRIGHT: 'Maptiler (Bright)',
            MAPTILER_BRIGHT_DESCRIPTION: 'OpenStreeMap data (bright style)'
          }
        }
      },
      tags: [
        'street'
      ],
      iconUrl: `${maptilerUrl}/maps/bright/0/0/0.png`,
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      type: 'BaseLayer',
      leaflet: {
        type: 'tileLayer',
        source: `${maptilerUrl}/maps/bright/{z}/{x}/{y}.png`,
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 21,
        maxNativeZoom: 18
      },
      cesium: {
        type: 'OpenStreetMap',
        url: `${maptilerUrl}/maps/bright`,
        fileExtension: 'png'
      }
    },
    {
      name: 'Layers.MAPTILER_TOPO',
      description: 'Layers.MAPTILER_TOPO_DESCRIPTION',
      i18n: {
        fr: {
          Layers: {
            MAPTILER_TOPO: 'Maptiler (Topographique)',
            MAPTILER_TOPO_DESCRIPTION: 'Données OpenStreetMap et terrain'
          }
        },
        en: {
          Layers: {
            MAPTILER_TOPO: 'Maptiler (Topography)',
            MAPTILER_TOPO_DESCRIPTION: 'OpenStreeMap data and terrain'
          }
        }
      },
      tags: [
        'street'
      ],
      iconUrl: `${maptilerUrl}/masps/topo/0/0/0.png`,
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      type: 'BaseLayer',
      leaflet: {
        type: 'tileLayer',
        source: `${maptilerUrl}/maps/topo/{z}/{x}/{y}.png`,
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 21,
        maxNativeZoom: 18
      },
      cesium: {
        type: 'OpenStreetMap',
        url: `${maptilerUrl}/maps/topo`,
        fileExtension: 'png'
      }
    },
    {
      name: 'Layers.MAPTILER_HYBRID',
      description: 'Layers.MAPTILER_HYBRID_DESCRIPTION',
      i18n: {
        fr: {
          Layers: {
            MAPTILER_HYBRID: 'Maptiler (Hybride)',
            MAPTILER_HYBRID_DESCRIPTION: 'Données satellite et OpenStreetMap fusionnées'
          }
        },
        en: {
          Layers: {
            MAPTILER_HYBRID: 'Maptiler (Hybrid)',
            MAPTILER_HYBRID_DESCRIPTION: 'Merged satellite and OpenStreetMap data'
          }
        }
      },
      tags: [
        'street',
        'imagery'
      ],
      iconUrl: `${maptilerUrl}/maps/hybrid/0/0/0.jpg`,
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      type: 'BaseLayer',
      leaflet: {
        type: 'tileLayer',
        source: `${maptilerUrl}/maps/hybrid/{z}/{x}/{y}.jpg`,
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 21,
        maxNativeZoom: 18
      },
      cesium: {
        type: 'OpenStreetMap',
        url: `${maptilerUrl}/maps/hybrid`,
        fileExtension: 'jpg'
      }
    },
    {
      name: 'Layers.MAPTILER_TERRAIN3D',
      description: 'Layers.MAPTILER_TERRAIN3D_DESCRIPTION',
      i18n: {
        fr: {
          Layers: {
            MAPTILER_TERRAIN3D: 'Terrain MapTiler',
            MAPTILER_TERRAIN3D_DESCRIPTION: 'Modèle de terrain mondial'
          }
        },
        en: {
          Layers: {
            MAPTILER_TERRAIN3D: 'MapTiler Terrain',
            MAPTILER_TERRAIN3D_DESCRIPTION: 'World wide elevation model'
          }
        }
      },
      tags: [
        'terrain'
      ],
      iconUrl: 'statics/Cesium/Widgets/Images/TerrainProviders/CesiumWorldTerrain.png',
      icon: 'terrain',
      attribution: 'High-resolution, mesh-based terrain for the entire globe.\nBy http://www.kalisio.com',
      type: 'TerrainLayer',
      cesium: {
        type: 'Cesium',
        url: `${maptilerUrl}/tiles/terrain-quantized-mesh`,
        requestWaterMask: 'true',
        requestVertexNormals: 'true'
      }
    }
  ]
}
