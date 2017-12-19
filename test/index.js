import { Selector } from 'testcafe' // first import testcafe selectors
import VueSelector from 'testcafe-vue-selectors'

fixture `Login`// declare the fixture
  .page `http://localhost:8080`  // specify the start page

//then create a test and place your code there
test('My first test', async t => {
  const emailInput = VueSelector('k-email-field')
  const passwordInput = VueSelector('k-password-field')
  const submit = VueSelector('q-btn').nth(2)
  await t
    .typeText(emailInput, 'kalisio@kalisio.com')
    .typeText(passwordInput, 'kalisio')
    .click(submit)

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
})
