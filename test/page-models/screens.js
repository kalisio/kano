import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import BasePage from './base-page'

export default class Screens extends BasePage {
  constructor () {
    super()
    // Login Screen
    this.loginScreen = VueSelector('k-login k-screen')
    this.emailInput = VueSelector('k-login k-email-field')
    this.passwordInput = VueSelector('k-login k-password-field')
    this.loginLocalButton = Selector('#local')
    this.loginGoogleButton = Selector('#google')
    this.emailInputGoogle = Selector('input[type=email]')
    this.nextEmailGoogle = Selector('#identifierNext')
    this.passwordInputGoogle = Selector('input[type=password]')
    this.signInGoogle = Selector('#passwordNext')
    this.loginGitHubButton = Selector('#github')
    this.emailInputGitHub = Selector('input[type=text]')
    this.passwordInputGitHub = Selector('input[type=password]')
    this.signInGitHub = Selector('input[type=submit]')
    this.authorizeGitHub = Selector('button[type=submit]')
    this.registerLink = Selector('#register-link')
    // Logout screen
    this.logoutScreen = VueSelector('k-logout k-screen')
    // Register screen
    this.registerScreen = VueSelector('k-register k-screen')
    this.registerNameInput = VueSelector('k-register k-text-field')
    this.registerEmailInput = VueSelector('k-register k-email-field')
    this.registerPasswordInput = VueSelector('k-register k-password-field').nth(0)
    this.registerConfirmPasswordInput = VueSelector('k-register k-password-field').nth(1)
    this.registerAcceptTerms = VueSelector('k-register k-toggle-field').find('.q-toggle')
    this.registerButton = Selector('button[type=button]').nth(0)
    // Register/Logout screens
    this.loginLink = Selector('#login-link')
  }

  // Login screen functions
  async goToLoginScreen (test) {
    await test.click(this.loginLink)
  }

  async login (test, credentials) {
    await test
      .typeText(this.emailInput, credentials.email, { replace: true })
      .typeText(this.passwordInput, credentials.password, { replace: true })
      .click(this.loginLocalButton)
      // Need this so that we are sure dynamic components, user, etc. have been loaded
      .wait(1000)
  }

  async loginGoogle (test) {
    await test
      .click(this.loginGoogleButton)
      .typeText(this.emailInputGoogle, process.env.GOOGLE_USER, { replace: true })
      .click(this.nextEmailGoogle)
      // Need this so that we are sure google login page is loaded
      .wait(2000)
      .typeText(this.passwordInputGoogle, process.env.GOOGLE_PASSWORD, { replace: true })
      .click(this.signInGoogle)
      // Need this so that we are sure google page is loaded & dynamic components, user, etc. have been loaded
      .wait(5000)
  }

  async loginGitHub (test) {
    await test
      .click(this.loginGitHubButton)
      .typeText(this.emailInputGitHub, process.env.GITHUB_USER, { replace: true })
      .typeText(this.passwordInputGitHub, process.env.GITHUB_PASSWORD, { replace: true })
      .click(this.signInGitHub)
      // Need this so that we are sure github authorize page or user has been loaded
      .wait(5000)
      // Check if we need to authorize the app
    const authorize = await this.authorizeGitHub()
    if (authorize) {
      await test
        .click(this.authorizeGitHub)
      // Need this so that we are sure dynamic components, user, etc. have been loaded
        .wait(5000)
    }
  }

  // Register screen functions
  async goToRegisterScreen (test) {
    await test.click(this.registerLink)
  }

  async register (test, identity) {
    await test
      .typeText(this.registerNameInput, identity.name, { replace: true })
      .typeText(this.registerEmailInput, identity.email, { replace: true })
      .typeText(this.registerPasswordInput, identity.password, { replace: true })
      .typeText(this.registerConfirmPasswordInput, identity.password, { replace: true })
      .click(this.registerAcceptTerms)
      .click(this.registerButton)
      // Need this so that we are sure dynamic components, user, etc. have been loaded
      .wait(2000)
  }
}
