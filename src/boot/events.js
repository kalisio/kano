import { Events } from '@kalisio/kdk-core/client'

export default ({ app, Vue }) => {
  Vue.prototype.$events = Events
}
