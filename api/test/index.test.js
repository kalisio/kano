import fs from 'fs-extra'
import path from 'path'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import server from '../src/main'

describe('kApp', () => {
  let userService, userObject, orgService, orgObject
  let now = new Date()
  let logFilePath = path.join(__dirname, 'logs', 'kApp-' + now.toISOString().slice(0, 10) + '.log')

  before(() => {
    chailint(chai, util)

    return server.run()
  })

  it('is CommonJS compatible', () => {
    expect(typeof server).to.equal('object')
  })

  it('registers the services', () => {
    userService = server.app.getService('users')
    expect(userService).toExist()
    orgService = server.app.getService('organisations')
    expect(orgService).toExist()
  })

  it('creates a user with its org', () => {
    return userService.create({
      email: 'test@test.org',
      password: 'test-password',
      name: 'test-user'
    })
    .then(user => {
      userObject = user
      return orgService.find({ query: {}, user: userObject })
    })
    .then(orgs => {
      expect(orgs.data.length > 0).beTrue()
      orgObject = orgs.data[0]
      expect(orgObject.name).to.equal('test-user')
      // FIXME: when notifications will be added
      //expect(orgObject.topic).toExist()
    })
    .catch(error => console.log(error))
  })

  it('errors appear in logs', (done) => {
    userService.create({
      email: 'test@test.org',
      password: 'test-password',
      name: 'test-user'
    })
    .catch(error => {
      let log = 'duplicate key error collection: kalisio-test.users'
      // FIXME: need to let some time to proceed with log file
      // Didn't find a better way since fs.watch() does not seem to work...
      setTimeout(_ => {
        fs.readFile(logFilePath, 'utf8', (err, content) => {
          expect(err).beNull()
          expect(content.includes(log)).to.equal(true)
          done()
        })
      }, 2500)
    })
  })
  // Let enough time to process
  .timeout(5000)

  // Cleanup
  after(() => {
    fs.emptyDirSync(path.join(__dirname, 'logs'))
    server.app.db.instance.dropDatabase()
  })
})
