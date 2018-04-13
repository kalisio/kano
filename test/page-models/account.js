import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'

export default class Account extends ApplicationLayout {
  constructor () {
    super()
    // Profile Zone
    this.profileEditor = VueSelector('k-account-activity k-editor')
    // this.avatarInput = VueSelector('k-account-activity k-attachment-field')
    // The file input added by drop zone is actually hidden and replaced by dropzone GUI
    this.fileInput = Selector('.dz-hidden-input') //, { visibilityCheck: false })
    // this.nameInput = VueSelector('k-account-activity k-text-field')
    // this.updateProfile = VueSelector('k-account-activity').find('#apply-button')
    // Security Zone
    this.changePasswordButton = VueSelector('k-account-security k-block q-btn').nth(0)
    this.changePasswordScreen = VueSelector('k-change-password')
    this.changeEmailButton = VueSelector('k-account-security k-block q-btn').nth(1)
    this.changeEmailScreen = VueSelector('k-send-change-identity')
  }
  async editProfile (test, profile) {
    await this.clickIdentity(test)
    await this.clickTabBar(test, '#profile')
    await test
      .click(this.profileEditor.find('#avatar-field'))
      .setFilesToUpload(this.fileInput, profile.avatar)
      .click(VueSelector('k-uploader').find('#done-button'))
      .wait(1000)
    await test
      .typeText(this.profileEditor.find('#name-field'), profile.name, { replace: true })
      .click(this.profileEditor.find('#apply-button'))
      .wait(5000)
  }
  async updatePassword (test, identity) {
    await this.clickIdentity(test)
    await this.clickTabBar(test, '#security')
    await test
      .click(this.changePasswordButton)
      .wait(2000)
    await test
      .typeText(this.changePasswordScreen.find('#oldPassword-field'), identity.password, { replace: true })
      .typeText(this.changePasswordScreen.find('#password-field'), identity.newPassword, { replace: true })
      .typeText(this.changePasswordScreen.find('#confirmPassword-field'), identity.newPassword, { replace: true })
      .click(this.changePasswordScreen.find('#change-password'))
      .wait(5000)
  }
  async updateEmail (test, identity) {
    await this.clickIdentity(test)
    await this.clickTabBar(test, '#security')
    await test
      .click(this.changeEmailButton)
      .typeText(this.changeEmailScreen.find('#password-field'), identity.password, { replace: true })
      .typeText(this.changeEmailScreen.find('#email-field'), identity.newEmail, { replace: true })
      .click(this.changeEmailScreen.find('#change-identity'))
      .wait(5000)
  }
  async removeAccount (test, name) {
    await this.clickIdentity(test)
    await this.clickTabBar(test, '#danger-zone')
    await test
      .click(VueSelector('k-account-dz k-block q-btn'))
      .typeText(Selector('.modal input[type=text]'), name)
      .click(Selector('.modal-buttons button').nth(0))
      .wait(10000)
  }
}
