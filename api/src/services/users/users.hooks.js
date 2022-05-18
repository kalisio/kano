import commonHooks from 'feathers-hooks-common'

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [commonHooks.disallow('external')],
    patch: [
      commonHooks.iff(commonHooks.isProvider('external'), commonHooks.preventChanges('catalog')),
      commonHooks.iff(commonHooks.isProvider('external'), commonHooks.preventChanges('layers'))
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
