import _ from 'lodash'
import { api } from '@kalisio/kdk/core.client'

// Helper singleton to access configuration options stored in the database.
// Each configuration in an object like: { name, value }.
export const Configurations = {
  initialize () {
    if (!this.service) return
    // We use a cache as the configuration is not updated often but can be read a lot of times
    this.cache = {}
    this.updateCache = (object) => {
      if (object.name && this.cache[object.name]) this.cache[object.name] = object
    }
    this.service.on('patched', this.updateCache)
  },
  finalize () {
    this.cache = {}
    this.service.off('patched', this.updateCache)
  },
  getService () {
    // Initialize on first use
    if (!this.service) {
      this.service = api.getService('configurations')
      this.initialize()
    }
    return this.service
  },
  // Get a configuration object by its name
  async get (name) {
    const service = this.getService()
    if (!service) return
    // Update or return cache
    if (this.cache[name]) return this.cache[name]
    const response = await service.find({ query: { name } })
    const object = _.get(response, 'data[0]')
    if (object) this.cache[name] = object
    return object
  },
  // Get the value associated to a configuration object by its name
  async getValue (name, defaultValue = {}) {
    const object = await this.get(name)
    return _.get(object, 'value', defaultValue)
  },
  // Update the value associated to a configuration object by its name
  async update (name, value) {
    const object = await this.get(name)
    if (!object || !object._id) return
    await this.getService().patch(object._id, { value })
  }
}
