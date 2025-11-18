import _ from 'lodash'
import { api } from '@kalisio/kdk/core.client'

export const Configurations = {
  initialize () {
    if (!this.service) return
    // We use a cache as the configuration is not updated often but can be read a lots of times
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
  async getOrderObject (name) {
    name = `${name}Order`
    const service = this.getService()
    if (!service) return
    // Update or return cache
    if (this.cache[name]) return this.cache[name]
    const response = await service.find({ query: { name } })
    const object = _.get(response, 'data[0]')
    if (object) this.cache[name] = object
    return object
  },
  async getOrder (name) {
    const orderObject = await this.getOrderObject(name)
    return _.get(orderObject, 'value', [])
  },
  async updateOrder (name, value) {
    const orderObject = await this.getOrderObject(name)
    if (!orderObject || !orderObject._id) return
    await this.getService().patch(orderObject._id, { value })
  }
}
