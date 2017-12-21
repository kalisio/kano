// Page models
import * as pages from './page-models'

fixture `Account management`// declare the fixture
  .page `http://localhost:8080`  // specify the start page

const auth = new pages.Authentication()
const account = new pages.Account()

test
.before(async test => await auth.logIn(test))
('Edit profile', async test => {
  await account.editProfile(test, { name: 'toto', phone: '0123456789'})

  const identityPanel = await account.identityPanel.getVue()
  // We should have at least a changed user name
  await test.expect(identityPanel.state.name).eql('toto', 'User name should be changed')
})
.after(async test => await auth.logOut(test))
