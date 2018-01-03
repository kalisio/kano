import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'

export default class ApplicationLayout {
  constructor () {
    this.error = VueSelector('q-toast')
    this.menu = Selector('#menu')
    this.sideNav = VueSelector('k-side-nav')
    this.tabBar = VueSelector('k-tab-bar')
    this.appBar = VueSelector('k-app-bar')
    this.signupAlert = VueSelector('k-signup-alert')
  }
  async isMenuVisible () {
    let left = await this.sideNav.getBoundingClientRectProperty('left')
    // quasar actually hides the menu by translating it outside the viewport,
    // so that the visible flag is always true
    return left >= 0
  }
  async openMenu (test) {
    let isMenuVisible = await this.isMenuVisible()
    if (!isMenuVisible) {
      await test.click(this.menu) // Ensure menu is open
    }
  }
  async isErrorVisible () {
    return await this.error.visible
  }
}
