module.exports = {
  apiPath: '/api',
  transport: 'websocket', // Could be 'http' or 'websocket',
  appName: 'kApp',
  appLogo: 'kaelia-logo.png',
  publisher: {
    name: 'Kaelia Tech',
    website: 'https://www.kaelia-tech.com',
    contact: 'support@kaelia-tech.com'
  },
  logs: {
    level: (process.env.NODE_ENV === 'development' ? 'debug' : 'info')
  },
  screen: {
    footer: [
      { label: 'About Kaelia Tech', url: 'https://www.kaelia-tech.com' },
      { label: 'Contact', url: 'https://www.kaelia-tech.com/terms/contact' },
      { label: 'Terms & Policies', url: 'https://www.kaelia-tech.com/terms' },
    ],
    header: 'kaelia-banner.png'
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
    subtitle: 'A template application powered by Kaelia',
    speech: {
      language: 'en'
    }
  },
  tabNav: {
    User: [
      { icon: 'account_box', route: 'profile' },
      { icon: 'security', route: 'security' },
      { icon: 'devices_other', route: 'sessions' }
    ]
  },
  sideNav: {
    identity: 'layout/KIdentity',
    links: [
      { label: 'Organisations', icon: 'group_work', route: 'organisations' },
      { label: 'Groups', icon: 'group', route: 'groups' },
      { label: 'Users', icon: 'person', route: 'users' },
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
            'profile/:id': 'editor/KEditor',
            'security/:id': 'users/KUserSecurity',
            'sessions/:id': 'users/KUserSessions'
          }
        }
      }
    },
    '*': 'Error404'
  },
  organisations: {
    // renderer: 'organisations/OrganisationCardItem',
    // nbItemsPerPage: '12',
    mixins: ['baseCollection', 'createItem', 'deleteItem', 'editItem'],
    form: 'editOrganisation'
  },
  groups: {
    // renderer: 'groups/GroupCardItem',
    // nbItemsPerPage: '12',
    mixins: ['baseCollection', 'createItem', 'deleteItem', 'editItem'],
    form: 'editGroup'
  },
  users: {
    // renderer: 'users/UserCardItem',
    // nbItemsPerPage: '12',
    mixins: ['baseCollection', 'createItem', 'deleteItem', 'editItem'],
    form: 'editUser'
  }
}
