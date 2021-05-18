module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.IGN_SCAN',
    description: 'Layers.IGN_SCAN_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          IGN_SCAN: 'SCAN standard (IGN)',
          IGN_SCAN_DESCRIPTION: 'Cartographie topographique multi-échelles - standard'
        }
      },
      en: {
        Layers: {
          IGN_SCAN: 'Standard SCAN (IGN)',
          IGN_SCAN_DESCRIPTION: 'Multi-scale topography map - standard'
        }
      }
    },
    tags: [
      'maps'
    ],
    iconUrl: `${tmsUrl}/ign-scan-standard@GLOBAL_WEBMERCATOR/9/260/324.jpeg`,
    icon: 'satellite',
    attribution: '© <a href="https://ign.fr">IGN</a>',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${tmsUrl}/ign-scan-standard@GLOBAL_WEBMERCATOR/{z}/{x}/{y}.jpeg`,
      maxZoom: 21,
      maxNativeZoom: 18,
      tms: true
    },
    cesium: {
      type: 'TileMapService',
      url: `${tmsUrl}/ign-scan-standard@GLOBAL_WEBMERCATOR`,
      fileExtension: 'jpeg'
    }
  },
  {
    name: 'Layers.IGN_SCAN_CLASSIC',
    description: 'Layers.IGN_SCAN_CLASSIC_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          IGN_SCAN_CLASSIC: 'SCAN classique (IGN)',
          IGN_SCAN_CLASSIC_DESCRIPTION: 'Cartographie topographique multi-échelles - classique'
        }
      },
      en: {
        Layers: {
          IGN_SCAN_CLASSIC: 'Classic SCAN (IGN)',
          IGN_SCAN_CLASSIC_DESCRIPTION: 'Multi-scale topography map - classic'
        }
      }
    },
    tags: [
      'maps'
    ],
    iconUrl: `${tmsUrl}/ign-scan-classic@GLOBAL_WEBMERCATOR/9/260/324.jpeg`,
    icon: 'satellite',
    attribution: '© <a href="https://ign.fr">IGN</a>',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${tmsUrl}/ign-scan-classic@GLOBAL_WEBMERCATOR/{z}/{x}/{y}.jpeg`,
      maxZoom: 21,
      maxNativeZoom: 18,
      tms: true
    },
    cesium: {
      type: 'TileMapService',
      url: `${tmsUrl}/ign-scan-classic@GLOBAL_WEBMERCATOR`,
      fileExtension: 'jpeg'
    }
  }]
}
