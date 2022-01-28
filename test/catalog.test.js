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
    expect(await runner.captureAndMatch('empty')).to.true
    await map.clickLayer(page, 'OSM_BRIGHT')
  }).timeout(60000)

  it('drop geojson gradient file', async () => {
    await map.dropFile(page, runner.getDataPath('flight.geojson'))
    expect(await runner.captureAndMatch('flight')).to.true
    await map.clickLayer(page, 'flight')
  })
  
  it('import geojson file with bbox', async () => {
    await map.importLayer(page, runner.getDataPath('landing.geojson'))
    expect(await runner.captureAndMatch('landing')).to.true
    await map.clickLayer(page, 'landing')
  })

  it('import geojson file', async () => {
    await map.importLayer(page, runner.getDataPath('departements.geojson'), 'code')
    expect(await runner.captureAndMatch('departements')).to.true
    await map.clickLayer(page, 'departements')
  })

  it('import kml file', async () => {
    await map.importLayer(page, runner.getDataPath('regions.kml'))
    expect(await runner.captureAndMatch('regions')).to.true
    await map.clickLayer(page, 'regions')
  })

  it('import gpx file', async () => {
    await map.importLayer(page, runner.getDataPath('trace.gpx'))
    expect(await runner.captureAndMatch('trace')).to.true
    await map.clickLayer(page, 'trace')
  })

  /*it('import shp file', async () => {
    await map.dropFile(page, runner.getDataPath('espaces-naturels.shp'))
    expect(await runner.captureAndMatch('espaces-naturels')).to.true
    await map.clickLayer(page, 'espaces-naturels')
  })*/

  it('connect wms layer', async () => {
    const service = 'https://geoservices.brgm.fr/geologie?service=wms&request=getcapabilities'
    const layerId = 'geologie'
    await map.connectLayer(page, service, layerId)
    expect(await runner.captureAndMatch(layerId)).to.true
    await map.clickLayer(page, _.kebabCase('Cartes géologiques'))
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})