import _ from 'lodash'
import fs from 'fs-extra'
import path from 'path'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import server from '../src/main'

describe('kano', () => {
  let expressServer, app, userService, authorisationService, catalogService, featuresService,
  measureLayer, stationsService, observationsService, userObject, managerObject

  before(() => {
    chailint(chai, util)
  })

  it('is ES6 compatible', () => {
    expect(typeof server).to.equal('object')
  })

  it('initialize the server', async () => {
    expressServer = await server.run()
    app = server.app
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

  it('creates a test user', async () => {
    userObject = await userService.create({ email: 'test-user@test.org', name: 'test-user' }, { checkAuthorisation: true })
    const users = await userService.find({ query: { 'profile.name': 'test-user' }, user: userObject, checkAuthorisation: true })
    expect(users.data.length).to.equal(1)
  })

  it('creates a test manager', async () => {
    managerObject = await userService.create({ email: 'test-manager@test.org', name: 'test-manager', catalog: { permissions: 'manager' } }, { checkAuthorisation: true })
    const users = await userService.find({ query: { 'profile.name': 'test-manager' }, user: userObject, checkAuthorisation: true })
    expect(users.data.length).to.equal(1)
  })

  it('users can read built-in layer', async () => {
    const stations = await stationsService.find({ query: {}, user: userObject, checkAuthorisation: true })
    // Returns GeoJson
    expect(stations.type).to.equal('FeatureCollection')
    expect(stations.features.length).to.equal(0)
    const observations = await observationsService.find({ query: {}, user: userObject, checkAuthorisation: true })
    expect(observations.type).to.equal('FeatureCollection')
    expect(observations.features.length).to.equal(0)
  })

  it('users cannot update built-in layer by default', async () => {
    try {
      await stationsService.create({}, { user: userObject, checkAuthorisation: true })
    } catch (error) {
      expect(error).toExist()
      expect(error.name).to.equal('Forbidden')
    }
  })

  it('managers can authorize user on built-in layer', async () => {
    const abilities = await authorisationService.getAbilities(managerObject)
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
    let stations = require('./data/teleray.stations.json')
    await stationsService.create(stations, { user: userObject, checkAuthorisation: true })
    let observations = require('./data/teleray.observations.json')
    await observationsService.create(observations, { user: userObject, checkAuthorisation: true })
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

  it('removes test users', async () => {
    await userService.remove(userObject._id, { user: userObject, checkAuthorisation: true })
    let users = await userService.find({ query: { name: userObject.name }, user: userObject, checkAuthorisation: true })
    expect(users.data.length).to.equal(0)
    await userService.remove(managerObject._id, { user: managerObject, checkAuthorisation: true })
    users = await userService.find({ query: { name: managerObject.name }, user: managerObject, checkAuthorisation: true })
    expect(users.data.length).to.equal(0)
  })
  // Let enough time to process
    .timeout(5000)

  // Cleanup
  after(async () => {
    if (expressServer) await expressServer.close()
    fs.emptyDirSync(path.join(__dirname, 'logs'))
    await app.db.instance.dropDatabase()
    await app.db.disconnect()
  })
})
