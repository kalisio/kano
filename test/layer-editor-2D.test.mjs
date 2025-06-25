import chai, { expect, util } from 'chai'
import chailint from 'chai-lint'

import { core, map } from './kdk/index.mjs'

const suite = 'layer-editor-2D'

const userLayersTab = 'user-layers'

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
      user: user[1].email,
      geolocation: { latitude: 43.31486, longitude: 1.95557 },
      localStorage: {
        'kano-welcome': false,
        'kano-install': false
      }
    })
    page = await runner.start()
    await core.login(page, user[1])
  })

  /* Step 1:
  zoom min and max */

  it('line: import geojson file', async () => {
    await map.dropFile(page, runner.getDataPath('Canal_Midi.geojson'))
    await map.goToPosition(page, 43.31486, 1.95557)
  })

  it('line: set min and max zoom', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-display-group')
    await core.click(page, '#layer-display-toggle-zoom')
    await core.moveRange(page, 'layer-display-zoom', 'leftThumb', 'right', 11)
    await core.moveRange(page, 'layer-display-zoom', 'rightThumb', 'left', 5)
    await core.click(page, '#apply-edit-layer')
    expect(await runner.captureAndMatch('S1_test1_line_min_max_zoom_z16_raw', null, 3)).beTrue()
  })

  it('line: check min zoom visibility (13 -> not visible)', async () => {
    await map.zoomToLevel(page, 'mapActivity', 13)
    await core.waitForTimeout(4000)
    expect(await runner.captureAndMatch('S1_test3_line_min_zoom_z13', null, 3)).beTrue()
  })

  it('line: check max zoom visibility (17 -> not visible)', async () => {
    await map.zoomToLevel(page, 'mapActivity', 17)
    await core.waitForTimeout(4000)
    expect(await runner.captureAndMatch('S1_test4_line_max_zoom_z17', null, 3)).beTrue()
  })

  it('line: remove layer', async () => {
    await map.removeLayer(page, userLayersTab, 'Canal_Midi')
  })

  /* Step 2:
  point clustering */

  it('point: default clustering', async () => {
    await map.dropFile(page, runner.getDataPath('Enjeux_Inondation.geojson'))
    await core.waitForTimeout(1000)
    await map.goToPosition(page, 43.30095, 1.95545)
    await map.zoomToLevel(page, 'mapActivity', 14)
    await core.waitForTimeout(3000)
    expect(await runner.captureAndMatch('S2_test1_point_default_clustering', null, 3)).beTrue()
  })

  it('point: disable clustering', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-display-group')
    await core.click(page, '#layer-display-toggle-clustering')
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(3000)
    expect(await runner.captureAndMatch('S2_test2_point_no_clustering', null, 3)).beTrue()
  })

  it('point: remove layer', async () => {
    await map.removeLayer(page, userLayersTab, 'Enjeux_Inondation')
  })

  /* Step 3:
  selectable */

  it('import geojson file', async () => {
    await map.importLayer(page, runner.getDataPath('Castelnaudary_Hydro.geojson'), 'id')
  })

  /**
   * Step 4: information box
   */
  it('configure and check information box', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-infobox-group')
    await core.click(page, '#layer-infobox-field')
    await core.click(page, '#id')
    await core.click(page, '#longueur-en-km')
    await core.click(page, '#nom-usite')
    await core.click(page, '#importance')
    await core.click(page, '#layer-infobox-field')
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(2000)
    await map.goToPosition(page, 43.30312, 1.95054)
    await core.click(page, '#map', 2000)
    expect(await runner.captureAndMatch('t1-infobox', null, 3)).beTrue()
    await core.closeWindow(page, 'top')
  })

  it('disable information box', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-infobox-group')
    await core.click(page, '#layer-infobox-toggle')
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(2000)
    await map.goToPosition(page, 43.30312, 1.95054)
    await core.click(page, '#map', 2000)
    expect(await runner.captureAndMatch('t2-no-infobox', null, 3)).beTrue()
    await core.closeWindow(page, 'top')
  })

  it('disable selectable', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-display-group')
    await core.click(page, '#layer-display-toggle-selectable')
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(2000)
    await map.goToPosition(page, 43.30312, 1.95054)
    await core.click(page, '#map', 1000)
    await core.waitForTimeout(2000)
    expect(await runner.captureAndMatch('t3-no-empty-infobox', null, 3)).beTrue()
  })

  /**
   * Step 5: popup
   */

  it('configure and check popup', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-popup-group')
    await core.click(page, '#layer-popup-toggle')
    await core.click(page, '#layer-popup-field')
    await core.click(page, '#nom')
    await core.click(page, '#longueur-en-km')
    await core.click(page, '#layer-popup-field')
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(2000)
    await map.goToPosition(page, 43.30312, 1.95054)
    await core.click(page, '#map', 1000)
    await core.waitForTimeout(2000)
    const match = await runner.captureAndMatch('t4-popup', null, 3)
    expect(match).beTrue()
    await core.click(page, '.leaflet-popup-close-button', 1000)
  })

  it('disable popup', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-popup-group')
    await core.click(page, '#layer-popup-toggle')
    await core.waitForTimeout(2000)
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(2000)
    await map.goToPosition(page, 43.30312, 1.95054)
    await core.click(page, '#map', 1000)
    await core.waitForTimeout(2000)
    expect(await runner.captureAndMatch('t5-no-popup', null, 3)).beTrue()
  })

  /**
   * Step 6: tooltip
   */
  it('configure and check tooltip', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-tooltip-group')
    await core.click(page, '#layer-tooltip-toggle')
    await core.click(page, '#layer-tooltip-field')
    await core.click(page, '#nom')
    await core.click(page, '#layer-tooltip-field')
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(2000)
    await map.goToPosition(page, 43.30312, 1.95054)
    await core.click(page, '#map', 1000)
    await core.waitForTimeout(2000)
    expect(await runner.captureAndMatch('t6-tooltip', null, 3)).beTrue()
  })

  it('disable tooltip', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.click(page, '#layer-tooltip-group')
    await core.click(page, '#layer-tooltip-toggle')
    await core.waitForTimeout(2000)
    await core.click(page, '#apply-edit-layer')
    await core.waitForTimeout(2000)
    await map.goToPosition(page, 43.30312, 1.95054)
    await core.click(page, '#map', 1000)
    await core.waitForTimeout(2000)
    expect(await runner.captureAndMatch('t7-no-tooltip', null, 3)).beTrue()
  })

  it('remove geojson file', async () => {
    await map.removeLayer(page, userLayersTab, 'Castelnaudary_Hydro')
  })

  after(async () => {
    await core.waitForTimeout(5000)
    await core.logout(page)
    await runner.stop()
  })
})
