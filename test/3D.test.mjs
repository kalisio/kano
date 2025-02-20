import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client.js'

const suite = '3D'

const catalogLayersTab = 'catalog-layers'
const userLayersTab = 'user-layers'

describe(`suite:${suite}`, () => {
  let runner, page
  const user = { email: 'admin-kano@kalisio.xyz', password: 'Pass;word1' }

  before(async () => {
    chailint(chai, util)

    // NOTE: chrome 113 is bundled with puppeteer 20.5
    // When running on a wayland session use --ozone-platform=wayland browser args
    // otherwise the test fails to initialize a webgl context with
    // powerPreference = 'high-performance' as requested by cesium 1.117
    // This might not be needed in later chrome versions ...
    const waylandArg = 'WAYLAND_DISPLAY' in process.env ? '--ozone-platform=wayland' : ''

    runner = new core.Runner(suite, {
      appName: 'kano',
      user: user.email,
      geolocation: { latitude: 43.10, longitude: 1.71 },
      localStorage: {
        'kano-welcome': false
      },
      browser: { args: [waylandArg] }
    })
    page = await runner.start()
    await core.login(page, user)
  })

  it('import data and switch to 3D mode', async () => {
    await map.importLayer(page, runner.getDataPath('trace.gpx'))
    await map.saveLayer(page, userLayersTab, 'trace')
    await core.clickPaneAction(page, 'top', 'toggle-globe')
    await map.zoomToLayer(page, userLayersTab, 'trace', 5000)
    await page.waitForNetworkIdle()
    expect(await runner.captureAndMatch('trace-on-ellipsoid')).beTrue()
  }).timeout(30000)

  it('check terrain layer category', async () => {
    await map.clickCatalogTab(page, catalogLayersTab)
    const categoryId = await map.getLayerCategoryId(page, map.getLayerId('K2'))
    expect(categoryId).to.equal('categories-terrain-layers')
    expect(await map.isLayerCategoryOpened(page, categoryId)).beFalse()
    await map.clickLayerCategory(page, catalogLayersTab, categoryId)
    expect(await map.isLayerCategoryOpened(page, categoryId)).beTrue()
    await core.clickOpener(page, 'right')
  })

  it('check base and terrain layers', async () => {
    await core.clickOpener(page, 'right')
    const layers = ['IMAGERY', 'K2']
    for (const layer of layers) {
      await map.clickLayer(page, catalogLayersTab, layer)
    }
    await core.clickOpener(page, 'right')
    await page.waitForNetworkIdle()
    expect(await runner.captureAndMatch('trace-on-terrain')).beTrue()
  }).timeout(30000)

  it('remove layer', async () => {
    await map.removeLayer(page, userLayersTab, 'trace')
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
