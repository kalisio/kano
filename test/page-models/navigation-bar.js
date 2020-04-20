import VueSelector from 'testcafe-vue-selectors'
import BasePage from './base-page'

export default class NavigationBar  extends BasePage {
  constructor () {
    super()
    this.navivationBar = VueSelector('k-navigation-bar')
  }

  async isVisible () {
    return await this.navivationBar.exists && await this.navivationBar.visible
  }
}