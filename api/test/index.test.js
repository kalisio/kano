import fs from 'fs-extra'
import path from 'path'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import server from '../src/main'

describe('aktnmap', () => {
  let userService, userObject, orgService, orgObject, authorisationService, devicesService, pusherService, sns,
    memberService, tagService, tagObject, groupService, groupObject
  let now = new Date()
  let logFilePath = path.join(__dirname, 'logs', 'aktnmap-' + now.toISOString().slice(0, 10) + '.log')
  const device = {
    registrationId: 'myfakeId',
    platform: 'ANDROID',
    uuid: 'id'
  }

  before(() => {
    chailint(chai, util)

    // Add hooks for contextual services
    server.app.on('service', service => {
      if (service.name === 'members') {
        memberService = service
      } else if (service.name === 'tags') {
        tagService = service
      } else if (service.name === 'groups') {
        groupService = service
      }
    })
  })

  it('is CommonJS compatible', () => {
    expect(typeof server).to.equal('object')
  })

  it('initialize the server', (done) => {
    server.run().then(() => done())
  })
  // Let enough time to process
  .timeout(10000)

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

  it('creates a user with his org', () => {
    let operation = userService.create({
      email: 'test@test.org',
      password: 'test-password',
      name: 'test-user'
    }, { checkAuthorisation: true })
    .then(user => {
      userObject = user
      return orgService.find({ query: {}, user: userObject, checkAuthorisation: true })
    })
    .then(orgs => {
      expect(orgs.data.length > 0).beTrue()
      orgObject = orgs.data[0]
      expect(orgObject.name).to.equal('test-user')
      expect(orgObject.topics).toExist()
      expect(Object.keys(orgObject.topics).length > 0).beTrue()
      return devicesService.update(device.registrationId, device, { user: userObject, checkAuthorisation: true })
    })
    .then(device => {
      return userService.get(userObject._id, { user: userObject, checkAuthorisation: true })
    })
    .then(user => {
      // Update user with its device
      userObject = user
      expect(userObject.devices).toExist()
      expect(userObject.devices.length === 1).beTrue()
      expect(userObject.devices[0].registrationId).to.equal(device.registrationId)
      expect(userObject.devices[0].platform).to.equal(device.platform)
      expect(userObject.devices[0].arn).toExist()
    })
    let event = new Promise((resolve, reject) => {
      sns.once('subscribed', (subscriptionArn, endpointArn, topicArn) => {
        expect(orgObject.topics[device.platform]).to.equal(topicArn)
        expect(userObject.devices[0].arn).to.equal(endpointArn)
        resolve()
      })
    })
    return Promise.all([operation, event])
  })
  // Let enough time to process
  .timeout(10000)

  it('errors appear in logs', (done) => {
    userService.create({
      email: 'test@test.org',
      password: 'test-password',
      name: 'test-user'
    }, { checkAuthorisation: true })
    .catch(() => {
      let log = 'duplicate key error collection: kalisio-test.users'
      // FIXME: need to let some time to proceed with log file
      // Didn't find a better way since fs.watch() does not seem to work...
      setTimeout(() => {
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

  it('add user tags', () => {
    let operation = memberService.patch(userObject._id.toString(), { // We need at least devices for subscription
      tags: [{ value: 'test', scope: 'members' }],
      devices: userObject.devices
    }, { user: userObject, previousItem: userObject, checkAuthorisation: true }) // Because we bypass populate hooks give the previousItem directly
    .then(user => {
      userObject = user
      expect(userObject.tags).toExist()
      expect(userObject.tags.length > 0).beTrue()
    })
    let event = new Promise((resolve, reject) => {
      sns.once('subscribed', (subscriptionArn, endpointArn, topicArn) => {
        tagService.find({ query: { value: 'test', scope: 'members' }, paginate: false })
        .then(tags => {
          tagObject = tags[0]
          expect(tagObject.topics[device.platform]).to.equal(topicArn)
          expect(userObject.devices[0].arn).to.equal(endpointArn)
          resolve()
        })
      })
    })
    return Promise.all([operation, event])
  })
  // Let enough time to process
  .timeout(10000)

  it('creates an organisation group', () => {
    let operation = groupService.create({ name: 'test-group' }, { user: userObject, checkAuthorisation: true })
    .then(() => {
      return groupService.find({ query: { name: 'test-group' }, user: userObject, checkAuthorisation: true })
    })
    .then(groups => {
      expect(groups.data.length > 0).beTrue()
      groupObject = groups.data[0]
      expect(groupObject.name).to.equal('test-group')
    })
    let event = new Promise((resolve, reject) => {
      sns.once('subscribed', (subscriptionArn, endpointArn, topicArn) => {
        groupService.find({ query: { name: 'test-group' }, paginate: false, user: userObject, checkAuthorisation: true })
        .then(groups => {
          groupObject = groups[0]
          expect(groupObject.topics[device.platform]).to.equal(topicArn)
          expect(userObject.devices[0].arn).to.equal(endpointArn)
          resolve()
        })
      })
    })
    return Promise.all([operation, event])
  })
  // Let enough time to process
  .timeout(10000)

  it('updates the user device', () => {
    const previousDevice = userObject.devices[0]
    const newDevice = Object.assign({}, device)
    newDevice.registrationId = 'mynewfakeId'
    let operation = devicesService.update(newDevice.registrationId, newDevice, { user: userObject, checkAuthorisation: true })
    .then(device => {
      return userService.get(userObject._id, { user: userObject, checkAuthorisation: true })
    })
    .then(user => {
      // Update user with its new device
      userObject = user
      expect(userObject.devices).toExist()
      expect(userObject.devices.length === 1).beTrue()
      expect(userObject.devices[0].registrationId).to.equal(newDevice.registrationId)
      expect(userObject.devices[0].platform).to.equal(newDevice.platform)
      expect(userObject.devices[0].arn).toExist()
    })
    let events = new Promise((resolve, reject) => {
      // This should subscribe the new device to all topics: org, group, tag
      const expectedSubscriptions = 3
      let subscriptions = 0
      // This should unsubscribe old device to all topics: org, group, tag
      const expectedUnsubscriptions = 3
      let unsubscriptions = 0
      // This should unregister the old device
      let userDeleted = false
      sns.on('subscribed', (subscriptionArn, endpointArn, topicArn) => {
        expect(userObject.devices[0].arn).to.equal(endpointArn)
        subscriptions++
        if (userDeleted && (subscriptions === expectedSubscriptions) && (unsubscriptions === expectedUnsubscriptions)) {
          sns.removeAllListeners('subscribed')
          resolve()
        }
      })
      sns.on('unsubscribed', (subscriptionArn) => {
        // We do not store subscription ARN
        unsubscriptions++
        if (userDeleted && (subscriptions === expectedSubscriptions) && (unsubscriptions === expectedUnsubscriptions)) {
          sns.removeAllListeners('unsubscribed')
          resolve()
        }
      })
      sns.once('userDeleted', endpointArn => {
        expect(previousDevice.arn).to.equal(endpointArn)
        userDeleted = true
        if (userDeleted && (subscriptions === expectedSubscriptions) && (unsubscriptions === expectedUnsubscriptions)) resolve()
      })
    })
    return Promise.all([operation, events])
  })
  // Let enough time to process
  .timeout(10000)

  it('removes an organisation group', () => {
    let operation = groupService.remove(groupObject._id, { user: userObject, checkAuthorisation: true })
    .then(() => {
      return groupService.find({ query: { name: groupObject.name }, user: userObject, checkAuthorisation: true })
    })
    .then(groups => {
      expect(groups.data.length === 0).beTrue()
    })
    let event = new Promise((resolve, reject) => {
      sns.once('unsubscribed', (subscriptionArn) => {
        // We do not store subscription ARN
        resolve()
      })
    })
    return Promise.all([operation, event])
  })
  // Let enough time to process
  .timeout(10000)

  it('remove user tags', () => {
    let operation = memberService.patch(userObject._id.toString(), {
      tags: []
    }, { user: userObject, previousItem: userObject, checkAuthorisation: true }) // Because we bypass populate hooks give the previousItem directly
    .then(user => {
      userObject = user
      expect(userObject.tags).toExist()
      expect(userObject.tags.length === 0).beTrue()
    })
    let event = new Promise((resolve, reject) => {
      sns.once('unsubscribed', (subscriptionArn) => {
        // We do not store subscription ARN
        resolve()
      })
    })
    return Promise.all([operation, event])
  })
  // Let enough time to process
  .timeout(10000)

  it('restore user tags, group to prepare testing cleanup', () => {
    return memberService.patch(userObject._id.toString(), { // We need at least devices for subscription
      tags: [{ value: 'test', scope: 'members' }],
      devices: userObject.devices
    }, { user: userObject, previousItem: userObject, checkAuthorisation: true }) // Because we bypass populate hooks give the previousItem directly
    .then(user => {
      return groupService.create({ name: 'test-group' }, { user: userObject, checkAuthorisation: true })
    })
    .then(group => {
      return userService.get(userObject._id, { user: userObject, checkAuthorisation: true })
    })
    .then(user => {
      // Update user with its device
      userObject = user
    })
  })
  // Let enough time to process
  .timeout(10000)

  it('removes the user from his organisation', () => {
    let operation = authorisationService.remove(orgObject._id, {
      query: {
        scope: 'organisations',
        subjects: userObject._id.toString(),
        subjectsService: orgObject._id.toString() + '/members',
        resourcesService: 'organisations'
      },
      user: userObject,
      checkAuthorisation: true,
      force: true // By pass checks for tests
    })
    .then(authorisation => {
      expect(authorisation).toExist()
      return userService.get(userObject._id, { user: userObject, checkAuthorisation: true })
    })
    .then(user => {
      // Update user with his new permissions
      userObject = user
      expect(userObject.organisations).toExist()
      expect(userObject.organisations.length === 0).beTrue()
      expect(userObject.tags).toExist()
      expect(userObject.tags.length === 0).beTrue()
      expect(userObject.groups).toExist()
      expect(userObject.groups.length === 0).beTrue()
    })
    let events = new Promise((resolve, reject) => {
      // This should unsubscribe device to all topics: org, group, tag
      const expectedUnsubscriptions = 3
      let unsubscriptions = 0
      sns.on('unsubscribed', (subscriptionArn) => {
        // We do not store subscription ARN
        unsubscriptions++
        if (unsubscriptions === expectedUnsubscriptions) {
          sns.removeAllListeners('unsubscribed')
          resolve()
        }
      })
    })
    return Promise.all([operation, events])
  })
  // Let enough time to process
  .timeout(20000)

  it('removes the user and his organisation', () => {
    let operation = userService.remove(userObject._id, { user: userObject, checkAuthorisation: true })
    .then(user => {
      return userService.find({ query: {}, checkAuthorisation: true })
    })
    .then(users => {
      expect(users.data.length === 0).beTrue()
      return orgService.remove(orgObject._id, { force: true })
    })
    .then(org => {
      return orgService.find({ query: {} })
    })
    .then(orgs => {
      expect(orgs.data.length === 0).beTrue()
    })
    let event = new Promise((resolve, reject) => {
      // This should unregister the device
      let userDeleted = false
      sns.once('userDeleted', endpointArn => {
        expect(userObject.devices[0].arn).to.equal(endpointArn)
        resolve()
      })
    })
    return Promise.all([operation, event])
  })
  // Let enough time to process
  .timeout(10000)

  // Cleanup
  after(() => {
    fs.emptyDirSync(path.join(__dirname, 'logs'))
    server.app.db.instance.dropDatabase()
  })
})
