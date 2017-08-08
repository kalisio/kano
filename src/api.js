import logger from 'loglevel'
import apiHooks from './main.hooks'
import kCore, { kaelia } from 'kCore/client'
import kTeam from 'kTeam/client'

let api = kaelia()
// Setup app hooks
api.hooks(apiHooks)
// Set up our plugin services
try {
  api.configure(kCore)
  api.configure(kTeam)
}
catch (error) {
  logger.error(error.message)
}

export default api
