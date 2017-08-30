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
      { label: 'Users', icon: 'person', route: 'switch', params: { context: 'organisation._id', service: 'users' } },
      { label: 'Groups', icon: 'group', route: 'switch', params: { context: 'organisation._id', service: 'groups' } },
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
  switch: {
    create: 'editor/KEditor',
    edit: 'editor/KEditor',
    default: 'collection/KGrid'
  },
  users_grid: {
    actions: [
      { label: 'Edit', icon: 'create', scope: 'item', handler: 'editItem' },
      { label: 'Delete', icon: 'delete', scope: 'item', handler: 'deleteItem' }
    ]
  },
  groups_grid: {
    actions: [
      { label: 'Edit', icon: 'create', scope: 'item', handler: 'editItem' },
      { label: 'Delete', icon: 'delete', scope: 'item', handler: 'deleteItem' },
      { label: 'Create', icon: 'add', scope: 'fab', handler: 'createItem' }
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
            ':context?/:service/:action?/:id?/:perspective?': {
              name: 'switch',
              component: 'functional/KSwitch',
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
