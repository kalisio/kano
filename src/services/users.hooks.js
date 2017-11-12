import { hooks as notifyHooks } from 'kNotify/client'

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ notifyHooks.checkUnique ],
    update: [],
    patch: [],
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
