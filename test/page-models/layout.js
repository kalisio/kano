import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import _ from 'lodash'

export default class ApplicationLayout {
  constructor () {
    this.error = VueSelector('q-toast')
    this.appBar = VueSelector('k-app-bar')
    this.appBarTitle = this.appBar.find('#app-bar-title')
    this.overflowMenuEntry = this.appBar.find('#overflow-menu-entry')
    this.overflowMenu = Selector('#overflow-menu')
    this.SideNavToggle = this.appBar.find('#ap')
    this.sideNav = VueSelector('k-side-nav')
    this.tabBar = VueSelector('k-tab-bar')
    this.fab = Selector('.q-fab')
    this.identityPanel = VueSelector('k-identity-panel')
    this.identityLink = Selector('#account')
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
        .wait(1000)
    }
  }
  async clickIdentity (test) {
    await this.openSideNav(test)
    await test
      .click(this.identityLink)
      .wait(1000)
  }
  async checkIdentity (test, name) {
    const identityPanel = await this.identityPanel.getVue()
    await test.expect(identityPanel.state.name).eql(name, 'User name is invalid')
  }
  async closeSignupAlert (test) {
    await test
      .click(this.signupAlert.find('.q-alert-close').find('.cursor-pointer'))
      .wait(1000)
  }
  async clickToolbar (test, entry) {
    await test
      .click(this.appBar.find(entry))
      .wait(3000)
  }
  async clickOverflowMenu (test, entry) {
    await test
      .click(this.overflowMenuEntry)
      .click(this.overflowMenu.find(entry))
      .wait(1000)
  }
  async clickTabBar (test, tab) {
    await test
      .click(this.tabBar.find(tab))
      .wait(3000)
  }
  async openAndClickFab (test, entry) {
    await test
      .click(Selector(this.fab))
      .wait(1000)
    await test
      .click(this.fab.find(entry))
      .wait(1000)
  }
  async clickFab (test, entry) {
    await test
      .click(Selector(entry))
      .wait(1000)
  }
  async isErrorVisible () {
    await this.error.visible
  }
  async getItem (test, collectionSelector, name) {
    const collection = await collectionSelector.getVue()
    return _.find(collection.state.items, { name: name })
  }
  async getItemId (test, collectionSelector, name) {
    let item = await this.getItem(test, collectionSelector, name)
    if (item) return item._id
    return undefined
  }
  async checkCollectionCount (test, collectionSelector, count) {
    const collection = await collectionSelector.getVue()
    await test.expect(collection.state.items.length).eql(count, 'Invalid collection length')
  }
}
