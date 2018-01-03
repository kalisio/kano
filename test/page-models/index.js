import { ClientFunction } from 'testcafe'
import ApplicationLayout from './layout'
import Authentication from './authentication'
import Account from './account'
import Organisations from './organisations'

// Export all models
export {
  ApplicationLayout,
  Authentication,
  Account,
  Organisations
}

// Then util functions

// Access store
export const getFromStore = ClientFunction((path) => window.$store.get(path))
// Access Feathers services
export const api = {
	logout: ClientFunction(() => window.$api.logout()),
	get: ClientFunction((service, id) => window.$api.getService(service).get(id)),
	find: ClientFunction((service, params) => window.$api.getService(service).find(params)),
	remove: ClientFunction((service, id) => window.$api.getService(service).remove(id))
}
// Access routes
const baseUrl = (process.env.NODE_ENV === 'production' ? `http://localhost:8081` : `http://localhost:8080`)
export const getUrl = (path) => path ? baseUrl + '/#/' + path : baseUrl
export const goBack = ClientFunction(() => window.history.back())
// Access console errors
export const checkNoClientError = async (test) => {
	const { error } = await test.getBrowserConsoleMessages()
  await test.expect(error[0]).notOk()
}
