module.exports = {
  domain: 'http://10.0.2.2:8081', // Special alias to host loopback interface in cordova
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
    user_identity: 'layout/KIdentity',
    user_organisation: 'KOrganisationsPanel',
    user_actions: 'layout/KLinkList'
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
    data: [
      { label: 'Users', icon: 'group', route: 'users-activity', params: { context: 'organisation._id', } },
      { label: 'Groups', icon: 'folder', route: 'groups-activity', params: { context: 'organisation._id' } },
      { }, // separator
      { label: 'Map', icon: 'map', route: 'map' },
      { }, // separator
      { label: 'Logout', icon: 'exit_to_app', route: 'logout' }
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
      children: {
        'login': 'authentication/KLogin',
        'logout': 'authentication/KLogout',
        'register': 'authentication/KRegister',
        'change-endpoint': 'authentication/KChangeEndpoint',
        'resend-verify-signup': 'account/KResendVerifySignup',
        'verify-signup/:token': 'account/KVerifySignup',
        'send-reset-password': 'account/KSendResetPassword',
        'reset-password/:token': 'account/KResetPassword',
        'change-identity/:token': 'account/KChangeIdentity',
        'home': {
          component: 'layout/KHome',
          children: {
            'identity/:operation/:id/:perspective?': {
              name: 'identity-activity',
              component: 'activity/KIdentityActivity',
              props: true
            },
            'organisations/:operation/:id?/:perspective?': {
              name: 'organisations-activity',
              component: 'KOrganisationsActivity',
              props: true
            },
            ':context?/users/:operation?/:id?/:perspective?': {
              name: 'users-activity',
              component: 'activity/KUsersActivity',
              props: true
            },
            ':context?/groups/:operation?/:id?/:perspective?': {
              name: 'groups-activity',
              component: 'KGroupsActivity',
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
