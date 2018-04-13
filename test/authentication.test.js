// Page models
import * as pages from './page-models'

fixture`Authentication`// declare the fixture
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

test('Invalid login', async test => {
  await auth.logIn(test)
  let user = await pages.getFromStore('user')
  await test.expect(user).notOk('User should not be populated')
  await test.expect(app.isErrorVisible()).ok('Error should be displayed')
})

test('Local login', async test => {
  await auth.logIn(test, { email: 'kalisio@kalisio.xyz', password: 'kalisio' })

  const signupAlert = await app.signupAlert.getVue()
  let user = await pages.getFromStore('user')
  // We should have at least a populated user and an unverified email
  await test.expect(user).ok('User should be populated')
  await test.expect(signupAlert.props.isVerified).notOk('User should not be verified')

  await auth.logOut(test)

  let screen = await auth.logoutScreen.getVue()
  // We should have at least an unpopulated user
  user = await pages.getFromStore('user')
  await test.expect(user).notOk('User should not be populated')
  // The home page should be the logout screen
  await test.expect(screen.props.title).ok('Your are now logged out')
})

test.skip('Google login', async test => {
  await auth.logInGoogle(test)

  const signupAlert = await app.signupAlert.getVue()
  let user = await pages.getFromStore('user')
  // We should have at least a populated user and a verified email
  await test.expect(user).ok('User should be populated')
  await test.expect(signupAlert.props.isVerified).ok('User should be verified')

  await auth.logOut(test)
})

test.skip('Cleanup Google user', async test => {
  await auth.logInGoogle(test)
  let user = await pages.getFromStore('user')
  await pages.api.remove('users', user._id)
})

test.skip('GitHub login', async test => {
  await auth.logInGitHub(test)

  const signupAlert = await app.signupAlert.getVue()
  let user = await pages.getFromStore('user')
  // We should have at least a populated user and a verified email
  await test.expect(user).ok('User should be populated')
  await test.expect(signupAlert.props.isVerified).ok('User should be verified')

  await auth.logOut(test)
})

test.skip('Cleanup GitHub user', async test => {
  await auth.logInGitHub(test)
  let user = await pages.getFromStore('user')
  await pages.api.remove('users', user._id)
})
