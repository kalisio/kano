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
export const getFromStore = ClientFunction((path) => window.$store.get(path))
export const api = {
	get: ClientFunction((service, id) => window.$api.getService(service).get(id)),
	find: ClientFunction((service, params) => window.$api.getService(service).find(params)),
	remove: ClientFunction((service, id) => window.$api.getService(service).remove(id))
}
