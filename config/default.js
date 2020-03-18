const serverPort = process.env.PORT || 8081
// Required to know webpack port so that in dev we can build correct URLs
const clientPort = process.env.CLIENT_PORT || 8080
const API_PREFIX = '/api'
let domain
// If we build a specific staging instance
if (process.env.NODE_APP_INSTANCE === 'dev') {
  domain = 'https://kano.dev.kalisio.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'test') {
  domain = 'https://kano.test.kalisio.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'prod') {
  domain = 'https://kano.kalisio.xyz'
} else {
  // Otherwise we are on a developer machine
  if (process.env.NODE_ENV === 'development') {
    domain = 'http://localhost:' + clientPort // Kano app client/server port = 8080/8081
  } else {
    domain = 'http://localhost:' + serverPort // Kano app client/server port = 8081
  }
}
// Override defaults if env provided
if (process.env.SUBDOMAIN) {
  domain = 'https://kano.' + process.env.SUBDOMAIN
}
// On a developer machine will do domain = gateway = localhost
const gateway = domain.replace('kano', 'api')

module.exports = {
  // Special alias to host loopback interface in cordova
  //domain: 'http://10.0.2.2:8081',
  // If using port forwarding
  //domain: 'http://localhost:8081',
  // If using local IP on WiFi router
  //domain: 'http://192.168.1.16:8081',
  domain,
  flavor: process.env.NODE_APP_INSTANCE || 'dev',
  version: require('../package.json').version,
  buildNumber: process.env.BUILD_NUMBER,
  apiPath: API_PREFIX,
  apiJwt: 'kano-jwt',
  apiTimeout: 30000,
  transport: 'websocket', // Could be 'http' or 'websocket',
  gateway: 'https://api.',
  gatewayJwtField: 'jwt',
  gatewayJwt: 'kano-gateway-jwt',
  appName: 'Kano',
  appLogo: 'kano-icon-32x32.png',
  appWebsite: 'https://github.com/kalisio/kano',
  publisher: 'Kalisio',
  publisherWebsite: 'https://www.kalisio.com',
  locale: {
    // If you'd like to force locale otherwise it is retrieved from browser
    //default: 'en',
    fallback: 'en'
  },
  logs: {
    level: (process.env.NODE_ENV === 'development' ? 'debug' : 'info')
  },
  screens: {
    banner: 'kano-logo-black-256x84.png',
    login: {
      providers: [],
      links: []
    },
    logout: {
      links: [
        { id: 'login-link', label: 'KLogout.LOG_IN_AGAIN_LINK', route: { name: 'login' } },
      ]
    },
    changeEndpoint: {
      links: [
        { id: 'login-link', label: 'KChangeEndpoint.LOGIN_LINK', route: { name: 'login' } }
      ]
    }
  },
  layout: {
    view: 'lHh LpR lFf',
    leftDrawer: {
      behavior: 'mobile',
      component: {
        name: 'layout/KSideNav'
      }
    },
    rightDrawer: {
      behavior: 'mobile'
    }
  },
  sideNav: {
    banner: 'kano-logo-black-256x84.png',
    components: {
      //user_actions: 'layout/KLinksPanel',
      app_settings: 'Settings',
      app_about: 'layout/KAbout',
      app_logout: 'layout/KLinksPanel'
    }
  },
  user_actions: {
    links: [
      { }, // separator
      { label: 'sideNav.MAP', icon: 'map', route: { name: 'map', query: true } },
      { label: 'sideNav.GLOBE', icon: 'terrain', route: { name: 'globe', query: true } }
    ]
  },
  app_logout: {
    links: [
      { }, // separator
      { label: 'sideNav.LOGOUT', icon: 'exit_to_app', route: { name: 'logout' } }
    ]
  },
  mapCatalog: {
    categories: [
      { name: 'BaseLayers', label: 'KCatalogPanel.BASE_LAYERS', icon: 'fas fa-map',
        options: { exclusive: true, filter: { type: 'BaseLayer' } } },
      { name: 'BusinessLayers', label: 'KCatalogPanel.BUSINESS_LAYERS', icon: 'layers',
        options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['business'] } } } },
      { name: 'OverlayLayers', label: 'KCatalogPanel.OVERLAY_LAYERS', icon: 'fas fa-map-marker',
        options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $exists: false } } } },
      { name: 'MeasureLayers', label: 'KCatalogPanel.MEASURE_LAYERS', icon: 'fas fa-map-pin',
        options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['measure'] } } } },
      { name: 'MeteoLayers', label: 'KCatalogPanel.METEO_LAYERS', icon: 'wb_sunny',
        options: { exclusive: true, filter: { type: 'OverlayLayer', tags: { $in: ['weather'] } } } },
      { name: 'ArchiveLayers', label: 'KCatalogPanel.ARCHIVE_LAYERS', icon: 'archive',
        options: { exclusive: true, filter: { type: 'OverlayLayer', tags: { $in: ['archive'] } } } }
    ]
  },
  globeCatalog: {
    categories: [
      { name: 'BaseLayers', label: 'KCatalogPanel.BASE_LAYERS', icon: 'fas fa-map',
        options: { exclusive: true, filter: { type: 'BaseLayer' } } },
      { name: 'TerrainLayers', label: 'KCatalogPanel.TERRAIN_LAYERS', icon: 'terrain',
        options: { exclusive: true, filter: { type: 'TerrainLayer' } } },
      { name: 'BusinessLayers', label: 'KCatalogPanel.BUSINESS_LAYERS', icon: 'layers',
        options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['business'] } } } },
      { name: 'OverlayLayers', label: 'KCatalogPanel.OVERLAY_LAYERS', icon: 'fas fa-map-marker',
        options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $exists: false } } } },
      { name: 'MeasureLayers', label: 'KCatalogPanel.MEASURE_LAYERS', icon: 'fas fa-map-pin',
        options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['measure'] } } } },
      { name: 'ArchiveLayers', label: 'KCatalogPanel.ARCHIVE_LAYERS', icon: 'archive',
        options: { exclusive: true, filter: { type: 'OverlayLayer', tags: { $in: ['archive'] } } } }
    ]
  },
  mapActivity: {
    tools: ['side-nav', 'track-location', 'location-bar', 'globe', 'fullscreen', 'catalog'],
    actions: ['probe-location', 'create-layer'],
    layerActions: ['zoom-to', 'save', 'edit', 'view-data', 'chart-data', 'edit-data', 'remove']/*,
    components: [{
      name: 'site-seeker',
      component: 'SiteSeeker'
    }]*/
  },
  globeActivity: {
    tools: ['side-nav', 'track-location', 'location-bar', 'map', 'vr', 'fullscreen', 'catalog'],
    actions: ['probe-location']
  },
  map: {
    viewer: {
      minZoom: 3,
      maxZoom: 21,
      center: [47, 3],
      zoom: 6,
      maxBounds: [ [-90, -180], [90, 180] ],
      maxBoundsViscosity: 0.25,
      timeDimension: true,
    },
    // Default GeoJSON layer style for polygons/lines
    featureStyle: {
      opacity: 1,
      color: 'red',
      'fill-opacity': 0.5,
      'fill-color': 'green'
    },
    // Default GeoJSON layer style for points
    pointStyle: {
      'marker-type': 'circleMarker',
      radius: 6,
      stroke: 'red',
      'stroke-opacity': 1,
      'fill-opacity': 0.5,
      'fill-color': 'green'
    },
    // Default GeoJSON popup will display all properties
    popup: {},
    cluster: { disableClusteringAtZoom: 18 },
    fileLayers: {
      fileSizeLimit : 1024 * 1024,
      formats: [ '.geojson', '.kml', '.gpx' ]
    }
  },
  globe: {
    viewer: {
      sceneMode : 3, // SceneMode.COLUMBUS_VIEW = 1, SceneMode.SCENE3D = 3,
      sceneModePicker : false,
      scene3DOnly : true,
      homeButton : false,
      geocoder : false,
      navigationHelpButton : false,
      baseLayerPicker : false,
      vrButton: false,
      fullscreenButton: false,
      animation: false,
      timeline: false,
      creditContainer: 'globe-credit'
    },
    fileLayers: {
      clearOnDrop : false,
      flyToOnDrop: true,
      clampToGround: true
    },
    // Default GeoJSON layer style for points/polygons/lines in simple style spec
    featureStyle: {
      'marker-symbol': 'marker',
      'marker-color': '#57D824',
      stroke: '#FF0000',
      'fill-color': '#00FF00'
    },
    entityStyle: {
      billboard: {
        heightReference: 'Cesium.HeightReference.CLAMP_TO_GROUND'
      },
      label: {
        heightReference: 'Cesium.HeightReference.CLAMP_TO_GROUND',
        verticalOrigin: 'Cesium.VerticalOrigin.BASELINE'
      },
      polyline: {
        clampToGround: true
      }
    },
    tooltip: {
      options: {
        showBackground : true,
        backgroundColor: 'Cesium.Color.WHITE',
        font : '14px monospace',
        fillColor : 'Cesium.Color.BLACK',
        outlineColor : 'Cesium.Color.BLACK',
        horizontalOrigin : 'Cesium.HorizontalOrigin.LEFT',
        verticalOrigin : 'Cesium.VerticalOrigin.CENTER',
        pixelOffset : {
          type: 'Cesium.Cartesian2',
          options: [32, -32]
        }
      }
    },
    popup: {
      options: {
        showBackground : true,
        backgroundColor: 'Cesium.Color.WHITE',
        font : '14px monospace',
        fillColor : 'Cesium.Color.BLACK',
        outlineColor : 'Cesium.Color.BLACK',
        horizontalOrigin : 'Cesium.HorizontalOrigin.CENTER',
        verticalOrigin : 'Cesium.VerticalOrigin.BOTTOM',
        pixelOffset : {
          type: 'Cesium.Cartesian2',
          options: [0, -64]
        }
      }
    },
    clusterStyle: {
      label: {
        show: true,
        text: '<%= entities.length.toLocaleString() %>'
      }
    }
  },
  routes: require('../src/router/routes')
}
