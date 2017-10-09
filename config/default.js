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
      { label: 'Map', icon: 'map', route: { name: 'map' } },
      { }, // separator
      { label: 'Logout', icon: 'exit_to_app', route: { name: 'logout' } }
    ]
  },
  map: {
    baseLayers: [
      {
        type: 'tileLayer',
        arguments: [
          'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
          {
            maxZoom: 20,
            label: 'Streets',
            attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          }
        ]
      },
      {
        type: 'tileLayer',
        arguments: [
          'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png',
          {
            maxZoom: 20,
            label: 'Satellite',
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
                        'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          }
        ]
      },
      {
        type: 'tileLayer',
        arguments: [
          'http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png',
          {
            maxZoom: 20,
            label: 'Neutral',
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
                         'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
          }
        ]
      }
    ]
  },
  routes: {
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
        'verify-signup/:token': 'account/KVerifySignup',
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
        'change-identity/:token': 'account/KChangeIdentity',
        'home': {
          component: 'layout/KHome',
          meta: { authenticated: true, unauthenticated: false },
          children: {
            'account/:perspective': {
              name: 'account-activity',
              component: 'account/KAccountActivity',
              props: true
            },
            'map': {
              component: 'KMap'
            },
            ':contextId': {
              name: 'organisation',
              component: 'KOrganisationActivity',
              props: true,
              children: {
                'members/:id?/:perspective?': {
                  name: 'members-activity',
                  component: 'KMembersActivity',
                  props: true
                },
                'groups/:id?/:perspective?': {
                  name: 'groups-activity',
                  component: 'KGroupsActivity',
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
}
