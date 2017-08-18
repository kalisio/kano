// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import logger from 'loglevel'
import Vue from 'vue'
import injector from 'vue-inject'
import Quasar from 'quasar'
import 'quasar-extras/material-icons'
import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
import config from 'config'
import router from './router'
import api from './api'
import utils from './utils'
import kCore, { Store } from 'kCore/client'
import kTeam from 'kTeam/client'

// Required IE 11 polyfill
import 'babel-polyfill'
import 'whatwg-fetch'

// Set up Vue
Vue.use(Quasar)
Vue.use(router)

// Setup vue-inject (see: https://github.com/jpex-js/vue-inject)
// As most of our Vue components are dynamically loaded, we inject
// into Vue a way to access the API and the Store
function apiService () {
  return function () {
    return api
  }
}
function storeService () {
  return function () {
    return Store
  }
}
injector.factory('api', '', apiService)
injector.factory('store', '', storeService)
Vue.use(injector)

// Set up the Store
Store.set('config', config)
Store.set('loadComponent', utils.loadComponent)
Store.set('resolveAsset', utils.resolveAsset)

Quasar.start(() => {
  // Create the Vue instance
  /* eslint-disable no-new */
  new Vue({
    router,
    el: '#q-app',
    render: h => h(require('./App'))
  })
  // Set up our plugin services
  try {
    api.configure(kCore)
    api.configure(kTeam)
  }
  catch (error) {
    logger.error(error.message)
  }
})
