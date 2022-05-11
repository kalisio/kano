import _ from 'lodash'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client'

const suite = 'schema'

const userLayersTab = 'user-layers-tab'

describe(`suite:${suite}`, () => {
  let runner, page
  const user = [
    { email: 'user-kano@kalisio.xyz', password: 'Pass;word1' },
    { email: 'admin-kano@kalisio.xyz', password: 'Pass;word1' }
  ]
  const current_user = user[1]

  before(async () => {
    chailint(chai, util)

    runner = new core.Runner(suite, {
      appName: 'kano',
      user: current_user.email,
      geolocation: { latitude: 43.31486, longitude: 1.95557 },
      localStorage: {
        'kano-welcome': false
      },
      mode: 'screenshots'
    })
    page = await runner.start()
    await core.login(page, current_user)
  })

  it('create layer', async () => {
    await map.goToPosition(page, 43.31588, 1.95109, 1500)
    await map.zoomToLevel(page, 17)
    await map.createLayer(page, 'saisie', runner.getDataPath('saisie.json'), 'id', 1500)
  })

  it('add line', async () => {
    await core.clickTopPaneAction(page, 'add-lines')
    await page.waitForTimeout(1500)
    await core.click(page, '#map', 2000)
    await map.mapInteraction(page, 'up', 4, 500)
    await map.mapInteraction(page, 'right', 3, 500)
    await core.click(page, '#map', 2000)
    await page.waitForTimeout(1500)
    await core.click(page, '#map')
    await core.clickRightPaneAction(page, 'layer-actions')
    await core.clickRightPaneAction(page, 'edit-data', 1500)
    //const match = await runner.captureAndMatch('line')
    //await page.screenshot({ path: './test/data/schema/screenrefs/line.png' })
    //expect(await runner.captureAndMatch('line')).beTrue()
  })

  it('add points', async () => {
    await core.zoomToLevel(page, 15)
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-data', 1500)
    await core.clickTopPaneAction(page, 'add-points', 1000)
    await map.mapInteraction(page, 'left', 2, 500)
    await core.click(page, '#map', 2000)
    await map.mapInteraction(page, 'right', 4, 500)
    await core.click(page, '#map', 2000)
    await core.clickTopPaneAction(page, 'accept')
    //const match = await runner.captureAndMatch('points')
    //await page.screenshot({ path: './test/data/schema/screenrefs/points.png' })
    //expect(await runner.captureAndMatch('points')).beTrue()
  })

  it('save layer', async () => {
    await map.saveLayer(page, userLayersTab, 'saisie', 2000)
    //await core.clickRightPaneAction(page, 'zoom-to', 1500)
    //const match = await runner.captureAndMatch('polygon')
    //await page.screenshot({ path: './test/data/schema/screenrefs/all_features.png' })
    //expect(await runner.captureAndMatch('polygon')).beTrue()
  })

  it('add rectangle', async () => {
    await map.goToPosition(page, 43.31501, 1.9547, 1500)
    await map.zoomToLevel(page, 17)
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-data', 1500)
    await core.clickTopPaneAction(page, 'add-rectangles', 1000)
    await core.click(page, '#map', 2000)
    await map.mapInteraction(page, 'down', 2, 500)
    await map.mapInteraction(page, 'right', 2, 500)
    await core.click(page, '#map', 2000)
    await core.clickTopPaneAction(page, 'accept')
  })

  it('edit style', async () => {
    await core.clickRightPaneAction(page, 'layer-actions')
    await core.clickRightPaneAction(page, 'edit-style')
    await core.click(page, '#apply-button')
  })

  it('remove rectangle', async () => {
    await map.goToPosition(page, 43.31441, 1.95556, 1500)
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-data', 1500)
    await core.clickTopPaneAction(page, 'remove', 1000)
    await core.click(page, '#map', 1500)
    await core.clickTopPaneAction(page, 'accept')
  })

  it('add polygon', async () => {
    await map.goToPosition(page, 43.31359, 1.95684, 1500)
    await map.zoomToLevel(page, 17)
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-data', 1500)
    await core.clickTopPaneAction(page, 'add-polygons', 1000)
    await core.click(page, '#map', 2000)
    await map.mapInteraction(page, 'down', 1, 500)
    await core.click(page, '#map', 2000)
    await map.mapInteraction(page, 'down', 1, 500)
    await map.mapInteraction(page, 'right', 1, 500)
    await core.click(page, '#map', 2000)
    await map.mapInteraction(page, 'right', 1, 500)
    await core.click(page, '#map', 2000)
    await map.mapInteraction(page, 'up', 1, 500)
    await core.click(page, '#map', 2000)
    await map.mapInteraction(page, 'left', 1, 500)
    await map.mapInteraction(page, 'up', 1, 500)
    await core.click(page, '#map', 2000)
    await core.click(page, '#map', 2000)
    await page.waitForTimeout(5000)
    await core.clickTopPaneAction(page, 'accept')
    await page.waitForTimeout(3000)
    //const match = await runner.captureAndMatch('polygon')
    //await page.screenshot({ path: './test/data/schema/screenrefs/polygon.png' })
    //expect(await runner.captureAndMatch('polygon')).beTrue()
  })

  /* it('edit properties', async () => {
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-data', 1500)
    await core.clickXPath(page, '/html/body/div[1]/div[2]/div[2]/div/div/main/div[1]/div/div[1]/div[1]/div[3]/svg/g/path')
    await core.clickTopPaneAction(page, 'edit-properties')
    await core.type(page, '#id-field', 1)
    await core.type(page, '#nom-field', `Test name`)
    await core.type(page, '#obs-field', `Test observation`)
    await core.clickAction(page, 'apply-button', 1000)
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-data', 1500)
  }) */

  /* it('remove layer', async () => {
    await map.removeLayer(page, userLayersTab, 'test')
  }) */
  
  after(async () => {
    await page.waitForTimeout(5000)
    await core.logout(page)
    await runner.stop()
  })
})