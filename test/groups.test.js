// Page models
import * as pages from './page-models'

fixture`Groups`// declare the fixture
  .page`${pages.getUrl()}`  // specify the start page
  // test.before/test.after overrides fixture.beforeEach/fixture.afterEach hook,
  // so implement one in your test if you'd like another behaviour
  .beforeEach(async test => {
    // mock geolocation
    await pages.mockLocationAPI()
  })
  .afterEach(async test => {
  })

const auth = new pages.Authentication()
const account = new pages.Account()
const organisations = new pages.Organisations()
const users = new pages.Users(auth, account, organisations)
const members = new pages.Members()
const groups = new pages.Groups()

const data = {
  users: [
    { name: 'Groups owner', email: 'groups-owner@kalisio.xyz', password: 'Pass;word1' },
    { name: 'Groups manager 1', email: 'groups-manager1@kalisio.xyz', password: 'Pass;word1' },
    { name: 'Groups member 1', email: 'groups-member1@kalisio.xyz', password: 'Pass;word1' },
    { name: 'Groups member 2', email: 'groups-member2@kalisio.xyz', password: 'Pass;word1' }
  ],
  groups: [
    { name: 'Groups 1', description: 'A first group' },
    { name: 'Groups 2', description: 'A second group' }
  ]
}

test.page`${pages.getUrl('login')}`
('Setup context', async test => {
  await users.registerUsers(test, data.users)
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await members.clickToolbar(test, members.getToolbarEntry())
  await members.addMember(test, data.users[1].name, pages.Roles.member)
  await members.addMember(test, data.users[2].name, pages.Roles.manager)
  await members.addMember(test, data.users[3].name, pages.Roles.member)
  await pages.checkNoClientError(test) 
})

test('Create groups', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await groups.clickToolbar(test, groups.getToolbarEntry())
  await groups.clickTabBar(test, groups.getTabBarEntry())
  for (let i in data.groups) await groups.createGroup(test, data.groups[i])
  await groups.checkGroupsCount(test, data.groups.length)
  await pages.checkNoClientError(test) 
})

test('Edit group', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await groups.clickToolbar(test, members.getToolbarEntry())
  await groups.clickTabBar(test, groups.getTabBarEntry())
  await groups.editGroup(test, data.groups[0].name, 'A new description')
  await pages.checkNoClientError(test) 
})

test('Add members to groups', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await members.clickToolbar(test, members.getToolbarEntry())
  await members.joinGroup(test, data.users[1].name, data.groups[0].name, pages.Roles.manager)
  await members.joinGroup(test, data.users[2].name, data.groups[0].name, pages.Roles.member)
  await members.joinGroup(test, data.users[2].name, data.groups[1].name, pages.Roles.manager)
  await members.joinGroup(test, data.users[3].name, data.groups[1].name, pages.Roles.manager)
  await pages.checkNoClientError(test)
})

test('Check group count', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[2])
  await organisations.selectOrganisation(test, data.users[0].name)
  await members.clickToolbar(test, members.getToolbarEntry())
  await groups.clickTabBar(test, groups.getTabBarEntry())
  await groups.checkGroupsCount(test, 2)
  await pages.checkNoClientError(test) 
})

test('Remove member from group', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await members.clickToolbar(test, members.getToolbarEntry())
  await members.leaveGroup(test, data.users[1].name, data.groups[0].name)
  await members.leaveGroup(test, data.users[2].name, data.groups[0].name)
  await members.leaveGroup(test, data.users[2].name, data.groups[1].name)
  await members.leaveGroup(test, data.users[3].name, data.groups[1].name)
  await pages.checkNoClientError(test) 
})

test('Delete group', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await groups.clickToolbar(test, groups.getToolbarEntry())
  await groups.clickTabBar(test, groups.getTabBarEntry())
  await groups.deleteGroups(test, data.groups)
  await pages.checkNoClientError(test) 
})

test('Clear context', async test => {
  await users.unregisterUsers(test, data.users)
  await pages.checkNoClientError(test) 
})
