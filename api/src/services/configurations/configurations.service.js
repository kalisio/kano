import makeDebug from 'debug'
import _ from 'lodash'

const debug = makeDebug('kano:configurations:service')

export default async function (name, app, options) {
  return {
    async createDefaultConfigurations (app) {
      const configurationsService = app.getService('configurations')
      const defaultConfigurations = app.get('defaultConfigurations')
      try {
        for (const configuration of defaultConfigurations) {
          // Check if the configuration exists
          const existingConfiguration = await configurationsService.find({ query: { name: configuration.name }, paginate: false })
          // If the profile does not exist, create it
          if (_.isEmpty(existingConfiguration)) {
            await configurationsService.create(configuration)
            debug('Creating default configuration: ' + configuration.name)
          }
        }
      } catch (error) {
        app.logger.error(error.message)
      }
    }
  }
}
