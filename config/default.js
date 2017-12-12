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
  sideNav: {
    user_identity: 'account/KIdentityPanel',
    user_organisation: 'KOrganisationsPanel',
    user_actions: 'layout/KLinksPanel'
  },
  user_identity: {
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
    actions: [
      { icon: 'map', route: { name: 'map', params: {} } },
      { icon: 'terrain', route: { name: 'globe', params: {} } },
      { icon: 'whatshot', route: { name: 'events-activity', params: { operation: 'current-events' } } },
      { icon: 'group', route: { name: 'members-activity', params: {} } },
      { icon: 'folder', route: { name: 'groups-activity', params: {} } },
      { icon: 'settings', route: { name: 'settings-activity', params: { perspective: 'properties' } } }
    ]
  },
  map: require('./map'),
  globe: require('./globe'),
  routes: require('./routes')
}
