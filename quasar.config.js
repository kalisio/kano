/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js

const path = require('path')
const fs = require('fs')
const ESLintPlugin = require('eslint-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { configure } = require('quasar/wrappers')

const serverPort = process.env.PORT || process.env.HTTPS_PORT || 8081
const clientPort = process.env.CLIENT_PORT || process.env.HTTPS_CLIENT_PORT || 8080

// Load config based on current NODE_ENV, etc.
const clientConfig = require('config')
// Write JSON config
fs.writeFileSync(path.join('config', 'client-config.json'), JSON.stringify(clientConfig))

module.exports = configure(function (ctx) {
  return {
    // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
    supportTS: false,

    // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-webpack/boot-files
    boot: [
      'kdk',
      'plugins',
      'tour'
    ],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'roboto-font',
      'material-icons',
      'line-awesome',
      'fontawesome-v5'
    ],

    // https://quasar.dev/quasar-cli-webpack/quasar-config-js#property-htmlvariables
    htmlVariables: {
      appName: 'Kano',
      appSlug: 'kano',
      appDescription: 'A powerful real-time Geovisualizer'
    },

    vendor: {
      disable: false
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'

      vueLoaderOptions: {
        compilerOptions: {
          isCustomElement: tag => ['pinch-zoom'].includes(tag)        
        }
      },
      
      chainWebpack (chain) {
        chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: [ 'js', 'vue' ] }])
        // Perform bundle analysis
        if (process.env.ANALYZE_BUNDLE) {
          chain.plugin('webpack-bundle-analyzer').use(new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-analyzer.html'
          }))
        }
      },

      extendWebpack (cfg) {
        cfg.module.rules.push({
          // for i18n custom block
          resourceQuery: /blockType=i18n/,
          type: 'javascript/auto',
          loader: '@intlify/vue-i18n-loader'
        }),
        cfg.resolve.fallback = {
          fs: false,
          'dom-serializer': false,
          assert: require.resolve('assert'),
          crypto: require.resolve('crypto-browserify'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          path: require.resolve('path-browserify'),
          stream: require.resolve('stream-browserify'),
          timers: require.resolve('timers-browserify'),
          zlib: require.resolve('browserify-zlib')
        },
        cfg.resolve.mainFiles = ['index', 'Cesium'],
        // Required for old dependencies, i.e. feathers.js
        cfg.resolve.modules = [
          path.resolve(__dirname, 'node_modules')
        ],
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing aliases
          '@components': [
            path.resolve(__dirname, 'src/components'),
            path.resolve(__dirname, 'node_modules/@kalisio/kdk/core/client/components'),
            path.resolve(__dirname, 'node_modules/@kalisio/kdk/map/client/components')
          ],
          '@schemas': [
            path.resolve(__dirname, 'src/schemas'),
            path.resolve(__dirname, 'node_modules/@kalisio/kdk/core/common/schemas'),
            path.resolve(__dirname, 'node_modules/@kalisio/kdk/map/common/schemas')
          ],
          '@i18n': [
            path.resolve(__dirname, 'src/i18n'),
            path.resolve(__dirname, 'node_modules/@kalisio/kdk/core/client/i18n'),
            path.resolve(__dirname, 'node_modules/@kalisio/kdk/map/client/i18n')
          ],
          config: path.resolve(__dirname, 'config/client-config.json')
        },
        cfg.optimization.minimize = process.env.DEBUG ? false : cfg.optimization.minimize
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
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
        '/oauth': {
          target: 'http://localhost:' + serverPort,
          changeOrigin: true,
          logLevel: 'debug'
        }
      },
      open: true // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
    framework: {
      config: {},
      
      // lang: 'en-US', // Quasar language pack

      components: [
        'QAjaxBar',
        'QAvatar',
        'QBadge',
        'QBtn',
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
        'QFooter',
        'QHeader',
        'QIcon',
        'QImg',
        'QInput',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QLayout',
        'QList',
        'QMarkupTable',
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
        'ClosePopup',
        'Ripple',
        'TouchSwipe',
        'TouchPan'
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

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [
      'fadeIn',
      'fadeOut'
    ],

    // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'InjectManifest', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: { // only for 
        maximumFileSizeToCacheInBytes: 30 * 1024 * 1024
      },

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode
      
      chainWebpackCustomSW (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
      },
      
      manifest: {
        name: clientConfig.pwaName,
        short_name: clientConfig.pwaName,
        description: 'A powerful real-time Geovisualizer',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#f0ecec',
        theme_color :  '#72448b',
        start_url: './',
        id: './',
        icons: [
          {
            src: 'icons/kano-icon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: 'icons/kano-icon-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'icons/kano-icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/kano-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }
  }
})
