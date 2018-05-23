import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'

export default class EventTemplates extends ApplicationLayout {
  constructor () {
    super()
    this.createTemplateModal = VueSelector('k-event-templates-activity k-event-template-editor')
    this.editTemplateModal = VueSelector('k-event-templates-activity k-event-template-editor')
    this.copyTemplateModal = VueSelector('k-event-templates-activity k-event-template-editor')
    this.templatesGrid = VueSelector('k-event-templates-activity k-grid')
  }
  getToolbarEntry () {
    return '#events'
  }
  getTabBarEntry () {
    return '#event-templates'
  }
  async createTemplate (test, template) {
    await this.clickFab(test, '#create-event-template')
    await test
      .typeText(this.createTemplateModal.find('#name-field'), template.name, { replace: true })
      .typeText(this.createTemplateModal.find('#description-field'), template.description, { replace: true })
      .click(this.createTemplateModal.find('#apply-button'))
      .wait(5000)
  }
  async updateTemplateDescription (test, templateName, newTemplateDescription) {
    let templateId = await this.getItemId(test, this.templatesGrid, templateName)
    await test
      .click(this.idSelector(templateId).find('#edit-event-template'))
      .typeText(this.editTemplateModal.find('#description-field'), newTemplateDescription, { replace: true })
      .click(this.editTemplateModal.find('#apply-button'))
      .wait(5000)
  }
  async copyTemplate (test, sourceTemplateName, destTemplateName) {
    let templateId = await this.getItemId(test, this.templatesGrid, sourceTemplateName)
    await test
      .click(this.idSelector(templateId).find('#copy-event-template'))
      .typeText(this.copyTemplateModal.find('#name-field'), destTemplateName, { replace: true })
      .click(this.copyTemplateModal.find('#apply-button'))
      .wait(5000)
  }
  async deleteTemplate (test, templateName) {
    let templateId = await this.getItemId(test, this.templatesGrid, templateName)
    await test
      .click(this.idSelector(templateId).find('#card-overflow-menu-entry'))
      .click(Selector('.q-popover').find('#remove-event-template'))
      .click(Selector('.modal-buttons button').nth(0))
      .wait(5000)
  }
  async checkTemplatesCount (test, count) {
    await this.checkCollectionCount(test, this.templatesGrid, count)
  }
}
