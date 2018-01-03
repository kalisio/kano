import { Role } from 'testcafe'
import Authentication from './authentication'

const auth = new Authentication()

const regularUser = Role('http://localhost:8080/#/login', async test => {
  await auth.doLogIn(test)
})
