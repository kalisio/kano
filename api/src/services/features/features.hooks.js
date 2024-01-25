import _ from 'lodash'
import commonHooks from 'feathers-hooks-common'

// Allow upsert if required
const upsert = (hook) => {
  _.set(hook, 'params.mongodb', { upsert: _.get(hook, 'params.query.upsert', false) })
  _.unset(hook, 'params.query.upsert')
}

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      upsert,
      commonHooks.setNow('createdAt', 'updatedAt')
    ],
    update: [
      upsert,
      commonHooks.discard('createdAt', 'updatedAt'),
      commonHooks.setNow('updatedAt')
    ],
    patch: [
      upsert,
      commonHooks.discard('createdAt', 'updatedAt'),
      commonHooks.setNow('updatedAt')
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
    remove: [
      commonHooks.setNow('updatedAt')
    ]
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
