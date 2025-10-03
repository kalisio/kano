import chai, { expect, util } from 'chai'
import chailint from 'chai-lint'
import _ from 'lodash'

import { core, map } from './kdk/index.mjs'

const suite = 'catalog-layers'

const catalogLayersTab = 'catalog-layers'

describe(`suite:${suite}`, function () {
  this.timeout(30 * 1000 * core.TestTimeoutMultiplier)

  let runner, page
  const user = { email: 'user-kano@kalisio.xyz', password: 'Pass;word1' }

  before(async () => {
    chailint(chai, util)

    runner = new core.Runner(suite, {
      appName: 'kano',
      user: user.email,
      geolocation: { latitude: 43.10, longitude: 1.71 },
      localStorage: {
        'kano-welcome': false,
        'kano-install': false
      }
    })
    page = await runner.start()
    await core.login(page, user)
  })

  it('check layer category', async () => {
    await map.clickCatalogTab(page, catalogLayersTab)
    const categoryId = await map.getLayerCategoryId(page, map.getLayerId('OSM_DARK'))
    expect(categoryId).to.equal('categories-base-layers')
    expect(await map.isLayerCategoryOpened(page, categoryId)).beFalse()
    await map.clickLayerCategory(page, catalogLayersTab, categoryId)
    expect(await map.isLayerCategoryOpened(page, categoryId)).beTrue()
    await core.clickOpener(page, 'right')
  })

  it('check base layers', async () => {
    const layers = ['OSM_DARK', 'OSMT_BRIGHT', 'IMAGERY', 'HYBRID', 'IGN_PLAN']
    for (const layer of layers) {
      await map.clickLayer(page, catalogLayersTab, layer)
      expect(await runner.captureAndMatch(_.kebabCase(layer), null, 3)).beTrue()
    }
    await map.clickLayer(page, catalogLayersTab, 'IGN_PLAN')
    const match = await runner.captureAndMatch('empty', null, 3)
    await map.clickLayer(page, catalogLayersTab, 'OSM_BRIGHT')
    expect(match).beTrue()
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
