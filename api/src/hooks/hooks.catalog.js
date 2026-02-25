import _ from 'lodash'
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

// Update configurations when a category/layer is removed
export async function updateConfigurations (hook) {
  const app = hook.app
  const context = hook.service.getContextId()
  const configurationsService = app.getService('configurations', context)
  if (!configurationsService) return hook
  let removedItems = getItems(hook)
  if (!Array.isArray(removedItems)) removedItems = [removedItems]
  for (let i = 0; i < removedItems.length; i++) {
    const removedItem = removedItems[i]
    const isLayer = removedItem.type.endsWith('Layer')
    const isCategory = (removedItem.type === 'Category')
    if (!isLayer && !isCategory) continue
    const query = { value: (removedItem._id ? removedItem._id.toString() : removedItem.name) }
    // Retrieve the list of all configurations involving the item
    const configurations = await configurationsService.find({
      query, paginate: false
    })
    // Stop when non found
    if (configurations.length === 0) {
      debug(`No configuration to update after removing item ${removedItem.name} `)
      continue
    }
    // Update each project otherwise
    await Promise.all(configurations.map(configuration => {
      // Remove item in list
      const items = configuration.value
      _.remove(items, item => removedItem._id ? removedItem._id.toString() === item.toString() : removedItem.name === item)
      return configurationsService.patch(configuration._id.toString(), { value: items })
    }))

    debug(`Updated ${configurations.length} configurations after removing item ${removedItem.name} `)
  }
  return hook
}
