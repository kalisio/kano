import _ from 'lodash'
import { expect } from 'chai'

import { core, map } from '@kalisio/kdk/test.client'

const suite = 'catalog'

const runnerOptions = {
  appName: 'kano',
  geolocation: { latitude: 43.10, longitude:1.71 },
  localStorage: {
    'kano-welcome': false
  }
}

const user = { email: 'kalisio@kalisio.xyz', password: 'Pass;word1' }

describe(suite, () => {
  let runner
  let page

  before(async () => {
    runner = new core.Runner(suite, runnerOptions)
    page = await runner.start()
    await core.login(page, user)
  })

  it('check-layer-category', async () => {
    await core.clickRightOpener(page)
    expect(await map.isLayerCategoryOpened(page, map.getSystemLayerCategoryId('BASE_LAYERS'))).to.false
    await map.clickLayerCategory(page, map.getSystemLayerCategoryId('BASE_LAYERS'))
    expect(await map.isLayerCategoryOpened(page, map.getSystemLayerCategoryId('BASE_LAYERS'))).to.true
    await core.clickRightOpener(page)
  })

  it('check-base-layers', async () => {
    const layers = ['OSM_DARK', 'OSMT_BRIGHT', 'OSMT_DARK', 'IMAGERY', 'HYBRID', 'IGN_PLAN']
    for (const layer of layers) {
      await map.clickBaseLayer(page, layer)
      expect(await runner.captureAndMatch(_.kebabCase(layer))).to.true
    }
    await map.clickBaseLayer(page, 'IGN_PLAN')
    expect(await runner.captureAndMatch('empty')).to.true
    await map.clickBaseLayer(page, 'OSM_BRIGHT')
  }).timeout(60000)

  it('import-geojson-layer', async () => {
    await map.importLayer(page, runner.getDataPath('regions.geojson'), 'code')
    expect(await runner.captureAndMatch('regions')).to.true
    await map.clickLayer(page, 'regions')
  })

  it('connect-wms-layer', async () => {
    const service = 'http://geoservices.brgm.fr/geologie?service=wms&request=getcapabilities'
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