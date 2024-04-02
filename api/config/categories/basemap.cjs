module.exports = function ({ domain }) {
  return [{
    name: 'Categories.BASE_LAYERS',
    i18n: {
      fr: {
        Categories: {
          BASE_LAYERS: 'Fonds cartographiques'
        }
      },
      en: {
        Categories: {
          BASE_LAYERS: 'Map backgrounds'
        }
      }
    },
    icon: 'las la-layer-group',
    order: 100,
    // component: 'catalog/KBaseLayersSelector',
    options: { filter: { type: 'BaseLayer' } }
  },
  {
    name: 'Categories.TERRAIN_LAYERS',
    i18n: {
      fr: {
        Categories: {
          TERRAIN_LAYERS: 'Topographie'
        }
      },
      en: {
        Categories: {
          TERRAIN_LAYERS: 'Topography'
        }
      }
    },
    icon: 'las la-mountain',
    order: 90,
    options: { exclusive: true, filter: { type: 'TerrainLayer' } },
  }]
}
