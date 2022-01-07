module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.ADMINEXPRESS',
    description: 'Layers.ADMINEXPRESS_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          ADMINEXPRESS: 'Limites administratives',
          ADMINEXPRESS_DESCRIPTION: 'Limites administratives (Admin Express COG, ING)'
        }
      },
      en: {
        Layers: {
          ADMINEXPRESS: 'Administrative limits',
          ADMINEXPRESS_DESCRIPTION: 'Administrative limits (Admin Express COG, ING)'
        }
      }
    },
    tags: [
      'administrative'
    ],
    attribution: 'Admin Express © <a href="http://www.ign.fr">IGN</a> contributors',
    type: 'OverlayLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${tmsUrl}/admin-express@GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png`,
      maxZoom: 21,
      maxNativeZoom: 15,
      tms: true
    },
    cesium: {
      type: 'TileMapService',
      url: `${tmsUrl}/admin-express@GLOBAL_WEBMERCATOR`
    }
  }]
}
