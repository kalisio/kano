import Vue from 'vue'
import VueRouter from 'vue-router'
import utils from './utils'

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
      name: 'index',
      component: utils.loadComponent('Index'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: utils.loadClientComponent('authentication/KLogin')
        },
        {
          path: 'logout',
          name: 'logout',
          component: utils.loadClientComponent('authentication/KLogout')
        },
        {
          path: 'register',
          name: 'register',
          component: utils.loadClientComponent('authentication/KRegister')
        },
        {
          path: 'reset-password',
          name: 'resetPassword',
          component: utils.loadClientComponent('authentication/KResetPassword')
        },
        {
          name: 'home',
          path: 'home',
          component: utils.loadClientComponent('layout/KHome'),
          children: [
            {
              name: 'users',
              path: 'users',
              component: utils.loadClientComponent('users/KUsers')
            },
            {
              name: 'editUser',
              path: 'edit-user/:id',
              component: utils.loadClientComponent('editor/KEditor'),
              props: true
            },
            {
              name: 'userSecurity',
              path: 'user-security/:id',
              component: utils.loadClientComponent('users/KUserSecurity')
            },
            {
              name: 'userSessions',
              path: 'user-sessions/:id',
              component: utils.loadClientComponent('users/KUserSessions')
            }
          ]
        }
      ]
    },
    {
      path: '*',
      component: utils.loadComponent('Error404')
    } // Not found
  ]
})
