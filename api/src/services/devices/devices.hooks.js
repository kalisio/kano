import { when } from 'feathers-hooks-common'
import { hooks as notifyHooks } from 'kNotify'

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    // When an old device is removed update user device list so that we will only unsubscribe from it
    remove: [ hook => {
      const device = hook.service.findDeviceByRegistrationId(hook.id, hook.params.user)
      hook.params.user.devices = [device]
      return hook
    },
      // Unsubscribe the device to all possible topics
      notifyHooks.updateSubjectSubscriptions({ field: 'organisations', service: 'organisations' }),
      notifyHooks.updateSubjectSubscriptions({ field: 'groups', service: 'groups' }),
      notifyHooks.updateSubjectSubscriptions({ field: 'tags', service: 'tags' })
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    // When a new device is coming update user device list so that we will only subscribe to it
    create: [ hook => {
      hook.params.user.devices = [hook.result]
      return hook
    },
      // Subscribe the device to all possible topics
      notifyHooks.updateSubjectSubscriptions({ field: 'organisations', service: 'organisations' }),
      notifyHooks.updateSubjectSubscriptions({ field: 'groups', service: 'groups' }),
      notifyHooks.updateSubjectSubscriptions({ field: 'tags', service: 'tags' })
    ],
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
