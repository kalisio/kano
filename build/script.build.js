process.env.NODE_ENV = 'production'

require('colors')

var
  shell = require('shelljs'),
  path = require('path'),
  env = require('./env-utils'),
  css = require('./css-utils'),
  config = require('../config'),
  webpack = require('webpack'),
  webpackConfig = require('./webpack.prod.conf'),
  targetPath = path.join(__dirname, '../dist')

console.log(' WARNING!'.bold)
console.log(' Do NOT use VueRouter\'s "history" mode if')
console.log(' building for Cordova or Electron.\n')

require('./script.clean.js')
console.log((' Building Quasar App with "' + env.platform.theme + '" theme...\n').bold)

function copyModule(module) {
  shell.mkdir('-p', path.resolve(__dirname, `../${module}`))
  shell.cp('-R', path.resolve(__dirname, `../api/node_modules/${module}/lib`), path.resolve(__dirname, `../${module}`))
  // Need to copy as well entry points such as kCore/client and kCore/common
  shell.cp(path.resolve(__dirname, `../api/node_modules/${module}/client.js`), path.resolve(__dirname, `../${module}`))
  shell.cp(path.resolve(__dirname, `../api/node_modules/${module}/common.js`), path.resolve(__dirname, `../${module}`))
  console.log(` Copied ${module} module files to app folder.\n`)
}

shell.mkdir('-p', targetPath)
shell.cp('-R', 'src/statics', targetPath)
// FIXME: for now avoid using Cesium to create a light package
shell.rm('-fR', targetPath + '/statics/Cesium')

// Copy files from linked node modules otherwise they are not correctly transpiled by babel
// see https://github.com/kalisio/kdk/issues/28 for details
copyModule('kCore')
copyModule('kTeam')
copyModule('kNotify')
copyModule('kEvent')
copyModule('kMap')

function finalize () {
  console.log((
    '\n Build complete with "' + env.platform.theme.bold + '" theme in ' +
    '"/dist"'.bold + ' folder.\n').cyan)

  console.log(' Built files are meant to be served over an HTTP server.'.bold)
  console.log(' Opening index.html over file:// won\'t work.'.bold)
}

webpack(webpackConfig, function (err, stats) {
  if (err) throw err

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')

  if (stats.hasErrors()) {
    process.exit(1)
  }

  if (config.build.purifyCSS) {
    css.purify(finalize)
  }
  else {
    finalize()
  }
})
