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
      .wait(500)
  }

  // TabBar
  async clickTabBar (test, tab) {
    await test
      .click(this.tabBar.find(tab))
      .wait(500)
  }

  // Drawers
  async isLeftDrawerOpened () {
    const leftPos = await this.leftDrawer.getBoundingClientRectProperty('left')
    return leftPos >= 0
  }

  async isRightDrawerOpened () {
    const rightPos = await this.rightDrawer.getBoundingClientRectProperty('right')
    const windowWidth = await getWindowInnerWidth()
    return rightPos <= windowWidth
  }

  // Openers
  async clickLeftOpener (test) {
    await test
      .click(this.leftOpener)
      .wait(500)
  }

  async clickRightOpener (test) {
    await test
      .click(this.rightOpener)
      .wait(500)
  }

  async clickTopOpener (test) {
    await test
      .click(this.topOpener)
      .wait(500)
  }

  async clickBottomOpener (test) {
    await test
      .click(this.bottomOpener)
      .wait(500)
  }

  // Fab
  async openAndClickFab (test, entry) {
    await test
      .click(Selector(this.fab))
      .wait(500)
      .click(this.fab.find(entry))
      .wait(500)
  }

  async clickFab (test, entry) {
    await test
      .click(Selector(entry))
      .wait(500)
  }

  // SignupAlert
  async closeSignupAlert (test) {
    await test
      .click(this.signupAlert.find('.q-alert-close').find('.cursor-pointer'))
      .wait(500)
  }

  // Helpers
  async clickToolbar (test, entry) {
    await test
      .click(this.appBar.find(entry))
      .wait(3000)
  }

  async clickOverflowMenu (test, entry) {
    await test
      .click(this.appBarOverflowMenuEntry)
      .click(this.appBarOverflowMenu.find(entry))
      .wait(500)
  }
}
