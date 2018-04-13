// Page models
import * as pages from './page-models'

fixture`Members`// declare the fixture
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

const auth = new pages.Authentication()
const account = new pages.Account()
const organisations = new pages.Organisations()
const users = new pages.Users(auth, account, organisations)
const members = new pages.Members()

const data = {
  users: [
    { name: 'Members owner', email: 'members-owner@kalisio.xyz', password: 'owner' },
    { name: 'Members manager', email: 'members-manager@kalisio.xyz', password: 'manager' },
    { name: 'Members member', email: 'members-member@kalisio.xyz', password: 'member' }
  ],
  guest: { name: 'Members guest', email: 'members-guest@kalisio.xyz' }
}

test.page`${pages.getUrl('login')}`
('Users registration', async test => {
  await users.registerUsers(test, data.users)
})

test('Add users to organisation', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await members.clickToolbar(test, members.getToolbarEntry())
  await members.checkMembersCount(test, 1)
  await members.addMember(test, data.users[1].name, pages.Roles.manager)
  await members.checkMembersCount(test, 2)
  await members.addMember(test, data.users[2].name, pages.Roles.member)
  await members.checkMembersCount(test, 3)
})

test('Invite guest to join the organisation', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await members.clickToolbar(test, members.getToolbarEntry())
  await members.inviteMember(test, data.guest, pages.Roles.manager)
  await members.checkMembersCount(test, 4)
})

test('tag member', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await members.clickToolbar(test, members.getToolbarEntry())
  await members.tagMember(test, data.users[1].name, 'tag')
  await members.checkMembersCount(test, 4)
})

test('Change guest role', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await members.clickToolbar(test, members.getToolbarEntry())
  await members.changeMemberRole(test, data.guest.name, pages.Roles.manager)
  await members.checkMembersCount(test, 4)
})

test('Remove members from organisation', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await members.clickToolbar(test, members.getToolbarEntry())
  await members.removeMember(test, data.users[1].name)
  await members.checkMembersCount(test, 3)
  await members.removeMember(test, data.users[2].name)
  await members.checkMembersCount(test, 2)
  await members.removeMember(test, data.guest.name)
  await members.checkMembersCount(test, 1)
})

test('Clean registrated users', async test => {
  // await auth.logIn(test, data.users[0])
  // await account.removeAccount(test, data.users[0].name)
  // FIXME: for (let i in data.users) await organisations.deleteOrganisation(test, data.users[i].name)
  await users.unregisterUsers(test, data.users)
})
