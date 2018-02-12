import { hooks as teamHooks } from 'kTeam'
import { hooks as notifyHooks } from 'kNotify'
import { hooks as eventHooks } from 'kEvent'

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
    create: [ teamHooks.createOrganisationServices, eventHooks.createOrganisationServices, notifyHooks.createTopic, teamHooks.createOrganisationAuthorisations ],
    update: [],
    patch: [],
    remove: [ teamHooks.removeOrganisationAuthorisations, notifyHooks.removeTopic, eventHooks.removeOrganisationServices, teamHooks.removeOrganisationServices ]
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
