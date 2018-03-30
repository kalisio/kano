// Page models
import * as pages from './page-models'

fixture `Groups`// declare the fixture
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
const members = new pages.Members(auth, account)
//const groups = new pages.Groups()

const users = [
  { name: 'Owner Kalisio', email: 'owner@kalisio.xyz', password: 'owner' },
  { name: 'Manager Kalisio', email: 'manager@kalisio.xyz', password: 'manager' },
  { name: 'Member Kalisio', email: 'member@kalisio.xyz', password: 'member' }
]

test.page `${pages.getUrl('login')}`
('Users registration', async test => {
  await members.registerUsers(test, users)
})

test('Add users to organisation', async test => {
  await auth.doLogIn(test, users[0])
  await organisations.selectOrganisation(test, users[0].name)
  await members.activeMembersTab(test)
  await members.addMember(test, users[1].name, pages.Roles.manager)
  await members.addMember(test, users[2].name, pages.Roles.member)
})

test('Create groups', async test => {
  await auth.doLogIn(test, users[0])
  await organisations.selectOrganisation(test, users[0].name)
  //await groups.activeGroupsTab(test)
})

test('Clean registrated users', async test => {
  await members.unregisterUsers(test, users)
})
