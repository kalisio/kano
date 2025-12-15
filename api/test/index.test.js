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
  let server, expressServer, app, client, userService, authorisationService, catalogService, featuresService,
    measureLayer, stationsService, observationsService, userObject, managerObject

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
    catalogService = app.getService('catalog')
    expect(catalogService).toExist()
    featuresService = app.getService('features')
    expect(featuresService).toExist()
  })

  it('retrieve built-in layers and services', async () => {
    const defaultLayers = await catalogService.find({ query: {} })
    expect(defaultLayers.data.length).to.equal(2)
    measureLayer = _.find(defaultLayers.data, (layer) => layer.service)
    expect(measureLayer).toExist()
    stationsService = app.getService(measureLayer.probeService)
    expect(stationsService).toExist()
    observationsService = app.getService(measureLayer.service)
    expect(observationsService).toExist()
  })
  // Let enough time to process
    .timeout(5000)

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

  it('users can read built-in layer', async () => {
    const stations = await stationsService.find({ query: {}, user: userObject, checkAuthorisation: true })
    // Returns GeoJson
    expect(stations.type).to.equal('FeatureCollection')
    expect(stations.features.length).to.equal(0)
    const observations = await observationsService.find({ query: {}, user: userObject, checkAuthorisation: true })
    expect(observations.type).to.equal('FeatureCollection')
    expect(observations.features.length).to.equal(0)
  })
  // Let enough time to process
    .timeout(5000)

  it('users cannot update built-in layer by default', async () => {
    try {
      await stationsService.create({}, { user: userObject, checkAuthorisation: true })
    } catch (error) {
      expect(error).toExist()
      expect(error.name).to.equal('Forbidden')
    }
  })

  it('managers can authorize user on built-in layer', async () => {
    await authorisationService.getAbilities(managerObject)
    const authorisation = await authorisationService.create({
      scope: 'layers',
      permissions: 'manager',
      subjects: userObject._id.toString(),
      subjectsService: 'users',
      resource: 'Layers.TELERAY',
      resourcesService: 'catalog'
    }, {
      user: managerObject,
      checkAuthorisation: true
    })
    expect(authorisation).toExist()
    // Update user with his layer
    userObject = await userService.get(userObject._id.toString(), { checkAuthorisation: true, user: userObject })
    expect(userObject.layers).toExist()
    expect(userObject.layers.length).to.equal(1)
    expect(userObject.layers[0].name).to.equal('Layers.TELERAY')
    expect(userObject.layers[0].permissions).to.equal('manager')
  })
  // Let enough time to process
    .timeout(10000)

  it('authorized user can feed authorized built-in layers', async () => {
    const stations = fs.readJsonSync(path.join(__dirname, 'data', 'teleray.stations.json'))
    await stationsService.create(stations, { user: userObject, checkAuthorisation: true })
    const observations = fs.readJsonSync(path.join(__dirname, 'data', 'teleray.observations.json'))
    await observationsService.create(observations, { user: userObject, checkAuthorisation: true })
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
    expect(user.layers).toExist()
    // Should not list others users in case of requests with identified user
    const response = await client.service(app.get('apiPath') + '/users').find({ query: {} })
    let users = response.data
    expect(users.length).to.equal(1)
    user = users[0]
    expect(user._id).to.equal(userObject._id.toString())
    expect(user.password).beUndefined()
    expect(user.previousPasswords).beUndefined()
    expect(user.catalog).beUndefined()
    expect(user.layers).toExist()
    // Should not get others users in case of requests with identified user
    try {
      user = await client.service(app.get('apiPath') + '/users').get(managerObject._id.toString())
      assert.fail('unauthorized user information disclosure should raise on error')
    } catch (error) {
      expect(error).toExist()
      expect(error.name).to.equal('MethodNotAllowed')
    }
  })

  it('managers can remove user authorisation on built-in layer', async () => {
    const authorisation = await authorisationService.remove('Layers.TELERAY', {
      query: {
        scope: 'layers',
        subjects: userObject._id.toString(),
        subjectsService: 'users',
        resourcesService: 'catalog'
      },
      user: managerObject,
      checkAuthorisation: true
    })
    expect(authorisation).toExist()
    // Update manager without his layer
    userObject = await userService.get(userObject._id.toString(), { checkAuthorisation: true, user: userObject })
    expect(userObject.layers).toExist()
    expect(userObject.layers.length).to.equal(0)
  })
  // Let enough time to process
    .timeout(5000)

  it('unauthorized user cannot feed built-in layers', async () => {
    try {
      await stationsService.create({}, { user: userObject, checkAuthorisation: true })
      assert.fail('unauthorized user create should raise on error')
    } catch (error) {
      expect(error).toExist()
      expect(error.name).to.equal('Forbidden')
    }
  })

  it('users can read catalog', async () => {
    const layers = await catalogService.find({ query: {}, user: userObject, checkAuthorisation: true })
    expect(layers.data.length).to.equal(2)
  })

  it('users cannot update catalog', async () => {
    try {
      await catalogService.create({}, { user: userObject, checkAuthorisation: true })
      assert.fail('unauthorized user create should raise on error')
    } catch (error) {
      expect(error).toExist()
      expect(error.name).to.equal('Forbidden')
    }
  })

  it('managers can update catalog', async () => {
    let layer = await catalogService.create({ name: 'My Layer', type: 'OverlayLayer' }, { user: managerObject, checkAuthorisation: true })
    expect(layer.name).to.equal('My Layer')
    layer = await catalogService.patch(layer._id, { name: 'My Renamed Layer', type: 'OverlayLayer' }, { user: managerObject, checkAuthorisation: true })
    expect(layer.name).to.equal('My Renamed Layer')
    let layers = await catalogService.find({ query: {}, user: managerObject, checkAuthorisation: true })
    expect(layers.data.length).to.equal(3)
    await catalogService.remove(layer._id, { user: managerObject, checkAuthorisation: true })
    layers = await catalogService.find({ query: {}, user: managerObject, checkAuthorisation: true })
    expect(layers.data.length).to.equal(2)
  })
  // Let enough time to process
    .timeout(5000)

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
