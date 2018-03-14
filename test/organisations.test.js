// Page models
import * as pages from './page-models'

fixture `Organisations`// declare the fixture
  .page `${pages.getUrl()}`  // specify the start page
  .afterEach(pages.checkNoClientError)  // check for console error messages
  .beforeEach(async test => await pages.mockLocationAPI()) // mock geolocation

const auth = new pages.Authentication()
const account = new pages.Account()
const organisations = new pages.Organisations()

test.page `${pages.getUrl('register')}`
('Registration', async test => {
  await auth.doRegister(test)
})

test
.before(async test => await auth.doLogIn(test))
('Default organisation', async test => {
  const orgPanel = await organisations.orgPanel.getVue()

  // We should have at least a private org
  await test.expect(orgPanel.state.items.length).eql(1, 'Private organisation should be created')
})
.after(async test => await auth.doLogOut(test))

test
.before(async test => await auth.doLogIn(test))
('Delete account', async test => {
  await account.doRemoveAccount(test, 'Kalisio')
})
