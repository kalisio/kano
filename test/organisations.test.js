// Page models
import * as pages from './page-models'

fixture `Organisations management`// declare the fixture
  .page `http://localhost:8080`  // specify the start page

const auth = new pages.Authentication()
const organisations = new pages.Organisations()

test
.before(async test => await auth.logIn(test))
('Default organisation', async test => {
  const orgPanel = await organisations.orgPanel.getVue()

  // We should have at least a private org
  await test.expect(orgPanel.state.items.length).eql(1, 'Private organisation should be created')
})
.after(async test => await auth.logOut(test))
