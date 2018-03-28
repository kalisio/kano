import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'
import _ from 'lodash'

export default class Organisations extends ApplicationLayout {
  constructor () {
    super()
    this.panel = VueSelector('k-organisations-panel')
    this.newLink = this.panel.find('#new-organisation')
    // Creation editor
    this.editor = VueSelector('k-organisations-panel k-modal-editor')
    this.nameField = this.editor.find('#name')
    this.descriptionField = this.editor.find("#description")
    this.createButton = this.editor.find('#apply-button')
    // Settings activity
    this.descriptionTab = this.tabBar.find('#description')
    this.descriptionEditor = VueSelector('k-editor')
    this.billingTab = this.tabBar.find('#billing')
    this.billingEditor = VueSelector('k-editor')
    this.dzTab = this.tabBar.find('#danger-zone')
    this.dzZone = VueSelector('k-organisation-dz')
  }
  async doCreateOrganisation (test, orgName, orgDescription) {
    await this.openSideNav(test)
    await test
      .click(this.newLink)
      .typeText(this.nameField, orgName, { replace: true })
      .typeText(this.descriptionField, orgDescription, { replace: true })
      .click(this.createButton)
      .wait(5000)
  }
  async doUpdateOrganisationBilling (test, orgName) {
    await this.openSideNav(test)
    await test
      .click(this.panel.find('#' + _.kebabCase(orgName)))
      .click(this.overflowMenuEntry)
      .click(this.overflowMenu.find('#settings'))
      .click(this.billingTab)
      .click(this.billingEditor.find('#billing'))
      .click(Selector('.q-popover .q-item').nth(1))
      .click(this.billingEditor.find('#apply-button'))
  }
  async doDeleteOrganisation (test, orgName) {
    await this.openSideNav(test)
    await test
      .click(this.panel.find('#' + _.kebabCase(orgName)))
      .click(this.overflowMenuEntry)
      .click(this.overflowMenu.find('#settings'))
      .click(this.dzTab)
      .click(VueSelector('k-organisation-dz k-block q-btn'))
      .typeText(Selector('.modal input[type=text]'), orgName)
      .click(Selector('.modal-buttons button').nth(0))
      .wait(5000)
  }
}

