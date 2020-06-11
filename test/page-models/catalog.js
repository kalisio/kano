import { Selector, t } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import BasePage from './base-page'

export default class Catalog extends BasePage {
  constructor () {
    super()

    this.opener = Selector('#opener-right')
    // testcafe wait for elements to come in foreground before click,
    // so use 0 timeout since it's always visible, but in background
    this.closer = Selector('#map', { timeout: 0 })
    this.drawer = Selector('.q-drawer--right')
  }

  async open () {
    const drawer = Selector(this.drawer, { visibilityCheck: true })
    await t
      .click(this.opener)
      .expect(drawer.exists).ok()
  }

  async close () {
    await t
      .click(this.closer)
  }

  async getCategory (category) {
    const categories = VueSelector('k-catalog-panel QExpansionItem')
    const count = await categories.count
    let i = 0
    for (; i < count; ++i) {
      const cat = categories.nth(i)
      const label = cat.find('.q-item__label').withExactText(category)
      const exists = await label.exists
      if (exists) break
    }

    if (i === count) throw new Error(`Catalog category '${category}' not found !'`)

    return categories.nth(i)
  }

  async getLayer (layer) {
    return VueSelector('k-catalog-panel k-layers-selector').find('.q-item__label').withExactText(layer)
  }

  async getForecastMode (mode) {
    return Selector('.q-tab__label').withExactText(mode)
  }

  async clickMeteoModel (model) {
    const select = VueSelector('k-catalog-panel k-weather-layers-selector QSelect')
    await t.click(select)
    const entry = Selector('.q-menu').find('.q-item__label').withExactText(model)
    await t.click(entry)
  }

  async clickArchives () {
    const item = Selector('.q-tab__label').withExactText('Archives')
    await t.click(item)
  }

  async clickForecast () {
    const item = Selector('.q-tab__label').withExactText('Prévisions')
    await t.click(item)
  }

  async getMeteoLayer (layer) {
    return VueSelector('k-catalog-panel k-weather-layers-selector k-layers-selector').find('.q-item__label').withExactText(layer)
  }

  async clickCategory (category) {
    const item = await this.getCategory(category)
    await t.click(item)
  }

  async clickLayer (layer) {
    const item = await this.getLayer(layer)
    await t.click(item)
  }

  async clickMeteoLayer (mode, model, layer) {
    const itemMode = await this.getForecastMode(mode)
    await t.click(itemMode)
    await this.clickMeteoModel(model)
    const itemLayer = await this.getMeteoLayer(layer)
    await t.click(itemLayer)
  }
}
