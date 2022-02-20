import _ from 'lodash'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client'

const suite = 'catalog-layers'

const catalogLayersTab = 'catalog-layers-tab'

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

  it('check layer category', async () => {
    await map.clickCatalogTab(page, catalogLayersTab)
    const categoryId = await map.getLayerCategoryId(page, map.getLayerId('OSM_DARK'))
    expect(categoryId).to.equal('k-catalog-panel-base-layers')
    expect(await map.isLayerCategoryOpened(page, categoryId)).beFalse()
    await map.clickLayerCategory(page, categoryId)
    expect(await map.isLayerCategoryOpened(page, categoryId)).beTrue()
    await core.clickRightOpener(page)
  })

  it('check base layers', async () => {
    const layers = ['OSM_DARK', 'OSMT_BRIGHT', 'IMAGERY', 'HYBRID', 'IGN_PLAN']
    for (const layer of layers) {
      await map.clickLayer(page, catalogLayersTab, layer)
      expect(await runner.captureAndMatch(_.kebabCase(layer))).beTrue()
    }
    await map.clickLayer(page, catalogLayersTab, 'IGN_PLAN')
    const match = await runner.captureAndMatch('empty')
    await map.clickLayer(page, catalogLayersTab, 'OSM_BRIGHT')
    expect(match).beTrue()
  }).timeout(60000)

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
