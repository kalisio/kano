import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'

const defaultUser = {
  name: 'kalisio',
  email: 'kalisio@kalisio.xyz',
  password: 'Pass;word1'
}

export default class Application {
  constructor () {
    this.error = VueSelector('q-toast')
    this.idSelector = Selector((id) => { return document.getElementById(id) })
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
    this.loginLink = Selector('#login-link')   
    // Layout
    this.appBar = VueSelector('k-app-bar')
    this.appBarTitle = this.appBar.find('#app-bar-title')
    this.appBarOverflowMenu = Selector('#overflow-menu')
    this.appBarOverflowMenuEntry = this.appBar.find('#overflow-menu-entry')
    this.sideNavToggle = this.appBar.find('#left-drawer-toggle')
    this.sideNav = VueSelector('k-side-nav')
    this.identityPanel = VueSelector('k-identity-panel')
    this.identityLink = Selector('#account')
    this.logoutLink = VueSelector('k-links-panel').find('.q-icon').withText('exit_to_app')
    this.tabBar = VueSelector('k-tab-bar')
    this.fab = Selector('#fab')
    this.signupAlert = VueSelector('k-signup-alert')    
  }
  
  async isErrorVisible () {
    await this.error.visible
  }
  // Login functions
  async goToLoginScreen (test) {
    await test.click(this.loginLink)
  }
  async login (test, credentials = {}) {
    await test
      .typeText(this.emailInput, credentials.email || defaultUser.email, { replace: true })
      .typeText(this.passwordInput, credentials.password || defaultUser.password, { replace: true })
      .click(this.loginLocalButton)
      // Need this so that we are sure dynamic components, user, etc. have been loaded
      .wait(1000)
  }
  async loginGoogleButton (test) {
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
  async loginGitHubButton (test) {
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
  // Register functions
  async goToRegisterScreen (test) {
    await test.click(this.registerLink)
  }
  async register (test, identity = {}) {
    await test
      .typeText(this.registerNameInput, identity.name || defaultUser.name, { replace: true })
      .typeText(this.registerEmailInput, identity.email || defaultUser.email, { replace: true })
      .typeText(this.registerPasswordInput, identity.password || defaultUser.password, { replace: true })
      .typeText(this.registerConfirmPasswordInput, identity.password || defaultUser.password, { replace: true })
      .click(this.registerAcceptTerms)
      .click(this.registerButton)
      // Need this so that we are sure dynamic components, user, etc. have been loaded
      .wait(2000)
  }
  // Layout functions
  async isSideNavVisible () {
    const exists = await this.sideNav.exists
    if (!exists) return false
    const left = await this.sideNav.getBoundingClientRectProperty('left')
    // quasar actually hides the sideNav by translating it outside the viewport,
    // so that the visible flag is always true
    return left >= 0
  }
  async openSideNav (test) {
    const isSideNavVisible = await this.isSideNavVisible()
    if (!isSideNavVisible) {
      await test
        .click(this.sideNavToggle) 
        .wait(500)
    }
  }
  async logout (test) {
    await this.openSideNav(test)
    await test
      .click(this.logoutLink)
      .wait(500)
  }
  async clickIdentity (test) {
    await this.openSideNav(test)
    await test
      .click(this.identityLink)
      .wait(1000)
  }
  async checkIdentity (test, name) {
    const identityPanel = await this.identityPanel.getVue()
    await test.expect(identityPanel.state.name).eql(name, 'User name is invalid')
  }
  async closeSignupAlert (test) {
    await test
      .click(this.signupAlert.find('.q-alert-close').find('.cursor-pointer'))
      .wait(1000)
  }
  async clickToolbar (test, entry) {
    await test
      .click(this.appBar.find(entry))
      .wait(3000)
  }
  async clickOverflowMenu (test, entry) {
    await test
      .click(this.appBarOverflowMenuEntry)
      .click(this.appBarOverflowMenu.find(entry))
      .wait(1000)
  }
  async clickTabBar (test, tab) {
    await test
      .click(this.tabBar.find(tab))
      .wait(3000)
  }
  async openAndClickFab (test, entry) {
    await test
      .click(Selector(this.fab))
      .wait(1000)
    await test
      .click(this.fab.find(entry))
      .wait(1000)
  }
  async clickFab (test, entry) {
    await test
      .click(Selector(entry))
      .wait(1000)
  }
  // Colection helpers
  async getItem (test, collectionSelector, name) {
    const collection = await collectionSelector.getVue()
    return _.find(collection.state.items, { name: name })
  }
  async getItemId (test, collectionSelector, name) {
    const item = await this.getItem(test, collectionSelector, name)
    if (item) return item._id
    return undefined
  }
  async checkCollectionCount (test, collectionSelector, count) {
    const collection = await collectionSelector.getVue()
    await test.expect(collection.state.items.length).eql(count, 'Invalid collection length')
  }
}
