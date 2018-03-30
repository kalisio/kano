// Page models
import * as pages from './page-models'

fixture `Members`// declare the fixture
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
const members = new pages.Members(auth, account, organisations)

const users = [
  { name: 'Owner Kalisio', email: 'owner@kalisio.xyz', password: 'owner' },
  { name: 'Manager Kalisio', email: 'manager@kalisio.xyz', password: 'manager' },
  { name: 'Member Kalisio', email: 'member@kalisio.xyz', password: 'member' }
]

const guest = { name: 'Guest Kalisio', email: 'guest@kalisio.xyz' }

test.page `${pages.getUrl('login')}`
('Users registration', async test => {
  await members.registerUsers(test, users)
})

test('Add users to organisation', async test => {
  await auth.doLogIn(test, users[0])
  await organisations.selectOrganisation(test, users[0].name)
  await members.activeMembersTab(test)
  await members.checkCount(test, 1)
  await members.addMember(test, users[1].name, pages.Roles.manager)
  await members.checkCount(test, 2)
  await members.addMember(test, users[2].name, pages.Roles.member)
  await members.checkCount(test, 3)
})

test('Invite guest to join the organisation', async test => {
  await auth.doLogIn(test, users[0])
  await organisations.selectOrganisation(test, users[0].name)
  await members.activeMembersTab(test)
  await members.inviteMember(test, guest, pages.Roles.manager)
  await members.checkCount(test, 4)
})

test('Remove members from organisation', async test => {
  await auth.doLogIn(test, users[0])
  await organisations.selectOrganisation(test, users[0].name)
  await members.activeMembersTab(test)
  await members.removeMember(test, users[1].name)
  await members.checkCount(test, 3)
  await members.removeMember(test, users[2].name)
  await members.checkCount(test, 2)
  await members.removeMember(test, guest.name)
  await members.checkCount(test, 1)
})

test('Clean registrated users', async test => {
  await members.unregisterUsers(test, users)
})
