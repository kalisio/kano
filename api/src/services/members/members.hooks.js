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
    // Adding/Removing tags changes abilities, the subject is the item of the hook
    // to update we also need to fetch the user because on patch we might only have the tags available and not permissions
    patch: [ coreHooks.updateAbilities({ subjectAsItem: true }) ],
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
