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
export const getStore = ClientFunction(() => window.$store)
