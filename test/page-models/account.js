import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'
import Authentication from './authentication'

export default class Account extends ApplicationLayout {
  constructor () {
    super()
    this.identityPanel = VueSelector('k-identity-panel')
    this.identity = Selector('#account')
    // Profile Zone
    // FIXME: don't know why but VueSelector('k-tab-bar q-route-tab') does not work
    this.profile = Selector('.q-tab-label').nth(0)
    this.nameInput = VueSelector('k-account-activity k-text-field')
    this.phoneInput = VueSelector('k-account-activity k-phone-field')
    this.updateProfile = VueSelector('k-account-activity').find('#apply-button')
    // Security Zone
    this.security = Selector('.q-tab-label').nth(1)
    this.changePassword = VueSelector('k-account-security k-block q-btn').nth(0)
    this.passwordInput = VueSelector('k-password-field').nth(0)
    this.newPasswordInput = VueSelector('k-password-field').nth(1)
    this.newPasswordConfirm = VueSelector('k-password-field').nth(2)
    this.updatePassword = VueSelector('k-change-password k-screen q-btn')
    this.changeEmail = VueSelector('k-account-security k-block q-btn').nth(1)
    this.passwordInput = VueSelector('k-password-field')
    this.newEmailInput = VueSelector('k-email-field')
    this.updateEmail = VueSelector('k-send-change-identity k-screen q-btn')
    // Danger Zone
    this.dz = Selector('.q-tab-label').nth(2)
    this.deleteAccount = VueSelector('k-account-dz k-block q-btn')
    this.confirmAccountName = Selector('.modal, input[type=text]')
    this.confirmDeleteAccount = Selector('.modal button').nth(0)
  }
  async doEditProfile (test, profile) {
    await this.openMenu(test)

    await test
      .click(this.identity) // Ensure identity activity is open
      .click(this.profile)
      .typeText(this.nameInput, profile.name, { replace: true })
      .typeText(this.phoneInput, profile.phone, { replace: true })
      .click(this.updateProfile)
      // Need this so that we are sure request is finished
      .wait(5000)
  }
  async doUpdatePassword (test, identity) {
    await this.openMenu(test)

    await test
      .click(this.identity) // Ensure identity activity is open
      .click(this.security)
      .click(this.changePassword)
      .typeText(this.passwordInput, identity.password, { replace: true })
      .typeText(this.newPasswordInput, identity.newPassword, { replace: true })
      .typeText(this.newPasswordConfirm, identity.newPassword, { replace: true })
      .click(this.updatePassword)
      // Need this so that we are sure request is finished
      .wait(5000)
  }
  async doUpdateEmail (test, identity) {
    await this.openMenu(test)

    await test
      .click(this.identity) // Ensure identity activity is open
      .click(this.security)
      .click(this.changeEmail)
      .typeText(this.passwordInput, identity.password, { replace: true })
      .typeText(this.newEmailInput, identity.newEmail, { replace: true })
      .click(this.updateEmail)
      // Need this so that we are sure request is finished
      .wait(5000)
  }
  async doRemoveAccount (test, name) {
    await this.openMenu(test)

    await test
      .click(this.identity) // Ensure identity activity is open
      .click(this.dz) // Ensure danger zone tab is selected
      .click(this.deleteAccount)
      .typeText(this.confirmAccountName, name)
      .click(this.confirmDeleteAccount)
      // Need this so that we are sure request is finished
      .wait(5000)
  }
}

