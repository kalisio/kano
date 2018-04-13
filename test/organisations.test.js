// Page models
import * as pages from './page-models'

fixture`Organisations`// declare the fixture
  .page`${pages.getUrl()}`  // specify the start page
  // test.before/test.after overrides fixture.beforeEach/fixture.afterEach hook,
  // so implement one in your test if you'd like another behaviour
  .beforeEach(async test => {
    // mock geolocation
    await pages.mockLocationAPI()
  })
  // .afterEach(async test => {
  // })

const auth = new pages.Authentication()
const account = new pages.Account(auth)
const organisations = new pages.Organisations()

const data = {
  user: { name: 'Organisations owner', email: 'organisations-owner@kalisio.xyz', password: 'kalisio' },
  organisation: { name: 'Test Organisation', description: 'An organisation test' }
}

test.page`${pages.getUrl('register')}`
('Registration', async test => {
  await auth.signIn(test, data.user)
  await pages.checkNoClientError(test)
})

test('Default organisation', async test => {
  await auth.logInAndCloseSignupAlert(test, data.user)
  // We should have at least the private organisation
  const panel = await organisations.panel.getVue()
  await test.expect(panel.state.items.length).eql(1, 'Private organisation should be created')
  await pages.checkNoClientError(test)
})

test('Create organisation', async test => {
  await auth.logInAndCloseSignupAlert(test, data.user)
  await organisations.createOrganisation(test, data.organisation)
  // We should have the created organisation in the organisations panel
  // FIXME: innerText contains an additionnal \n which makes the test fail
  await test.expect(organisations.appBarTitle.innerText).eql(data.organisation.name + '\n', 'AppBar title should be the organisation name')
  const panel = await organisations.panel.getVue()
  await test.expect(panel.state.items.length).eql(2, 'New organisation should be added to the panel')
  await pages.checkNoClientError(test)
})

test('Update organisation billing', async test => {
  await auth.logInAndCloseSignupAlert(test, data.user)
  await organisations.updateOrganisationBilling(test, data.organisation.name)
  await pages.checkNoClientError(test)
})

test('Delete organisation', async test => {
  await auth.logInAndCloseSignupAlert(test, data.user)
  await organisations.deleteOrganisation(test, data.organisation.name)
  // We should have the deleted organisation removed from the organisations panel
  const panel = await organisations.panel.getVue()
  await test.expect(panel.state.items.length).eql(1, 'Deleted organisation should be removed from the panel')
  await pages.checkNoClientError(test)
})

test('Forbid account deletion', async test => {
  await auth.logInAndCloseSignupAlert(test, data.user)
  // Cannot remove the account because the user is still owning an organisation
  await account.removeAccount(test, data.user.name)
  await test.expect(organisations.isErrorVisible()).ok('Forbidden error should be displayed')
  await pages.checkClientError(test)
})

test('Delete account', async test => {
  await auth.logInAndCloseSignupAlert(test, data.user)
  await organisations.deleteOrganisation(test, data.user.name)
  await account.removeAccount(test, data.user.name)
  await pages.checkNoClientError(test)
})
