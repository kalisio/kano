import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'

export default class Authentication extends ApplicationLayout {
  constructor () {
    super()
    // Login
    this.loginScreen = VueSelector('k-login k-screen')
    this.emailInput = VueSelector('k-login k-email-field')
    this.passwordInput = VueSelector('k-login k-password-field')
    // withText('Log in') does not seem to work probably because the
    // text is on a sub internal element, we might use IDs ?
    this.loginGoogle = Selector('#google')
    this.loginGitHub = Selector('#github')
    this.loginLocal = Selector('#local')
    // Logout
    this.logoutScreen = VueSelector('k-logout k-screen')
    this.logout = VueSelector('k-links-panel').find('.q-item-label').withText('Logout')
    // Register
    this.registerScreen = VueSelector('k-register k-screen')
    this.registerNameInput = VueSelector('k-register k-text-field')
    this.registerEmailInput = VueSelector('k-register k-email-field')
    this.registerPasswordInput = VueSelector('k-register k-password-field').nth(0)
    this.registerConfirmPasswordInput = VueSelector('k-register k-password-field').nth(1)
    this.register = Selector('#register')
  }
  async doLogIn (test, credentials) {
    await test
      .typeText(this.emailInput, credentials ? credentials.email : 'kalisio@kalisio.xyz', { replace: true })
      .typeText(this.passwordInput, credentials ? credentials.password : 'kalisio', { replace: true })
      .click(this.loginLocal)
      // Need this so that we are sure dynamic components are loaded
      .wait(2000)
  }
  async doLogOut (test) {
    await this.openMenu(test)
    await test
      .click(this.logout)
      // Need this so that we are sure dynamic components are loaded
      .wait(2000)
  }
  async doRegister (test, identity) {
    await test
      .typeText(this.registerNameInput, identity ? identity.name : 'Kalisio', { replace: true })
      .typeText(this.registerEmailInput, identity ? identity.email : 'kalisio@kalisio.xyz', { replace: true })
      .typeText(this.registerPasswordInput, identity ? identity.password : 'kalisio', { replace: true })
      .typeText(this.registerConfirmPasswordInput, identity ? identity.password : 'kalisio', { replace: true })
      .click(this.register)
      // Need this so that we are sure dynamic components are loaded
      .wait(2000)
  }
}
