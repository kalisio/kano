// Application hooks that run for every service
import { logHook, emitHook } from 'kClient'

module.exports = {
  before: {
    all: [ logHook, emitHook ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ logHook, emitHook ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ logHook, emitHook ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
