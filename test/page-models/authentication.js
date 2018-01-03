import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'

const defaultTestUser = {
  name : 'Kalisio',
  email : 'test@kalisio.xyz',
  password : 'kalisio'
}

export default class Authentication extends ApplicationLayout {
  constructor () {
    super()
    // Local login
    this.loginScreen = VueSelector('k-login k-screen')
    this.emailInput = VueSelector('k-login k-email-field')
    this.passwordInput = VueSelector('k-login k-password-field')
    // withText('Log in') does not seem to work probably because the
    // text is on a sub internal element, we might use IDs ?
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
    // OAuth2 login
    this.loginGoogle = Selector('#google')
    this.emailInputGoogle = Selector('input[type=email]')
    this.nextEmailGoogle = Selector('#identifierNext')
    this.passwordInputGoogle = Selector('input[type=password]')
    this.signInGoogle = Selector('#passwordNext')
    this.loginGitHub = Selector('#github')
    this.emailInputGitHub = Selector('input[type=text]')
    this.passwordInputGitHub = Selector('input[type=password]')
    this.signInGitHub = Selector('input[type=submit]')
    this.authorizeGitHub = Selector('button[type=submit]')
  }
  async doLogIn (test, credentials) {
    await test
      .typeText(this.emailInput, credentials ? credentials.email : defaultTestUser.email, { replace: true })
      .typeText(this.passwordInput, credentials ? credentials.password : defaultTestUser.password, { replace: true })
      .click(this.loginLocal)
      // Need this so that we are sure dynamic components, user, etc. have been loaded
      .wait(2000)
  }
  async doLogOut (test) {
    await this.openMenu(test)
    await test
      .click(this.logout)
  }
  async doRegister (test, identity) {
    await test
      .typeText(this.registerNameInput, identity ? identity.name : defaultTestUser.name, { replace: true })
      .typeText(this.registerEmailInput, identity ? identity.email : defaultTestUser.email, { replace: true })
      .typeText(this.registerPasswordInput, identity ? identity.password : defaultTestUser.password, { replace: true })
      .typeText(this.registerConfirmPasswordInput, identity ? identity.password : defaultTestUser.password, { replace: true })
      .click(this.register)
      // Need this so that we are sure dynamic components, user, etc. have been loaded
      .wait(2000)
  }
  async doLogInGoogle (test) {
    await test
      .click(this.loginGoogle)
      .typeText(this.emailInputGoogle, process.env.GOOGLE_USER, { replace: true })
      .click(this.nextEmailGoogle)
      // Need this so that we are sure google login page is loaded
      .wait(2000)
      .typeText(this.passwordInputGoogle, process.env.GOOGLE_PASSWORD, { replace: true })
      .click(this.signInGoogle)
      // Need this so that we are sure google page is loaded & dynamic components, user, etc. have been loaded
      .wait(5000)
  }
  async doLogInGitHub (test) {
    await test
      .click(this.loginGitHub)
      .typeText(this.emailInputGitHub, process.env.GITHUB_USER, { replace: true })
      .typeText(this.passwordInputGitHub, process.env.GITHUB_PASSWORD, { replace: true })
      .click(this.signInGitHub)
      // Need this so that we are sure github authorize page or user has been loaded
      .wait(2000)
      // Check if we need to authorize the app
      const authorize = await this.authorizeGitHub()
      if (authorize) {
        await test
          .click(this.authorizeGitHub)
          // Need this so that we are sure dynamic components, user, etc. have been loaded
          .wait(2000)
      }
  }
}
