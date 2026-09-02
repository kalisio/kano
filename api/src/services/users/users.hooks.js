import { iff, isProvider, disallow, preventChanges } from 'feathers-hooks-common'
import { hooks as coreHooks } from '@kalisio/kdk/core.api.js'

export default {
  before: {
    all: [],
    find: [iff(isProvider('external'), coreHooks.onlyMe())],
    get: [iff(coreHooks.isNotMe(), disallow('external'))],
    create: [], // Registration already disallowed by configuration
    update: [commonHooks.disallow('external')],
    patch: [
      iff(isProvider('external'), coreHooks.onlyMe(), preventChanges('catalog'), preventChanges('layers'))
    ],
    remove: [disallow('external')]
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
