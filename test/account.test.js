import path from 'path'
// Page models
import * as pages from './page-models'

fixture `Account`// declare the fixture
  .page `${pages.getUrl()}`  // specify the start page
  // test.before/test.after overrides fixture.beforeEach/fixture.afterEach hook,
  // so implement one in your test if you'd like another behaviour
  .beforeEach(async test => {
    // mock geolocation
    await pages.mockLocationAPI()
  })
  .afterEach(async test => {
    // check for console error messages
    await pages.checkNoClientError(test) 
  })

const app = new pages.ApplicationLayout()
const auth = new pages.Authentication()
const account = new pages.Account()

const newPassword = 'kalisio-new'
const newEmail = 'kalisio@kalisio.com'

test.page `${pages.getUrl('register')}`
('Registration', async test => {
  await auth.doRegister(test)
})

test('Edit profile', async test => {
  await auth.doLogIn(test)
  await account.doEditProfile(test, { name: 'toto', avatar: path.join(__dirname, '..', 'src/assets/kalisio-logo.png') })

  const identityPanel = await account.identityPanel.getVue()
  // We should have at least a changed user name
  await test.expect(identityPanel.state.name).eql('toto', 'User name should be changed')
})

test('Edit password', async test => {
  await auth.doLogIn(test)
  await account.doUpdatePassword(test, { password: 'kalisio', newPassword })
  await pages.goBack()
  await auth.doLogOut(test)
  // We should login with new credentials
  await test.navigateTo(pages.getUrl('login'))
  await auth.doLogIn(test, { password: newPassword })
})

test('Edit email', async test => {
  await auth.doLogIn(test, { password: newPassword })
  await account.doUpdateEmail(test, { password: newPassword, newEmail })
  await pages.goBack()
  await auth.doLogOut(test)
  // We should not be able to login with new email because it requires validation
  await test.navigateTo(pages.getUrl('login'))
  await auth.doLogIn(test, { email: newEmail, password: newPassword })
  await test.expect(app.isErrorVisible()).ok('Error should be displayed')
  // FIXME: how could we validate the change ?
})

test('Delete account', async test => {
  await auth.doLogIn(test, { password: newPassword })
  await account.doRemoveAccount(test, 'toto')

  let screen = await auth.logoutScreen.getVue()
  // The home page should be the logout screen
  await test.expect(screen.props.title).ok('Your are now logged out')
  // And we cannot login anymore
  await test.navigateTo(pages.getUrl('login'))
  await auth.doLogIn(test, { password: newPassword })
  await test.expect(app.isErrorVisible()).ok('Error should be displayed')
})
