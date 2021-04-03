// Page models
import * as pages from './page-models'

fixture`app`// declare the fixture
  .page`${pages.getUrl()}`
  // test.before/test.after overrides fixture.beforeEach/fixture.afterEach hook,
  // so implement one in your test if you'd like another behaviour
  .beforeEach(async test => {
    // mock geolocation
    await pages.mockLocationAPI()
  })
  .afterEach(async test => {
    // check for console error messages
    // await pages.checkNoClientError(test)
  })

const screens = new pages.Screens()
const layout = new pages.Layout()
const mapActivity = new pages.MapActivity()

const user = {
  name: 'kalisio',
  email: 'kalisio@kalisio.xyz',
  password: 'Pass;word1'
}

test('Checking the app layout', async test => {
  await screens.login(test, user)
  await layout.closeWelcomeDialog(test)

  // Check default layout state
  await test.expect(await layout.isLeftPaneOpened()).notOk()
  await test.expect(await layout.isRightPaneOpened()).notOk()
  await test.expect(await layout.isTopPaneOpened()).ok()
  await test.expect(await layout.isBottomPaneOpened()).notOk()
  // Close the navigation bar
  await layout.clickTopOpener(test)
  await test.expect(await layout.isTopPaneOpened()).notOk()
  // Open the catalog
  await layout.clickRightOpener(test)
  await test.expect(await layout.isRightPaneOpened()).ok()
  await layout.clickRightOpener(test)
  await test.expect(await layout.isRightPaneOpened()).notOk()
  // Open the timeline
  await layout.clickBottomOpener(test)
  await test.expect(await layout.isBottomPaneOpened()).ok()
  await layout.clickBottomOpener(test)
  await test.expect(await layout.isBottomPaneOpened()).notOk()
  // Interact with the map
  await mapActivity.click(test)
  await mapActivity.move(test, 100, 100)
  // Open the left drawer
  await layout.clickLeftOpener(test)
  await layout.clickLeftPane(test, pages.Layout.LOGOUT)
  // Go back to the login screen
  await screens.goToLoginScreen(test)
})
