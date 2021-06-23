import logger from 'loglevel'
import kCore from '@kalisio/kdk/core.client'
import kMap from '@kalisio/kdk/map.client'

export default function () {
  const api = this

  // Set up our plugin services
  try {
    api.configure(kCore)
    api.configure(kMap)
  } catch (error) {
    logger.error(error.message)
  }
}
