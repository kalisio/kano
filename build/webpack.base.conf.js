var
  path = require('path'),
  webpack = require('webpack'),
  config = require('../config'),
  cssUtils = require('./css-utils'),
  env = require('./env-utils'),
  merge = require('webpack-merge'),
  fs = require('fs'),
  ProgressBarPlugin = require('progress-bar-webpack-plugin'),
  // Load config based on current NODE_ENV, etc.
  clientConfig = require('config'),
  projectRoot = path.resolve(__dirname, '../'), 
  useCssSourceMap =
    (env.dev && config.dev.cssSourceMap) ||
    (env.prod && config.build.productionSourceMap)

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: config[env.prod ? 'build' : 'dev'].publicPath,
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].[chunkhash].js',
    sourcePrefix : '' // Required for Cesium, see https://github.com/AnalyticalGraphicsInc/cesium/issues/4876
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve(''),
      resolve('src'),
      resolve('node_modules')
    ],
    alias: config.aliases
  },
  externals: {
    'fs': true // Required for Cesium, https://github.com/AnalyticalGraphicsInc/cesium/issues/4838
  },
  module: {
    unknownContextCritical: false, // Required for Cesium, see https://github.com/AnalyticalGraphicsInc/cesium/issues/4876
    unknownContextRegExp: /^.\/.*$/, // Required for Cesium, https://github.com/mmacaula/cesium-webpack/issues/4
    rules: [
      /*
      { // eslint
        enforce: 'pre',
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        include: projectRoot,
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      */
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules(\/|\\)(?!(@feathersjs|debug))/
      },
      {
        test: /statics\/Cesium\.js$/,
        loader: 'script'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: cssUtils.postcss,
          loaders: merge({js: 'babel-loader'}, cssUtils.styleLoaders({
            sourceMap: useCssSourceMap,
            extract: env.prod
          }))
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config[env.prod ? 'build' : 'dev'].env,
      'DEV': env.dev,
      'PROD': env.prod,
      '__THEME': '"' + env.platform.theme + '"'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: env.prod,
      options: {
        context: path.resolve(__dirname, '../src'),
        postcss: cssUtils.postcss
      }
    }),
    new ProgressBarPlugin({
      format: config.progressFormat
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  performance: {
    hints: false
  }
}

// This will take the config based on the current NODE_ENV and save it to 'build/client.json'
// Note: If '/build' does not exist, this command will error; alternatively, write to '/config'.
// The webpack alias below will then build that file into the client build.
fs.writeFileSync(path.join('config', 'client-config.json'), JSON.stringify(clientConfig))

