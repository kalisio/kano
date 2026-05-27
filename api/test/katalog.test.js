import _ from 'lodash'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import chai, { util, expect, assert } from 'chai'
import chailint from 'chai-lint'
import { createServer, runServer } from '../src/server.js'
import { updateConfigurations } from '../src/hooks/hooks.catalog.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Build an in-memory feathers-compatible service backed by a plain array.
// The find() handles basic equality queries and paginate:false so kano's
// internal hooks (populateResource, updateConfigurations, …) can look things up.
function makeMemoryService (key) {
  const store = []
  return {
    key,
    remote: true,
    async find (params) {
      const query = params?.query || {}
      const paginate = params?.paginate
      let result = [...store]
      for (const [k, v] of Object.entries(query)) {
        if (k.startsWith('$')) continue
        result = result.filter(doc => doc[k] === v)
      }
      if (paginate === false) return result
      return { data: result, total: result.length, skip: 0, limit: 1000 }
    },
    async get (id, params) {
      const doc = store.find(d => String(d._id) === String(id))
      if (!doc) throw Object.assign(new Error(`Not found: ${id}`), { name: 'NotFound' })
      return doc
    },
    async create (data, params) {
      const doc = { _id: String(Date.now() + store.length), ...data }
      store.push(doc)
      return doc
    },
    async patch (id, data, params) {
      const doc = store.find(d => String(d._id) === String(id))
      if (!doc) throw Object.assign(new Error(`Not found: ${id}`), { name: 'NotFound' })
      Object.assign(doc, data)
      return doc
    },
    async update (id, data, params) {
      const idx = store.findIndex(d => String(d._id) === String(id))
      if (idx === -1) throw Object.assign(new Error(`Not found: ${id}`), { name: 'NotFound' })
      store[idx] = { _id: String(id), ...data }
      return store[idx]
    },
    async remove (id, params) {
      const idx = store.findIndex(d => String(d._id) === String(id))
      if (idx === -1) throw Object.assign(new Error(`Not found: ${id}`), { name: 'NotFound' })
      const [doc] = store.splice(idx, 1)
      return doc
    },
    // Expose raw store for test introspection
    _store: store
  }
}

// Register a mock service in kano and emit the feathers-distributed 'service' event.
// path must be strip-slashes form (e.g. 'api/catalog') to match publishService() output.
function registerRemote (app, { name, key, strippedPath }) {
  const apiPath = app.get('apiPath')
  const mockSvc = makeMemoryService(key)
  app.use(apiPath + '/' + name, mockSvc)
  app.emit('service', { key, name, path: strippedPath })
  return mockSvc
}

describe('katalog distribution integration', () => {
  let server, expressServer, app
  let userService, authorisationService, configurationsService
  let catalogMock, stationsMock, observationsMock
  let catalogService, stationsService, observationsService
  let userObject, managerObject, measureLayer

  before(() => {
    chailint(chai, util)
  })

  it('is ES module compatible', () => {
    expect(typeof createServer).to.equal('function')
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
    // catalog is provided by katalog — must not exist as a local service
    expect(app.getService('catalog')).beNull()
  })

  // ── User setup (needed for later auth tests) ──────────────────────────────

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

  // ── Katalog service discovery ─────────────────────────────────────────────

  it('discovers katalog catalog service and applies kano hooks', async () => {
    const apiPath = app.get('apiPath')
    // feathers-distributed strips leading slashes from paths (see publishService)
    const strippedBase = apiPath.substring(1)

    // Catalog — kano applies catalog.hooks.js to this service
    catalogMock = registerRemote(app, {
      name: 'catalog',
      key: 'katalog',
      strippedPath: strippedBase + '/catalog'
    })

    // Seed a TELERAY-like measure layer so later tests can use it
    catalogMock._store.push({
      _id: 'layer-teleray',
      name: 'Layers.TELERAY',
      type: 'OverlayLayer',
      service: 'teleray-observations',
      probeService: 'teleray-stations'
    })

    // Features services — katalog creates these dynamically from the catalog layers
    stationsMock = registerRemote(app, {
      name: 'teleray-stations',
      key: 'katalog',
      strippedPath: strippedBase + '/teleray-stations'
    })
    observationsMock = registerRemote(app, {
      name: 'teleray-observations',
      key: 'katalog',
      strippedPath: strippedBase + '/teleray-observations'
    })

    // Give the async event handlers time to finish
    await new Promise(resolve => setTimeout(resolve, 500))

    catalogService = app.getService('catalog')
    expect(catalogService).toExist()
    stationsService = app.getService('teleray-stations')
    expect(stationsService).toExist()
    observationsService = app.getService('teleray-observations')
    expect(observationsService).toExist()

    // decorateDistributedService stamps name and key
    expect(catalogService.key).to.equal('katalog')
    expect(catalogService.name).to.equal('catalog')

    // kano catalog hook (updateConfigurations) must be in after.remove
    const afterRemoveHooks = catalogService.__hooks?.after?.remove || []
    expect(afterRemoveHooks.length).to.be.above(0)
    const hasUpdateConfigurations = afterRemoveHooks.some(
      h => h === updateConfigurations || h.name === 'updateConfigurations'
    )
    expect(hasUpdateConfigurations).to.equal(true)
  }).timeout(5000)

  it('retrieves built-in layers and features services from katalog', async () => {
    const result = await catalogService.find({ query: {} })
    expect(result.data.length).to.be.above(0)
    measureLayer = _.find(result.data, layer => layer.service)
    expect(measureLayer).toExist()
    expect(app.getService(measureLayer.probeService)).toExist()
    expect(app.getService(measureLayer.service)).toExist()
  }).timeout(5000)

  // ── Catalog access control ────────────────────────────────────────────────

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
    // The seeded TELERAY layer should still be there
    expect(layers.data.length).to.be.above(0)
  }).timeout(5000)

  // ── Layer-level authorization ─────────────────────────────────────────────

  it('users can read features services from katalog', async () => {
    const stations = await stationsService.find({ query: {}, user: userObject, checkAuthorisation: true })
    expect(stations.data).to.exist
    const observations = await observationsService.find({ query: {}, user: userObject, checkAuthorisation: true })
    expect(observations.data).to.exist
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
      resource: 'Layers.TELERAY',
      resourcesService: 'catalog'
    }, { user: managerObject, checkAuthorisation: true })
    expect(authorisation).toExist()
    userObject = await userService.get(userObject._id.toString(), { checkAuthorisation: true, user: userObject })
    expect(userObject.layers).toExist()
    expect(userObject.layers.length).to.equal(1)
    expect(userObject.layers[0].name).to.equal('Layers.TELERAY')
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

  // ── updateConfigurations hook ─────────────────────────────────────────────

  it('updateConfigurations hook scrubs layer references from configurations on layer removal', async () => {
    const layer = await catalogService.create({ name: 'TempLayer', type: 'OverlayLayer' }, { user: managerObject, checkAuthorisation: true })
    expect(layer).toExist()

    const config = await configurationsService.create({
      name: 'test-view',
      value: [layer._id.toString()]
    })
    expect(config.value).to.include(layer._id.toString())

    await catalogService.remove(layer._id, { user: managerObject, checkAuthorisation: true })

    const updated = await configurationsService.get(config._id.toString())
    expect(updated.value).to.not.include(layer._id.toString())
  }).timeout(5000)

  // ── Cleanup ───────────────────────────────────────────────────────────────

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
    await app.db.instance.dropDatabase()
    if (app.db.db('data')) await app.db.db('data').dropDatabase()
    await app.db.disconnect()
  })
})
