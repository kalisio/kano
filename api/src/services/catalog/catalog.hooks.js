import { createFeaturesService, removeFeaturesService, updateConfigurations } from '../../hooks/hooks.catalog.js'

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
      // Update configurations when removing a layer/category
      updateConfigurations,
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
