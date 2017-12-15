// Application hooks that run for every service
import fuzzySearch from 'feathers-mongodb-fuzzy-search'
import { hooks as coreHooks } from 'kCore'
import { permissions as teamPermissions, hooks as teamHooks } from 'kTeam'
import { permissions as notifyPermissions } from 'kNotify'
import { permissions as eventPermissions } from 'kEvent'

// Register all default hooks for authorisation
// Default rules for all users
teamPermissions.defineAbilities.registerHook(teamPermissions.defineUserAbilities)
teamPermissions.defineAbilities.registerHook(notifyPermissions.defineUserAbilities)
// Then rules for organisations
teamPermissions.defineAbilities.registerHook(teamPermissions.defineOrganisationAbilities)
// Then rules for groups
teamPermissions.defineAbilities.registerHook(teamPermissions.defineGroupAbilities)
// Then rules for events
teamPermissions.defineAbilities.registerHook(eventPermissions.defineEventAbilities)

module.exports = {
  before: {
    all: [ coreHooks.log, teamHooks.authorise ],
    find: [ fuzzySearch() ],
    get: [],
    create: [],
    update: [ coreHooks.preventUpdatePerspectives ],
    patch: [],
    remove: []
  },

  after: {
    all: [ coreHooks.log, coreHooks.processPerspectives ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ coreHooks.log ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
