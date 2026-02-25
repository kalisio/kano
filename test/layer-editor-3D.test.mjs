import chai, { expect, util } from 'chai'
import chailint from 'chai-lint'

import { core, map } from './kdk/index.mjs'

const suite = 'layer-editor-3D'

const userLayersTab = 'user-layers'

describe(`suite:${suite}`, function () {
  this.timeout(30 * 1000 * core.TestTimeoutMultiplier)

  let runner, page
  const user = [
    { email: 'user-kano@kalisio.xyz', password: 'Pass;word1' },
    { email: 'admin-kano@kalisio.xyz', password: 'Pass;word1' }
  ]

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
      user: user[1].email,
      geolocation: { latitude: 43.31486, longitude: 1.95557 },
      localStorage: {
        'kano-welcome': false,
        'kano-install': false
      },
      browser: { args: [waylandArg] }
    })
    page = await runner.start()
    await core.login(page, user[1])
  })

  /* Step 1:
  zoom min and max
  Can't zoom with Puppeteer on 3D map yet
  */

  /* Step 2:
  point clustering
  Can't zoom with Puppeteer on 3D map yet
  */

  /* Step 3:
  selectable */

  it('import geojson file', async () => {
    await map.importLayer(page, runner.getDataPath('polygon-samples.geojson'), 'name')
    await map.saveLayer(page, userLayersTab, 'polygon-samples')
    await core.clickPaneAction(page, 'top', 'globe-activity-action')
    await core.waitForTimeout(2000)
    await map.zoomToLayer(page, userLayersTab, 'polygon-samples')
  })

  it('disable selectable', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-display-group')
    await core.click(page, '#layer-display-toggle-selectable')
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(2000)
    await map.goToPosition(page, 47.89793, -71.51550)
    await core.click(page, '#globe', 1000)
    await core.waitForTimeout(2000)
    const match = await runner.captureAndMatch('S3-no-empty-infobox', null, 3)

    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-display-group')
    await core.click(page, '#layer-display-toggle-selectable')
    await core.click(page, '#apply-edit-layer')

    expect(match).beTrue()
  })

  /**
   * Step 4: popup
   */

  it('configure and check popup', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-popup-group')
    await core.click(page, '#layer-popup-toggle')
    await core.click(page, '#layer-popup-field')
    await core.click(page, '#name')
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(2000)
    await map.goToPosition(page, 47.89793, -71.51550)
    await core.click(page, '#globe', 1000)
    await core.waitForTimeout(2000)
    const match = await runner.captureAndMatch('S4-popup', null, 3)
    await core.click(page, '#globe', 1000)
    expect(match).beTrue()
  })

  it('disable popup', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-popup-group')
    await core.click(page, '#layer-popup-toggle')
    await core.waitForTimeout(2000)
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(2000)
    await map.goToPosition(page, 47.89793, -71.51550)
    await core.click(page, '#globe', 1000)
    await core.waitForTimeout(2000)
    const match = await runner.captureAndMatch('S4-no-popup', null, 3)
    await core.click(page, '#globe', 1000)
    expect(match).beTrue()
  })

  /**
   * Step 5: tooltip
   */
  it('configure and check tooltip', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-tooltip-group')
    await core.click(page, '#layer-tooltip-toggle')
    await core.click(page, '#layer-tooltip-field')
    await core.click(page, '#name')
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(2000)
    await map.goToPosition(page, 47.89793, -71.51550)
    await core.click(page, '#globe', 1000)
    await core.waitForTimeout(2000)
    const match = await runner.captureAndMatch('S5-tooltip', null, 3)
    await core.click(page, '#globe', 1000)
    expect(match).beTrue()
  })

  it('disable tooltip', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-tooltip-group')
    await core.click(page, '#layer-tooltip-toggle')
    await core.waitForTimeout(2000)
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(2000)
    await map.goToPosition(page, 47.89793, -71.51550)
    await core.click(page, '#globe', 1000)
    await core.waitForTimeout(2000)
    const match = await runner.captureAndMatch('S5-no-tooltip', null, 3)
    await core.click(page, '#globe', 1000)
    expect(match).beTrue()
  })

  /**
   * Step 7: information box
   */
  it('configure and check information box', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-infobox-group')
    await core.click(page, '#layer-infobox-field')
    await core.click(page, '#name')
    await core.click(page, '#layer-infobox-field')
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(2000)
    await map.goToPosition(page, 47.89793, -71.51550)
    await core.click(page, '#globe', 2000)
    const match = await runner.captureAndMatch('S7-infobox', null, 3)
    await core.closeWindow(page, 'top')
    await core.click(page, '#globe', 1000)
    expect(match).beTrue()
  })

  it('disable information box', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-infobox-group')
    await core.click(page, '#layer-infobox-toggle')
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(2000)
    await map.goToPosition(page, 47.89793, -71.51550)
    await core.click(page, '#globe', 2000)
    const match = await runner.captureAndMatch('S7-no-infobox', null, 3)
    await core.closeWindow(page, 'top')
    await core.click(page, '#globe', 1000)
    expect(match).beTrue()
  })

  it('remove geojson file', async () => {
    await map.removeLayer(page, userLayersTab, 'polygon-samples')
  })

  after(async () => {
    await core.waitForTimeout(5000)
    await core.logout(page)
    await runner.stop()
  })
})
