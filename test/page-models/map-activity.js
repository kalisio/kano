import { Selector } from 'testcafe'
import BasePage from './base-page'

export default class MapActivity  extends BasePage {
  constructor () {
    super()
    this.map = Selector('#map')
  }

  async clickOnMap (test) {
    await test.click(this.map)
  }
}