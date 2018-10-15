import logger from 'loglevel'
import kCore from '@kalisio/kdk-core/client'

export default function () {
  const api = this

  // Set up our plugin services
  try {
    api.configure(kCore)
  } catch (error) {
    logger.error(error.message)
  }
}
