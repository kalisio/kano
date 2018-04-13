// Page models
import * as pages from './page-models'

fixture`Basic`// declare the fixture
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
const org = new pages.Organisations()

test('Login as default user', async test => {
  await auth.logInAndCloseSignupAlert(test, { email: 'kalisio@kalisio.xyz', password: 'kalisio' })
  await org.selectOrganisation(test, 'kalisio')
  await app.clickToolbar(test, '#members')
  await app.clickTabBar(test, '#groups')
  await app.clickFab(test, '#create-group')
})
