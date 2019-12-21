// Page models
import * as pages from './page-models'

fixture`app`// declare the fixture
  .page`${pages.getUrl()}`  // specify the start page
  // test.before/test.after overrides fixture.beforeEach/fixture.afterEach hook,
  // so implement one in your test if you'd like another behaviour
  .beforeEach(async test => {
    // mock geolocation
    await pages.mockLocationAPI()
  })
  .afterEach(async test => {
    // check for console error messages
    // FIXME: geolocation error
    // await pages.checkNoClientError(test)
  })

const app = new pages.Application()
const navbar = new pages.NavigationBar()

test('Authenticating to the app', async test => {
  await app.login(test)
  await test.wait(5000)
  await navbar.clickSideNav(test)
})