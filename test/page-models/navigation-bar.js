import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'


export default class NavigationBar {
  constructor () {
      //input
      this.sideNavButton = VueSelector('k-navigation-bar').find('.q-btn').nth(0)
    }

  async clickSideNav (test) {
    await test
      .click(this.sideNavButton)
      .wait(500)
  }
}