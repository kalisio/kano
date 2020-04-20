import { ClientFunction } from 'testcafe'
import Screens from './screens'
import Layout from './layout'
import SideNav from './side-nav'
import NavigationBar from './navigation-bar'
import Timeline from './timeline'
import MapActivity from './map-activity'

// Export all models
export {
  Screens,
  Layout,
  SideNav,
  NavigationBar,
  Timeline,
  MapActivity
}

// Access store
export const getFromStore = ClientFunction((path) => window.$store.get(path))

// Access Feathers services
export const api = {
  logout: ClientFunction(() => window.$api.logout()),
  get: ClientFunction((service, id) => window.$api.getService(service).get(id)),
  find: ClientFunction((service, params) => window.$api.getService(service).find(params)),
  remove: ClientFunction((service, id) => window.$api.getService(service).remove(id))
}

// Acces window size
export const getWindowInnerWidth = ClientFunction(() => window.innerWidth)
export const getWindowInnerHeight = ClientFunction(() => window.innerHeight)

// Access routes
const baseUrl = process.env.APP_URL || (process.env.NODE_ENV === 'production' ? `http://localhost:8081` : `http://localhost:8082`)
export const getUrl = (path) => path ? baseUrl + '/#/' + path : baseUrl
export const goBack = ClientFunction(() => window.history.back())

// Access console errors
export const checkNoClientError = async (test) => {
  const { error } = await test.getBrowserConsoleMessages()
  await test.expect(error[0]).notOk()
}
export const checkClientError = async (test) => {
  const { error } = await test.getBrowserConsoleMessages()
  await test.expect(error[0]).ok()
}

// Mock Geolocation API that does not work well in headless browsers
// See https://github.com/DevExpress/testcafe/issues/1991
export const mockLocationAPI = ClientFunction(() => {
  navigator.geolocation.getCurrentPosition =
    (callback) => callback({
      coords: {
        latitude: 43.2996151,
        longitude: 1.9287062
      },
      timestamp: Date.now()
    })
})
