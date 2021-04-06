const tours = require('../tours')

module.exports = {
  '/' : {
    name: 'index',
    component: 'Index',
    // By default all child routes are considered unauthenticated,
    // will be overriden when required
    meta: { unauthenticated: true },
    children: {
      login: {
        component: 'authentication/KLogin',
        tour: tours.login
      },
      logout: {
        component: 'authentication/KLogout',
        meta: { authenticated: true }
      },
      'change-endpoint': 'authentication/KChangeEndpoint',
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
              timeline: tours['timeline'],
              fab: tours['fab']
            },
            children: {
              add: {
                name: 'add-map-layer',
                component: 'catalog/KAddLayer',
                tour: {
                  'add-layer': tours['add-layer'],
                  'import-layer': tours['import-layer'],
                  'connect-layer': tours['connect-layer'],
                  'create-layer': tours['create-layer']
                }
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
              timeline: tours['timeline'],
              fab: tours['fab']
            }
          }
        }
      }
    }
  },
  '*': 'Error404'
}
