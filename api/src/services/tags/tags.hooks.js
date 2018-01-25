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
    create: [ when(hook => hook.result.scope === 'members', hooks.createTopic) ],
    update: [],
    patch: [],
    remove: [ when(hook => hook.result.scope === 'members', hooks.removeTopic) ]
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
