import _ from 'lodash'
import { expect } from 'chai'

import { core, map } from '@kalisio/kdk/test.client'

const suite = 'catalog'

describe(`suite:${suite}`, () => {
  let runner, page
  const user = { email: 'kalisio@kalisio.xyz', password: 'Pass;word1' }

  before(async () => {
    runner = new core.Runner(suite, {
      appName: 'kano',
      geolocation: { latitude: 43.10, longitude:1.71 },
      localStorage: {
        'kano-welcome': false
      }
    })
    page = await runner.start()
    await core.login(page, user)
  })

  it('check layer category', async () => {
    await core.clickRightOpener(page)
    const categoryId = await map.getLayerCategoryId(page, map.getLayerId('OSM_DARK'))
    expect(categoryId).to.equal('k-catalog-panel-base-layers')
    expect(await map.isLayerCategoryOpened(page, categoryId)).to.false
    await map.clickLayerCategory(page, categoryId)
    expect(await map.isLayerCategoryOpened(page, categoryId)).to.true
    await core.clickRightOpener(page)
  })

  it('check base layers', async () => {
    const layers = ['OSM_DARK', 'OSMT_BRIGHT', 'IMAGERY', 'HYBRID', 'IGN_PLAN' ]
    for (const layer of layers) {
      await map.clickLayer(page, layer)
      expect(await runner.captureAndMatch(_.kebabCase(layer))).to.true
    }
    await map.clickLayer(page, 'IGN_PLAN')
    const match = await runner.captureAndMatch('empty')
    await map.clickLayer(page, 'OSM_BRIGHT')
    expect(match).to.true
  }).timeout(60000)

  it('drop geojson gradient file', async () => {
    await map.dropFile(page, runner.getDataPath('flight.geojson'))
    const match = await runner.captureAndMatch('flight')
    await map.clickLayer(page, 'flight')
    expect(match).to.true
  })
  
  it('import geojson file with bbox', async () => {
    await map.importLayer(page, runner.getDataPath('landing.geojson'))
    const match = await runner.captureAndMatch('landing')
    await map.clickLayer(page, 'landing')
    expect(match).to.true
  })

  it('import geojson file', async () => {
    await map.importLayer(page, runner.getDataPath('departements.geojson'), 'code')
    const match = await runner.captureAndMatch('departements')
    await map.clickLayer(page, 'departements')
    expect(match).to.true
  })

  it('import kml file', async () => {
    await map.importLayer(page, runner.getDataPath('regions.kml'))
    const match = await runner.captureAndMatch('regions')
    await map.clickLayer(page, 'regions')
    expect(match).to.true
  })

  it('import gpx file', async () => {
    await map.importLayer(page, runner.getDataPath('trace.gpx'))
    const match = await runner.captureAndMatch('trace')
    await map.clickLayer(page, 'trace')
    expect(match).to.true
  })

  it('import shp file', async () => {
    await map.dropFile(page, runner.getDataPath('espaces-naturels.shp'))
    const match = await runner.captureAndMatch('espaces-naturels')
    await map.clickLayer(page, 'espaces-naturels')
    expect(match).to.true
  })

  it('connect wms layer', async () => {
    const service = 'https://geoservices.brgm.fr/geologie?service=wms&request=getcapabilities'
    const layerId = 'geologie'
    await map.connectLayer(page, service, layerId)
    const match = await runner.captureAndMatch(layerId)
    await map.clickLayer(page, _.kebabCase('Cartes géologiques'))
    expect(match).to.true
  }) 

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})