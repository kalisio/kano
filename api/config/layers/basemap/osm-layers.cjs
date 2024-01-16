module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.OSM_BRIGHT_PMTILES',
    description: 'Layers.OSM_BRIGHT_DESCRIPTION_PMTILES',
    i18n: {
      fr: {
        Layers: {
          OSM_BRIGHT_PMTILES: 'Plan (PMTiles)',
          OSM_BRIGHT_DESCRIPTION_PMTILES: 'Données OpenStreetMap (style clair)'
        }
      },
      en: {
        Layers: {
          OSM_BRIGHT_PMTILES: 'Plan',
          OSM_BRIGHT_DESCRIPTION_PMTILES: 'OpenStreeMap data (bright style)'
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
      type: 'pmtiles',
      url: 'http://127.0.0.1:8080/planet-02-08-2023.pmtiles',
      style: 'http://127.0.0.1:8080/osm-bright.json',
      maxZoom: 21,
      maxNativeZoom: 18
    }
  },
  {
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
  }]
}
