// Application hooks that run for every service
import { hooks as coreHooks } from 'kCore/client'

export default {
  before: {
    all: [ coreHooks.log, coreHooks.emit ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ coreHooks.log, coreHooks.emit ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ coreHooks.log, coreHooks.emit ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
