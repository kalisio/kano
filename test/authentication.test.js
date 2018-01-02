import { ClientFunction } from 'testcafe'
// Page models
import * as pages from './page-models'

fixture `Authentication`// declare the fixture
  .page `http://localhost:8080`  // specify the start page

const app = new pages.ApplicationLayout()
const auth = new pages.Authentication()

test.skip('Local login', async test => {
  await auth.doLogIn(test)
  let store = await pages.getStore()

  const signupAlert = await app.signupAlert.getVue()
  // We should have at least a populated user and an unverified email
  await test.expect(store.user).ok('User should be populated')
  await test.expect(signupAlert.props.isVerified).notOk('User should not be verified')

  await auth.doLogOut(test)

  let screen = await auth.logoutScreen.getVue()
  // We should have at least an unpopulated user
  store = await pages.getStore()
  await test.expect(store.user).notOk('User should not be populated')
  // The home page should be the logout screen
  await test.expect(screen.props.title).ok('Your are now logged out')
})

test.page `http://localhost:8080/#/register`    
('Registration', async test => {
  await auth.doRegister(test)
})

test.skip('Google login', async test => {
  await auth.doLogInGoogle(test)
  let store = await pages.getStore()

  const signupAlert = await app.signupAlert.getVue()
  // We should have at least a populated user and a verified email
  await test.expect(store.user).ok('User should be populated')
  await test.expect(signupAlert.props.isVerified).ok('User should be verified')

  await auth.doLogOut(test)
})

test.skip('GitHub login', async test => {
  await auth.doLogInGitHub(test)
  let store = await pages.getStore()

  const signupAlert = await app.signupAlert.getVue()
  // We should have at least a populated user and a verified email
  await test.expect(store.user).ok('User should be populated')
  await test.expect(signupAlert.props.isVerified).ok('User should be verified')

  await auth.doLogOut(test)
})

