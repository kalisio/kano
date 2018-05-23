import logger from 'loglevel'
import kCore from 'kCore/client'
import kTeam from 'kTeam/client'
import kNotify from 'kNotify/client'
import kMap from 'kMap/client'
import kEvent from 'kEvent/client'
import usersHooks from './users.hooks'

export default function () {
  const api = this

  // Set up our plugin services
  try {
    api.configure(kCore)
    // Add hooks to automatically check uniqueness when creating a new user
    api.getService('users').hooks(usersHooks)
    api.configure(kTeam)
    api.configure(kNotify)
    api.configure(kMap)
    api.configure(kEvent)
  } catch (error) {
    logger.error(error.message)
  }
}
