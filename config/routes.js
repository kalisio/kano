module.exports = {
  '/' : {
    name: 'index',
    component: 'Index',
    // By default all child routes are considered unauthenticated,
    // will be overriden when required
    meta: { unauthenticated: true },
    children: {
      'login': 'authentication/KLogin',
      'logout': {
        component: 'authentication/KLogout',
        meta: { authenticated: true }
      },
      'register': 'authentication/KRegister',
      'change-endpoint': 'authentication/KChangeEndpoint',
      chlidren: {
        // The name of the route has to be set the default child
        name: 'home',
        component: 'layout/KHome',
        meta: { authenticated: true, unauthenticated: false }
      }
    }
  },
  '*': 'Error404'
}
