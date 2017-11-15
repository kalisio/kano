import { notifyHooks } from 'kNotify'
import { eventHooks } from 'kEvent'

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
    create: [ eventHooks.createOrganisationServices, notifyHooks.createTopic ],
    update: [],
    patch: [],
    remove: [ eventHooks.removeOrganisationServices, notifyHooks.removeTopic ]
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
