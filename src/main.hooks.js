// Application hooks that run for every service
import { hooks as coreHooks } from 'kCore/client'
import { permissions as teamPermissions } from 'kTeam/common'
import { permissions as eventPermissions } from 'kEvent/common'

// Register all default hooks for authorisation
// Default rules for all users
teamPermissions.defineAbilities.registerHook(teamPermissions.defineUserAbilities)
// Then rules for organisations
teamPermissions.defineAbilities.registerHook(teamPermissions.defineOrganisationAbilities)
// Then rules for groups
teamPermissions.defineAbilities.registerHook(teamPermissions.defineGroupAbilities)
// Then rules for events
teamPermissions.defineAbilities.registerHook(eventPermissions.defineEventAbilities)

export default {
  before: {
    all: [ coreHooks.log, coreHooks.emit ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ coreHooks.log, coreHooks.emit ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ coreHooks.log, coreHooks.emit ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
