const website = 'https://www.kalisio.com'

const serverPort = process.env.PORT || 8081
// Required to know webpack port so that in dev we can build correct URLs
const clientPort = process.env.CLIENT_PORT || 8080
const API_PREFIX = '/api'
let domain
// If we build a specific staging instance
if (process.env.NODE_APP_INSTANCE === 'dev') {
  domain = 'https://kapp.dev.kalisio.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'test') {
  domain = 'https://kapp.test.kalisio.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'prod') {
  domain = 'https://kapp.kalisio.xyz'
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
  appName: 'kApp',
  appLogo: 'kalisio-logo.png',
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
      { label: 'screen.CONTACT', url: website + '/#footer' },
      { label: 'screen.TERMS_AND_POLICIES', url: domain + '/#/terms' },
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
    speech: {
      language: 'en'
    }
  },
  sideNav: {
    banner: 'kalisio-banner.png',
    components: {
      user_actions: 'layout/KLinksPanel'
    }
  },
  user_actions: {
    links: [
      { }, // separator
      { label: 'sideNav.LOGOUT', icon: 'exit_to_app', route: { name: 'logout' } }
    ]
  },
  routes: require('./routes')
}
