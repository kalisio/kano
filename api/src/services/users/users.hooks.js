import { iff, disallow, isProvider, preventChanges } from 'feathers-hooks-common'

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [disallow('external')],
    patch: [
      iff(isProvider('external'), preventChanges('catalog')),
      iff(isProvider('external'), preventChanges('layers'))
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
