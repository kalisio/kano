// Application hooks that run for every service
import fuzzySearch from 'feathers-mongodb-fuzzy-search'
import commonHooks from 'feathers-hooks-common'
import { permissions as corePermissions, hooks as coreHooks } from '@kalisio/kdk/core.api'
import { permissions as mapPermissions } from '@kalisio/kdk/map.api'
import * as permissions from './permissions'

const { authenticate } = require('@feathersjs/authentication').hooks

// Default rules for all users
corePermissions.defineAbilities.registerHook(corePermissions.defineUserAbilities)
corePermissions.defineAbilities.registerHook(mapPermissions.defineUserAbilities)
// Then rules for app
corePermissions.defineAbilities.registerHook(permissions.defineUserAbilities)

module.exports = {
  before: {
    all: [coreHooks.log,
      // We skip authentication in some cases
      commonHooks.when(hook => {
        // First built-in Feathers services like authentication
        if (typeof hook.service.getPath !== 'function') return false
        // Second distributed service calls
        const distributedConfig = hook.app.get('distribution')
        if (hook.params.fromRemote && distributedConfig) {
          if (!distributedConfig.authentication) return false
        }
        // Then user creation
        if ((hook.service.name === 'users') && (hook.method === 'create')) return false
        // If not exception perform authentication
        return true
      }, authenticate('jwt')),
      coreHooks.processObjectIDs,
      coreHooks.authorise],
    find: [fuzzySearch(), coreHooks.marshallCollationQuery],
    get: [],
    create: [],
    update: [coreHooks.preventUpdatePerspectives],
    patch: [],
    remove: []
  },

  after: {
    all: [coreHooks.log, coreHooks.processPerspectives],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [coreHooks.log],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
