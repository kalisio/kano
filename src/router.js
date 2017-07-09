import Vue from 'vue'
import VueRouter from 'vue-router'

function loadComponent (component) {
  return () => System.import(`kClient/src/components/authentication/${component}.vue`)
}

Vue.use(VueRouter)

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    {
      path: '/',
      component: loadComponent('KLogin')
    },
    {
      path: '/login',
      component: loadComponent('KLogin')
    },
    {
      path: '/register',
      component: loadComponent('KRegister')
    },
    {
      path: '*',
      component: loadComponent('Error404')
    } // Not found
  ]
})
