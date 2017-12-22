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
  await auth.doLogIn(test)

  const signupAlert = await app.signupAlert.getVue()
  // We should have at least a populated user and an unverified email
  //await test.expect(await getStore().get('user')).eql(1, 'User should be populated')
  await test.expect(signupAlert.props.isVerified).notOk('User should not be verified')

  await auth.doLogOut(test)

  let screen = await auth.logoutScreen.getVue()
  // The home page should be the logout screen
  await test.expect(screen.props.title).ok('Your are now logged out')
})

test.skip('Registration', async test => {
  // FIXME: does not work
  await test
    .navigateTo('#/register')
    // Need this so that we are sure dynamic components are loaded
    .wait(2000)
  await auth.doRegister(test)
})
