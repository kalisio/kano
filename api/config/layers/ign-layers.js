module.exports = function ({ wmtsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [
  {
    name: 'Layers.IGN_ORTHO',
    description: 'Layers.IGN_ORTHO_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          IGN_ORTHO: 'BD ORTHO IGN',
          IGN_ORTHO_DESCRIPTION: 'Photos aériennes IGN'
        }
      },
      en: {
        Layers: {
          IGN_ORTHO: 'IGN BD ORTHO',
          IGN_ORTHO_DESCRIPTION: 'IGN aerial imagery'
        }
      }
    },
    tags: [
      'imagery'
    ],
    iconUrl: `${wmtsUrl}/ign-ortho/GLOBAL_WEBMERCATOR/0/0/0.jpeg`,
    icon: 'satellite',
    attribution: '© <a href="https://ign.fr">IGN</a>',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${wmtsUrl}/ign-ortho/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.jpeg`,
      maxZoom: 21,
      maxNativeZoom: 19
    },
    cesium: {
      type: 'OpenStreetMap',
      fileExtension: 'jpeg',
      url: `${wmtsUrl}/ign-ortho/GLOBAL_WEBMERCATOR`
    }
  },
  {
    name: 'Layers.IGN_SCAN',
    description: 'Layers.IGN_SCAN_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          IGN_SCAN: 'SCAN standard IGN',
          IGN_SCAN_DESCRIPTION: 'Cartographie topographique multi-échelles - standard'
        }
      },
      en: {
        Layers: {
          IGN_SCAN: 'IGN standard SCAN',
          IGN_SCAN_DESCRIPTION: 'Multi-scale topography map - standard'
        }
      }
    },
    tags: [
      'maps'
    ],
    iconUrl: `${wmtsUrl}/ign-scan-standard/GLOBAL_WEBMERCATOR/0/0/0.jpeg`,
    icon: 'satellite',
    attribution: '© <a href="https://ign.fr">IGN</a>',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${wmtsUrl}/ign-scan-standard/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.jpeg`,
      maxZoom: 21,
      maxNativeZoom: 18
    },
    cesium: {
      type: 'OpenStreetMap',
      fileExtension: 'jpeg',
      url: `${wmtsUrl}/ign-scan-standard/GLOBAL_WEBMERCATOR`
    }
  },
  {
    name: 'Layers.IGN_SCAN_CLASSIC',
    description: 'Layers.IGN_SCAN_CLASSIC_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          IGN_SCAN_CLASSIC: 'SCAN classique IGN',
          IGN_SCAN_CLASSIC_DESCRIPTION: 'Cartographie topographique multi-échelles - classique'
        }
      },
      en: {
        Layers: {
          IGN_SCAN_CLASSIC: 'IGN classic SCAN',
          IGN_SCAN_CLASSIC_DESCRIPTION: 'Multi-scale topography map - classic'
        }
      }
    },
    tags: [
      'maps'
    ],
    iconUrl: `${wmtsUrl}/ign-scan-classic/GLOBAL_WEBMERCATOR/6/32/22.jpeg`,
    icon: 'satellite',
    attribution: '© <a href="https://ign.fr">IGN</a>',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${wmtsUrl}/ign-scan-classic/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.jpeg`,
      maxZoom: 21,
      maxNativeZoom: 18
    },
    cesium: {
      type: 'OpenStreetMap',
      fileExtension: 'jpeg',
      url: `${wmtsUrl}/ign-scan-classic/GLOBAL_WEBMERCATOR`
    }
  }]
}