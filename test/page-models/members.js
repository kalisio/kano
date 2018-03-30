import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'
import _ from 'lodash'

const CardSelector = Selector((id) => {
  return document.getElementById(id)
})

export default class Members extends ApplicationLayout {
  constructor (auth, account) {
    super()
    this.auth = auth
    this.account = account
    this.menuEntry = this.appBar.find('#members')
    this.addMemberModal = VueSelector('k-add-member')
    this.inviteMemberModal = VueSelector('k-invite-member')
    this.membersGrid = VueSelector('k-members-activity k-grid')
  }
  async activeMembersTab (test) {
    await test.click(this.menuEntry)
    .wait(2000)
  }
  async getMemberId (test, name) {
    const membersGrid = await this.membersGrid.getVue()
    let card = _.find(membersGrid.state.items, { name: name })
    return card._id
  }
  async registerUsers (test, users) {
    for (let key in users) {
      await test.click(Selector('#register-link'))
      await this.auth.doRegister(test, users[key])
      await this.auth.doLogOut(test)
      await test.click(Selector('#login-link'))
    }
  }
  async unregisterUsers (test, users) {
    for (let key in users) {
      await this.auth.doLogIn(test, users[key])
      await this.account.doRemoveAccount(test, users[key].name)
      await test.click('#login-link')
    }
  }
  async addMember (test, name, role) {
    await test
      .click(this.fab)
      .click(this.fab.find('#add-member'))
      .typeText(this.addMemberModal.find('#user-field'), name[0], { replace: true })
      .click(Selector('.q-popover .q-item').nth(0))
      .click(this.addMemberModal.find('#role-field'))
      .click(Selector('.q-popover .q-item').nth(role))
      .click(this.addMemberModal.find('#add-button'))
      .wait(2000)
  }
  async inviteMember (test, guest, role) {
    await test
      .click(this.fab)
      .click(this.fab.find('#invite-member'))
      .typeText(this.inviteMemberModal.find('#name-field'), guest.name, { replace: true })
      .typeText(this.inviteMemberModal.find('#email-field'), guest.email, { replace: true })
      .click(this.inviteMemberModal.find('#role-field'))
      .click(Selector('.q-popover .q-item').nth(role))
      .click(this.inviteMemberModal.find('#invite-button'))
      .wait(5000)
  }
  async removeMember (test, name) {
    let cardId = await this.getMemberId(test, name)
    await test
      .click(CardSelector(cardId).find('#card-overflow-menu-entry'))
      .click(Selector('.q-popover').find('#remove-member'))
      .click(Selector('.modal-buttons button').nth(0))
      .wait(2000)
  }
  async checkCount (test, count) {
    const membersGrid = await this.membersGrid.getVue()
    await test.expect(membersGrid.state.items.length).eql(count, 'Invalid number of members')
  }
}

