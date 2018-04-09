const website = 'https://www.kalisio.com'

const serverPort = process.env.PORT || 8081
// Required to know webpack port so that in dev we can build correct URLs
const clientPort = process.env.CLIENT_PORT || 8080
const API_PREFIX = '/api'
let domain
// If we build a specific staging instance
if (process.env.NODE_APP_INSTANCE === 'dev') {
  domain = 'https://app.dev.aktnmap.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'test') {
  domain = 'https://app.test.aktnmap.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'prod') {
  domain = 'https://app.aktnmap.xyz'
} else {
  // Otherwise we are on a developer machine
  if (process.env.NODE_ENV === 'development') {
    domain = 'http://localhost:' + clientPort
  } else {
    domain = 'http://localhost:' + serverPort
  }
}

module.exports = {
  // Special alias to host loopback interface in cordova
  //domain: 'http://10.0.2.2:8081',
  // If using port forwarding
  //domain: 'http://localhost:8081',
  // If using local IP on WiFi router
  //domain: 'http://192.168.1.16:8081',
  domain,
  version: require('../package.json').version,
  buildNumber: process.env.BUILD_NUMBER,
  apiPath: API_PREFIX,
  apiTimeout: 20000,
  transport: 'websocket', // Could be 'http' or 'websocket',
  appName: 'Akt\'n\'Map',
  appLogo: 'aktnmap-logo.png',
  publisher: 'Kalisio',
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
      { label: 'screen.ABOUT_KALISIO', url: website },
      { label: 'screen.CONTACT', url: website + '/contact' },
      { label: 'screen.TERMS_AND_POLICIES', url: website + '/terms' },
    ],
    header: 'aktnmap-banner.png'
  },
  login: {
    providers: ['google', 'github']
  },
  layout: {
    appBar: 'layout/KAppBar',
    sideNav: 'layout/KSideNav'
  },
  appBar: {
    title: 'Akt\'n\'Map',
    speech: {
      language: 'en'
    }
  },
  sideNav: {
    banner: 'aktnmap-banner.png',
    components: {
      user_identity: 'account/KIdentityPanel',
      user_dashboard: 'layout/KLinksPanel',
      user_organisation: 'KOrganisationsPanel',
      user_actions: 'layout/KLinksPanel'
    }
  },
  user_dashboard: {
    links: [
      { },
      { label: 'sideNav.DASHBOARD', icon: 'dashboard', route: { name: 'home' } }
    ]
  },
  user_organisations: {
    icon: 'domain',
    label: 'Organisations'
  },
  user_actions: {
    links: [
      { }, // separator
      { label: 'sideNav.LOGOUT', icon: 'exit_to_app', route: { name: 'logout' } }
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
