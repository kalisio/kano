import _ from 'lodash'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client'
import { zoom } from 'd3'

const suite = 'style'

const userLayersTab = 'user-layers-tab'

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
        'kano-welcome': false
      }/* ,
      mode: 'screenshots' */
    })
    page = await runner.start()
    await core.login(page, user[1])
  })

  /* Step 1:
  zoom min and max
  line styling (width, color and opacity) */

  it('line: import geojson file', async () => {
    await map.dropFile(page, runner.getDataPath('Canal_Midi.geojson'))
    await map.goToPosition(page, 43.31486, 1.95557)
  })

  it('line: set min and max zoom', async () => {
    await core.clickRightPaneAction(page, 'layer-actions')
    await core.clickRightPaneAction(page, 'edit-style')
    await core.click(page, '#style-general-group')
    await core.click(page, '#style-toggle-minzoom')
    await core.moveSlider(page, 'style-set-minzoom', 'right', 11)
    await core.click(page, '#style-toggle-maxzoom')
    await core.moveSlider(page, 'style-set-maxzoom', 'left', 5)
    await core.click(page, '#apply-button')
    expect(await runner.captureAndMatch('S1_test1_Canal_Midi_z16_raw')).beTrue()
    //await page.screenshot({ path: './test/data/style/screenrefs/S1_test1_Canal_Midi_z16_raw_test.png' })
  })

  it('line: set width, color and opacity', async () => {
    //await core.clickRightPaneAction(page, 'Canal_Midi')
    await core.clickRightPaneAction(page, 'layer-actions')
    await core.clickRightPaneAction(page, 'edit-style')
    await core.click(page, '#style-line-group')
    await core.moveSlider(page, 'style-line-width', 'right', 4)
    await core.moveSlider(page, 'style-line-opacity', 'left', 6)
    await core.click(page, '#style-line-color')
    await core.click(page, '#style-color-teal')
    await core.click(page, '#done-button')
    await core.click(page, '#apply-button')
    await page.waitForTimeout(1500)
    expect(await runner.captureAndMatch('S1_test2_Canal_Midi_z16_styled')).beTrue()
    //await page.screenshot({ path: './test/data/style/screenrefs/S1_test2_Canal_Midi_z16_styled_test.png' })
  })

  it('line: check min zoom visibility (13 -> not visible)', async () => {
    await core.zoomToLevel(page, 13)
    await page.waitForTimeout(3000)
    expect(await runner.captureAndMatch('S1_test3_Canal_Midi_z13')).beTrue()
    //await page.screenshot({ path: './test/data/style/screenrefs/S1_test3_Canal_Midi_z13_test.png' })
  })

  it('line: check max zoom visibility (17 -> not visible)', async () => {
    await core.zoomToLevel(page, 17)
    await page.waitForTimeout(3000)
    expect(await runner.captureAndMatch('S1_test4_Canal_Midi_z17')).beTrue()
    //await page.screenshot({ path: './test/data/style/screenrefs/S1_test4_Canal_Midi_z17_test.png' })
  })

  it('line: remove layer', async () => {
    await map.removeLayer(page, userLayersTab, 'Canal_Midi')
  })

  /* Step 2:
  point clustering and styling */

  it('point: import geojson file', async () => {
    await map.dropFile(page, runner.getDataPath('Enjeux_Inondation.geojson'))
  })

  it('point: default clustering', async () => {
    await map.goToPosition(page, 43.30095, 1.95545)
    await page.waitForTimeout(3000)
    expect(await runner.captureAndMatch('S2_test1_Enjeux_Inondation')).beTrue()
    //await page.screenshot({ path: './test/data/style/screenrefs/S2_test1_Enjeux_Inondation_test.png' })
  })

  it('point: deactive clustering', async () => {
    await core.clickRightPaneAction(page, 'layer-actions')
    await core.clickRightPaneAction(page, 'edit-style')
    await core.click(page, '#style-point-group')
    await core.click(page, '#style-toggle-clustering')
    await core.click(page, '#apply-button')
    await page.waitForTimeout(3000)
    expect(await runner.captureAndMatch('S2_test2_Enjeux_Inondation')).beTrue()
    //await page.screenshot({ path: './test/data/style/screenrefs/S2_test2_Enjeux_Inondation_test.png' })
  })

  it('point: deactive clustering by zoom + point styling', async () => {
    await core.clickRightPaneAction(page, 'layer-actions')
    await core.clickRightPaneAction(page, 'edit-style')
    await core.click(page, '#style-point-group')
    await core.click(page, '#style-toggle-clustering')
    await core.moveSlider(page, 'style-point-clustering', 'left', 2)
    await core.click(page, '#style-point-icons')
    await core.click(page, '#fas-fa-check-circle')
    await core.click(page, '#style-color-teal')
    await core.click(page, '#choose-button')
    await core.click(page, '#apply-button')
    await page.waitForTimeout(1000)
    await core.zoomToLevel(page, 16)
    await page.waitForTimeout(3000)
    expect(await runner.captureAndMatch('S2_test3_Enjeux_Inondation')).beTrue()
    //await page.screenshot({ path: './test/data/style/screenrefs/S2_test2_Enjeux_Inondation_test.png' })
  })

  it('point: remove layer', async () => {
    await map.removeLayer(page, userLayersTab, 'Enjeux_Inondation')
  })

  /* Step 3:
  polygon styling */

  it('polygon: import geojson file', async () => {
    await map.dropFile(page, runner.getDataPath('Zone_Risque_Industriel.geojson'))
  })

  it('polygon: polygon styling', async () => {
    await core.clickRightPaneAction(page, 'layer-actions')
    await core.clickRightPaneAction(page, 'edit-style')
    await core.click(page, '#style-polygon-group')
    await core.moveSlider(page, 'style-fill-opacity', 'right', 3, 500)
    await core.click(page, '#style-polygon-color')
    await core.click(page, '#style-color-deep-orange')
    await core.click(page, '#done-button')
    await core.click(page, '#style-line-group')
    await core.click(page, '#style-line-color')
    await core.click(page, '#style-color-teal')
    await core.click(page, '#done-button')
    await core.click(page, '#apply-button')
    await page.waitForTimeout(3000)
    expect(await runner.captureAndMatch('S3_test1_Zone_Risque_Industriel')).beTrue()
    //await page.screenshot({ path: './test/data/style/screenrefs/S3_test1_Zone_Risque_Industriel_test.png' })
  })
  
  it('polygon: remove layer', async () => {
    await map.removeLayer(page, userLayersTab, 'Zone_Risque_Industriel')
  })
  
  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})