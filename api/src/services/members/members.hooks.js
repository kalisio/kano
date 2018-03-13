import { hooks as coreHooks } from 'kCore'
import { hooks as notifyHooks } from 'kNotify'

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [  // Required to update subscriptions correctly
      coreHooks.populatePreviousObject,
      coreHooks.updateTags,
              // Avoid removing subscriptions on removed (ie unused) tags
      notifyHooks.updateSubjectSubscriptions({
        field: 'tags',
        service: 'tags',
        filter: (operation, topics) => operation === 'unsubscribe' ? topics.filter(topic => topic.count > 1) : topics,
        userAsObject: true
      })
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
