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
import router from './router'

// Required IE 11 polyfill
import 'babel-polyfill'
import 'whatwg-fetch'

// Install Quasar Framework
Vue.use(Quasar)

// Setup Vue router
Vue.use(router)

// Setup and install Vue-inject
function loadClientComponent () {
  return function (component) {
    return () => System.import(`kClient/src/components/${component}.vue`)
  }
}
injector.factory('componentLoader', '', loadClientComponent)
Vue.use(injector)

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    router,
    el: '#q-app',
    render: h => h(require('./App'))
  })
})
