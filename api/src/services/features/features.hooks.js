import { discard, setNow } from 'feathers-hooks-common'

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [setNow('createdAt', 'updatedAt')],
    update: [discard('createdAt', 'updatedAt'), setNow('updatedAt')],
    patch: [discard('createdAt', 'updatedAt'), setNow('updatedAt')],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [setNow('updatedAt')]
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
