import _ from 'lodash'
import config from 'config'
import utils from './utils'
import { Store } from 'kCore/client'

export default {
  install (Vue, options) {
    // Inject in Vue the Kalisio features
    Vue.prototype.$store = Store
    Vue.prototype.$api = options.api
    Vue.prototype.$can = options.api.can
    Vue.prototype.$load = utils.load
    Vue.prototype.$config = function (path, defaultValue) {
      return _.get(config, path, defaultValue)
    }
  }
}
