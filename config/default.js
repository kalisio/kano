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
    ],
    Group: [
      { icon: 'description', label: 'Group', route: 'edit-group' },
      { icon: 'group', label: 'Members', route: 'list-group-members' },
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
      { label: 'Users', icon: 'person', route: 'find' },
      { label: 'Groups', icon: 'group', route: 'find' },
      { }, // separator
      { label: 'Map', icon: 'map', route: 'map' },
      { }, // separator
      { label: 'Logout', icon: 'exit_to_app', route: 'logout' }
    ]
  },
  map: {
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
            ':context?/:service': {
              name: 'find',
              component: 'collection/KCollection',
              props: true
            },
            ':context?/:service/create': {
              name: 'create',
              component: 'editor/KEditor',
              props: true
            },
            ':context?/:service/update/:id/:perspective?': {
              name: 'update',
              component: 'editor/KEditor',
              props: true
            },
            'map': {
              component: 'KMap'
            }
          }
        }
      }
    },
    '*': 'Error404'
  }
}
