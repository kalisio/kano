// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import logger from 'loglevel'
import Vue from 'vue'
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

// Set up the Store
Store.set('config', config)
Store.set('loadComponent', utils.loadComponent)
Store.set('loadSchema', utils.loadSchema)
Store.set('resolveAsset', utils.resolveAsset)

Quasar.start(() => {
  // Inject in Vue the Kalisio features
  Object.defineProperty(Vue.prototype, '$store', {
    get () { return Store }
  })
  Object.defineProperty(Vue.prototype, '$api', {
    get () { return api }
  })
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
