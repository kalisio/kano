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
const account = new pages.Account(auth)
const organisations = new pages.Organisations()
const members = new pages.Members()
const groups = new pages.Groups()

const data = {
  users: [
    { name: 'Groups owner', email: 'groups-owner@kalisio.xyz', password: 'owner' },
    { name: 'Groups manager', email: 'groups-manager@kalisio.xyz', password: 'manager' },
    { name: 'Groups member', email: 'groups-member@kalisio.xyz', password: 'member' }
  ],
  groups: [
    { name: 'Groups one', description: 'A first group' },
    { name: 'Groups two', description: 'A second group' }
  ]
}

test.page `${pages.getUrl('login')}`
('Users registration', async test => {
  await account.registerUsers(test, data.users)
})

test('Add users to organisation', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await members.clickToolbar(test, members.getToolbarEntry())
  await members.addMember(test, data.users[1].name, pages.Roles.manager)
  await members.addMember(test, data.users[2].name, pages.Roles.member)
})

test('Create groups', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await groups.clickToolbar(test, groups.getToolbarEntry())
  await groups.clickTabBar(test, groups.getTabBarEntry())
  for (let i in data.groups) await groups.createGroup(test, data.groups[i])
  await groups.checkGroupsCount(test, data.groups.length)
})

test('Edit group', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await groups.clickToolbar(test, members.getToolbarEntry())
  await groups.clickTabBar(test, groups.getTabBarEntry())
  await groups.editGroup(test, data.groups[0].name, 'A new description')
})

test('Remove member from group', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await members.clickToolbar(test, members.getToolbarEntry())
  // TODO:
})

test('Delete group', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await groups.clickToolbar(test, groups.getToolbarEntry())
  await groups.clickTabBar(test, groups.getTabBarEntry())
  await groups.deleteGroup(test, data.groups[0].name)
  await groups.checkGroupsCount(test, 1)
})

test('Clean registrated users', async test => {
  await account.unregisterUsers(test, data.users)
})
