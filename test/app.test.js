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

const screens = new pages.Screens()
const layout = new pages.Layout()
const sideNav = new pages.SideNav()
const navigationBar = new pages.NavigationBar()
const timeline = new pages.Timeline()
const mapAcitivty = new pages.MapActivity()

const user = {
  name: 'kalisio',
  email: 'kalisio@kalisio.xyz',
  password: 'Pass;word1'
}

test('Authenticating to the app', async test => {
  await screens.login(test, user)
  await test.wait(1000)
  // Check default layout state
  await test.expect(await layout.isLeftDrawerOpened()).notOk()
  await test.expect(await layout.isRightDrawerOpened()).notOk()
  await test.expect(await navigationBar.isVisible()).ok()
  await test.expect(await timeline.isVisible()).notOk()
  // Close the navigation bar
  await layout.clickTopOpener(test)
  await test.expect(await navigationBar.isVisible()).notOk()
  // Open the timeline
  await layout.clickBottomOpener(test)
  await test.expect(await timeline.isVisible()).ok()
  // Open the catalog
  await layout.clickRightOpener(test)
  await test.expect(await layout.isRightDrawerOpened()).ok()
  await mapAcitivty.clickOnMap(test)
  await test.expect(await layout.isRightDrawerOpened()).notOk()
  // Open the side nav
  await layout.clickLeftOpener(test)
  await test.expect(await layout.isLeftDrawerOpened()).ok()
  await sideNav.logout(test)
})

