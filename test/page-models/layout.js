import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'

export default class ApplicationLayout {
  constructor () {
    this.error = VueSelector('q-toast')
    this.appBar = VueSelector('k-app-bar')
    this.appBarTitle = this.appBar.find("#app-bar-title")
    this.overflowMenuEntry = this.appBar.find('#overflow-menu-entry')
    this.overflowMenu = Selector('#overflow-menu')
    this.SideNavToggle = this.appBar.find('#ap')
    this.sideNav = VueSelector('k-side-nav')
    this.tabBar = VueSelector('k-tab-bar')
    this.fab = Selector('.q-fab')
    this.signupAlert = VueSelector('k-signup-alert')
  }
  async isSideNavVisible () {
    let left = await this.sideNav.getBoundingClientRectProperty('left')
    // quasar actually hides the sideNav by translating it outside the viewport,
    // so that the visible flag is always true
    return left >= 0
  }
  async openSideNav (test) {
    let isSideNavVisible = await this.isSideNavVisible()
    if (!isSideNavVisible) {
      await test.click(this.sideNavToggle) // Ensure menu is open
    }
  }
  async closeSignupAlert (test) {
    await test.click(this.signupAlert.find('.q-alert-close').find('.cursor-pointer'))
  }
  async isErrorVisible () {
    return await this.error.visible
  }
}
