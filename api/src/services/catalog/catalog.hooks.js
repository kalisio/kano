import common from 'feathers-hooks-common'
import makeDebug from 'debug'
import { createFeaturesServiceForLayer, removeFeaturesServiceForLayer } from '@kalisio/kdk/map.api.js'

const { getItems } = common
const debug = makeDebug('kano:hooks:catalog')

// Create required features service when adding a layer that requires one
export async function createFeaturesService (hook) {
  const layer = getItems(hook)
  if (layer.service && (layer.service !== 'features')) {
    debug(`Creating (or reuse) layer service ${layer.service} as a new layer use it`)
    await createFeaturesServiceForLayer.call(hook.app, layer, hook.service.context)
  }
  return hook
}

// Removed unused features service when removing a layer that required one
export async function removeFeaturesService (hook) {
  const layer = getItems(hook)
  // Check if service(s) are associated to this layer
  // and remove it if not used by any other layer
  if (layer.service && (layer.service !== 'features')) {
    const layersUsingService = await hook.service.find({ query: { service: layer.service, $limit: 1 } })
    debug(`Removing layer service ${layer.service} as no more layers use it`)
    if (layersUsingService.total === 0) await removeFeaturesServiceForLayer.call(hook.app, layer, hook.service.context)
  }
  return hook
}

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
    create: [
      // Allow for dynamic service creation attached to a layer
      createFeaturesService
    ],
    update: [],
    patch: [],
    remove: [
      removeFeaturesService
    ]
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
