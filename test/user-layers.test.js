import _ from 'lodash'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client'

const suite = 'user-layers'

const userLayersTab = 'user-layers-tab'

describe(`suite:${suite}`, () => {
  let runner, page
  const user = { email: 'kalisio@kalisio.xyz', password: 'Pass;word1' }

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
    await core.login(page, user)
  })

 /* it('drop geojson gradient file', async () => {
    await map.dropFile(page, runner.getDataPath('flight.geojson'))
    const match = await runner.captureAndMatch('flight')
    await map.clickLayer(page, userLayersTab, 'flight')
    expect(match).beTrue()
  })

  it('import geojson file with bbox', async () => {
    await map.importLayer(page, runner.getDataPath('landing.geojson'))
    const match = await runner.captureAndMatch('landing')
    await map.clickLayer(page, userLayersTab, 'landing')
    expect(match).beTrue()
  })

  it('import geojson file', async () => {
    await map.importLayer(page, runner.getDataPath('departements.geojson'), 'code')
    const match = await runner.captureAndMatch('departements')
    await map.clickLayer(page, userLayersTab, 'departements')
    expect(match).beTrue()
  })

  it('import kml file', async () => {
    await map.importLayer(page, runner.getDataPath('regions.kml'))
    const match = await runner.captureAndMatch('regions')
    await map.clickLayer(page, userLayersTab, 'regions')
    expect(match).beTrue()
  })

  it('import gpx file', async () => {
    await map.importLayer(page, runner.getDataPath('trace.gpx'))
    const match = await runner.captureAndMatch('trace')
    await map.clickLayer(page, userLayersTab, 'trace')
    expect(match).beTrue()
  })

  it('import shp file', async () => {
    await map.dropFile(page, runner.getDataPath('espaces-naturels.shp'))
    const match = await runner.captureAndMatch('espaces-naturels')
    await map.clickLayer(page, userLayersTab, 'espaces-naturels')
    expect(match).beTrue()
  })*/

  it('connect wms layer', async () => {
    const service = 'https://geoservices.brgm.fr/geologie?service=wms&request=getcapabilities'
    const layerId = 'geologie'
    await map.connectLayer(page, service, layerId)
    const match = await runner.captureAndMatch(layerId)
    await map.clickLayer(page, userLayersTab, _.kebabCase('Cartes géologiques'))
    expect(match).beTrue()
  })

  it('add polygon mask', async () => {
    await map.dropFile(page, runner.getDataPath('ariege.geojson'))
    const match = await runner.captureAndMatch('polygon-mask')
    await map.removeLayer(page, userLayersTab, 'ariege')
    expect(match).beTrue()
  })

  it('add multi-polygon mask', async () => {
    await map.dropFile(page, runner.getDataPath('occitanie.geojson'))
    const match = await runner.captureAndMatch('multi-polygon-mask')
    await map.removeLayer(page, userLayersTab, 'occitanie')
    expect(match).beTrue()
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
