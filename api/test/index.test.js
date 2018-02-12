import fs from 'fs-extra'
import path from 'path'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import server from '../src/main'

describe('kApp', () => {
  let userService, userObject, orgService, authorisationService, devicesService, pusherService, sns, orgObject
  let now = new Date()
  let logFilePath = path.join(__dirname, 'logs', 'kApp-' + now.toISOString().slice(0, 10) + '.log')
  const device = {
    registrationId: 'myfakeId',
    platform: 'ANDROID'
  }

  before(() => {
    chailint(chai, util)
  })

  it('is CommonJS compatible', () => {
    expect(typeof server).to.equal('object')
  })

  it('initialize the server', (done) => {
    server.run().then(_ => done())
  })
  // Let enough time to process
  .timeout(5000)

  it('registers the services', () => {
    userService = server.app.getService('users')
    expect(userService).toExist()
    orgService = server.app.getService('organisations')
    expect(orgService).toExist()
    authorisationService = server.app.getService('authorisations')
    expect(authorisationService).toExist()
    devicesService = server.app.getService('devices')
    expect(devicesService).toExist()
    pusherService = server.app.getService('pusher')
    expect(pusherService).toExist()
  })

  it('setup access to SNS', () => {
    // For now we only test 1 platform, should be sufficient due to SNS facade
    sns = pusherService.getSnsApplication(device.platform)
    expect(sns).toExist()
  })

  it('creates a user with its org', (done) => {
    userService.create({
      email: 'test@test.org',
      password: 'test-password',
      name: 'test-user'
    })
    .then(user => {
      userObject = user
      return devicesService.update(device.registrationId, device, { user })
    })
    .then(device => {
      return userService.get(userObject._id)
    })
    .then(user => {
      // Update user with its device
      userObject = user
      expect(userObject.devices).toExist()
      expect(userObject.devices.length > 0).beTrue()
      expect(userObject.devices[0].registrationId).to.equal(device.registrationId)
      expect(userObject.devices[0].platform).to.equal(device.platform)
      expect(userObject.devices[0].arn).toExist()
      return orgService.find({ query: {}, user: userObject })
    })
    .then(orgs => {
      expect(orgs.data.length > 0).beTrue()
      orgObject = orgs.data[0]
      expect(orgObject.name).to.equal('test-user')
      expect(orgObject.topics).toExist()
      expect(Object.keys(orgObject.topics).length > 0).beTrue()
      done()
    })
    /*
    sns.once('subscribed', (subscriptionArn, endpointArn, topicArn) => {
      expect(orgObject.topics[device.platform]).to.equal(topicArn)
      expect(userObject.devices[0].arn).to.equal(endpointArn)
      done()
    })
    */
  })
  // Let enough time to process
  .timeout(15000)

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

  it('removes a user', (done) => {
    userService.remove(userObject._id, { user: userObject })
    .then(user => {
      return userService.find({ query: { name: 'test-user' } })
    })
    .then(users => {
      expect(users.data.length === 0).beTrue()
      done()
    })
    // We need to synchronize 2 events
    /*
    let userDeleted = false
    let unsubscribed = false
    sns.once('userDeleted', endpointArn => {
      expect(userObject.devices[0].arn).to.equal(endpointArn)
      userDeleted = true
      if (userDeleted && unsubscribed) done()
    })
    sns.once('unsubscribed', (subscriptionArn) => {
      // We do not store subscription ARN
      unsubscribed = true
      if (userDeleted && unsubscribed) done()
    })
    */
  })
  // Let enough time to process
  .timeout(15000)

  // Cleanup
  after(() => {
    fs.emptyDirSync(path.join(__dirname, 'logs'))
    server.app.db.instance.dropDatabase()
  })
})
