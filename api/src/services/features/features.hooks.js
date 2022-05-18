import commonHooks from 'feathers-hooks-common'

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [commonHooks.setNow('createdAt', 'updatedAt')],
    update: [commonHooks.discard('createdAt', 'updatedAt'), commonHooks.setNow('updatedAt')],
    patch: [commonHooks.discard('createdAt', 'updatedAt'), commonHooks.setNow('updatedAt')],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [commonHooks.setNow('updatedAt')]
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
