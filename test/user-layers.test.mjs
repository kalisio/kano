import _ from 'lodash'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client.js'

const suite = 'user-layers'

const userLayersTab = 'user-layers-tab'

describe(`suite:${suite}`, () => {
  let runner, page
  const user = [
    { email: 'user-kano@kalisio.xyz', password: 'Pass;word1' },
    { email: 'admin-kano@kalisio.xyz', password: 'Pass;word1' }
  ]

  before(async () => {
    chailint(chai, util)

    runner = new core.Runner(suite, {
      appName: 'kano',
      geolocation: { latitude: 43.10, longitude: 1.71 },
      localStorage: {
        'kano-welcome': false
      }
    })
    page = await runner.start()
    await core.login(page, user[0])
  })

  it('user: drop geojson gradient file', async () => {
    await map.dropFile(page, runner.getDataPath('flight.geojson'))
    const match = await runner.captureAndMatch('flight')
    // await page.screenshot({ path: "./test/data/user-layers/screenrefs/test.png" })
    await map.clickLayer(page, userLayersTab, 'flight')
    expect(match).beTrue()
  })

  it('user: import geojson file with bbox', async () => {
    await map.importLayer(page, runner.getDataPath('landing.geojson'))
    const match = await runner.captureAndMatch('landing')
    await map.clickLayer(page, userLayersTab, 'landing')
    expect(match).beTrue()
  })

  it('user: import geojson file', async () => {
    await map.importLayer(page, runner.getDataPath('departements.geojson'), 'code')
    const match = await runner.captureAndMatch('departements')
    await map.clickLayer(page, userLayersTab, 'departements')
    expect(match).beTrue()
  })

  it('user: import kml file', async () => {
    await map.importLayer(page, runner.getDataPath('regions.kml'))
    const match = await runner.captureAndMatch('regions')
    await map.clickLayer(page, userLayersTab, 'regions')
    expect(match).beTrue()
  })

  it('user: import gpx file', async () => {
    await map.importLayer(page, runner.getDataPath('trace.gpx'))
    const match = await runner.captureAndMatch('trace')
    await map.clickLayer(page, userLayersTab, 'trace')
    expect(match).beTrue()
  })

  it('user: import shp file', async () => {
    await map.dropFile(page, runner.getDataPath('espaces-naturels.shp'))
    const match = await runner.captureAndMatch('espaces-naturels')
    await map.clickLayer(page, userLayersTab, 'espaces-naturels')
    expect(match).beTrue()
  })

  it('user: connect wms layer', async () => {
    const service = 'https://geoservices.brgm.fr/geologie?service=wms&request=getcapabilities'
    const layerId = 'geologie'
    await map.connectLayer(page, service, layerId)
    const match = await runner.captureAndMatch(layerId)
    await map.clickLayer(page, userLayersTab, _.kebabCase('Cartes géologiques'))
    expect(match).beTrue()
  })

  it('switch to admin', async () => {
    await core.logout(page)
    await core.goToLoginScreen(page)
    await core.login(page, user[1])
  })

  it('admin: add polygon mask', async () => {
    await map.dropFile(page, runner.getDataPath('ariege.geojson'))
    const match = await runner.captureAndMatch('polygon-mask')
    expect(match).beTrue()
    await map.removeLayer(page, userLayersTab, 'ariege')
  })

  it('admin: add multi-polygon mask', async () => {
    await map.dropFile(page, runner.getDataPath('occitanie.geojson'))
    const match = await runner.captureAndMatch('multi-polygon-mask')
    expect(match).beTrue()
    await map.removeLayer(page, userLayersTab, 'occitanie')
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
