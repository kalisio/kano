import { Role } from 'testcafe'
import Authentication from './authentication'

const auth = new Authentication()

Role('http://localhost:8080/#/login', async test => {
  await auth.logIn(test)
})
