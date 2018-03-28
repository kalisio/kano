import { hooks as teamHooks } from 'kTeam'
import { hooks as notifyHooks } from 'kNotify'
import { when } from 'feathers-hooks-common'

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [ when(hook => hook.params.resource && !hook.params.resource.deleted,
      teamHooks.preventRemovingLastOwner('organisations'),
      teamHooks.preventRemovingLastOwner('groups')) ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ notifyHooks.subscribeSubjectsToResourceTopic ],
    update: [],
    patch: [],
    remove: [ notifyHooks.unsubscribeSubjectsFromResourceTopic ]
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
