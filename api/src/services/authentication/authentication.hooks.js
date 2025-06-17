import _ from 'lodash'
import commonHooks from 'feathers-hooks-common'
import { hooks as coreHooks } from '@kalisio/kdk/core.api.js'

export default {
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
    create: [commonHooks.iff(hook => process.env.API_GATEWAY_URL, async hook => {
      if (process.env.API_GATEWAY_JWT) {
        hook.result.gatewayToken = process.env.API_GATEWAY_JWT
        return hook
      }
      const config = hook.app.get('authentication')
      if (!config) return hook
      // Default appId for Kano used to access the gateway
      let appId = config.appId
      // Check if the token contains the appId for the gateway
      // => iframe / third-party application integration use case
      if (_.has(hook.result, 'authentication.payload.appId')) {
        appId = _.get(hook.result, 'authentication.payload.appId')
      } else {
        // Loop over auth providers and select the one used to login if any
        for (const provider of hook.app.authenticationProviders) {
          if (_.get(hook.params, `user.${provider}Id`) && _.get(config, `${provider}.appId`)) {
            appId = _.get(config, `${provider}.appId`)
            break
          }
        }
      }
      if (appId) {
        await coreHooks.createJWT({
          name: 'gatewayToken',
          jwt: user => ({
            subject: appId,
            // Audience is target subdomain
            audience: process.env.API_GATEWAY_URL.replace(/https?:\/\/api\./, '')
          }),
          payload: user => ({
            userId: (user ? user._id : undefined)
          })
        })(hook)
      }
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
