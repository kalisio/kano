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
        // The name of the route has to be set the default child
        name: '',
        component: 'layout/KHome',
        meta: { authenticated: true, unauthenticated: false },
        children: {
          'dashboard': {
            // Because this child is the default one path is empty and name is the one of the parent route
            path: '',
            name: 'home',
            component: 'KMap'
          },
          'account/:perspective': {
            name: 'account-activity',
            component: 'account/KAccountActivity',
            props: true
          },
          ':contextId': {
            // The name of the route has to be set the default child
            name: '',
            component: 'Context',
            props: true,
            children: {
              'map': {
                // Because this child is the default one path is empty and name is the one of the parent route
                path: '',
                name: 'context',
                component: 'KMap'
              },
              'globe': {
                component: 'KGlobe'
              },
              'members': {
                name: 'members-activity',
                component: 'KMembersActivity',
                props: true,
                children: {
                  'invite': {
                    name: 'invite-member',
                    component: 'KInviteMember',
                  },
                  'add': {
                    name: 'add-member',
                    component: 'KAddMember'
                  },
                  'edit/:id/:perspective?': {
                    name: 'edit-member',
                    component: 'editor/KModalEditor',
                    props: true
                  }
                }
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
