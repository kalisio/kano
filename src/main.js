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
import utils from './utils'
import { Store } from 'kCore/client'

// Required IE 11 polyfill
import 'babel-polyfill'
import 'whatwg-fetch'

// Install Quasar Framework
Vue.use(Quasar)

// Setup Vue router
Vue.use(router)

function apiService () {
  return function () {
    return api
  }
}
injector.factory('api', '', apiService)
Vue.use(injector)

// Setup the Store
Store.set('config', config)
Store.set('loadComponent', utils.loadComponent)
Store.set('resolveAsset', utils.resolveAsset)

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    router,
    el: '#q-app',
    render: h => h(require('./App'))
  })
})
