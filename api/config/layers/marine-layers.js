module.exports = function () {
  return [{
    name: 'Layers.OPENSEAMAP',
    description: 'Layers.OPENSEAMAP_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OPENSEAMAP: 'Informations nautiques',
          OPENSEAMAP_DESCRIPTION: 'Données OpenSeaMap©'
        }
      },
      en: {
        Layers: {
          OPENSEAMAP: 'Nautical informations',
          OPENSEAMAP_DESCRIPTION: 'OpenSeaMap data©'
        }
      }
    },
    tags: [
      'business'
    ],
    iconUrl: 'statics/OpenSeaMap-Logo-256.png',
    icon: 'marine',
    attribution: 'OpenSeaMap © <a href="http://www.openseamap.org">OpenSeaMap</a> contributors',
    type: 'OverlayLayer',
    leaflet: {
      type: 'tileLayer',
      source: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
      maxNativeZoom: 18,
      tms: false
    }
  }]
}
