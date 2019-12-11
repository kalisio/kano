import _ from 'lodash'
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
    create: [iff(hook => process.env.API_GATEWAY, async hook => {
      const config = hook.app.get('authentication')
      if (!config) return hook
      // Default appId for Kano used to access the gateway
      let appId = config.appId
      // Check if the token contains the appId for the gateway
      // => iframe integration use case
      if (_.has(hook, `params.payload.appId`)) {
        appId = _.get(hook, `params.payload.appId`)
      } else {
        // Loop over auth providers and select the one used to login if any
        for (const provider of hook.app.authenticationProviders) {
          if (_.has(hook, `params.user.${provider}Id`) && _.has(config, `${provider}.appId`)) {
            appId = _.get(config, `${provider}.appId`)
            break
          }
        }
      }
      if (appId) await coreHooks.createJWT({
        name: 'gatewayToken',
        jwt: user => ({ subject: appId }),
        payload: user => ({ userId: (user ? user._id : undefined) })
      })(hook)
      return hook
    })],
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
