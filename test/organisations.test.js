// Page models
import * as pages from './page-models'

fixture `Organisations`// declare the fixture
  .page `${pages.getUrl()}`  // specify the start page
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

const auth = new pages.Authentication()
const account = new pages.Account()
const organisations = new pages.Organisations()

test.page `${pages.getUrl('register')}`
('Registration', async test => {
  await auth.doRegister(test)
})

test('Default organisation', async test => {
	await auth.doLogIn(test)
  const orgPanel = await organisations.orgPanel.getVue()

  // We should have at least a private org
  await test.expect(orgPanel.state.items.length).eql(1, 'Private organisation should be created')
})

test('Delete account', async test => {
	await auth.doLogIn(test)
  await account.doRemoveAccount(test, 'Kalisio')
})
