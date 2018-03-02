// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import logger from 'loglevel'
import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import appHooks from './main.hooks'
import services from './services'
import { kalisio, beforeGuard, authenticationGuard } from 'kCore/client'
import plugin from './vue-kdk'

// Required IE 11 polyfill
import 'babel-polyfill'
import 'whatwg-fetch'

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/animate/bounceInRight.css'
import 'quasar-extras/animate/bounceOutRight.css'

let api = kalisio()
// Setup app hooks
api.hooks(appHooks)
// Then all services
services.call(api)

// Set up Vue
Vue.use(Quasar)
Vue.use(router)
Vue.use(plugin, { api })

// Add global guard
beforeGuard.registerGuard(authenticationGuard)
// Now done in index to ensure the session has been correctly restored before registering guards
// router.beforeEach(beforeGuard)

Quasar.start(() => {
  logger.info('Starting application')
  // Create the Vue instance
  /* eslint-disable no-new */
  new Vue({
    router,
    el: '#kapp',
    render: h => h(require('./App'))
  })
})
