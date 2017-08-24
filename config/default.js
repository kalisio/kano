module.exports = {
  apiPath: '/api',
  transport: 'websocket', // Could be 'http' or 'websocket',
  appName: 'kApp',
  appLogo: 'kalisio-logo.png',
  publisher: {
    name: 'Kalisio',
    website: 'https://www.kalisio.xyz',
    contact: 'support@kalisio.xyz'
  },
  logs: {
    level: (process.env.NODE_ENV === 'development' ? 'debug' : 'info')
  },
  screen: {
    footer: [
      { label: 'About Kalisio', url: 'https://www.kalisio.xyz' },
      { label: 'Contact', url: 'https://www.kalisio.xyz/contact' },
      { label: 'Terms & Policies', url: 'https://www.kalisio.xyz/terms' },
    ],
    header: 'kalisio-banner.png'
  },
  login: {
    providers: ['google', 'github']
  },
  layout: {
    appBar: 'layout/KAppBar',
    sideNav: 'layout/KSideNav'
  },
  appBar: {
    title: 'kApp',
    subtitle: 'A template application powered by Kalisio',
    speech: {
      language: 'en'
    }
  },
  tabNav: {
    User: [
      { icon: 'account_box', label: 'Profile', route: 'profile' },
      { icon: 'security', label: 'Security', route: 'security' },
      { icon: 'devices_other', label: 'Sessions', route: 'sessions' }
    ]
  },
  sideNav: {
    user_identity: 'layout/KIdentity',
    user_organisations: 'layout/KLinkGroup',
    user_actions: 'layout/KLinkList'
  },
  user_identity: {
  },
  user_organisations: {
    icon: 'domain',
    label: 'Organisations',
    bgColor: 'bg-faded',
    textColor: 'text-light',
    content: [
      'user_organisationList',
      'user_organisationActions' 
    ]
  },
  user_organisationList: {
    data: 'user.organisations'
  },
  user_organisationActions: {
    data: [
      { label: 'Organisations', icon: 'build', route: 'organisations' },
    ]
  },
  user_actions: {
    data: [
      { label: 'Users', icon: 'person', route: 'users' },
      { label: 'Groups', icon: 'group', route: 'groups' },
      { }, // separator
      { label: 'Logout', icon: 'exit_to_app', route: 'logout' }
    ]
  },
  routes: {
    '/' : {
      name: 'index',
      component: 'Index',
      children: {
        'login': 'authentication/KLogin',
        'logout': 'authentication/KLogout',
        'register': 'authentication/KRegister',
        'reset-password': 'authentication/KResetPassword',
        'home': {
          component: 'layout/KHome',
          children: {
            'users': 'users/KUsers',
            'users/create': {
              name: 'create-user',
              component: 'editor/KEditor',
              props: {
                service: { path: 'users' },
                parameters: { schema: 'user.create' }
              }
            },
            'user/edit': {
              name: 'edit-user',
              component: 'editor/KEditor',
              props: {
                service: { path: 'users' },
                object: 'user',
                parameters: { schema: 'user.profile.update' }
              }
            },
            'user/profile': {
              name: 'profile',
              component: 'editor/KEditor',
              props: {
                service: { path: 'users' },
                object: 'user',
                parameters: { schema: 'user.profile.update' }
              }
            },
            'groups': 'groups/KGroups',
            'group/create': {
              name: 'create-group',
              component: 'editor/KEditor',
              props: {
                service: { path: 'groups', context: 'organisation' },
                parameters: { schema: 'group.update' }
              }
            },
            'group/edit': {
              name: 'edit-group',
              component: 'editor/KEditor',
              props: {
                service: { path: 'groups', context: 'organisation' },
                object: 'selection',
                parameters: { schema: 'group.update' }
              }
            }
          }
        }
      }
    },
    '*': 'Error404'
  },
  groups: {
    // nbItemsPerPage: '12',
    context: 'organisation',
    createItem: 'create-group',
    editItem: 'edit-group'
  },
  users: {
    // renderer: 'users/UserCardItem',
    // nbItemsPerPage: '12',
    context: 'organisation',
    createItem: 'create-user',
    editItem: 'edit-user'
  }
}
