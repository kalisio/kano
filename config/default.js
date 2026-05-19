const helpers = require('./kdk/helpers.js')
const topPane = require('./kdk/panes.top.js')
const leftPane = require('./kdk/panes.left.js')
const widgetsLeft = require('./kdk/widgets.left.js')
const widgetsTop = require('./kdk/widgets.top.js')
const stickies = require('./kdk/stickies.js')

const serverPort = process.env.PORT || 8081
// Required to know webpack port so that in dev we can build correct URLs
const clientPort = process.env.CLIENT_PORT || 8080
const API_PREFIX = '/api'
let pwaName = 'Kano'
// If we build a specific staging instance
if (process.env.NODE_APP_INSTANCE === 'dev') {
  pwaName += ' (dev)'
} else if (process.env.NODE_APP_INSTANCE === 'test') {
  pwaName += ' (test)'
} else if (process.env.NODE_APP_INSTANCE === 'prod') {
  // Nothing todo
} else {
  // Otherwise we are on a developer machine
  pwaName += ' (localhost)'
}

// Allow to override version number for custom build
const version = (process.env.VERSION ? process.env.VERSION : require('../package.json').version)

const website = 'https://www.kalisio.com'
const onlineHelp = 'https://kalisio.github.io/kano'
const changelog = onlineHelp + '/history.html'

// Left pane
const LEFT_PANE = {
  content: [
    { component: 'KLogo' },
    helpers.horizontalSeparator(),
    { component: 'account/KProfile', manageable: false, editable: false, avatar: false, class: 'bg-grey-2' },
    helpers.horizontalSeparator(),
    leftPane.settings(),
    leftPane.onlineHelp({ url: onlineHelp }),
    leftPane.contextualHelp(),
    leftPane.about(),
    helpers.horizontalSeparator(),
    leftPane.logout()
  ]
}

// top pane
const TOP_PANE = (activity) => {
  return {
    content: {
      default: [
        { component: 'KProjectMenu' },
        (activity === 'globe' ? topPane.activityLink('map', 'las la-map', 'mixins.activity.TOGGLE_MAP', { south: ':south', north: ':north', west: ':west', east: ':east' }, { project: ':project', layers: ':layers' })
          : topPane.activityLink('globe', 'las la-globe', 'mixins.activity.TOGGLE_GLOBE', { south: ':south', north: ':north', west: ':west', east: ':east' }, { project: ':project', layers: ':layers' })
        ),
        helpers.verticalSeparator(),
        { id: 'zoom-in', icon: 'add', tooltip: 'mixins.activity.ZOOM_IN', handler: { name: 'onZoomIn' } },
        { id: 'zoom-out', icon: 'remove', tooltip: 'mixins.activity.ZOOM_OUT', handler: { name: 'onZoomOut' } },
        { id: 'zoom-separator', component: 'QSeparator', vertical: true },
        topPane.locateUser(),
        topPane.activeLocationSearchMode({ mode: `search-location` }),
        {
          id: 'tools',
          component: 'menu/KMenu',
          icon: 'las la-wrench',
          tooltip: 'mixins.activity.TOOLS',
          actionRenderer: 'item',
          dense: true,
          content: activity === 'map' ? [
            topPane.toggleLegend(),
            topPane.toggleSelectionManager(),
            topPane.toggleStylesManager(),
            topPane.toggleTagsManager(),
            helpers.horizontalSeparator(),
            topPane.togglePosition(),
            topPane.toggleNorthArrow(),
            topPane.toggleZoomControl(),
            helpers.horizontalSeparator(),
            topPane.activeMeasureToolMode({ mode: `measure-tool` }),
            topPane.printTool()
          ] : activity === 'globe' ? [
            topPane.toggleLegend(),
            topPane.toggleSelectionManager(),
            topPane.toggleStylesManager(),
            topPane.toggleTagsManager(),
            helpers.horizontalSeparator(),
            topPane.togglePosition(),
            topPane.toggleZoomControl()
          ] : []
        },
        helpers.verticalSeparator(),
        ...(activity === 'globe') ? [{
          id: 'toggle-vr',
          icon: 'las la-vr-cardboard',
          tooltip: 'mixins.activity.ENTER_VR',
          toggle: { tooltip: 'mixins.activity.EXIT_VR' },
          handler: { name: 'onToggleVr' }
        }] : [],
        topPane.toggleFullscreen({ renderer: 'button' })
      ], 'display-position': [
        { id: 'back', icon: 'las la-arrow-left', handler: { name: 'setTopPaneMode', params: ['default'] } },
        helpers.verticalSeparator(),
        { component: 'KPositionIndicator' }
      ],
      'search-location': [
        { id: 'back', icon: 'las la-arrow-left', handler: { name: 'setTopPaneMode', params: ['default'] } },
        helpers.verticalSeparator(),
        { component: 'tools/KSearchTool', autofocus: true }
      ],
      'edit-layer-data': [
        { id: 'accept', icon: 'las la-arrow-left', handler: { name: 'onEndLayerEdition', params: ['accept'] } },
        helpers.verticalSeparator(),
        { component: 'KLayerEditionToolbar' }
      ],
      'measure-tool': [
        { id: 'back', icon: 'las la-arrow-left', handler: { name: 'setTopPaneMode', params: ['default'] } },
        helpers.verticalSeparator(),
        { component: 'KMeasureTool' }
      ]
    },
    // Hide zoom by default but keep it in config so that it can be easily shown by configuring the filter
    filter: { id: { $nin: ['zoom-in', 'zoom-out', 'zoom-separator'] } },
    mode: 'default'
  }
}

// left window
const LEFT_WIDGETS = [
  widgetsLeft.LEGEND,
  widgetsLeft.FEATURES_SELECTION,
  widgetsLeft.STYLE_MANAGER,
  widgetsLeft.TAG_MANAGER
]

// top window
const TOP_WIDGETS = [widgetsTop.INFORMATION_BOX, widgetsTop.TIME_SERIES, widgetsTop.ELEVATION_PROFILE, widgetsTop.MAPILLARY_VIEWER, widgetsTop.PANORAMAX_VIEWER]

const MAP_STICKIES = [
  stickies.position({ offset: [0, 80] }),
  stickies.target(),
  stickies.northArrow({ visible: false }),
  stickies.zoomControl(),
  stickies.levelSlider(),
  stickies.attribution()
]

const GLOBE_STICKIES = [
  stickies.position({ offset: [0, 80] }),
  stickies.target(),
  stickies.attribution(),
  stickies.zoomControl()
]

// Catalog panes
const catalogPanes = {
  default: [{
    component: 'KTab',
    content: {
      'user-layers': [
        {
          id: 'user-layers',
          component: 'catalog/KLayersPanel',
          visible: '!hasProject',
          categoriesDraggable: ':categoriesDraggable',
          layers: ':layers',
          layerCategories: ':layerCategories',
          layersDraggable: ':layersDraggable',
          layersFilter: { scope: { $in: ['user', 'activity'] } },
          layerCategoriesFilter: { _id: { $exists: true } },
          footer: [{
            id: 'manage-layer-categories',
            icon: 'las la-cog',
            label: 'KLayerCategories.LAYER_CATEGORIES_LABEL',
            visible: { name: '$can', params: ['create', 'catalog'] },
            route: { name: 'manage-layer-categories' }
          }],
          footerClass: 'justify-center'
        }
      ],
      'user-views': [
        { id: 'user-views', visible: '!hasProject', component: 'catalog/KViewsPanel', suspense: true }
      ],
      'user-projects': [
        { id: 'user-projects', visible: '!hasProject', component: 'catalog/KProjectsPanel' }
      ],
      'catalog-layers': [
        {
          id: 'catalog-layers',
          visible: '!hasProject',
          component: 'catalog/KLayersPanel',
          layers: ':layers',
          layerCategories: ':layerCategories',
          layersFilter: { scope: { $nin: ['user', 'system', 'activity'] } },
          layerCategoriesFilter: { _id: { $exists: false } },
          forecastModels: ':forecastModels'
        }
      ]
    },
    labels: ['LAYERS_LABEL', 'VIEWS_LABEL', 'PROJECTS_LABEL', 'CATALOG_LABEL'],
    mode: 'user-layers'
  }],
  project: [{
    component: 'KTab',
    content: {
      'project-layers': [
        {
          id: 'project-layers',
          visible: 'hasProject',
          component: 'catalog/KLayersPanel',
          layers: ':layers',
          layerCategories: ':layerCategories',
          layersFilter: { scope: { $ne: 'system' } },
          layerCategoriesFilter: {},
          forecastModels: ':forecastModels'
        }
      ],
      'project-views': [
        { id: 'project-views', visible: 'hasProject', component: 'catalog/KViewsPanel', suspense: true }
      ]
    },
    labels: ['PROJECT_LAYERS_LABEL', 'PROJECT_VIEWS_LABEL'],
    mode: 'project-layers'
  }]
}

// Map layer actions
const mapLayerActions = [{
  id: 'layer-actions',
  component: 'menu/KMenu',
  dropdownIcon: 'las la-ellipsis-v',
  actionRenderer: 'item',
  propagate: false,
  dense: true,
  content: [
    { id: 'zoom-to-layer', label: 'mixins.activity.ZOOM_TO_LABEL', icon: 'las la-search-location', handler: 'onZoomToLayer', visible: ':isVisible' },
    {
      id: 'save-layer',
      label: 'mixins.activity.SAVE_LABEL',
      icon: 'las la-save',
      handler: 'onSaveLayer',
      visible: ['isLayerStorable', 'canCreateLayer']
    },
    {
      id: 'filter-layer-data',
      label: 'mixins.activity.FILTER_DATA_LABEL',
      icon: 'las la-filter',
      visible: 'isLayerFilterEditable',
      dialog: {
        component: 'KFeaturesFilterManager',
        layerId: ':_id',
        layerName: ':name',
        cancelAction: 'CANCEL',
        okAction: { id: 'apply-edit-filter', label: 'APPLY', handler: 'apply' }
      }
    },
    {
      id: 'view-layer-data',
      label: 'mixins.activity.VIEW_DATA_LABEL',
      icon: 'las la-th-list',
      visible: ['isFeatureLayer', 'hasFeatureSchema'],
      route: { name: 'map-layer-table', params: { layerId: ':_id', layerName: ':name' } }
    },
    {
      id: 'chart-layer-data',
      label: 'mixins.activity.CHART_DATA_LABEL',
      icon: 'las la-chart-pie',
      visible: ['isFeatureLayer', 'hasFeatureSchema'],
      route: { name: 'map-layer-chart', params: { layerId: ':_id', layerName: ':name' } }
    },
    {
      id: 'edit-layer',
      label: 'mixins.activity.EDIT_LABEL',
      icon: 'las la-file-alt',
      visible: ['isLayerEditable', 'canUpdateLayer'],
      dialog: {
        title: ':name',
        component: 'KLayerEditor',
        layerName: ':name',
        cancelAction: 'CANCEL',
        okAction: { id: 'apply-edit-layer', label: 'APPLY', handler: 'apply' }
      }
    },
    { id: 'reset-layer-style', label: 'mixins.activity.RESET_LAYER_STYLE_LABEL', icon: 'las la-ban', handler: 'onResetLayerStyle', visible: ['isLayerStyleEditable', 'canUpdateLayer'] },
    /* Action to edit all-at-once, now replaced by a submenu with more specific actions
    { id: 'edit-layer-data', label: 'mixins.activity.START_EDIT_DATA_LABEL', icon: 'las la-edit', handler: 'onEditLayerData', visible: 'isLayerDataEditable',
      toggle: { icon: 'las la-edit', tooltip: 'mixins.activity.STOP_EDIT_DATA_LABEL' }, component: 'KEditLayerData' },
    */
    {
      id: 'edit-layer-data',
      label: 'mixins.activity.START_EDIT_DATA_LABEL',
      icon: 'las la-caret-left',
      handler: 'onEditLayerData',
      visible: ['isLayerDataEditable', 'canUpdateLayer'],
      component: 'menu/KSubMenu',
      content: [
        {
          id: 'edit-layer-points',
          label: 'mixins.activity.EDIT_POINTS_DATA_LABEL',
          icon: 'las la-map-marker',
          handler: { name: 'startEditLayer', params: [':0', { editMode: 'add-points', allowedEditModes: ['add-points', 'edit-properties', 'drag', 'rotate', 'remove'], geometryTypes: ['Point', 'MultiPoint'] }] }
        },
        {
          id: 'edit-layer-lines',
          label: 'mixins.activity.EDIT_LINES_DATA_LABEL',
          icon: 'las la-project-diagram',
          handler: { name: 'startEditLayer', params: [':0', { editMode: 'add-lines', allowedEditModes: ['add-lines', 'edit-properties', 'edit-geometry', 'drag', 'rotate', 'remove'], geometryTypes: ['LineString', 'MultiLineString'] }] }
        },
        {
          id: 'edit-layer-polygons',
          label: 'mixins.activity.EDIT_POLYGONS_DATA_LABEL',
          icon: 'las la-draw-polygon',
          handler: { name: 'startEditLayer', params: [':0', { editMode: 'add-polygons', allowedEditModes: ['add-polygons', 'add-rectangles', 'edit-geometry', 'edit-properties', 'drag', 'rotate', 'remove'], geometryTypes: ['Polygon', 'MultiPolygon'] }] }
        },
        {
          id: 'edit-layer-geometry',
          label: 'mixins.activity.EDIT_PROPERTIES_LABEL',
          icon: 'las la-edit',
          handler: { name: 'startEditLayer', params: [':0', { editMode: 'edit-properties', allowedEditModes: ['edit-properties'] }] }
        },
        {
          id: 'edit-layer-geometry',
          label: 'mixins.activity.EDIT_GEOMETRIES_LABEL',
          icon: 'las la-vector-square',
          handler: { name: 'startEditLayer', params: [':0', { editMode: 'edit-geometry', allowedEditModes: ['edit-geometry', 'drag', 'rotate', 'remove'] }] }
        }
      ]
    },
    { id: 'remove-layer', label: 'mixins.activity.REMOVE_LABEL', icon: 'las la-trash', handler: 'onRemoveLayer', visible: ['isLayerRemovable', 'canRemoveLayer'] }
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
    timeDimension: true,
    rotateControl: false,
    attributionControl: false,
    zoomDelta: 0.25,
    zoomSnap: 0.25,
    wheelPxPerZoomLevel: 250
  },
  // COLORS USED IN STYLES SHOULD BE PART OF THE QUASAR PALETTE NOT RANDOM RGB COLORS
  // THIS IS DUE TO KDK EDITING COMPONENTS ONLY SUPPORTING COLORS FROM PALETTE NOW
  // Default GeoJSON layer style for polygons/lines
  style: {
    point: {
      shape: 'circle', color: 'red', opacity: 0.5, stroke: { color: 'red' }
    },
    line: {
      color: 'red', width: 3
    },
    polygon: {
      color: 'red', opacity: 0.5, stroke: { color: 'red' }
    },
    location: {
      point: {
        shape: 'marker-pin',
        color: 'primary',
        opacity: 1,
        size: [20, 30],
        stroke: { color: 'primary' },
        icon: { classes: 'fas fa-circle', color: 'white', size: 12, translation: ['-50%', '-90%'] }
      },
      line: { color: 'primary', width: 3 },
      polygon: {
        color: 'primary',
        opacity: 0.5,
        stroke: { color: 'primary' }
      }
    },
    edition: {
      point: {
        shape: 'circle', color: 'yellow', stroke: { color: 'red', width: 3, dashArray: '0 5 0' }
      },
      line: {
        color: 'red', width: 3, dashArray: '0 5 0'
      },
      polygon: {
        color: 'yellow', opacity: 0.5, stroke: { color: 'red', width: 3, dashArray: '0 5 0' }
      }
    },
    selection: {
      point: {
        shape: 'circle',
        color: 'primary',
        opacity: 0.25,
        radius: 12,
        stroke: { color: 'primary', opacity: 0.25, width: 3 }
      },
      line: {
        color: 'primary', opacity: 0.25, width: 10
      },
      polygon: {
        color: 'primary', opacity: 0.25, stroke: { color: 'primary', opacity: 0.25, width: 10 }
      }
    }
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
  dense: true,
  content: [
    {
      id: 'zoom-to-layer',
      label: 'mixins.activity.ZOOM_TO_LABEL',
      icon: 'las la-search-location',
      handler: 'onZoomToLayer',
      visible: ':isVisible'
    },
    {
      id: 'filter-layer-data',
      label: 'mixins.activity.FILTER_DATA_LABEL',
      icon: 'las la-filter',
      visible: 'isLayerFilterEditable',
      dialog: {
        component: 'KFeaturesFilterManager',
        layerId: ':_id',
        layerName: ':name',
        cancelAction: 'CANCEL',
        okAction: { id: 'apply-edit-filter', label: 'APPLY', handler: 'apply' }
      }
    },
    {
      id: 'view-layer-data',
      label: 'mixins.activity.VIEW_DATA_LABEL',
      icon: 'las la-th-list',
      visible: ['isFeatureLayer', 'hasFeatureSchema'],
      route: { name: 'globe-layer-table', params: { layerId: ':_id', layerName: ':name' } }
    },
    {
      id: 'chart-layer-data',
      label: 'mixins.activity.CHART_DATA_LABEL',
      icon: 'las la-chart-pie',
      visible: ['isFeatureLayer', 'hasFeatureSchema'],
      route: { name: 'globe-layer-chart', params: { layerId: ':_id', layerName: ':name' } }
    },
    {
      id: 'edit-layer',
      label: 'mixins.activity.EDIT_LABEL',
      icon: 'las la-file-alt',
      dialog: {
        title: ':name',
        component: 'KLayerEditor',
        layerName: ':name',
        cancelAction: 'CANCEL',
        okAction: { id: 'apply-edit-layer', label: 'APPLY', handler: 'apply' }
      }
    },
    { id: 'reset-layer-style', label: 'mixins.activity.RESET_LAYER_STYLE_LABEL', icon: 'las la-ban', handler: 'onResetLayerStyle', visible: 'isLayerStyleEditable' },
    {
      id: 'remove-layer',
      label: 'mixins.activity.REMOVE_LABEL',
      icon: 'las la-trash',
      handler: 'onRemoveLayer',
      visible: 'isLayerRemovable'
    }
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
    creditContainer: 'globe-credit',
    depthTestAgainstTerrain: true,
    cameraChangedEventPercentage: 0.2
  },
  fileLayers: {
    clearOnDrop: false,
    flyToOnDrop: true,
    clampToGround: true
  },
  // Default GeoJSON layer style for points/polygons/lines
  // SHOULD NOT COVER MORE THAN SIMPLE STYLE SPEC AND MAKI ICONS
  style: {
    point: {
      shape: 'marker', color: 'red'
    },
    line: {
      color: 'red', width: 3
    },
    polygon: {
      color: 'red', opacity: 0.5, stroke: { color: 'red' }
    },
    selection: {
      point: {
        shape: 'marker', color: 'primary', opacity: 0.25
      },
      line: {
        color: 'primary', opacity: 0.25, width: 10
      },
      polygon: {
        color: 'primary', opacity: 0.25, stroke: { color: 'primary', opacity: 0.25, width: 10 }
      }
    }
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
  pwaName,
  buildMode: process.env.BUILD_MODE === 'pwa' ? 'pwa' : 'spa',
  flavor: process.env.NODE_APP_INSTANCE || 'dev',
  version,
  buildNumber: process.env.BUILD_NUMBER,
  apiPath: API_PREFIX,
  apiJwt: 'kano-jwt',
  apiTimeout: 30000,
  transport: 'websocket', // Could be 'http' or 'websocket',
  gatewayJwtField: 'jwt',
  gatewayJwt: 'kano-gateway-jwt',
  appName: 'Kano',
  appChangelog: changelog,
  appOnlineHelp: onlineHelp,
  northLogo: 'north-arrow.svg',
  publisher: 'Kalisio',
  publisherWebsite: website,
  publisherContact: 'support@kalisio.com',
  locale: {
    // If you'd like to force locale otherwise it is retrieved from browser
    // default: 'en',
    fallback: 'en'
  },
  logs: {
    level: (((process.env.NODE_ENV === 'development') || process.env.DEBUG) ? 'debug' : 'info')
  },
  units: {
    // Nothing specific, use defaults
  },
  settings: {
    // Nothing specific, use defaults
  },
  automerge: {
    syncServerWsPath: 'offline',
    syncServicePath: API_PREFIX + '/offline',
    authenticate: true
  },
  context: {
    service: 'organisations'
  },
  about: {
    actions: [
      {
        id: 'platform-info',
        icon: 'las la-desktop',
        label: 'KAbout.PLATFORM_INFO',
        stack: true,
        dialog: {
          title: 'KAbout.PLATFORM_INFO',
          component: 'app/KPlatform',
          okAction: 'CLOSE',
          widthPolicy: 'narrow'
        }
      },
      {
        id: 'report-bug',
        icon: 'las la-bug',
        label: 'KAbout.BUG_REPORT',
        stack: true,
        component: 'action/KBugReportAction'
      },
      {
        id: 'view-changelog',
        icon: 'las la-history',
        label: 'KAbout.VIEW_CHANGELOG',
        stack: true,
        url: changelog
      }
    ]
  },
  attribution: {
    header: [
      // For example purpose
      //  { id: 'attribution-header', component: 'KStamp', text: 'header text' }
    ],
    headerClass: '',
    footer: [
      // For example purpose
      //  { id: 'attribution-footer', component: 'KStamp', text: 'footer text' }
    ],
    footerClass: ''
  },
  screens: {
    actions: [{
      id: 'terms-policies',
      label: 'screen.TERMS_AND_POLICIES',
      dialog: {
        component: 'document/KDocument',
        url: 'kano-terms.md'
      }
    }],
    // frameBackgroundColor: '#FFDC9E',
    login: {
      actions: [
        { id: 'contextual-help', label: 'layout.CONTEXTUAL_HELP', route: { name: 'login', query: { tour: true } } }
      ]
    },
    logout: {
      actions: [
        { id: 'login-link', label: 'KLogoutScreen.LOG_IN_AGAIN_LABEL', route: { name: 'login' } }
      ]
    }
  },
  layout: {
    page: { visible: true },
    panes: {
      left: { opener: true },
      top: { opener: true, visible: true },
      right: { opener: true },
      bottom: { opener: true }
    },
    fab: { visible: true }
  },
  capture: {
    header: {
      component: 'CaptureHeader',
      backgroundColor: '#fff',
      color: '#000'
    },
    footer: {
      backgroundColor: '#fff',
      color: '#000'
    }
  },
  engines: {
    leaflet: mapEngine,
    cesium: globeEngine
  },
  readers: {
    core: [
      { mimeTypes: '.json', reader: 'JSONReader' }
    ],
    map: [
      { mimeTypes: '.geojson', reader: 'GEOJSONReader' },
      { mimeTypes: '.gpx', reader: 'GPXReader' },
      { mimeTypes: '.kml', reader: 'KMLReader' },
      { mimeTypes: '.shp', reader: 'SHPReader' }
    ]
  },
  mapActivity: {
    additionalMixins: [],
    padding: false,
    topPane: TOP_PANE('map'),
    leftPane: LEFT_PANE,
    rightPane: {
      content: catalogPanes,
      mode: 'default'
    },
    bottomPane: {
      content: [
        { component: 'time/KTimeControl' }
      ]
    },
    stickies: {
      content: [
        ...MAP_STICKIES,
        // Only for example purpose
        // { id: 'site-seeker', position: 'bottom-right', offset: [16, 16], component: 'SiteSeeker' }
      ]
    },
    fab: {
      content: [
        {
          id: 'create-view',
          icon: 'las la-star',
          label: 'mixins.activity.CREATE_VIEW',
          visible: [{ name: '$can', params: ['create', 'catalog'] }],
          route: { name: 'create-map-view', query: { project: ':project' } }
        },
        {
          id: 'add-layer',
          icon: 'las la-plus',
          label: 'mixins.activity.ADD_LAYER',
          route: { name: 'add-map-layer', query: { project: ':project' } }
        },
        {
          id: 'create-project',
          visible: '!hasProject',
          icon: 'las la-project-diagram',
          label: 'mixins.activity.CREATE_PROJECT',
          visible: ['!hasProject', { name: '$can', params: ['create', 'projects'] }],
          route: { name: 'create-map-project' }
        },
        {
          id: 'manage-project',
          icon: 'las la-project-diagram',
          label: 'mixins.activity.MANAGE_PROJECT',
          visible: ['hasProject', { name: '$can', params: ['update', 'projects'] }],
          route: { name: 'manage-map-project', query: { project: ':project' } }
        },
        { id: 'probe-location', icon: 'las la-eye-dropper', label: 'mixins.activity.PROBE', handler: 'probeAtLocation' }
      ]
    },
    windows: {
      left: { content: LEFT_WIDGETS },
      top: { content: TOP_WIDGETS }
    },
    layers: {
      actions: mapLayerActions
    },
    selection: { multiple: 'ctrlKey' },
    featuresChunkSize: 5000 // TODO: here or in mapEngine ?
  },
  globeActivity: {
    additionalMixins: [],
    padding: false,
    topPane: TOP_PANE('globe'),
    leftPane: LEFT_PANE,
    rightPane: {
      content: catalogPanes,
      mode: 'default'
    },
    bottomPane: {
      content: [
        { component: 'time/KTimeControl' }
      ]
    },
    page: {
      content: []
    },
    stickies: {
      content: GLOBE_STICKIES,
    },
    fab: {
      content: [
        {
          id: 'add-layer',
          icon: 'las la-plus',
          label: 'mixins.activity.ADD_LAYER',
          route: { name: 'add-globe-layer', query: { project: ':project' } }
        },
        { id: 'probe-location', icon: 'las la-eye-dropper', label: 'mixins.activity.PROBE', handler: 'probeAtLocation' }
      ]
    },
    windows: {
      left: { content: LEFT_WIDGETS },
      top: { content: TOP_WIDGETS }
    },
    layers: {
      actions: globeLayerActions
    }
  },
  routes: require('../src/router/routes')
}
