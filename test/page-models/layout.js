import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import BasePage from './base-page'
import { getWindowInnerWidth } from '.'

export default class Layout extends BasePage {
  constructor () {
    super()
    // AppBar
    this.appBar = VueSelector('k-app-bar')
    this.appBarLeading = this.appBar.find('#app-bar-leading')
    this.appBarTitle = this.appBar.find('#app-bar-title')
    this.appBarOverflowMenu = Selector('#overflow-menu')
    this.appBarOverflowMenuEntry = this.appBar.find('#overflow-menu-entry')
    // Drawers
    this.leftDrawer = Selector('.q-drawer--left')
    this.rightDrawer = Selector('.q-drawer--right')
    // Openers
    this.leftOpener = Selector('#opener-left')
    this.rightOpener = Selector('#opener-right')
    this.topOpener = Selector('#opener-top')
    this.bottomOpener = Selector('#opener-bottom')
    // TabBar
    this.tabBar = VueSelector('k-tab-bar')
    // Fab
    this.fab = Selector('#fab')
    // SignupAlert
    this.signupAlert = VueSelector('k-signup-alert')
  }

  // AppBar
  async clickLeading (test) {
    await test
      .click(this.appBarLeading)
  }

  // TabBar
  async clickTabBar (test, tab) {
    await test
      .click(this.tabBar.find(tab))
  }

  // Drawers
  async isLeftDrawerOpened () {
    const drawer = Selector(this.leftDrawer, { visibilityCheck: true })
    return drawer.exists
  }

  async isRightDrawerOpened () {
    const drawer = Selector(this.rightDrawer, { visibilityCheck: true })
    return drawer.exists
  }

  // Openers
  async clickLeftOpener (test) {
    await test
      .click(this.leftOpener)
  }

  async clickRightOpener (test) {
    await test
      .click(this.rightOpener)
  }

  async clickTopOpener (test) {
    await test
      .click(this.topOpener)
  }

  async clickBottomOpener (test) {
    await test
      .click(this.bottomOpener)
  }

  // Fab
  async openAndClickFab (test, entry) {
    await test
      .click(Selector(this.fab))
      .click(this.fab.find(entry))
  }

  async clickFab (test, entry) {
    await test
      .click(Selector(entry))
  }

  // SignupAlert
  async closeSignupAlert (test) {
    await test
      .click(this.signupAlert.find('.q-alert-close').find('.cursor-pointer'))
  }

  // Helpers
  async clickToolbar (test, entry) {
    await test
      .click(this.appBar.find(entry))
  }

  async clickOverflowMenu (test, entry) {
    await test
      .click(this.appBarOverflowMenuEntry)
      .click(this.appBarOverflowMenu.find(entry))
  }
}
