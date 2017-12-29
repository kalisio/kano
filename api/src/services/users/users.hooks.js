import { iffElse } from 'feathers-hooks-common'
import { hooks as teamHooks } from 'kTeam'
import { hooks as notifyHooks } from 'kNotify'

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ notifyHooks.addVerification ],
    update: [],
    patch: [],
    remove: [ notifyHooks.unregisterDevices ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ notifyHooks.sendVerificationEmail, notifyHooks.removeVerification, iffElse(hook => hook.result.sponsor, teamHooks.joinOrganisation, teamHooks.createPrivateOrganisation) ],
    update: [],
    patch: [],
    remove: [ teamHooks.removePrivateOrganisation ]
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
