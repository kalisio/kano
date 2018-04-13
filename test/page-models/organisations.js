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
    this.createModal = VueSelector('k-organisations-panel k-modal-editor')
    // Settings activity
    this.descriptionEditor = VueSelector('k-settings-acitivy k-editor')
    this.billingEditor = VueSelector('k-settings-activity k-editor')
    this.dzZone = VueSelector('k-settings-activity k-organisation-dz')
  }
  async selectOrganisation (test, orgName) {
    await this.openSideNav(test)
    await test
      .click(this.panel.find('#' + _.kebabCase(orgName)))
      .wait(5000)
  }
  async createOrganisation (test, org) {
    await this.openSideNav(test)
    await test
      .click(this.newLink)
      .wait(2000)
    await test
      .typeText(this.createModal.find('#name-field'), org.name, { replace: true })
      .typeText(this.createModal.find('#description-field'), org.description, { replace: true })
      .click(this.createModal.find('#apply-button'))
      .wait(5000)
  }
  async updateOrganisationBilling (test, orgName) {
    await this.openSideNav(test)
    await this.selectOrganisation(test, orgName)
    await this.clickOverflowMenu(test, '#settings')
    await this.clickTabBar(test, '#billing')
    await test
      .click(this.billingEditor.find('#billing-field'))
      .wait(500)
    await test
      .click(Selector('.q-popover .q-item').nth(1))
      .click(this.billingEditor.find('#apply-button'))
      .wait(5000)
  }
  async deleteOrganisation (test, orgName) {
    await this.openSideNav(test)
    await this.selectOrganisation(test, orgName)
    await this.clickOverflowMenu(test, '#settings')
    await this.clickTabBar(test, '#danger-zone')
    await test
      .click(VueSelector('k-organisation-dz k-block q-btn'))
      .wait(500)
    await test
      .typeText(Selector('.modal input[type=text]'), orgName)
      .click(Selector('.modal-buttons button').nth(0))
      .wait(5000)
  }
}
