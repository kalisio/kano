import { Selector } from 'testcafe' // first import testcafe selectors
import VueSelector from 'testcafe-vue-selectors'

fixture `Login`// declare the fixture
  .page `http://localhost:8080`  // specify the start page

test('Local login', async test => {
  const emailInput = VueSelector('k-email-field')
  const passwordInput = VueSelector('k-password-field')
  const submit = VueSelector('q-btn').nth(2)

  await test
    .typeText(emailInput, 'kalisio@kalisio.xyz')
    .typeText(passwordInput, 'kalisio')
    .click(submit)
    // Need this so that dynamic components are loaded
    .wait(5000)

  let orgPanel = VueSelector('k-organisations-panel')
  orgPanel = await orgPanel.getVue()
  
  await test.expect(orgPanel.state.items.length).eql(1)
})
