import _ from 'lodash'
import config from 'config'
import { utils as kCoreUtils } from '@kalisio/kdk-core/client'
import utils from './utils'
import { Store, Events } from '@kalisio/kdk-core/client'

export default {
  install (Vue, options) {
    // Inject in Vue the Kalisio features
    Vue.prototype.$store = Store
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
    // FIXME: This is used for testing purpose, don't know how to access this from testcafe otherwise
    global.$store = Vue.prototype.$store
    global.$api = Vue.prototype.$api
  }
}
