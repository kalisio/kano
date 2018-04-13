import path from 'path'
// Page models
import * as pages from './page-models'

fixture`Account`// declare the fixture
  .page`${pages.getUrl()}`  // specify the start page
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
const organisations = new pages.Organisations()
const account = new pages.Account()

const newPassword = 'kalisio-new'
const newEmail = 'kalisio@kalisio.com'

test.page`${pages.getUrl('register')}`
('Registration', async test => {
  await auth.signIn(test)
})

test('Edit profile', async test => {
  await auth.logIn(test)
  await account.editProfile(test, { name: 'toto', avatar: path.join(__dirname, '..', 'src/assets/aktnmap-logo.png') })
  await account.checkIdentity(test, 'toto')
})

test('Edit password', async test => {
  await auth.logIn(test)
  await account.updatePassword(test, { password: 'kalisio', newPassword })
  await pages.goBack()
  await auth.logOut(test)
  // We should login with new credentials
  await test.navigateTo(pages.getUrl('login'))
  await auth.logIn(test, { password: newPassword })
})

test('Edit email', async test => {
  await auth.logIn(test, { password: newPassword })
  await account.updateEmail(test, { password: newPassword, newEmail })
  await pages.goBack()
  await auth.logOut(test)
  // We should not be able to login with new email because it requires validation
  await test.navigateTo(pages.getUrl('login'))
  await auth.logIn(test, { email: newEmail, password: newPassword })
  await test.expect(app.isErrorVisible()).ok('Error should be displayed')
  // FIXME: how could we validate the change ?
})

test('Delete account', async test => {
  await auth.logIn(test, { password: newPassword })
  await organisations.deleteOrganisation(test, 'Kalisio')
  await account.removeAccount(test, 'toto')

  let screen = await auth.logoutScreen.getVue()
  // The home page should be the logout screen
  await test.expect(screen.props.title).ok('Your are now logged out')
  // And we cannot login anymore
  await test.navigateTo(pages.getUrl('login'))
  await auth.logIn(test, { password: newPassword })
  await test.expect(app.isErrorVisible()).ok('Error should be displayed')
})
