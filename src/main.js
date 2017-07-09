// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import injector from 'vue-inject'
import Quasar from 'quasar'
import 'quasar-extras/material-icons'
import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
import config from 'config'
import router from './router'
import api from './api'
import { Store } from 'kClient'

// Required IE 11 polyfill
import 'babel-polyfill'
import 'whatwg-fetch'

// Install Quasar Framework
Vue.use(Quasar)

// Setup Vue router
Vue.use(router)

// Setup and install Vue-inject
function loaderService () {
  return function (component) {
    return () => System.import(`kClient/src/components/${component}.vue`)
  }
}
function storeService () {
  return function () {
    return Store
  }
}
function apiService () {
  return function () {
    return api
  }
}
injector.factory('loader', '', loaderService)
injector.factory('store', '', storeService)
injector.factory('api', '', apiService)
Vue.use(injector)

// Set the configuration
Store.set('config', config)

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    router,
    el: '#q-app',
    render: h => h(require('./App'))
  })
})
