// Page models
import * as pages from './page-models'

fixture `Authentication`// declare the fixture
  .page `${pages.getUrl()}`  // specify the start page
  .afterEach(pages.checkNoClientError)  // check for console error messages

const app = new pages.ApplicationLayout()
const auth = new pages.Authentication()

test('Invalid login', async test => {
  await auth.doLogIn(test)
  let user = await pages.getFromStore('user')
  await test.expect(user).notOk('User should not be populated')
  await test.expect(app.isErrorVisible()).ok('Error should be displayed')
})

test.page `${pages.getUrl('register')}`
('Registration', async test => {
  await auth.doRegister(test)

  const signupAlert = await app.signupAlert.getVue()
  let user = await pages.getFromStore('user')
  // We should have at least a populated user and an unverified email
  await test.expect(user).ok('User should be populated')
  await test.expect(signupAlert.props.isVerified).notOk('User should not be verified')
})

test('Local login', async test => {
  await auth.doLogIn(test)
  
  const signupAlert = await app.signupAlert.getVue()
  let user = await pages.getFromStore('user')
  // We should have at least a populated user and an unverified email
  await test.expect(user).ok('User should be populated')
  await test.expect(signupAlert.props.isVerified).notOk('User should not be verified')

  await auth.doLogOut(test)

  let screen = await auth.logoutScreen.getVue()
  // We should have at least an unpopulated user
  user = await pages.getFromStore('user')
  await test.expect(user).notOk('User should not be populated')
  // The home page should be the logout screen
  await test.expect(screen.props.title).ok('Your are now logged out')
})

test('Cleanup local user', async test => {
  await auth.doLogIn(test)
  let user = await pages.getFromStore('user')
  await pages.api.remove('users', user._id)
})

test('Google login', async test => {
  await auth.doLogInGoogle(test)
  
  const signupAlert = await app.signupAlert.getVue()
  let user = await pages.getFromStore('user')
  // We should have at least a populated user and a verified email
  await test.expect(user).ok('User should be populated')
  await test.expect(signupAlert.props.isVerified).ok('User should be verified')

  await auth.doLogOut(test)
})

test('Cleanup Google user', async test => {
  await auth.doLogInGoogle(test)
  let user = await pages.getFromStore('user')
  await pages.api.remove('users', user._id)
})

test('GitHub login', async test => {
  await auth.doLogInGitHub(test)
  
  const signupAlert = await app.signupAlert.getVue()
  let user = await pages.getFromStore('user')
  // We should have at least a populated user and a verified email
  await test.expect(user).ok('User should be populated')
  await test.expect(signupAlert.props.isVerified).ok('User should be verified')

  await auth.doLogOut(test)
})

test('Cleanup GitHub user', async test => {
  await auth.doLogInGitHub(test)
  let user = await pages.getFromStore('user')
  await pages.api.remove('users', user._id)
})
