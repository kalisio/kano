import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'

export default class BasePage {
  constructor () {
    this.error = VueSelector('q-toast')
    this.idSelector = Selector((id) => { return document.getElementById(id) })
  }

  // Error helper
  async isErrorVisible () {
    await this.error.visible
  }

  // Colection helpers
  async getItem (test, collectionSelector, name) {
    const collection = await collectionSelector.getVue()
    return _.find(collection.state.items, { name: name })
  }

  async getItemId (test, collectionSelector, name) {
    const item = await this.getItem(test, collectionSelector, name)
    if (item) return item._id
    return undefined
  }

  async checkCollectionCount (test, collectionSelector, count) {
    const collection = await collectionSelector.getVue()
    await test.expect(collection.state.items.length).eql(count, 'Invalid collection length')
  }
}
