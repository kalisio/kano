// Page models
import * as pages from './page-models'

fixture `Account management`// declare the fixture
  .page `http://localhost:8080`  // specify the start page

const auth = new pages.Authentication()
const account = new pages.Account()

test.skip
.before(async test => await auth.doLogIn(test))
('Edit profile', async test => {
  await account.doEditProfile(test, { name: 'toto', phone: '0123456789' })

  const identityPanel = await account.identityPanel.getVue()
  // We should have at least a changed user name
  await test.expect(identityPanel.state.name).eql('toto', 'User name should be changed')
})
.after(async test => await auth.doLogOut(test))

test.skip
.before(async test => await auth.doLogIn(test))
('Edit password', async test => {
  await account.doUpdatePassword(test, { password: 'kalisio', newPassword: 'kalisio' })
  // We should login with new credentials
  await auth.doLogIn(test)
})
.after(async test => await auth.doLogOut(test))

test.skip
.before(async test => await auth.doLogIn(test))
('Edit email', async test => {
  await account.doUpdateEmail(test, { password: 'kalisio', newEmail: 'kalisio@kalisio.com' })
  // We should login with new email
  await auth.doLogIn(test)
})
.after(async test => await auth.doLogOut(test))

test.skip
.before(async test => await auth.doLogIn(test))
('Delete account', async test => {
  await account.doRemoveAccount(test, 'toto')

  let screen = await auth.screen.getVue()
  // The home page should be the logout screen
  await test.expect(screen.props.title).ok('Your are now logged out')
  // And we cannot login anymore
  await auth.doLogIn(test)
})

