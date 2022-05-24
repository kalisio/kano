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
      'change-endpoint': 'screen/KEndpointScreen',
      home: {
        // The name of the route has to be set the default child
        name: '',
        component: 'layout/KHome',
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
              'layer-chart/:layerId': {
                name: 'layer-chart',
                component: 'KFeaturesChart',
                props: true,
              },
              'layer-filter/:layerId': {
                name: 'layer-filter',
                component: 'KFeaturesFilter',
                props: true,
              },
              'layer-table/:layerId': {
                name: 'layer-table',
                component: 'KFeaturesTable',
                props: true,
              },
              'edit-layer/:layerId': {
                name: 'edit-layer',
                component: 'KLayerEditor',
                props: true,
              },
              'edit-layer-style/:layerId': {
                name: 'edit-layer-style',
                component: 'KLayerStyleEditor',
                props: true,
              },
              'create-view': {
                name: 'create-map-view',
                component: 'catalog/KCreateView',
                tour: tours['create-view']
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
