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
      'resend-verify-signup': 'account/KResendVerifySignup',
      'verify-signup/:token': {
        component: 'account/KVerifySignup',
        meta: { authenticated: true }
      },
      'send-reset-password': 'account/KSendResetPassword',
      'change-password': {
        component: 'account/KChangePassword',
        meta: { authenticated: true, unauthenticated: false }
      },
      'reset-password/:token': 'account/KResetPassword',
      'send-change-identity': {
        component: 'account/KSendChangeIdentity',
        meta: { authenticated: true, unauthenticated: false }
      },
      'change-identity/:token': {
        component: 'account/KChangeIdentity',
        meta: { authenticated: true }
      },
      'home': {
        component: 'layout/KHome',
        meta: { authenticated: true, unauthenticated: false },
        children: {
          'account/:perspective': {
            name: 'account-activity',
            component: 'account/KAccountActivity',
            props: true
          },
          ':contextId': {
            name: 'context',
            component: 'layout/KContext',
            props: true,
            children: {
              'map': {
                component: 'KMap'
              },
              'globe': {
                component: 'KGlobe'
              },
              'members/:operation?/:id?/:perspective?': {
                name: 'members-activity',
                component: 'KMembersActivity',
                props: true
              },
              'groups/:operation?/:id?/:perspective?': {
                name: 'groups-activity',
                component: 'KGroupsActivity',
                props: true
              },
              'events/:operation?/:id?/:perspective?': {
                name: 'events-activity',
                component: 'KEventsActivity',
                props: true
              },
              ':perspective': {
                name: 'settings-activity',
                component: 'KSettingsActivity',
                props: true
              }
            }
          }
        }
      }
    }
  },
  '*': 'Error404'
}
