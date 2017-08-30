// Application hooks that run for every service
import fuzzySearch from 'feathers-mongodb-fuzzy-search'
import { hooks } from 'kCore'

module.exports = {
  before: {
    all: [ hooks.log ],
    find: [ fuzzySearch() ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ hooks.log ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ hooks.log ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
