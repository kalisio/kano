module.exports = {
  // Special alias to host loopback interface in cordova
  //domain: 'http://10.0.2.2:8081',
  // If using port forwarding
  //domain: 'http://localhost:8081',
  // If using local IP on WiFi router
  domain: 'http://192.168.1.16:8081',
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
  roles: {
    // Member/Manager/Owner
    colors: ['amber', 'orange', 'deep-orange'],
    icons: ['person', 'work', 'verified_user']
  },
  screen: {
    footer: [
      { label: 'ABOUT_KALISIO', url: 'https://www.kalisio.xyz' },
      { label: 'CONTACT', url: 'https://www.kalisio.xyz/contact' },
      { label: 'TERMS_AND_POLICIES', url: 'https://www.kalisio.xyz/terms' },
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
  sideNav: {
    banner: 'kalisio-banner.png',
    components: {
      user_identity: 'account/KIdentityPanel',
      user_dashboard: 'layout/KLinksPanel',
      user_organisation: 'KOrganisationsPanel',
      user_actions: 'layout/KLinksPanel'
    }
  },
  user_identity: {
  },
  user_dashboard: {
    links: [
      { label: 'Dashboard', icon: 'dashboard', route: { name: 'home' } }
    ]
  },
  user_organisations: {
    icon: 'domain',
    label: 'Organisations',
    bgColor: 'bg-faded',
    textColor: 'text-light'
  },
  user_actions: {
    links: [
      { }, // separator
      { label: 'Logout', icon: 'exit_to_app', route: { name: 'logout' } }
    ]
  },
  context: {
    service: 'organisations',
    /* Due to complex authorisation management this is now done in the Context app component
    actions: [ ... ]
    */
  },
  map: require('./map'),
  globe: require('./globe'),
  routes: require('./routes')
}
