import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client.js'

const suite = 'realtime-layers'

const userLayersTab = 'user-layers'

let layer = {
  _id: '66bccb23e9525b0882c3ba1d',
  name: 'realtime',
  description: 'realtime description',
  type: 'OverlayLayer',
  scope: 'user',
  featureId: 'id',
  leaflet: {
    type: 'geoJson',
    isVisible: true,
    realtime: true,
    source: '/api/features'
  },
  cesium: {
    type: 'geoJson',
    isVisible: true,
    realtime: true,
    source: '/api/features'
  },
  schema: {
    name: 'realtime.json',
    content: '{\"$schema\":\"http://json-schema.org/draft-07/schema#\",\"$id\":\"http://www.kalisio.xyz/schemas/realtime.json#\",\"title\":\"Données\",\"type\":\"object\",\"properties\":{\"id\":{\"type\":\"string\",\"field\":{\"component\":\"form/KTextField\",\"label\":\"Identifiant\"}}},\"required\":[\"id\"]}'
  },
  service: 'features',
  baseQuery: '{\"layer\":\"66bccb23e9525b0882c3ba1d\"}'
}
let point = [
  1.951086,
  43.315882
]
let line = [
  [
    1.95105,
    43.31713
  ],
  [
    1.951903,
    43.31667
  ],
  [
    1.951661,
    43.316443
  ]
]
let polygon = [
  [
    [
      1.950148,
      43.315159
    ],
    [
      1.950411,
      43.315401
    ],
    [
      1.950331,
      43.315444
    ],
    [
      1.950293,
      43.315417
    ],
    [
      1.950229,
      43.315444
    ],
    [
      1.950004,
      43.315229
    ],
    [
      1.950148,
      43.315159
    ]
  ]
]
const coordinateOffset = 0.0005
// Helper function to offset geometry depending on geometry type
function offset(coordinates) {
  if (Array.isArray(coordinates[0])) {
    if (Array.isArray(coordinates[0][0])) {
      return coordinates.map(coordinates => coordinates.map(coordinates => coordinates.map(coordinate => coordinate + coordinateOffset)))
    } else {
      return coordinates.map(coordinates => coordinates.map(coordinate => coordinate + coordinateOffset))
    }
  } else {
    return coordinates.map(coordinate => coordinate + coordinateOffset)
  }
}

describe(`suite:${suite}`, () => {
  let runner, api, client, page
  const user = [
    { email: 'user-kano@kalisio.xyz', password: 'Pass;word1' },
    { email: 'admin-kano@kalisio.xyz', password: 'Pass;word1' }
  ]
  const currentUser = user[1]

  before(async () => {
    chailint(chai, util)

    api = new map.Api({
      appName: 'kano'
    })
    client = api.createClient()
    runner = new core.Runner(suite, {
      appName: 'kano',
      user: currentUser.email,
      geolocation: { latitude: 43.31486, longitude: 1.95557 },
      localStorage: {
        'kano-welcome': false
      }
    })
    page = await runner.start()
    await client.login(currentUser)
    await core.login(page, currentUser)
  })

  it('create layer', async () => {
    await map.goToPosition(page, 43.31588, 1.95109)
    await map.zoomToLevel(page, 17)
    layer = await client.getService('catalog').create(layer)
    expect(await map.layerExists(page, userLayersTab, 'realtime')).beTrue()
  })

  it('add point', async () => {
    point = await client.createGeoJsonFeature(layer._id, point, { properties: { id: 'point' } })
    expect(await runner.captureAndMatch('add-point')).beTrue()
  })

  it('add line', async () => {
    line = await client.createGeoJsonFeature(layer._id, line, { properties: { id: 'line' } })
    expect(await runner.captureAndMatch('add-line')).beTrue()
  })

  it('add polygon', async () => {
    polygon = await client.createGeoJsonFeature(layer._id, polygon, { properties: { id: 'polygon' } })
    expect(await runner.captureAndMatch('add-polygon')).beTrue()
  })

  it('edit point', async () => {
    // Change position and style
    point = await client.updateGeoJsonFeature(point._id,
      offset(point.geometry.coordinates),
      { style: { shape: 'circle', color: 'blue', size: [32, 32], stroke: { color: 'white', width: 1 }, icon: { classes: 'las la-home', color: 'white', size: 20 } } }
    )
    expect(await runner.captureAndMatch('edit-point')).beTrue()
  })

  it('edit line', async () => {
    // Change position and style
    line = await client.updateGeoJsonFeature(line._id,
      offset(line.geometry.coordinates),
      { style: { color: 'blue', opacity: 0.5, width: 3, dashArray: '0 8 0' } }
    )
    expect(await runner.captureAndMatch('edit-line')).beTrue()
  })

  it('edit polygon', async () => {
    // Change position and style
    polygon = await client.updateGeoJsonFeature(polygon._id,
      offset(polygon.geometry.coordinates),
      { style: { color: 'magenta', opacity: 0.5, stroke: { color: 'yellow', width: 3 } } }
    )
    expect(await runner.captureAndMatch('edit-polygon')).beTrue()
  })

  it('remove point', async () => {
    point = await client.getService('features').remove(point._id)
    expect(await runner.captureAndMatch('remove-point')).beTrue()
  })

  it('remove line', async () => {
    line = await client.getService('features').remove(line._id)
    expect(await runner.captureAndMatch('remove-line')).beTrue()
  })

  it('remove polygon', async () => {
    polygon = await client.getService('features').remove(polygon._id)
    expect(await runner.captureAndMatch('remove-polygon')).beTrue()
  })

  it('remove layer', async () => {
    await client.getService('catalog').remove(layer._id)
    layer = null
    expect(await map.layerExists(page, userLayersTab, 'realtime')).beFalse()
  })

  after(async () => {
    await page.waitForTimeout(5000)
    await core.logout(page)
    await runner.stop()
    // Remove remaining test data if any
    if (layer) await client.getService('catalog').remove(layer._id)
    await client.getService('features').remove(null)
  })
})
