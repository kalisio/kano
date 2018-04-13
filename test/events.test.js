// Page models
import { Selector } from 'testcafe'
import * as pages from './page-models'

fixture`Events`// declare the fixture
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
const groups = new pages.Groups()
const templates = new pages.EventTemplates()
const events = new pages.Events()

const data = {
  users: [
    { name: 'Events owner', email: 'events-owner@kalisio.xyz', password: 'owner' },
    { name: 'Events manager', email: 'events-manager@kalisio.xyz', password: 'manager' },
    { name: 'Events member', email: 'events-member@kalisio.xyz', password: 'member' }
  ],
  group: { name: 'Events group', description: 'A group' },
  template: { name: 'Events template', description: 'An event template' },
  events: [
    { name: 'Events member', participants: 'Events manager' },
    { name: 'Events group', participants: 'Events group' },
    { name: 'Events tag', participants: 'fireman' }
  ]
}

test.page`${pages.getUrl('login')}`
('Setup context', async test => {
  await users.registerUsers(test, data.users)
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await members.clickToolbar(test, members.getToolbarEntry())
  await members.addMember(test, data.users[1].name, pages.Roles.manager)
  await members.tagMember(test, data.users[1].name, 'fireman')
  await members.addMember(test, data.users[2].name, pages.Roles.member)
  await groups.clickTabBar(test, groups.getTabBarEntry())
  await groups.createGroup(test, data.group)
  await templates.clickToolbar(test, templates.getToolbarEntry())
  await templates.clickTabBar(test, templates.getTabBarEntry())
  await templates.createTemplate(test, data.template)
})

test('Create events', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await events.clickToolbar(test, events.getToolbarEntry())
  for (let i in data.events) await events.createEvent(test, data.template.name, data.events[i])
  await events.checkEventsCount(test, data.events.length)
})

test('Delete event', async test => {
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await events.clickToolbar(test, events.getToolbarEntry())
  for (let i in data.events) await events.deleteEvent(test, data.events[i].name)
  await events.checkEventsCount(test, 0)
})

test('Clear context', async test => {
  // Remove the created group
  await auth.logInAndCloseSignupAlert(test, data.users[0])
  await organisations.selectOrganisation(test, data.users[0].name)
  await members.clickToolbar(test, members.getToolbarEntry())
  await groups.clickTabBar(test, groups.getTabBarEntry())
  await groups.deleteGroup(test, data.group.name)
  await auth.logOut(test)
  await test.click(Selector('#login-link'))
  // Unregister the users
  await users.unregisterUsers(test, data.users)
})
