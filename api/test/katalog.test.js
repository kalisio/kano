import _ from 'lodash'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { setTimeout as delay } from 'timers/promises'
import express from '@feathersjs/express'
import chai, { util, expect, assert } from 'chai'
import chailint from 'chai-lint'
import { createServer, runServer } from '../src/server.js'
import { createServer as createKatalogServer } from '../../../services-ekosystem/packages/katalog/src/server.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Fast cote settings so feathers-distributed discovers services quickly in tests
const distributionConfig = {
  cote: { helloInterval: 2000, checkInterval: 4000, nodeTimeout: 5000, masterTimeout: 6000 },
  publicationDelay: 3000
}

// feathers-distributed discovery is asynchronous (cote hello/publication cycles), so we
// poll until the remote service shows up rather than relying on a fixed delay.
async function waitForService (app, name, timeout = 25000, interval = 500) {
  const deadline = Date.now() + timeout
  let service = app.getService(name)
  while (!service && Date.now() < deadline) {
    await delay(interval)
    service = app.getService(name)
  }
  return service
}

describe('katalog distribution integration', () => {
  let server, expressServer, app
  let katalogServer, katalogApp
  let userService, authorisationService, configurationsService
  let catalogService, stationsService, observationsService
  let userObject, managerObject, measureLayer

  before(() => {
    chailint(chai, util)
  })

  it('is ES module compatible', () => {
    expect(typeof createServer).to.equal('function')
    expect(typeof createKatalogServer).to.equal('function')
  })

  it('initialize the server', async () => {
    server = createServer()
    expressServer = await runServer(server)
    app = server.app
  }).timeout(10000)

  it('registers core kano services', () => {
    userService = app.getService('users')
    expect(userService).toExist()
    authorisationService = app.getService('authorisations')
    expect(authorisationService).toExist()
    configurationsService = app.getService('configurations')
    expect(configurationsService).toExist()
    // catalog is not yet available — katalog hasn't started yet
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
  }).timeout(5000)

  it('creates a test manager', async () => {
    managerObject = await userService.create({
      email: 'test-manager@test.org',
      name: 'test-manager',
      catalog: { permissions: 'manager' }
    }, { checkAuthorisation: true })
    const users = await userService.find({ query: { 'profile.name': 'test-manager' }, user: userObject, checkAuthorisation: true })
    expect(users.data.length).to.equal(1)
  }).timeout(5000)

  it('initialize the katalog server', async () => {
    katalogServer = createKatalogServer()
    katalogServer.app.set('port', 9100)
    katalogServer.app.set('db', { adapter: 'mongodb', url: 'mongodb://127.0.0.1:27017/katalog-test' })
    const inheritedAuth = katalogServer.app.get('authentication')
    if (inheritedAuth) katalogServer.app.set('authentication', Object.assign({}, inheritedAuth, { entity: null }))
    katalogServer.app.set('distribution', Object.assign({
      key: 'katalog',
      authentication: false,
      services: () => true,
      distributedMethods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
      distributedEvents: ['created', 'updated', 'patched', 'removed'],
      middlewares: { after: express.errorHandler() }
    }, distributionConfig))
    await katalogServer.run()
    katalogApp = katalogServer.app
  }).timeout(30000)

  it('kano discovers the katalog catalog service', async () => {
    catalogService = await waitForService(app, 'catalog')
    expect(catalogService).toExist()
    expect(catalogService.key).to.equal('katalog')
  }).timeout(30000)

  it('retrieves built-in layers and features services from katalog', async () => {
    const result = await catalogService.find({ query: {} })
    expect(result.data.length).to.be.above(0)
    measureLayer = _.find(result.data, layer => layer.service)
    expect(measureLayer).toExist()
    stationsService = await waitForService(app, measureLayer.probeService)
    expect(stationsService).toExist()
    observationsService = await waitForService(app, measureLayer.service)
    expect(observationsService).toExist()
  }).timeout(30000)

  it('users can read catalog', async () => {
    const layers = await catalogService.find({ query: {}, user: userObject, checkAuthorisation: true })
    expect(layers.data.length).to.be.above(0)
  })

  it('users cannot update catalog', async () => {
    try {
      await catalogService.create({ name: 'Unauthorized Layer', type: 'OverlayLayer' }, { user: userObject, checkAuthorisation: true })
      assert.fail('unauthorized catalog create should raise an error')
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
    await catalogService.remove(layer._id, { user: managerObject, checkAuthorisation: true })
    const layers = await catalogService.find({ query: {}, user: managerObject, checkAuthorisation: true })
    expect(layers.data.length).to.be.above(0)
  }).timeout(5000)

  it('users can read features services from katalog', async () => {
    const stations = await stationsService.find({ query: {}, user: userObject, checkAuthorisation: true })
    expect(stations).toExist()
    const observations = await observationsService.find({ query: {}, user: userObject, checkAuthorisation: true })
    expect(observations).toExist()
  }).timeout(5000)

  it('users cannot write to features services by default', async () => {
    try {
      await stationsService.create({}, { user: userObject, checkAuthorisation: true })
      assert.fail('unauthorized create should raise an error')
    } catch (error) {
      expect(error).toExist()
      expect(error.name).to.equal('Forbidden')
    }
  })

  it('managers can authorize a user on a layer', async () => {
    await authorisationService.getAbilities(managerObject)
    const authorisation = await authorisationService.create({
      scope: 'layers',
      permissions: 'manager',
      subjects: userObject._id.toString(),
      subjectsService: 'users',
      resource: measureLayer.name,
      resourcesService: 'catalog'
    }, { user: managerObject, checkAuthorisation: true })
    expect(authorisation).toExist()
    userObject = await userService.get(userObject._id.toString(), { checkAuthorisation: true, user: userObject })
    expect(userObject.layers).toExist()
    expect(userObject.layers.length).to.equal(1)
    expect(userObject.layers[0].name).to.equal(measureLayer.name)
    expect(userObject.layers[0].permissions).to.equal('manager')
  }).timeout(10000)

  it('authorized user can feed data to features services', async () => {
    const station = await stationsService.create({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [2.35, 48.85] },
      properties: { name: 'Station-1' }
    }, { user: userObject, checkAuthorisation: true })
    expect(station).toExist()
    const observation = await observationsService.create({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [2.35, 48.85] },
      properties: { value: 0.12 }
    }, { user: userObject, checkAuthorisation: true })
    expect(observation).toExist()
  }).timeout(5000)

  it('managers can remove user authorisation on a layer', async () => {
    const authorisation = await authorisationService.remove(measureLayer.name, {
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
    userObject = await userService.get(userObject._id.toString(), { checkAuthorisation: true, user: userObject })
    expect(userObject.layers).toExist()
    expect(userObject.layers.length).to.equal(0)
  }).timeout(5000)

  it('unauthorized user cannot write to features services', async () => {
    try {
      await stationsService.create({}, { user: userObject, checkAuthorisation: true })
      assert.fail('unauthorized create should raise an error')
    } catch (error) {
      expect(error).toExist()
      expect(error.name).to.equal('Forbidden')
    }
  })

  it('updateConfigurations hook scrubs layer references from configurations on layer removal', async () => {
    const layer = await catalogService.create({ name: 'TempLayer', type: 'OverlayLayer' }, { user: managerObject, checkAuthorisation: true })
    expect(layer).toExist()
    const config = await configurationsService.create({ name: 'test-view', value: [layer._id.toString()] })
    expect(config.value).to.include(layer._id.toString())
    await catalogService.remove(layer._id, { user: managerObject, checkAuthorisation: true })
    const updated = await configurationsService.get(config._id.toString())
    expect(updated.value).to.not.include(layer._id.toString())
  }).timeout(5000)

  it('removes test users', async () => {
    await userService.remove(userObject._id, { user: userObject, checkAuthorisation: true })
    let users = await userService.find({ query: { 'profile.name': _.get(userObject, 'profile.name') }, user: userObject, checkAuthorisation: true })
    expect(users.data.length).to.equal(0)
    await userService.remove(managerObject._id, { user: managerObject, checkAuthorisation: true })
    users = await userService.find({ query: { 'profile.name': _.get(managerObject, 'profile.name') }, user: managerObject, checkAuthorisation: true })
    expect(users.data.length).to.equal(0)
  }).timeout(5000)

  after(async () => {
    if (expressServer) await expressServer.close()
    fs.emptyDirSync(path.join(__dirname, 'logs'))
    if (app) {
      await app.db.instance.dropDatabase()
      if (app.db.db('data')) await app.db.db('data').dropDatabase()
      await app.db.disconnect()
    }
    if (katalogApp) {
      await katalogApp.db.instance.dropDatabase()
      await katalogApp.db.disconnect()
    }
  })
})
