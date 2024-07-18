module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
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
      fileExtension: 'jpeg',
      maximumLevel: 19
    }
  },
  {
    name: 'Layers.HYBRID',
    description: 'Layers.HYBRID_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          HYBRID: 'Hybride',
          HYBRID_DESCRIPTION: 'Images PlanetSAT et IGN BDORTHO fusionnées avec OpenStreetMap'
        }
      },
      en: {
        Layers: {
          HYBRID: 'Hybrid',
          HYBRID_DESCRIPTION: 'Merged PlanetSAT and IGN BDORTHO images with OpenStreetMap'
        }
      }
    },
    tags: [
      'imagery'
    ],
    iconUrl: `${tmsUrl}/hybrid@GLOBAL_WEBMERCATOR/0/0/0.jpeg`,
    icon: 'terrain',
    attribution: 'PlanetSAT © <a href="https://planetobserver.com/">PlanetObserver</a>, BDORTHO © <a href="http://www.ign.fr/">IGN</a>, OpenMapTiles © <a href="https://openmaptiles.com">OpenMapTiles</a>, OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${tmsUrl}/hybrid@GLOBAL_WEBMERCATOR/{z}/{x}/{y}.jpeg`,
      maxZoom: 20,
      maxNativeZoom: 18,
      tms: true
    },
    cesium: {
      type: 'TileMapService',
      url: `${tmsUrl}/hybrid@GLOBAL_WEBMERCATOR`,
      fileExtension: 'jpeg',
      maximumLevel: 18
    }
  }]
}
