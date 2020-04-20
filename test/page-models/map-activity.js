import { Selector } from 'testcafe'
import BasePage from './base-page'

export default class MapActivity  extends BasePage {
  constructor () {
    super()
    this.map = Selector('#map')
  }

  async click (test) {
    await test.click(this.map)
  }

  async move (test, dx, dy) {
    await test    
      .drag(this.map, dx, dy)
  }
}