import _ from 'lodash'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import feathers from '@feathersjs/client'
import io from 'socket.io-client'
import chai, { util, expect, assert } from 'chai'
import chailint from 'chai-lint'
import { createServer, runServer } from '../src/server.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

describe('kano', () => {
  let server, expressServer, app, client, userService, authorisationService, featuresService,
    userObject, managerObject

  before(() => {
    chailint(chai, util)
  })

  it('is ES module compatible', () => {
    expect(typeof createServer).to.equal('function')
  })

  it('initialize the server/client', async () => {
    server = createServer()
    expressServer = await runServer(server)
    app = server.app
    client = feathers()
    const socket = io(app.get('domain'), {
      transports: ['websocket'],
      path: app.get('apiPath') + 'ws'
    })
    client.configure(feathers.socketio(socket))
    client.configure(feathers.authentication({ path: app.get('apiPath') + '/authentication' }))
  })
  // Let enough time to process
    .timeout(10000)

  it('registers the services', () => {
    userService = app.getService('users')
    expect(userService).toExist()
    authorisationService = app.getService('authorisations')
    expect(authorisationService).toExist()
    featuresService = app.getService('features')
    expect(featuresService).toExist()
    // catalog is no longer a local service — it is provided by katalog via feathers-distributed
    // catalog-specific tests live in katalog.test.js
    expect(app.getService('catalog')).beNull()
  })

  it('creates a test user', async () => {
    userObject = await userService.create({
      email: 'test-user@test.org',
      password: 'Pass;word1',
      name: 'test-user'
    }, { checkAuthorisation: true })
    const users = await userService.find({ query: { 'profile.name': 'test-user' }, user: userObject, checkAuthorisation: true })
    expect(users.data.length).to.equal(1)
  })
  // Let enough time to process
    .timeout(5000)

  it('creates a test manager', async () => {
    managerObject = await userService.create({
      email: 'test-manager@test.org',
      name: 'test-manager',
      catalog: { permissions: 'manager' }
    }, { checkAuthorisation: true })
    const users = await userService.find({ query: { 'profile.name': 'test-manager' }, user: userObject, checkAuthorisation: true })
    expect(users.data.length).to.equal(1)
  })
  // Let enough time to process
    .timeout(5000)

  it('connects user client', async () => {
    const response = await client.authenticate({
      strategy: 'local',
      email: 'test-user@test.org',
      password: 'Pass;word1'
    })
    expect(response.user._id).to.equal(userObject._id.toString())
  })
  // Let enough time to process
    .timeout(5000)

  it('cannot update users from external clients', async () => {
    try {
      await client.service(app.get('apiPath') + '/users').update(userObject._id.toString(), { name: 'new name' })
      assert.fail('unauthorized user update should raise on error')
    } catch (error) {
      expect(error).toExist()
      expect(error.name).to.equal('MethodNotAllowed')
    }
  })

  it('cannot update user permissions without using authorisations service', async () => {
    try {
      await client.service(app.get('apiPath') + '/users').patch(userObject._id.toString(), { catalog: { permissions: 'manager' } })
      assert.fail('unauthorized user permission update should raise on error')
    } catch (error) {
      expect(error).toExist()
      expect(error.name).to.equal('BadRequest')
    }
  })
  // Let enough time to process
    .timeout(5000)

  it('cannot disclose user information', async () => {
    // Should not retrieve internal user secret information like password in any case
    let user = await client.service(app.get('apiPath') + '/users').get(userObject._id.toString())
    expect(user._id).to.equal(userObject._id.toString())
    expect(user.password).beUndefined()
    expect(user.previousPasswords).beUndefined()
    expect(user.catalog).beUndefined()
    // Should not list others users in case of requests with identified user
    const response = await client.service(app.get('apiPath') + '/users').find({ query: {} })
    let users = response.data
    expect(users.length).to.equal(1)
    user = users[0]
    expect(user._id).to.equal(userObject._id.toString())
    expect(user.password).beUndefined()
    expect(user.previousPasswords).beUndefined()
    expect(user.catalog).beUndefined()
    // Should not get others users in case of requests with identified user
    try {
      user = await client.service(app.get('apiPath') + '/users').get(managerObject._id.toString())
      assert.fail('unauthorized user information disclosure should raise on error')
    } catch (error) {
      expect(error).toExist()
      expect(error.name).to.equal('MethodNotAllowed')
    }
  })

  it('removes test users', async () => {
    await userService.remove(userObject._id, { user: userObject, checkAuthorisation: true })
    let users = await userService.find({ query: { 'profile.name': _.get(userObject, 'profile.name') }, user: userObject, checkAuthorisation: true })
    expect(users.data.length).to.equal(0)
    await userService.remove(managerObject._id, { user: managerObject, checkAuthorisation: true })
    users = await userService.find({ query: { 'profile.name': _.get(managerObject, 'profile.name') }, user: managerObject, checkAuthorisation: true })
    expect(users.data.length).to.equal(0)
  })
  // Let enough time to process
    .timeout(5000)

  // Cleanup
  after(async () => {
    if (expressServer) await expressServer.close()
    fs.emptyDirSync(path.join(__dirname, 'logs'))
    await app.db.instance.dropDatabase()
    if (app.db.db('data')) await app.db.db('data').dropDatabase()
    await app.db.disconnect()
  })
})
