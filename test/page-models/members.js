import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'

export default class Members extends ApplicationLayout {
  constructor () {
    super()
    this.addMemberModal = VueSelector('k-members-activity k-add-member')
    this.inviteMemberModal = VueSelector('k-members-activity k-invite-member')
    this.changeMemberRoleModal = VueSelector('k-members-activity k-change-role')
    this.tagMemberModal = VueSelector('k-members-activity k-modal-editor')
    this.membersGrid = VueSelector('k-members-activity k-grid')
  }
  getToolbarEntry () {
    return '#members'
  }
  getTabBarEntry () {
    return '#members'
  }
  async addMember (test, name, role) {
    await this.openAndClickFab(test, '#add-member')
    await test
      .typeText(this.addMemberModal.find('#user-field'), name[0], { replace: true })
      .wait(2000)
      .click(Selector('.q-popover .q-item').nth(0))
      .wait(2000)
      .click(this.addMemberModal.find('#role-field'))
      .click(Selector('.q-popover .q-item').nth(role))
      .click(this.addMemberModal.find('#add-button'))
      .wait(5000)
  }
  async inviteMember (test, guest, role) {
    await this.openAndClickFab(test, '#invite-member')
    await test
      .typeText(this.inviteMemberModal.find('#name-field'), guest.name, { replace: true })
      .typeText(this.inviteMemberModal.find('#email-field'), guest.email, { replace: true })
      .click(this.inviteMemberModal.find('#role-field'))
      .click(Selector('.q-popover .q-item').nth(role))
      .click(this.inviteMemberModal.find('#invite-button'))
      .wait(5000)
  }
  async removeMember (test, name) {
    let cardId = await this.getItemId(test, this.membersGrid, name)
    await test
      .click(this.idSelector(cardId).find('#card-overflow-menu-entry'))
      .click(Selector('.q-popover').find('#remove-member'))
      .click(Selector('.modal-buttons button').nth(0))
      .wait(5000)
  }
  async tagMember (test, name, tag) {
    let cardId = await this.getItemId(test, this.membersGrid, name)
    await test
      .click(this.idSelector(cardId).find('#tag-member'))
      .typeText(this.tagMemberModal.find('#tags-field'), tag, { replace: true })
      .wait(2000)
      .click(Selector('.q-popover .q-item').nth(0))
      .wait(2000)
      .click(this.tagMemberModal.find('#apply-button'))
      .wait(5000)
  }
  async changeMemberRole (test, name, role) {
    let cardId = await this.getItemId(test, this.membersGrid, name)
    await test
      .click(this.idSelector(cardId).find('#change-role'))
      .click(this.changeMemberRoleModal.find('#role-field'))
      .click(Selector('.q-popover .q-item').nth(role))
      .click(this.changeMemberRoleModal.find('#update-button'))
      .wait(5000)
  }
  async checkMembersCount (test, count) {
    await this.checkCollectionCount(test, this.membersGrid, count)
  }
}
