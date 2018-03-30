import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import _ from 'lodash'

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
    this.idSelector = Selector((id) => { return document.getElementById(id) })
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
      await test
        .click(this.sideNavToggle) // Ensure menu is open
        .wait(250)
    }
  }
  async closeSignupAlert (test) {
    await test.click(this.signupAlert.find('.q-alert-close').find('.cursor-pointer'))
  }
  async clickToolbar (test, entry) {
    await test
      .click(this.appBar.find(entry))
      .wait(250)
  }
  async clickOverflowMenu (test, entry) {
    await test
      .click(this.overflowMenuEntry)
      .click(this.overflowMenu.find(entry))
      .wait(250)
  }
  async clickTabBar (test, tab) {
    await test
      .click(this.tabBar.find(tab))
      .wait(250)
  }
  async isErrorVisible () {
    return await this.error.visible
  }
  async getItemId (test, collectionSelector, name) {
    const collection = await collectionSelector.getVue()
    let item = _.find(collection.state.items, { name: name })
    if (item) return item._id
    return undefined
  }
  async checkCollectionCount (test, collectionSelector, count) {
    const collection = await collectionSelector.getVue()
    await test.expect(collection.state.items.length).eql(count, 'Invalid collection length')
  }
}
