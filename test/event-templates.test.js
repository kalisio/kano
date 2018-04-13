// Page models
import * as pages from './page-models'

fixture`EventTemplates`// declare the fixture
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
const templates = new pages.EventTemplates()

const data = {
  user: { name: 'Templates owner', email: 'tempaltes-owner@kalisio.xyz', password: 'user' },
  templates: [
    { name: 'Templates one', description: 'A first template without a workflow' },
    { name: 'Templates two', description: 'A second template with a workflow' }
  ]
}

test.page`${pages.getUrl('register')}`
('Users registration', async test => {
  await auth.signIn(test, data.user)
})

test('Create template', async test => {
  await auth.logInAndCloseSignupAlert(test, data.user)
  await organisations.selectOrganisation(test, data.user.name)
  await templates.clickToolbar(test, templates.getToolbarEntry())
  await templates.clickTabBar(test, templates.getTabBarEntry())
  await templates.createTemplate(test, data.templates[0])
  await templates.checkTemplatesCount(test, 1)
})

test('Copy template', async test => {
  await auth.logInAndCloseSignupAlert(test, data.user)
  await organisations.selectOrganisation(test, data.user.name)
  await templates.clickToolbar(test, templates.getToolbarEntry())
  await templates.clickTabBar(test, templates.getTabBarEntry())
  await templates.copyTemplate(test, data.templates[0].name, 'Copy of ' + data.templates[0].name)
  await templates.checkTemplatesCount(test, 2)
})

test('Update template description', async test => {
  await auth.logInAndCloseSignupAlert(test, data.user)
  await organisations.selectOrganisation(test, data.user.name)
  await templates.clickToolbar(test, templates.getToolbarEntry())
  await templates.clickTabBar(test, templates.getTabBarEntry())
  await templates.updateTemplateDescription(test, 'Copy of ' + data.templates[0].name, 'This is a copy of the template ' + data.templates[0].name)
})

test('Delete template', async test => {
  await auth.logInAndCloseSignupAlert(test, data.user)
  await organisations.selectOrganisation(test, data.user.name)
  await templates.clickToolbar(test, templates.getToolbarEntry())
  await templates.clickTabBar(test, templates.getTabBarEntry())
  await templates.deleteTemplate(test, data.templates[0].name)
  await templates.checkTemplatesCount(test, 1)
})

test('Clean registrated users', async test => {
  await auth.logInAndCloseSignupAlert(test, data.user)
  await organisations.deleteOrganisation(test, data.user.name)
  await account.removeAccount(test, data.user.name)
})
