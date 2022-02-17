import _ from 'lodash'
import config from 'config'
import { utils as kCoreUtils, Store, Layout, Events } from '@kalisio/kdk/core.client'
import utils from './utils'

import { Geolocation } from '@kalisio/kdk/map.client'

export default {
  install (Vue, options) {
    // Inject in Vue the Kalisio features
    Vue.prototype.$store = Store
    Vue.prototype.$layout = Layout
    Vue.prototype.$events = Events
    Vue.prototype.$api = options.api
    Vue.prototype.$can = options.api.can
    Vue.prototype.$toast = kCoreUtils.toast
    Vue.prototype.$load = utils.load
    Vue.prototype.$createComponent = utils.createComponent
    Vue.prototype.$createComponentVNode = utils.createComponentVNode
    Vue.prototype.$config = function (path, defaultValue) {
      return _.get(config, path, defaultValue)
    }
    Vue.prototype.$geolocation = Geolocation
    // FIXME: This is used for testing purpose, don't know how to access this from puppeteer otherwise
    global.$layout = Vue.prototype.$layout
    global.$store = Vue.prototype.$store
    global.$api = Vue.prototype.$api
  }
}
