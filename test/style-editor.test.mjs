import chai, { expect, util } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client.js'

const suite = 'style-editor'

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
  zoom min and max
  line styling (width, color and opacity) */

  it.skip('line: import geojson file', async () => {
    await map.dropFile(page, runner.getDataPath('Canal_Midi.geojson'))
    await map.goToPosition(page, 43.31486, 1.95557)
  })

  it.skip('line: set min and max zoom', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-style'])
    await core.click(page, '#style-general-group')
    await core.click(page, '#style-toggle-minzoom')
    await core.moveSlider(page, 'style-set-minzoom', 'right', 11)
    await core.click(page, '#style-toggle-maxzoom')
    await core.moveSlider(page, 'style-set-maxzoom', 'left', 5)
    await core.click(page, '#apply-button')
    expect(await runner.captureAndMatch('S1_test1_line_min_max_zoom_z16_raw', null, 3)).beTrue()
  })

  it.skip('line: set width, color and opacity', async () => {
    // await core.clickPaneAction(page, 'right', 'Canal_Midi')
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-style'])
    await core.click(page, '#style-line-group')
    await core.moveSlider(page, 'style-line-width', 'right', 4)
    await core.moveSlider(page, 'style-line-opacity', 'left', 6)
    await core.click(page, '#style-line-color')
    await core.click(page, '#style-color-teal')
    await core.click(page, '#done-button')
    await core.click(page, '#apply-button')
    await page.waitForTimeout(1500)
    expect(await runner.captureAndMatch('S1_test2_line_styled_z16', null, 3)).beTrue()
  })

  it.skip('line: check min zoom visibility (13 -> not visible)', async () => {
    await map.zoomToLevel(page, 'mapActivity', 13)
    await page.waitForTimeout(4000)
    expect(await runner.captureAndMatch('S1_test3_line_min_zoom_z13', null, 3)).beTrue()
  })

  it.skip('line: check max zoom visibility (17 -> not visible)', async () => {
    await map.zoomToLevel(page, 'mapActivity', 17)
    await page.waitForTimeout(4000)
    expect(await runner.captureAndMatch('S1_test4_line_max_zoom_z17', null, 3)).beTrue()
  })

  it.skip('line: remove layer', async () => {
    await map.removeLayer(page, userLayersTab, 'Canal_Midi')
  })

  /* Step 2:
  point clustering and styling */

  it.skip('point: default clustering', async () => {
    await map.dropFile(page, runner.getDataPath('Enjeux_Inondation.geojson'))
    await page.waitForTimeout(1000)
    await map.goToPosition(page, 43.30095, 1.95545)
    await map.zoomToLevel(page, 'mapActivity', 14)
    await page.waitForTimeout(3000)
    expect(await runner.captureAndMatch('S2_test1_point_default_clustering', null, 3)).beTrue()
  })

  it.skip('point: disable clustering', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-style'])
    await core.click(page, '#style-general-group')
    await core.click(page, '#style-toggle-clustering')
    await core.click(page, '#apply-button')
    await page.waitForTimeout(3000)
    expect(await runner.captureAndMatch('S2_test2_point_no_clustering', null, 3)).beTrue()
  })

  it.skip('point: disable clustering and point styling', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-style'])
    await core.click(page, '#style-general-group')
    await core.click(page, '#style-toggle-clustering')
    await core.moveSlider(page, 'style-set-clustering', 'left', 2)
    await core.click(page, '#style-point-group')
    await core.click(page, '#style-point-icon')
    await core.click(page, '#fab-fa-apple')
    await core.click(page, '#style-color-white')
    await core.click(page, '#choose-button')
    await core.click(page, '#style-point-color')
    await core.click(page, '#style-color-teal')
    await core.click(page, '#done-button')
    await core.click(page, '#apply-button')
    await page.waitForTimeout(1000)
    await map.zoomToLevel(page, 'mapActivity', 16)
    await page.waitForTimeout(3000)
    expect(await runner.captureAndMatch('S2_test3_point_style_clustering_by_zoom', null, 3)).beTrue()
  })

  it.skip('point: remove layer', async () => {
    await map.removeLayer(page, userLayersTab, 'Enjeux_Inondation')
  })

  /* Step 3:
  polygon styling */

  it.skip('polygon: import geojson file', async () => {
    await map.dropFile(page, runner.getDataPath('Zone_Risque_Industriel.geojson'))
  })

  it.skip('polygon: polygon styling', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-style'])
    await core.click(page, '#style-polygon-group')
    await core.moveSlider(page, 'style-polygon-opacity', 'right', 3, 500)
    await core.click(page, '#style-polygon-color')
    await core.click(page, '#style-color-deep-orange')
    await core.click(page, '#done-button')
    await core.click(page, '#style-polygon-line-color')
    await core.click(page, '#style-color-teal')
    await core.click(page, '#done-button')
    await core.click(page, '#apply-button')
    await page.waitForTimeout(3000)
    expect(await runner.captureAndMatch('S3_test1_polygon_styling', null, 3)).beTrue()
  })

  it.skip('polygon: remove layer', async () => {
    await map.removeLayer(page, userLayersTab, 'Zone_Risque_Industriel')
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
