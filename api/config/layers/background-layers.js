module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.OSM_BRIGHT',
    description: 'Layers.OSM_BRIGHT_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OSM_BRIGHT: 'Plan',
          OSM_BRIGHT_DESCRIPTION: 'Données OpenStreetMap (style clair)'
        }
      },
      en: {
        Layers: {
          OSM_BRIGHT: 'Plan',
          OSM_BRIGHT_DESCRIPTION: 'OpenStreeMap data (bright style)'
        }
      }
    },
    tags: [
      'street'
    ],
    iconUrl: `${tmsUrl}/osm-bright@GLOBAL_WEBMERCATOR/0/0/0.png`,
    icon: 'streetview',
    attribution: 'OpenMapTiles © <a href="https://openmaptiles.com">OpenMapTiles</a> & OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      isVisible: true,
      source: `${tmsUrl}/osm-bright@GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png`,
      maxZoom: 21,
      maxNativeZoom: 18,
      tms: true
    },
    cesium: {
      type: 'TileMapService',
      url: `${tmsUrl}/osm-bright@GLOBAL_WEBMERCATOR`
    }
  },
  {
    name: 'Layers.OSM_DARK',
    description: 'Layers.OSM_DARK_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OSM_DARK: 'Plan (Sombre)',
          OSM_DARK_DESCRIPTION: 'Données OpenStreetMap (style sombre)'
        }
      },
      en: {
        Layers: {
          OSM_DARK: 'Plan (Dark)',
          OSM_DARK_DESCRIPTION: 'OpenStreeMap data (dark style)'
        }
      }
    },
    tags: [
      'street'
    ],
    iconUrl: `${tmsUrl}/osm-dark@GLOBAL_WEBMERCATOR/0/0/0.png`,
    icon: 'streetview',
    attribution: 'OpenMapTiles © <a href="https://openmaptiles.com">OpenMapTiles</a> & OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${tmsUrl}/osm-dark@GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png`,
      maxZoom: 21,
      maxNativeZoom: 18,
      tms: true
    },
    cesium: {
      type: 'TileMapService',
      url: `${tmsUrl}/osm-dark@GLOBAL_WEBMERCATOR`
    }
  },
  {
    name: 'Layers.OSMT_BRIGHT',
    description: 'Layers.OSMT_BRIGHT_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OSMT_BRIGHT: 'Relief',
          OSMT_BRIGHT_DESCRIPTION: 'Données OpenStreetMap et terrain à 30m de résolution (style clair)'
        }
      },
      en: {
        Layers: {
          OSMT_BRIGHT: 'Relief',
          OSMT_BRIGHT_DESCRIPTION: 'OpenStreeMap data and 30m resolution terrain data (bright style)'
        }
      }
    },
    tags: [
      'street',
      'terrain'
    ],
    iconUrl: `${tmsUrl}/osm-terrain-bright@GLOBAL_WEBMERCATOR/0/0/0.png`,
    icon: 'terrain',
    attribution: 'OpenMapTiles © <a href="https://openmaptiles.com">OpenMapTiles</a> & OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${tmsUrl}/osm-terrain-bright@GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png`,
      maxZoom: 21,
      maxNativeZoom: 18,
      tms: true
    },
    cesium: {
      type: 'TileMapService',
      url: `${tmsUrl}/osm-terrain-bright@GLOBAL_WEBMERCATOR`
    }
  },
  {
    name: 'Layers.OSMT_DARK',
    description: 'Layers.OSMT_DARK_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OSMT_DARK: 'Relief (Sombre)',
          OSMT_DARK_DESCRIPTION: 'Données OpenStreetMap et terrain à 30m de résolution (style sombre)'
        }
      },
      en: {
        Layers: {
          OSMT_DARK: 'Relief (Dark)',
          OSMT_DARK_DESCRIPTION: 'OpenStreeMap data and 30m resolution terrain data (dark style)'
        }
      }
    },
    tags: [
      'street',
      'terrain'
    ],
    iconUrl: `${tmsUrl}/osm-terrain-dark@GLOBAL_WEBMERCATOR/0/0/0.png`,
    icon: 'terrain',
    attribution: 'OpenMapTiles © <a href="https://openmaptiles.com">OpenMapTiles</a> & OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${tmsUrl}/osm-terrain-dark@GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png`,
      maxZoom: 21,
      maxNativeZoom: 18,
      tms: true
    },
    cesium: {
      type: 'TileMapService',
      url: `${tmsUrl}/osm-terrain-dark@GLOBAL_WEBMERCATOR`
    }
  },
  {
    name: 'Layers.IMAGERY',
    description: 'Layers.IMAGERY_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          IMAGERY: 'Imagerie',
          IMAGERY_DESCRIPTION: 'Images PlanetSAT et IGN BDORTHO fusionnées'
        }
      },
      en: {
        Layers: {
          IMAGERY: 'Imagery',
          IMAGERY_DESCRIPTION: 'Merged PlanetSAT and IGN BDORTHO images'
        }
      }
    },
    tags: [
      'imagery'
    ],
    iconUrl: `${tmsUrl}/imagery@GLOBAL_WEBMERCATOR/0/0/0.jpeg`,
    icon: 'terrain',
    attribution: 'PlanetSAT by <a href="https://planetobserver.com/">PlanetObserver</a>, BDORTHO by <a href="http://www.ign.fr/">IGN</a>',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${tmsUrl}/imagery@GLOBAL_WEBMERCATOR/{z}/{x}/{y}.jpeg`,
      maxZoom: 21,
      maxNativeZoom: 19,
      tms: true
    },
    cesium: {
      type: 'TileMapService',
      url: `${tmsUrl}/imagery@GLOBAL_WEBMERCATOR`,
      fileExtension: 'jpeg'
    }
  },
  {
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
    iconUrl: 'statics/Cesium/Widgets/Images/TerrainProviders/Ellipsoid.png',
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
    iconUrl: 'statics/Cesium/Widgets/Images/TerrainProviders/CesiumWorldTerrain.png',
    icon: 'terrain',
    attribution: 'High-resolution, mesh-based terrain for the entire globe.\nBy https://cesiumjs.org',
    type: 'TerrainLayer',
    cesium: {
      type: 'Cesium',
      requestWaterMask: 'true',
      requestVertexNormals: 'true'
    }
  },
  {
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
    iconUrl: 'statics/Cesium/Widgets/Images/TerrainProviders/CesiumWorldTerrain.png',
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
