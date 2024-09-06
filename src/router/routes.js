const tours = require('../tours')

module.exports = [{
  path: '/',
  name: 'index',
  component: 'Index',
  meta: { unauthenticated: true },
  children: {
    login: 'screen/KLoginScreen',
    logout: {
      component: 'screen/KLogoutScreen',
      meta: { authenticated: true }
    },
    home: {
      // The name of the route has to be set the default child
      name: '',
      component: 'app/KHome',
      meta: { authenticated: true, unauthenticated: false },
      children: {
        'default-home-view': {
          // Because this child is the default one path is empty and name is the one of the parent route
          path: '',
          name: 'home',
          redirect: { name: 'map-activity' },
          tour: tours.home
        },
        'map/:south?/:west?/:north?/:east?': {
          name: 'map-activity',
          component: 'MapActivity',
          embedApi: true,
          tour: {
            'side-nav': tours['side-nav'],
            'navigation-bar': tours['navigation-bar'],
            'favorite-views': tours['favorite-views'],
            'catalog-panel': tours['catalog-panel'],
            timeline: tours.timeline,
            fab: tours.fab
          },
          children: {
            'create-view': {
              name: 'create-map-view',
              component: 'catalog/KCreateView',
              tour: tours['create-view']
            },
            'add-layer': {
              name: 'add-map-layer',
              component: 'catalog/KAddLayer',
              tour: {
                'add-layer': tours['add-layer'],
                'import-layer': tours['import-layer'],
                'connect-layer': tours['connect-layer'],
                'create-layer': tours['create-layer']
              }
            },
            'manage-project': {
              name: 'manage-map-project',
              component: 'catalog/KProjectManager',
              tour: tours['manage-project']
            },
            'layer-chart/:layerId?': {
              name: 'map-layer-chart',
              component: 'KFeaturesChart',
              props: true
            },
            'layer-filter/:layerId?': {
              name: 'map-layer-filter',
              component: 'KFeaturesFilter',
              props: true
            },
            'layer-table/:layerId?': {
              name: 'map-layer-table',
              component: 'KFeaturesTable',
              props: true
            },
            'edit-layer/:layerId': {
              name: 'edit-map-layer',
              component: 'KLayerEditor',
              props: true
            },
            'edit-layer-style/:layerId?': {
              name: 'edit-map-layer-style',
              component: 'KLayerStyleEditor',
              props: true
            },
            'edit-layer-feature/:layerId?/:featureId': {
              name: 'edit-map-layer-feature',
              component: 'KFeatureEditor',
              props: true
            },
            'create-project': {
              name: 'create-map-project',
              component: 'catalog/KProjectEditor',
              tour: tours['create-project']
            },
            'edit-project/:objectId': {
              name: 'edit-map-project',
              component: 'catalog/KProjectEditor',
              tour: tours['edit-project'],
              props: true
            },
            categories: {
              name: 'manage-layer-categories',
              component: 'catalog/KLayerCategories',
              tour: tours['catalog-categories']
            }
          }
        },
        'globe/:south?/:west?/:north?/:east?': {
          name: 'globe-activity',
          component: 'GlobeActivity',
          embedApi: true,
          tour: {
            'side-nav': tours['side-nav'],
            'navigation-bar': tours['navigation-bar'],
            'favorite-views': tours['favorite-views'],
            'catalog-panel': tours['catalog-panel'],
            timeline: tours.timeline,
            fab: tours.fab
          },
          children: {
            'layer-chart/:layerId?': {
              name: 'globe-layer-chart',
              component: 'KFeaturesChart',
              props: true
            },
            'layer-filter/:layerId?': {
              name: 'globe-layer-filter',
              component: 'KFeaturesFilter',
              props: true
            },
            'layer-table/:layerId?': {
              name: 'globe-layer-table',
              component: 'KFeaturesTable',
              props: true
            },
            'edit-layer/:layerId': {
              name: 'edit-globe-layer',
              component: 'KLayerEditor',
              props: true
            }
          }
        }
      }
    }
  }
},
// Always leave this as last one,
// but you can also remove it
{
  path: '/:catchAll(.*)*',
  component: 'screen/KErrorScreen'
}
]
