import { hooks as teamHooks } from 'kTeam'
import { hooks as notifyHooks } from 'kNotify'

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
    create: [ notifyHooks.createTopic,
              teamHooks.createGroupAuthorisations ],
    update: [],
    patch: [],
    remove: [ teamHooks.removeGroupAuthorisations,
              notifyHooks.removeTopic ]
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
