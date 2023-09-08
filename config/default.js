const serverPort = process.env.PORT || 8081
// Required to know webpack port so that in dev we can build correct URLs
const clientPort = process.env.CLIENT_PORT || 8080
const API_PREFIX = '/api'
let domain
let pwaName = 'Kano'
// If we build a specific staging instance
if (process.env.NODE_APP_INSTANCE === 'dev') {
  domain = 'https://kano.dev.kalisio.xyz'
  pwaName += ' (dev)'
} else if (process.env.NODE_APP_INSTANCE === 'test') {
  domain = 'https://kano.test.kalisio.xyz'
  pwaName += ' (test)'
} else if (process.env.NODE_APP_INSTANCE === 'prod') {
  domain = 'https://kano.prod.kalisio.com'
} else {
  // Otherwise we are on a developer machine
  if (process.env.NODE_ENV === 'development') {
    domain = 'http://localhost:' + clientPort // Kano app client/server port = 8080/8081
  } else {
    domain = 'http://localhost:' + serverPort // Kano app client/server port = 8081
  }
}
// Override defaults if env provided at build time
if (process.env.SUBDOMAIN) {
  domain = 'https://kano.' + process.env.SUBDOMAIN
}
// On a developer machine will do domain = gateway = localhost
const gateway = (process.env.API_GATEWAY_URL ? process.env.API_GATEWAY_URL : domain.replace('kano', 'api'))

// Allow to override version number for custom build
const version = (process.env.VERSION ? process.env.VERSION : require('../package.json').version)

// Left pane
const leftPane = {
    content: [
      { component: 'KLogo' },
      { component: 'QSeparator' },
      { id: 'settings', icon: 'las la-cog', label: 'SETTINGS', renderer: 'item', dialog: {
          component: 'app/KSettings', title: 'SETTINGS', cancelAction: 'CANCEL', okAction: {
            id: 'apply-settings', label: 'APPLY', handler: 'apply'
          }
        }
      },
      { id: 'about', icon: 'las la-info', label: 'ABOUT', renderer: 'item', dialog: { 
          component: 'app/KAbout', title: 'ABOUT', okAction: 'CLOSE' } 
      },
      { id: 'contextual-help', icon: 'las la-question-circle', label: 'sideNav.CONTEXTUAL_HELP', handler: { name: 'launchTour', params: ['home'] }, renderer: 'item' },
      { component: 'QSeparator' },
      { id: 'logout', icon: 'las la-sign-out-alt', label: 'sideNav.LOGOUT', route: { name: 'logout' }, renderer: 'item' }
    ]
}

// left window
const leftWidgets = [
  { 
    id: 'legend-widget', label: 'KLegend.LABEL', icon: 'las la-list', scrollable: true,
    content: { component: 'legend/KLegend' }
  }
]

// top window
const topWidgets = [{ 
  id: 'information-box', label: 'KInformationBox.LABEL', icon: 'las la-digital-tachograph', scrollable: true,
  content: { component: 'widget/KInformationBox' },
  header: [{
    id: 'center-view',
    icon: 'las la-eye',
    tooltip: 'KInformationBox.CENTER_ON',
    visible: 'hasFeature',
    handler: 'onCenterOn'
  }, {
    id: 'copy-properties',
    icon: 'las la-clipboard',
    tooltip: 'KInformationBox.COPY_PROPERTIES',
    visible: 'hasProperties',
    handler: 'onCopyProperties'
  }, {
    id: 'export-feature',
    icon: 'kdk:json.svg',
    tooltip: 'KInformationBox.EXPORT_FEATURE',
    visible: 'hasFeature',
    handler: 'onExportFeature'
  }] 
}, {
  id: 'time-series', label: 'KTimeSeries.LABEL', icon: 'las la-chart-line', 
  content: { component: 'widget/KTimeSeries' },
  header: [{
    id: 'absolute-time-range',
    component: 'time/KAbsoluteTimeRange'
  }, {
    id: 'restore-time-range',
    icon: 'las la-undo',
    tooltip: 'KTimeSeries.RESTORE_TIME_RANGE',
    visible: 'hasZoomHistory',
    handler: 'onZoomRestored'
  }, {
    id: 'relative-time-ranges',
    component: 'menu/KMenu',
    icon: 'las la-history',
    content: [{
      component: 'time/KRelativeTimeRanges',
      ranges: ['last-hour', 'last-2-hours', 'last-3-hours', 'last-6-hours',
        'last-12-hours', 'last-day', 'last-2-days', 'last-3-days', 'last-week',
        'next-12-hours', 'next-day', 'next-2-days', 'next-3-days']
    }]
  }, {
    id: 'run-options',
    component: 'input/KOptionsChooser',
    icon: 'las la-clock',
    tooltip: 'KTimeSeries.RUN',
    visible: 'hasRunTimes',
    hideSelected: false,
    options: ':runOptions',
    on: { event: 'option-chosen', listener: 'onUpdateRun' }
  }, {
    id: 'center-view',
    icon: 'las la-eye',
    tooltip: 'KTimeSeries.CENTER_ON',
    visible: 'probedVariables',
    handler: 'onCenterOn'
  }, {
    id: 'export-feature',
    icon: 'las la-file-download',
    tooltip: 'KTimeSeries.EXPORT_SERIES',
    visible: 'probedVariables',
    handler: 'onExportSeries'
  }]
}, { 
  id: 'elevation-profile', label: 'KElevationProfile.LABEL', icon: 'las la-mountain', 
  content: { component: 'widget/KElevationProfile' },
  header: [{
    id: 'center-view',
    icon: 'las la-eye',
    tooltip: 'KElevationProfile.CENTER_ON',
    visible: 'hasFeature',
    handler: 'onCenterOn'
  }, {
    id: 'copy-properties',
    icon: 'las la-clipboard',
    tooltip: 'KElevationProfile.COPY_PROFILE',
    visible: 'hasProfile',
    handler: 'onCopyProfile'
  }, {
    id: 'export-feature',
    icon: 'kdk:json.svg',
    tooltip: 'KElevationProfile.EXPORT_PROFILE',
    visible: 'profile',
    handler: 'onExportProfile'
  }]
}, { 
  id: 'mapillary-viewer', label: 'KMapillaryViewer.LABEL', icon: 'kdk:mapillary.png',  
  content: { component: 'widget/KMapillaryViewer' },
  header: [{
    id: 'center',
    icon: 'las la-eye',
    tooltip: 'KMapillaryViewer.CENTER_ON',
    visible: 'hasImage',
    handler: 'centerMap'
  }]
}]

// Catalog tababr
function catalogTabbar (activeView) {
  return {
    id: 'catalog-tabbar', component: 'KPanel', class: 'q-pa-sm justify-center', actionRenderer: 'tab', content: [
      { 
        id: 'user-layers-tab', label: 'LAYERS_LABEL', color: 'grey-7', toggle: { color: 'primary' }, 
        toggled: activeView === 'user-layers' ? true : false,
        handler: { name: 'setRightPaneMode', params: ['user-layers'] } 
      },
      { 
        id: 'user-views-tab', label: 'VIEWS_LABEL', color: 'grey-7', toggle: { color: 'primary' },
        toggled: activeView === 'user-views' ? true : false,
        handler: { name: 'setRightPaneMode', params: ['user-views'] } 
      },
      { 
        id: 'catalog-layers-tab', label: 'CATALOG_LABEL', color: 'grey-7', toggle: { color: 'primary' },
        toggled: activeView === 'catalog-layers' ? true : false,
        handler: { name: 'setRightPaneMode', params: ['catalog-layers'] } 
      }
    ]
  }
}

// Catalog panes
const catalogPanes = {
  'user-layers': [
    catalogTabbar('user-layers'),
    { id: 'user-layers', component: 'catalog/KLayersPanel',
      layers: ':layers', layerCategories: ':layerCategories',
      layersFilter: { scope: { $in: ['user', 'activity'] } }, layerCategoriesFilter: { _id: { $exists: true } } },
    { component: 'QSpace' },
    { id: 'catalog-footer', component: 'KPanel', content: [{
        id: 'manage-layer-categories',
        icon: 'las la-cog',
        label: 'KLayerCategories.LAYER_CATEGORIES_LABEL',
        visible: { name: '$can', params: ['create', 'catalog'] },
        route: { name: 'manage-layer-categories' },
      }],
      class: 'justify-center'
    }
  ],
  'user-views': [
    catalogTabbar('user-views'),
    { id: 'user-views', component: 'catalog/KViewsPanel' }
  ],
  'catalog-layers': [
    catalogTabbar('catalog-layers'),
    { id: 'catalog-layers', component: 'catalog/KLayersPanel',
      layers: ':layers', layerCategories: ':layerCategories',
      layersFilter: { scope: { $nin: ['user', 'system', 'activity'] } }, layerCategoriesFilter: { _id: { $exists: false } },
      forecastModels: ':forecastModels' }
  ]
} 

// Map layer actions
const mapLayerActions = [{
  id: 'layer-actions',
  component: 'menu/KMenu',
  dropdownIcon: 'las la-ellipsis-v',
  actionRenderer: 'item',
  propagate: false,
  content: [
    { id: 'zoom-to-layer', label: 'mixins.activity.ZOOM_TO_LABEL', icon: 'las la-search-location', handler: 'onZoomToLayer', visible: ':isVisible' },
    { id: 'save-layer', label: 'mixins.activity.SAVE_LABEL', icon: 'las la-save', handler: 'onSaveLayer',
      visible: ['isLayerStorable', { name: '$can', params: ['create', 'catalog'] }] },
    { id: 'filter-layer-data', label: 'mixins.activity.FILTER_DATA_LABEL', icon: 'las la-filter', visible: ['isFeatureLayer', 'hasFeatureSchema'],
      route: { name: 'map-layer-filter', params: { layerId: ':_id', layerName: ':name' } } },
    { id: 'view-layer-data', label: 'mixins.activity.VIEW_DATA_LABEL', icon: 'las la-th-list', visible: ['isFeatureLayer', 'hasFeatureSchema'],
      route: { name: 'map-layer-table', params: { layerId: ':_id', layerName: ':name' } } },
    { id: 'chart-layer-data', label: 'mixins.activity.CHART_DATA_LABEL', icon: 'las la-chart-pie', visible: ['isFeatureLayer', 'hasFeatureSchema'],
      route: { name: 'map-layer-chart', params: { layerId: ':_id', layerName: ':name' } } },
    { id: 'edit-layer', label: 'mixins.activity.EDIT_LABEL', icon: 'las la-file-alt', visible: ['isLayerEditable', { name: '$can', params: ['update', 'catalog'] }],
      route: { name: 'edit-map-layer', params: { layerId: ':_id', layerName: ':name' } } },
    { id: 'edit-layer-style', label: 'mixins.activity.EDIT_LAYER_STYLE_LABEL', icon: 'las la-border-style', visible: 'isLayerStyleEditable',
      route: { name: 'edit-map-layer-style', params: { layerId: ':_id', layerName: ':name' } } },
    { id: 'edit-layer-data', label: 'mixins.activity.START_EDIT_DATA_LABEL', icon: 'las la-edit', handler: 'onEditLayerData', visible: 'isLayerDataEditable',
      toggle: { icon: 'las la-edit', tooltip: 'mixins.activity.STOP_EDIT_DATA_LABEL' }, component: 'KEditLayerData' },
    { id: 'remove-layer', label: 'mixins.activity.REMOVE_LABEL', icon: 'las la-trash', handler: 'onRemoveLayer', visible: 'isLayerRemovable' }
  ]
}]


// Map engine configuration
const mapEngine = {
  viewer: {
    minZoom: 3,
    maxZoom: 21,
    center: [47, 3],
    zoom: 6,
    maxBounds: [[-90, -180], [90, 180]],
    maxBoundsViscosity: 0.25,
    timeDimension: true
  },
  // Default GeoJSON layer style for polygons/lines
  featureStyle: {
    'stroke-opacity': 1,
    'stroke-color': 'red',
    'stroke-width': 3,
    'fill-opacity': 0.5,
    'fill-color': 'green'
  },
  // Default GeoJSON layer style for polygons/lines edition
  editFeatureStyle: {
    'stroke-opacity': 1,
    'stroke-color': 'red',
    'stroke-width': 3,
    'fill-opacity': 0.5,
    'fill-color': 'green'
  },
  // Default GeoJSON layer style for points
  pointStyle: {
    'icon-color': '#FFFFFF',
    'marker-color': '#72448b',
    'icon-classes': 'fas fa-circle',
    'icon-x-offset': -1,
    'icon-y-offset': 0
  },
  // Default GeoJSON layer style for points edition
  editPointStyle: {
    'marker-type': 'circleMarker',
    radius: 6,
    'stroke-color': 'red',
    'stroke-opacity': 1,
    'fill-opacity': 0.5,
    'fill-color': 'green'
  },
  // Default GeoJSON infobox will display all properties
  popup: { pick: [] },
  infobox: {},
  cluster: { disableClusteringAtZoom: 18 },
  fileLayers: {
    fileSizeLimit: 1024 * 1024, // 1GB
    formats: ['.geojson', '.kml', '.gpx']
  }
}

// Globe layer actions
const globeLayerActions = [{
  id: 'layer-actions',
  component: 'menu/KMenu',
  dropdownIcon: 'las la-ellipsis-v',
  actionRenderer: 'item',
  propagate: false,
  content: [
    { id: 'zoom-to-layer', label: 'mixins.activity.ZOOM_TO_LABEL', icon: 'las la-search-location', handler: 'onZoomToLayer', visible: ':isVisible' },
    { id: 'filter-layer-data', label: 'mixins.activity.FILTER_DATA_LABEL', icon: 'las la-filter', visible: ['isFeatureLayer', 'hasFeatureSchema'],
      route: { name: 'globe-layer-filter', params: { layerId: ':_id', layerName: ':name' } } },
    { id: 'view-layer-data', label: 'mixins.activity.VIEW_DATA_LABEL', icon: 'las la-th-list', visible: ['isFeatureLayer', 'hasFeatureSchema'],
      route: { name: 'globe-layer-table', params: { layerId: ':_id', layerName: ':name' } } },
    { id: 'chart-layer-data', label: 'mixins.activity.CHART_DATA_LABEL', icon: 'las la-chart-pie', visible: ['isFeatureLayer', 'hasFeatureSchema'],
      route: { name: 'globe-layer-chart', params: { layerId: ':_id', layerName: ':name' } } },
    { id: 'edit-layer', label: 'mixins.activity.EDIT_LABEL', icon: 'las la-file-alt', visible: ['isLayerEditable', { name: '$can', params: ['update', 'catalog'] }],
      route: { name: 'edit-globe-layer', params: { layerId: ':_id', layerName: ':name' } } },
    { id: 'remove-layer', label: 'mixins.activity.REMOVE_LABEL', icon: 'las la-minus-circle', handler: 'onRemoveLayer',
      visible: ['isLayerRemovable', { name: '$can', params: ['remove', 'catalog'] }] }
  ]
}]

// Globe engine configuration
const globeEngine = {
  viewer: {
    sceneMode: 3, // SceneMode.COLUMBUS_VIEW = 1, SceneMode.SCENE3D = 3,
    sceneModePicker: false,
    infoBox: false,
    scene3DOnly: true,
    homeButton: false,
    geocoder: false,
    navigationHelpButton: false,
    baseLayerPicker: false,
    vrButton: false,
    fullscreenButton: false,
    animation: false,
    timeline: false,
    creditContainer: 'globe-credit'
  },
  fileLayers: {
    clearOnDrop: false,
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
      showBackground: true,
      backgroundColor: 'Cesium.Color.WHITE',
      font: '14px monospace',
      fillColor: 'Cesium.Color.BLACK',
      outlineColor: 'Cesium.Color.BLACK',
      horizontalOrigin: 'Cesium.HorizontalOrigin.LEFT',
      verticalOrigin: 'Cesium.VerticalOrigin.CENTER',
      pixelOffset: {
        type: 'Cesium.Cartesian2',
        options: [32, -32]
      }
    }
  },
  // Default GeoJSON infobox will display all properties
  popup: {
    pick: [],
    options: {
      showBackground: true,
      backgroundColor: 'Cesium.Color.WHITE',
      font: '14px monospace',
      fillColor: 'Cesium.Color.BLACK',
      outlineColor: 'Cesium.Color.BLACK',
      horizontalOrigin: 'Cesium.HorizontalOrigin.CENTER',
      verticalOrigin: 'Cesium.VerticalOrigin.BOTTOM',
      pixelOffset: {
        type: 'Cesium.Cartesian2',
        options: [0, -64]
      }
    }
  },
  infobox: {},
  clusterStyle: {
    label: {
      show: true,
      text: '<%= entities.length.toLocaleString() %>'
    }
  }
}

module.exports = {
  // Special alias to host loopback interface in cordova
  // domain: 'http://10.0.2.2:8081',
  // If using port forwarding
  // domain: 'http://localhost:8081',
  // If using local IP on WiFi router
  // domain: 'http://192.168.1.16:8081',
  domain,
  pwaName,
  flavor: process.env.NODE_APP_INSTANCE || 'dev',
  version,
  buildNumber: process.env.BUILD_NUMBER,
  apiPath: API_PREFIX,
  apiJwt: 'kano-jwt',
  apiTimeout: 30000,
  transport: 'websocket', // Could be 'http' or 'websocket',
  gateway,
  gatewayJwtField: 'jwt',
  gatewayJwt: 'kano-gateway-jwt',
  appName: 'Kano',
  appChangelog: 'https://kalisio.github.io/kApp/about/changelog.html',
  appOnlineHelp: 'https://kalisio.github.io/kano',
  publisher: 'Kalisio',
  publisherWebsite: 'https://kalisio.com',
  publisherContact: 'support@kalisio.com',
  locale: {
    // If you'd like to force locale otherwise it is retrieved from browser
    // default: 'en',
    fallback: 'en'
  },
  logs: {
    level: (process.env.NODE_ENV === 'development' ? 'debug' : 'info')
  },
  units: {
    // Nothing specific, use defaults
  },
  settings: {
    propertyMapping: {
      // Nothing specific, use defaults
    }
  },
  screens: {
    actions: [{ 
      id: 'terms-policies', 
      label: 'screen.TERMS_AND_POLICIES', 
      dialog: {
        component: 'app/KTerms'
      }
    }],
    // frameBackgroundColor: '#FFDC9E',
    login: {
      actions: [
        { id: 'contextual-help', label: 'CONTEXTUAL_HELP', route: { name: 'login', query: { tour: true } } }
      ]
    },
    logout: {
      actions: [
        { id: 'login-link', label: 'KLogoutScreen.LOG_IN_AGAIN_LABEL', route: { name: 'login' } }
      ]
    },
    endpoint: {
      actions: [
        { id: 'login-link', label: 'KEndpointScreen.LOG_IN_LABEL', route: { name: 'login' } }
      ]
    }
  },
  layout: {
    view: 'lhh LpR lff',
    page: { visible: true },
    panes: {
      left: { opener: true },
      top: { opener: true, visible: true },
      right: { opener: true },
      bottom: { opener: true }
    },
    fab: { visible: true }
  },
  engines: {
    leaflet: mapEngine,
    cesium: globeEngine
  },
  mapActivity: {
    additionalMixins: [],
    topPane: {
      content: {
        default: [
          { id: 'toggle-globe', icon: 'las la-globe', tooltip: 'mixins.activity.TOGGLE_GLOBE',
            route: { name: 'globe-activity', params: { south: ':south', north: ':north', west: ':west', east: ':east' }, query: { layers: ':layers' } } },
          { component: 'QSeparator', vertical: true },
          { id: 'zoom-in', icon: 'add', tooltip: 'mixins.activity.ZOOM_IN', handler: { name: 'onZoomIn' } },
          { id: 'zoom-out', icon: 'remove', tooltip: 'mixins.activity.ZOOM_OUT', handler: { name: 'onZoomOut' } },
          { id: 'zoom-separator', component: 'QSeparator', vertical: true },
          { id: 'locate-user', component: 'tools/KGeolocateTool' },
          { id: 'search-location', icon: 'las la-search-location', tooltip: 'mixins.activity.SEARCH_LOCATION', handler: { name: 'setTopPaneMode', params: ['search-location'] } },
          {
            id: 'tools',
            component: 'menu/KMenu',
            icon: 'las la-wrench',
            tooltip: 'mixins.activity.TOOLS',
            actionRenderer: 'item',
            content: [
              { id: 'measure-tool', icon: 'las la-ruler-combined', label: 'KMeasureTool.TOOL_BUTTON_LABEL', handler: { name: 'setTopPaneMode', params: ['measure-tool'] } },
              { id: 'display-position', icon: 'las la-plus', label: 'mixins.activity.DISPLAY_POSITION', handler: { name: 'setTopPaneMode', params: ['display-position'] } },
              { id: 'display-legend', icon: 'las la-list', label: 'mixins.activity.DISPLAY_LEGEND', handler: { name: 'openWidget', params: ['legend-widget'] } },
              { component: 'QSeparator' },
              { id: 'capture-map', icon: 'las la-camera', label: 'mixins.activity.CAPTURE_VIEW', handler: { name: 'setTopPaneMode', params: ['capture-map'] } }
            ]
          },
          { component: 'QSeparator', vertical: true, inset: true },
          { id: 'toggle-fullscreen', icon: 'las la-expand', tooltip: 'mixins.activity.ENTER_FULLSCREEN', toggle: { icon: 'las la-compress', tooltip: 'mixins.activity.EXIT_FULLSCREEN' }, handler: { name: 'onToggleFullscreen' } }
        ],
        'display-position': [
          { id: 'back', icon: 'las la-arrow-left', handler: { name: 'setTopPaneMode', params: ['default'] } },
          { component: 'QSeparator', vertical: true },
          { component: 'KPositionIndicator' }
        ],
        'search-location': [
          { id: 'back', icon: 'las la-arrow-left', handler: { name: 'setTopPaneMode', params: ['default'] } },
          { component: 'QSeparator', vertical: true },
          { component: 'tools/KSearchTool' }
        ],
        'edit-layer-data': [
          { id: 'accept', icon: 'las la-arrow-left', handler: { name: 'onEndLayerEdition', params: ['accept'] } },
          { component: 'QSeparator', vertical: true },
          { component: 'KLayerEditionToolbar' }
        ],
        'capture-map': [ 
          { id: 'back', icon: 'las la-arrow-left', handler: { name: 'setTopPaneMode', params: ['default'] } },
          { component: 'QSeparator', vertical: true },
          { component: 'KCaptureToolbar' }
        ],
        'measure-tool': [
          { id: 'back', icon: 'las la-arrow-left', handler: { name: 'setTopPaneMode', params: ['default'] } },
          { component: 'QSeparator', vertical: true },
          { component: 'KMeasureTool' }
        ]
      },
      // Hide zoom by default but keep it in config so that it can be easily shown by configuring the filter
      filter: { id: { $nin: ['zoom-in', 'zoom-out', 'zoom-separator'] } },
      mode: 'default'
    },
    leftPane: leftPane,
    rightPane: {
      content: catalogPanes,
      mode: 'user-layers'
    },
    bottomPane: {
      content: [
        { component: 'KTimeline' }
      ]
    },
    page: {
      content: [{
        id: 'color-legend', component: 'layout/KPageSticky', position: 'left', offset: [18, 0], content: [{ component: 'KColorLegend' }]
      }, {
        id: 'url-legend', component: 'layout/KPageSticky', position: 'top-left', offset: [18, 18], content: [{ component: 'KUrlLegend' }]
      }, {
        id: 'level-slider', component: 'layout/KPageSticky', position: 'right', offset: [40, 0], content: [{ component: 'KLevelSlider' }]
      } /* Only for example purpose
      {
        id: 'site-seeker', component: 'layout/KPageSticky', position: 'bottom-right', offset: [16, 16], content: [{ component: 'SiteSeeker' }]
      }*/]
    },
    fab: {
      content: [
        { id: 'create-view', icon: 'las la-star', label: 'mixins.activity.CREATE_VIEW',
          visible: { name: '$can', params: ['create', 'catalog'] }, route: { name: 'create-map-view' } },
        { id: 'add-layer', icon: 'las la-plus', label: 'mixins.activity.ADD_LAYER', route: { name: 'add-map-layer' } },
        { id: 'probe-location', icon: 'las la-eye-dropper', label: 'mixins.activity.PROBE', handler: 'probeAtLocation' }
      ]
    },
    windows: {
      left: { content: leftWidgets },
      top: { content: topWidgets }
    },
    layers: {
      actions: mapLayerActions
    },
    featuresChunkSize: 5000 // TODO: here or in mapEngine ?
  },
  globeActivity: {
    additionalMixins: [],
    topPane: {
      content: {
        default: [
          { id: 'toggle-map', icon: 'las la-map', tooltip: 'mixins.activity.TOGGLE_MAP',
            route: { name: 'map-activity', params: { south: ':south', north: ':north', west: ':west', east: ':east' }, query: { layers: ':layers' } } },
          { component: 'QSeparator', vertical: true },
          { id: 'zoom-in', icon: 'add', tooltip: 'mixins.activity.ZOOM_IN', handler: { name: 'onZoomIn' } },
          { id: 'zoom-out', icon: 'remove', tooltip: 'mixins.activity.ZOOM_OUT', handler: { name: 'onZoomOut' } },
          { id: 'zoom-separator', component: 'QSeparator', vertical: true, inset: true },
          { id: 'locate-user', component: 'tools/KGeolocateTool' },
          { id: 'search-location', icon: 'las la-search-location', tooltip: 'mixins.activity.SEARCH_LOCATION', handler: { name: 'setTopPaneMode', params: ['search-location'] } },
          {
            id: 'tools',
            component: 'menu/KMenu',
            icon: 'las la-wrench',
            tooltip: 'mixins.activity.TOOLS',
            actionRenderer: 'item',
            content: [
              { id: 'display-position', icon: 'las la-plus', label: 'mixins.activity.DISPLAY_POSITION', handler: { name: 'setTopPaneMode', params: ['display-position'] } },
              { id: 'display-legend', icon: 'las la-list', label: 'mixins.activity.DISPLAY_LEGEND', handler: { name: 'openWidget', params: ['legend-widget'] } },
            ]
          },
          { component: 'QSeparator', vertical: true, inset: true },
          { id: 'toggle-vr', icon: 'las la-vr-cardboard', tooltip: 'mixins.activity.ENTER_VR', toggle: { tooltip: 'mixins.activity.EXIT_VR' }, handler: { name: 'onToggleVr' } },
          { id: 'toggle-fullscreen', icon: 'las la-expand', tooltip: 'mixins.activity.ENTER_FULLSCREEN', toggle: { icon: 'las la-compress', tooltip: 'mixins.activity.EXIT_FULLSCREEN' }, handler: { name: 'onToggleFullscreen' } }
        ],
        'display-position': [
          { id: 'back', icon: 'las la-arrow-left', handler: { name: 'setTopPaneMode', params: ['default'] } },
          { component: 'QSeparator', vertical: true },
          { component: 'KPositionIndicator' }
        ],
        'search-location': [
          { id: 'back', icon: 'las la-arrow-left', handler: { name: 'setTopPaneMode', params: ['default'] } },
          { component: 'QSeparator', vertical: true },
          { component: 'tools/KSearchTool' }
        ]
      },
      // Hide zoom by default but keep it in config so that it can be easily shown by configuring the filter
      filter: { id: { $nin: ['zoom-in', 'zoom-out', 'zoom-separator'] } },
      mode: 'default'
    },
    leftPane: leftPane,
    rightPane: {
      content: catalogPanes,
      mode: 'user-layers'
    },
    bottomPane: {
      content: [
        { component: 'KTimeline' }
      ]
    },
    page: {
      content: [{
        id: 'url-legend', component: 'layout/KPageSticky', position: 'top-left', offset: [18, 18], content: [{ component: 'KUrlLegend' }]
      }]
    },
    fab: {
      content: [
        { id: 'probe-location', icon: 'las la-eye-dropper', label: 'mixins.activity.PROBE', handler: 'probeAtLocation' }
      ]
    },
    windows: {
      left: { content: leftWidgets },
      top: { content: topWidgets },
    },
    layers: {
      actions: globeLayerActions
    }
  },
  routes: require('../src/router/routes')
}
