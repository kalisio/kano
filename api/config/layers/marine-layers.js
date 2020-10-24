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
          OPENSEAMAP_DESCRIPTION: 'OpenSeaMap data ©'
        }
      }
    },
    tags: [
      'marine'
    ],
    iconUrl: 'statics/OpenSeaMap-Logo-256.png',
    icon: 'marine',
    attribution: 'OpenSeaMap © <a href="http://www.openseamap.org">OpenSeaMap</a> contributors',
    type: 'OverlayLayer',
    leaflet: {
	type: 'tileLayer',
	isVisible: true,
	source: `https://tiles.openseamap.org/seamark/z/x/y.png`
	maxZoom: 19,
	maxNativeZoom: 19,
	tms: true
    }
  }]
}
