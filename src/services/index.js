import logger from 'loglevel'
import memory from 'feathers-memory'
import kCore from '@kalisio/kdk/core.client'
import kMap from '@kalisio/kdk/map.client'

export default function () {
  const api = this

  // Set up our plugin services
  try {
    api.configure(kCore)
    api.configure(kMap)
    api.createService('in-memory-features', {
      service: memory({
        id: 'name',
        paginate: { default: 10 },
        matcher: api.matcher
      })
    })
  } catch (error) {
    logger.error(error.message)
  }
}
