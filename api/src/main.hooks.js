// Application hooks that run for every service
import fuzzySearch from 'feathers-mongodb-fuzzy-search'
import { hooks as coreHooks } from 'kCore'

const { authenticate } = require('feathers-authentication').hooks

module.exports = {
  before: {
    all: [ coreHooks.log,
      authenticate('jwt'),
      coreHooks.processObjectIDs ],
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
