import _ from 'lodash'
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

const orgName = 'Test Organisation'
const orgDescription = 'An organisation test'

test.page `${pages.getUrl('register')}`
('Registration', async test => {
  await auth.doRegister(test)
})

test('Default organisation', async test => {
  await auth.doLogIn(test)
  // We should have at least the private organisation
  const panel = await organisations.panel.getVue()
  await test.expect(panel.state.items.length).eql(1, 'Private organisation should be created')
})

test('Create organisation', async test => {
  await auth.doLogIn(test)
  await organisations.createOrganisation(test, orgName, orgDescription)
  // We should have the created organisation in the organisations panel
  // FIXME: innerText contains an additionnal \n which makes the test fail
  await test.expect(organisations.appBarTitle.innerText).eql(orgName + '\n', 'AppBar title should be the organisation name')
  const panel = await organisations.panel.getVue()
  await test.expect(panel.state.items.length).eql(2, 'New organisation should be added to the panel')
})

test('Update organisation billing', async test => {
  await auth.doLogIn(test)
  await organisations.updateOrganisationBilling(test, orgName)
})

test('Delete organisation', async test => {
  await auth.doLogIn(test)
  await organisations.deleteOrganisation(test, orgName)
  // We should have the deleted organisation removed from the organisations panel
  const panel = await organisations.panel.getVue()
  await test.expect(panel.state.items.length).eql(1, 'Deleted organisation should be removed from the panel')
})

test('Delete account', async test => {
	await auth.doLogIn(test)
  await account.doRemoveAccount(test, 'Kalisio')
})
