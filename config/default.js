const website = 'https://www.kalisio.com'

const serverPort = process.env.PORT || 8081
// Required to know webpack port so that in dev we can build correct URLs
const clientPort = process.env.CLIENT_PORT || 8080
const API_PREFIX = '/api'
let domain, weacastApi
// If we build a specific staging instance
if (process.env.NODE_APP_INSTANCE === 'dev') {
  domain = 'https://kano.dev.kalisio.xyz'
  weacastApi = 'https://weacast.dev.kalisio.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'test') {
  domain = 'https://kano.test.kalisio.xyz'
  weacastApi = 'https://weacast.test.kalisio.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'prod') {
  domain = 'https://kano.kalisio.xyz'
  weacastApi = 'https://weacast.kalisio.xyz'
} else {
  // Otherwise we are on a developer machine
  if (process.env.NODE_ENV === 'development') {
    domain = 'http://localhost:' + clientPort // Kano app client/server port = 8080/8081
    weacastApi = 'http://localhost:' + (clientPort+2) // Weacast app client/server port = 8082/8083
  } else {
    domain = 'http://localhost:' + serverPort // Kano app client/server port = 8081
    weacastApi = 'http://localhost:' + (serverPort+1) // Weacast app client/server port = 8082
  }
}
// Override defaults if env provided
if (process.env.SUBDOMAIN) {
  domain = 'https://kano.' + process.env.SUBDOMAIN
  weacastApi = 'https://weacast.' + process.env.SUBDOMAIN
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
  appName: 'Kano',
  appLogo: 'kano-icon-64x64.png',
  publisher: 'Kalisio',
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
    leftBreakpoint: 9999,
    rightBreakpoint: 9999
  },
  sideNav: {
    banner: 'kano-logo-black-256x84.png',
    components: {
      user_actions: 'layout/KLinksPanel'
    }
  },
  user_actions: {
    links: [
      { }, // separator
      { label: 'sideNav.MAP', icon: 'layers', route: { name: 'map', query: true } },
      { label: 'sideNav.GLOBE', icon: 'terrain', route: { name: 'globe', query: true } },
      { }, // separator
      { label: 'sideNav.LOGOUT', icon: 'exit_to_app', route: { name: 'logout' } }
    ]
  },
  mapPanel: {
    categories: [
      { name: 'BusinessLayers', label: 'LayersPanel.BUSINESS_LAYERS', icon: 'layers',
        options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['business'] } } } },
      { name: 'MeteoLayers', label: 'LayersPanel.METEO_LAYERS', icon: 'wb_sunny',
        options: { exclusive: true, filter: { type: 'OverlayLayer', tags: { $in: ['weather'] } } } },
      { name: 'MeasureLayers', label: 'LayersPanel.MEASURE_LAYERS', icon: 'fa-map-pin',
        options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['measure'] } } } },
      { name: 'OverlayLayers', label: 'LayersPanel.OVERLAY_LAYERS', icon: 'fa-map-marker',
        options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $exists: false } } } },
      { name: 'BaseLayers', label: 'LayersPanel.BASE_LAYERS', icon: 'fa-map',
        options: { exclusive: true, filter: { type: 'BaseLayer' } } }
    ]
  },
  globePanel: {
    categories: [
      { name: 'BusinessLayers', label: 'LayersPanel.BUSINESS_LAYERS', icon: 'layers',
        options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['business'] } } } },
      { name: 'MeasureLayers', label: 'LayersPanel.MEASURE_LAYERS', icon: 'fa-map-pin',
        options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $in: ['measure'] } } } },
      { name: 'OverlayLayers', label: 'LayersPanel.OVERLAY_LAYERS', icon: 'fa-map-marker',
        options: { exclusive: false, filter: { type: 'OverlayLayer', tags: { $exists: false } } } },
      { name: 'BaseLayers', label: 'LayersPanel.BASE_LAYERS', icon: 'fa-map',
        options: { exclusive: true, filter: { type: 'BaseLayer' } } },
      { name: 'TerrainLayers', label: 'LayersPanel.TERRAIN_LAYERS', icon: 'terrain',
        options: { exclusive: true, filter: { type: 'TerrainLayer' } } }
    ]
  },
  weacast: {
    // Kano app proxy all request to Weacast app
    apiUrl: weacastApi,
    apiPath: API_PREFIX,
    apiTimeout: 30000
  },
  map: {
    viewer: {
      minZoom: 3,
      center: [47, 3],
      zoom: 6,
      maxBounds: [ [-90, -180], [90, 180] ],
      maxBoundsViscosity: 0.25,
      timeDimension: true,
    },
    // Default GeoJSON layer style for polygons/lines
    featureStyle: {
      opacity: 1,
      radius: 6,
      color: 'red',
      fillOpacity: 0.5,
      fillColor: 'green'
    },
    // Default GeoJSON layer style for points
    pointStyle: {
      type: 'circleMarker',
      options: {
        opacity: 1,
        color: 'red',
        fillOpacity: 0.5,
        fillColor: 'green'
      }
    },
    // Default GeoJSON popup will display all properties
    popup: {},
    cluster: {},
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
      //creditContainer: 'xxx',
      timeline: false
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
      'stroke': '#FF0000',
      'fill': '#00FF00'
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
    },
    clusterStyle: {
      label: {
        show: true,
        text: '<%= entities.length.toLocaleString() %>'
      }
    },
    cluster: {
      pixelRange: 50
    }
  },
  routes: require('./routes')
}
