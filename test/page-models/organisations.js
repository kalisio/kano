import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'
import _ from 'lodash'

export default class Organisations extends ApplicationLayout {
  constructor () {
    super()
    // Organisation panel
    this.panel = VueSelector('k-organisations-panel')
    this.newLink = this.panel.find('#new-organisation')
    this.editor = VueSelector('k-organisations-panel k-modal-editor')
    // Settings activity
    this.descriptionTab = this.tabBar.find('#description')
    this.descriptionEditor = VueSelector('k-editor')
    this.billingTab = this.tabBar.find('#billing')
    this.billingEditor = VueSelector('k-editor')
    this.dzTab = this.tabBar.find('#danger-zone')
    this.dzZone = VueSelector('k-organisation-dz')
  }
  async selectOrganisation (test, orgName) {
    await this.openSideNav(test)
    await test
      .click(this.panel.find('#' + _.kebabCase(orgName)))   
  }
  async doCreateOrganisation (test, orgName, orgDescription) {
    await this.openSideNav(test)
    await test
      .click(this.newLink)
      .typeText(this.editor.find('#name-field'), orgName, { replace: true })
      .typeText(this.editor.find('#description-field'), orgDescription, { replace: true })
      .click(this.editor.find('#apply-button'))
      .wait(2000)
  }
  async doUpdateOrganisationBilling (test, orgName) {
    await this.selectOrganisation(test, orgName)
    await test
      .click(this.overflowMenuEntry)
      .click(this.overflowMenu.find('#settings'))
      .click(this.billingTab)
      .click(this.billingEditor.find('#billing-field'))
      .click(Selector('.q-popover .q-item').nth(1))
      .click(this.billingEditor.find('#apply-button'))
      .wait(1000)
  }
  async doDeleteOrganisation (test, orgName) {
    await this.selectOrganisation(test, orgName)
    await test
      .click(this.overflowMenuEntry)
      .click(this.overflowMenu.find('#settings'))
      .click(this.dzTab)
      .click(VueSelector('k-organisation-dz k-block q-btn'))
      .typeText(Selector('.modal input[type=text]'), orgName)
      .click(Selector('.modal-buttons button').nth(0))
      .wait(2000)
  }
}

