// Page models
import * as pages from './page-models'

fixture `Basic`// declare the fixture
  .page `${pages.getUrl()}`  // specify the start page
  .afterEach(pages.checkNoClientError)  // check for console error messages
  .beforeEach(async test => await pages.mockLocationAPI()) // mock geolocation

const app = new pages.ApplicationLayout()
const auth = new pages.Authentication()

test('Login as default user', async test => {
  await auth.doLogIn(test, { email: 'kalisio@kalisio.xyz', password: 'kalisio' })
})
