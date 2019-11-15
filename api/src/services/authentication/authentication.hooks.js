import { iff } from 'feathers-hooks-common'
import { hooks as coreHooks } from '@kalisio/kdk-core'

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
    create: [iff(hook => process.env.GATEWAY, coreHooks.createJWT({
      name: 'gatewayToken',
      jwt: user => ({ subject: 'Sn9ZEd33wv6EyagENd3KMwqh' }),
      payload: user => ({ userId: user._id })
    }))],
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
