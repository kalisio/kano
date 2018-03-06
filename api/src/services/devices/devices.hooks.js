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
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
              // Check if the device has already been registered
    update: [ when(hook => {
                const isNotRegistered = !hook.service.isDeviceRegistered(hook.data, hook.params.user)
                // Is a new device coming ? If so update user device list so that we will only subscribe to it
                if (isNotRegistered) {
                  hook.params.user.devices = [hook.result]
                }
                return isNotRegistered
              }, [
                // Subscribe the device to all possible topics
                notifyHooks.updateSubjectSubscriptions({ field: 'organisations', service: 'organisations' }),
                notifyHooks.updateSubjectSubscriptions({ field: 'groups', service: 'groups' }),
                notifyHooks.updateSubjectSubscriptions({ field: 'tags', service: 'tags' })
              ])
            ],
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
