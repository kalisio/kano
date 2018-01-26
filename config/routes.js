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
      'confirm-invitation/:token': {
        component: 'account/KConfirmInvitation',
        props: true
      },
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
            redirect: { name: 'dashboard' }
          },
          'dashboard': {
            path: 'dashboard',
            component: 'DashboardActivity'
          },
          'account/:perspective': {
            name: 'account-activity',
            component: 'account/KAccountActivity',
            props: true
          },
          'create-organisation' : {
            name: 'create-organisation',
            component: 'editor/KModalEditor',
            props: true
          },
          ':contextId': {
            // The name of the route has to be set the default child
            name: '',
            component: 'Context',
            props: true,
            children: {
              'default-context-view': {
                // Because this child is the default one path is empty and name is the one of the parent route
                path: '',
                name: 'context',
                redirect: { name: 'events-activity' }
              },
              'members': {
                name: 'members-activity', 
                component: 'KMembersActivity', 
                props: true,
                children: {
                  'invite': { name: 'invite-member', component: 'KInviteMember', props: true },
                  'add': { name: 'add-member', component: 'KAddMember', props: true },
                  ':id/tag': { name: 'tag-member', component: 'editor/KModalEditor', props: true },
                  ':id/join-group': { name: 'join-group', component: 'KJoinGroup', props: true }
                }
              },
              'groups': {
                name: 'groups-activity',
                component: 'KGroupsActivity',
                props: true,
                children: {
                  'create': { name: 'create-group', component: 'editor/KModalEditor', props: true },
                  'edit/:id': { name: 'edit-group', component: 'editor/KModalEditor', props: true }
                }
              },
              'events': {
                name: 'events-activity',
                component: 'KEventsActivity',
                props: true,
                children: {
                  'create/:templateId': { name: 'create-event', component: 'KEventEditor', props: true },
                  'edit/:id': { name: 'edit-event', component: 'KEventEditor', props: true },
                  'add-media/:id': { name: 'add-media', component: 'KAddEventMedia', props: true },
                }
              },
              'events/:id': {
                name: 'event-activity',
                component: 'KEventActivity',
                props: true,
                children: {
                  'log/:logId': { name: 'event-log', component: 'KEventLogEditor', props: true },
                  'browse-media': { name: 'browse-media', component: 'KGallery', props: true }
                }
              },
              'event-templates': {
                name: 'event-templates-activity',
                component: 'KEventTemplatesActivity',
                props: true,
                children: {
                  'create': { name: 'create-event-template', component: 'KEventTemplateEditor', props: true },
                  'edit/:id/:perspective?': { name: 'edit-event-template', component: 'KEventTemplateEditor', props: true }
                }
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
