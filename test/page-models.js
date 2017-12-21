import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'

export class ApplicationLayout {
  constructor () {
    this.menu = VueSelector('k-app-bar').find('.q-icon').withText('menu')
    this.signupAlert = VueSelector('k-signup-alert')
  }
}

export class Authentication extends ApplicationLayout {
  constructor () {
    super()
    this.screen = VueSelector('k-screen')
    this.emailInput = VueSelector('k-email-field')
    this.passwordInput = VueSelector('k-password-field')
    // withText('Log in') does not seem to work probably because the
    // text is on a sub internal element, we might use IDs ?
    this.signInGoogle = Selector('#google')
    this.signInGitHub = Selector('#github')
    this.signInLocal = Selector('#local')
    this.logout = VueSelector('k-links-panel').find('.q-item-label').withText('Logout')
  }
  async logIn (test, credentials) {
    await test
      .typeText(this.emailInput, credentials ? credentials.email : 'kalisio@kalisio.xyz', { replace: true })
      .typeText(this.passwordInput, credentials ? credentials.password : 'kalisio', { replace: true })
      .click(this.signInLocal)
      // Need this so that we are sure dynamic components are loaded
      .wait(2000)
  }
  async logOut (test) {
    let isMenuVisible = await this.menu.visible
    if (!isMenuVisible) {
      await test.click(this.menu) // Ensure menu is open
    }
    await test
      .click(this.logout)
      // Need this so that we are sure dynamic components are loaded
      .wait(2000)
  }
}

export class Account extends ApplicationLayout {
  constructor () {
    super()
    this.identityPanel = VueSelector('k-identity-panel')
    this.identity = Selector('#account')
    this.nameInput = VueSelector('k-account-activity k-text-field')
    this.phoneInput = VueSelector('k-account-activity k-phone-field')
    this.update = VueSelector('k-account-activity').find('#apply-button')
  }
  async editProfile (test, profile) {
    await test
      .click(this.identity) // Ensure identity activity is open
      // Need this so that we are sure dynamic components are loaded
      .wait(2000)
      .typeText(this.nameInput, profile.name, { replace: true })
      .typeText(this.phoneInput, profile.phone, { replace: true })
      .click(this.update)
      // Need this so that we are sure request is finished
      .wait(2000)
  }
}

export class Organisations extends ApplicationLayout {
  constructor () {
    super()
    this.orgPanel = VueSelector('k-organisations-panel')
  }
}

