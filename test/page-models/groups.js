import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'

export default class Groups extends ApplicationLayout {
  constructor () {
    super()
    this.createGroupModal = VueSelector('k-groups-activity k-modal-editor')
    this.editGroupModal = VueSelector('k-groups-activity k-modal-editor')
    this.groupsGrid = VueSelector('k-groups-activity k-grid')
    this.fab = VueSelector('k-layout k-fab')
  }
  getToolbarEntry () {
    return '#members'
  }
  getTabBarEntry () {
    return '#groups'
  }
  async createGroup (test, group) {
    await this.clickFab(test, '#create-group')
    await test
      .typeText(this.createGroupModal.find('#name-field'), group.name, { replace: true })
      .typeText(this.createGroupModal.find('#description-field'), group.description, { replace: true })
      .click(this.createGroupModal.find('#apply-button'))
      .wait(5000)
  }
  async editGroup (test, groupName, newGroupDescription) {
    let groupId = await this.getItemId(test, this.groupsGrid, groupName)
    await test
      .click(this.idSelector(groupId).find('#edit-group'))
      .wait(2000)
    await test
      .typeText(this.editGroupModal.find('#description-field'), newGroupDescription, { replace: true })
      .click(this.editGroupModal.find('#apply-button'))
      .wait(5000)
  }
  async deleteGroup (test, groupName) {
    let groupId = await this.getItemId(test, this.groupsGrid, groupName)
    await test
      .click(this.idSelector(groupId).find('#card-overflow-menu-entry'))
      .wait(500)
    await test
      .click(Selector('.q-popover').find('#remove-group'))
      .click(Selector('.modal-buttons button').nth(0))
      .wait(5000)
  }
  async createGroups (test, groups) {
    let count = 0
    for (let i in groups) {
      await this.createGroup(test, groups[i])
      count++
      await this.checkGroupsCount(test, count)
    }
  }
  async deleteGroups (test, groups) {
    let count = groups.length
    for (let i in groups) {
      await this.deleteGroup(test, groups[i].name)
      count--
      await this.checkGroupsCount(test, count)
    }
  }
  async checkGroupsCount (test, count) {
    await this.checkCollectionCount(test, this.groupsGrid, count)
  }
}
