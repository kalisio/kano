const tours = require('../tours')

module.exports = {
  '/' : {
    name: 'index',
    component: 'Index',
    // By default all child routes are considered unauthenticated,
    // will be overriden when required
    meta: { unauthenticated: true },
    children: {
      'login': {
        component: 'authentication/KLogin',
        tour: tours.login
      },
      'logout': {
        component: 'authentication/KLogout',
        meta: { authenticated: true }
      },
      'change-endpoint': 'authentication/KChangeEndpoint',
      'home': {
        // The name of the route has to be set the default child
        name: '',
        component: 'layout/KHome',
        meta: { authenticated: true, unauthenticated: false },
        children: {
          'default-home-view': {
            // Because this child is the default one path is empty and name is the one of the parent route
            path: '',
            name: 'home',
            redirect: { name: 'map' },
            tour: tours.home
          },
          'map/:south?/:west?/:north?/:east?': {
            name: 'map',
            component: 'MapActivity',
            embedApi: true,
            tour: {
              'side-nav': tours['side-nav'],
              'navigation-bar': tours['navigation-bar'],
              'catalog-panel': tours['catalog-panel']
            }
          },
          'globe/:south?/:west?/:north?/:east?': {
            name: 'globe',
            component: 'GlobeActivity',
            embedApi: true,
            tour: {
              'side-nav': tours['side-nav'],
              'navigation-bar': tours['navigation-bar'],
              'catalog-panel': tours['catalog-panel']
            }
          }
        }
      }
    }
  },
  '*': 'Error404'
}
