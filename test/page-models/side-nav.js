import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import BasePage from './base-page'

export default class SideNav extends BasePage {
  constructor () {
    super()
    this.sideNav = VueSelector('k-side-nav')
    this.identityPanel = VueSelector('k-identity-panel')
    this.identityLink = Selector('#account')
    this.logoutLink = VueSelector('k-links-panel').find('.q-icon').withText('exit_to_app')
  }

  // Identity
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

  // Actions
  async logout (test) {
    await test
      .click(this.logoutLink)
      .wait(500)
  }
}
