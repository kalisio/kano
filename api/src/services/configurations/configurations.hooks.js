import commonHooks from 'feathers-hooks-common'

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [commonHooks.disallow('external')],
    update: [commonHooks.disallow()],
    patch: [],
    remove: [commonHooks.disallow()]
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
