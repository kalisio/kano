import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'
import _ from 'lodash'

export default class Events extends ApplicationLayout {
  constructor () {
    super()
    this.createEventModal = VueSelector('k-events-activity k-event-editor')
    this.editEventModal = VueSelector('k-events-activity k-event-editor')
    this.eventsGrid = VueSelector('k-events-activity k-grid')
  }
  getToolbarEntry () {
    return '#events'
  }
  getTabBarEntry () {
    return '#events'
  }
  async createEvent (test, templateName, event) {
    let actionId = '#' + _.kebabCase('create-' + templateName)
    await this.clickFab(test, actionId)
    await test
      .typeText(this.createEventModal.find('#name-field'), event.name, { replace: true })
      .typeText(this.createEventModal.find('#participants-field'), event.participants, { replace: true })
      .wait(2000)
      .click(Selector('.q-popover .q-item').nth(0))
      .wait(2000)
      .click(this.createEventModal.find('#apply-button'))
      .wait(5000)
  }
  async deleteEvent (test, eventName) {
    let eventId = await this.getItemId(test, this.eventsGrid, eventName)
    await test
      .click(this.idSelector(eventId).find('#card-overflow-menu-entry'))
      .click(Selector('.q-popover').find('#remove-event'))
      .click(Selector('.modal-buttons button').nth(0))
      .wait(5000)
  }
  async checkEventsCount (test, count) {
    await this.checkCollectionCount(test, this.eventsGrid, count)
  }
}
