import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import config from 'config'
import { Store } from '@kalisio/kdk/core.client'
import * as utils from '../utils'
import buildTours from '@kalisio/kdk/core/client/utils/utils.tours'

/*
* If not building with SSR mode, you can
* directly export the Router instantiation;
*
* The function below can be async too; either use
* async/await or return a Promise which resolves
* with the Router instance.
*/

export const Router = {
  initialize () { this.router = null },
  get () { return this.router },
  set (router) { this.router = router }
}

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: utils.buildRoutes(config.routes),

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? undefined : process.env.VUE_ROUTER_BASE)
  })

  Store.set('tours', Object.assign({
    current: {
      name: '',
      step: 0,
      play: false
    }
  }, buildTours(config.routes)))

  return router
})

Router.initialize()
