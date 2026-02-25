import commonHooks from 'feathers-hooks-common'
import { hooks as coreHooks } from '@kalisio/kdk/core.api.js'

export default {
  before: {
    all: [],
    find: [commonHooks.iff(commonHooks.isProvider('external'), coreHooks.onlyMe())],
    get: [commonHooks.iff(coreHooks.isNotMe(), commonHooks.disallow('external'))],
    create: [], // Registration already disallowed by configuration
    update: [commonHooks.disallow('external')],
    patch: [
      commonHooks.iff(commonHooks.isProvider('external'), coreHooks.onlyMe(), commonHooks.preventChanges('catalog'), commonHooks.preventChanges('layers'))
    ],
    remove: [commonHooks.disallow('external')]
  },

  after: {
    all: [], // As only my user can be accessed no need to discard additional information like permissions
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
