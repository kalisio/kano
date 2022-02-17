// Application hooks that run for every service
import { permissions as corePermissions, hooks as coreHooks } from '@kalisio/kdk/core.client'
import { permissions as mapPermissions } from '@kalisio/kdk/map.common'
import * as permissions from './permissions'

// Register all default hooks for authorisation
// Default rules for all users
corePermissions.defineAbilities.registerHook(corePermissions.defineUserAbilities)
corePermissions.defineAbilities.registerHook(mapPermissions.defineUserAbilities)
// Then rules for app
corePermissions.defineAbilities.registerHook(permissions.defineUserAbilities)

export default {
  before: {
    all: [coreHooks.log, coreHooks.emit],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [coreHooks.log, coreHooks.emit],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [coreHooks.log, coreHooks.emit],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
