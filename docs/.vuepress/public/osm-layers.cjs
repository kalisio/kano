module.exports = [{
  name: 'Layers.OSM',
  description: 'Layers.OSM_DESCRIPTION',
  i18n: {
    fr: {
      Layers: {
        OSM: 'OpenStreeMap',
        OSM_DESCRIPTION: 'Données OpenStreetMap'
      }
    },
    en: {
      Layers: {
        OSM: 'OpenStreeMap',
        OSM_DESCRIPTION: 'OpenStreeMap data'
      }
    }
  },
  tags: ['osm'],
  attribution: 'OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  type: 'BaseLayer',
  leaflet: {
    type: 'tileLayer',
    isVisible: true,
    source: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    maxZoom: 21,
    maxNativeZoom: 18
  },
  cesium: {
    type: 'OpenStreetMap',
    isVisible: true,
    url: `http://a.tile.osm.org`
  }
}, {
  name: 'Layers.OSM_CYCLE',
  description: 'Layers.OSM_CYCLE_DESCRIPTION',
  i18n: {
    fr: {
      Layers: {
        OSM_CYCLE: 'OpenCycleMap',
        OSM_CYCLE_DESCRIPTION: 'Données OpenCycleMap'
      }
    },
    en: {
      Layers: {
        OSM_CYCLE: 'OpenCycleMap',
        OSM_CYCLE_DESCRIPTION: 'OpenCycleMap data'
      }
    }
  },
  attribution: 'OpenStreetMap © <a href="https://www.opencyclemap.org/">OpenCycleMap</a> contributors',
  type: 'BaseLayer',
  tags: ['osm'],
  leaflet: {
    type: 'tileLayer',
    isVisible: false,
    source: 'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
    maxZoom: 21,
    maxNativeZoom: 18
  },
  cesium: {
    type: 'OpenStreetMap',
    url: `http://a.tile.thunderforest.com/cycle`,
    isVisible: false
  }
}]
