import { when } from 'feathers-hooks-common'
import { hooks } from 'kNotify'

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    // We create topics for members tag only, check if tag is really created or just its count increased
    create: [ when(hook => hook.result.scope === 'members' && hook.result.count === 1, hooks.createTopic) ],
    update: [],
    patch: [],
    // We remove topics for members tag only, check if tag is really removed or just its count decreased
    remove: [ when(hook => hook.result.scope === 'members' && hook.result.count <= 0, hooks.removeTopic) ]
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
