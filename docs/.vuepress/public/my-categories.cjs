module.exports = [{
  name: 'Categories.OSM_LAYERS',
  i18n: {
    fr: {
      Categories: {
        OSM_LAYERS: 'OpenStreetMap'
      }
    },
    en: {
      Categories: {
        OSM_LAYERS: 'OpenStreetMap'
      }
    }
  },
  icon: 'las la-map',
  options: { exclusive: true, filter: { type: 'BaseLayer', tags: { $in: ['osm'] } } }
}, {
  name: 'Categories.POPULATION_LAYERS',
  i18n: {
    fr: {
      Categories: {
        POPULATION_LAYERS: 'Population'
      }
    },
    en: {
      Categories: {
        POPULATION_LAYERS: 'Population'
      }
    }
  },
  icon: 'las la-users',
  options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['population'] } } }
}]