// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

const path = require('path')
const fs = require('fs')

const serverPort = process.env.PORT || process.env.HTTPS_PORT || 8081
const clientPort = process.env.CLIENT_PORT || process.env.HTTPS_CLIENT_PORT || 8080

// Load config based on current NODE_ENV, etc.
const clientConfig = require('config')
// Write JSON config
fs.writeFileSync(path.join('config', 'client-config.json'), JSON.stringify(clientConfig))

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'api',
      'i18n'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons',
      'fontawesome-v5'
    ],

    framework: {
      // iconSet: by default material-icons
      // lang: 'de', // Quasar language

      components: [
        'QAjaxBar',
        'QAvatar',
        'QBtn',
        'QBtnGroup',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QChip',
        'QDate',
        'QDialog',
        'QDrawer',
        'QExpansionItem',
        'QFab',
        'QFabAction',
        'QField',
        'QHeader',
        'QIcon',
        'QInput',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QLayout',
        'QList',
        'QMenu',
        'QPage',
        'QPageContainer',
        'QPageSticky',
        'QPagination',
        'QPopupProxy',
        'QResizeObserver',
        'QRouteTab',
        'QScrollArea',
        'QSelect',
        'QSeparator',
        'QSpace',
        'QSpinnerCube',
        'QTab',
        'QTabPanel',
        'QTabPanels',
        'QTabs',
        'QTime',
        'QTimeline',
        'QTimelineEntry',
        'QToolbar',
        'QToolbarTitle',
        'QToggle',
        'QTooltip'
      ],

      directives: [
        'Ripple',
        'TouchSwipe'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'Platform',
        'Loading',
        'AppFullscreen'
      ]
    },

    animations: [],

    supportIE: false,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.resolve.modules = [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules')
        ],
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing aliases
          '@': path.resolve(__dirname, './src/components'),
          config: path.resolve(__dirname, './config/client-config.json')
        },
        cfg.optimization.minimize = process.env.DEBUG ? false : cfg.optimization.minimize
      }
    },

    devServer: {
      port: clientPort,
      proxy: {
        '/api': {
          target: 'http://localhost:' + serverPort,
          changeOrigin: true,
          logLevel: 'debug'
        },
        '/apiws': {
          target: 'http://localhost:' + serverPort,
          changeOrigin: true,
          ws: true,
          logLevel: 'debug'
        },
        // The auth endpoints are not easy to prefix so we manage it manually
        '/auth': {
          target: 'http://localhost:' + serverPort,
          changeOrigin: true,
          logLevel: 'debug'
        }
      },
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        name: 'Kano',
        short_name: 'Kano',
        description: 'A Geospatial Data Explorer',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'com.kalisio.titi',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'titi'
      }
    }
  }
}

