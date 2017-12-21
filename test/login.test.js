import { ClientFunction } from 'testcafe'
// Page models
import * as pages from './page-models'

// FIXME: Test to retrive our store
// Where does global imports go with webpack ?
const getStore = ClientFunction(() => window.Store)

fixture `Authentication`// declare the fixture
  .page `http://localhost:8080`  // specify the start page

const app = new pages.ApplicationLayout()
const auth = new pages.Authentication()

test('Local login', async test => {
  //let screen = await auth.screen.getVue()
  // The home page should be the login screen
  //await test.expect(screen.props.title).ok('Log in with')

  await auth.logIn(test)

  const signupAlert = await app.signupAlert.getVue()
  // We should have at least a populated user and an unverified email
  //await test.expect(await getStore().get('user')).eql(1, 'User should be populated')
  await test.expect(signupAlert.props.isVerified).notOk('User should not be verified')

  await auth.logOut(test)

  let screen = await auth.screen.getVue()
  // The home page should be the logout screen
  await test.expect(screen.props.title).ok('Your are now logged out')
  // We should have at least a private org and unverified email
  //await test.expect(await getStore().get('user')).notOk('User should not be populated')
})
