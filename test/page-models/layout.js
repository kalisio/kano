import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import BasePage from './base-page'

export default class AppBar extends BasePage {
  constructor () {
    super()
    // AppBar
    this.appBar = VueSelector('k-app-bar')
    this.appBarLeading = this.appBar.find('#app-bar-leading')
    this.appBarTitle = this.appBar.find('#app-bar-title')
    this.appBarOverflowMenu = Selector('#overflow-menu')
    this.appBarOverflowMenuEntry = this.appBar.find('#overflow-menu-entry')
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

  // Sidenav functions
  async isSideNavVisible () {
    // quasar actually hides the sideNav by translating it outside the viewport,
    // so that the visible flag is always true
    const leftPos = await this.sideNav.getBoundingClientRectProperty('left')
    return leftPos >= 0
  }

  // AppBar
  async clickLeading (test) {
    await test
      .click(this.appBarLeading)
      .wait(1000)
  }

  // TabBar
  async clickTabBar (test, tab) {
    await test
      .click(this.tabBar.find(tab))
      .wait(3000)
  }

  // Openers
  async clickLeftOpener (test) {
    await test
      .click(this.leftOpener)
      .wait(1000)
  }

  async clickRightOpener (test) {
    await test
      .click(this.rightOpener)
      .wait(1000)
  }

  async clickTopOpener (test) {
    await test
      .click(this.topOpener)
      .wait(1000)
  }

  async clickBottomOpener (test) {
    await test
      .click(this.bottomOpener)
      .wait(1000)
  }

  // Fab
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

  // SignupAlert
  async closeSignupAlert (test) {
    await test
      .click(this.signupAlert.find('.q-alert-close').find('.cursor-pointer'))
      .wait(1000)
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
      .wait(1000)
  }
}
