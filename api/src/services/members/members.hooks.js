import { hooks as coreHooks } from 'kCore'
import { hooks as notifyHooks } from 'kNotify'

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [ coreHooks.populatePreviousObject, coreHooks.updateTags, notifyHooks.updateSubjectSubscriptions('tags', 'tags') ],
    patch: [ coreHooks.populatePreviousObject, coreHooks.updateTags, notifyHooks.updateSubjectSubscriptions('tags', 'tags') ],
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
