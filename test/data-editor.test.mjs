import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client.js'

const suite = 'data-editor'

const userLayersTab = 'user-layers-tab'

describe(`suite:${suite}`, () => {
  let runner, page
  const user = [
    { email: 'user-kano@kalisio.xyz', password: 'Pass;word1' },
    { email: 'admin-kano@kalisio.xyz', password: 'Pass;word1' }
  ]
  const currentUser = user[1]

  before(async () => {
    chailint(chai, util)

    runner = new core.Runner(suite, {
      appName: 'kano',
      user: currentUser.email,
      geolocation: { latitude: 43.31486, longitude: 1.95557 },
      localStorage: {
        'kano-welcome': false
      }
    })
    page = await runner.start()
    await core.login(page, currentUser)
  })

  it('create layer', async () => {
    await map.createLayer(page, 'saisie', runner.getDataPath('saisie.json'), 'id', 500)
    await core.clickPaneAction(page, 'top', 'accept')
  })

  it('add line', async () => {
    await map.goToPosition(page, 43.31588, 1.95109)
    await map.zoomToLevel(page, 17)
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-data'], 1500)
    await core.clickPaneAction(page, 'top', 'add-lines')
    await core.click(page, '#map', 1000)
    await map.moveMap(page, 'up', 4)
    await map.moveMap(page, 'right', 3)
    await page.waitForNetworkIdle()
    await core.click(page, '#map', 2000)
    await core.click(page, '#map', 1000)
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-data'], 1500)
    expect(await runner.captureAndMatch('t1-line')).beTrue()
  })

  it('add points', async () => {
    await map.zoomToLevel(page, 15)
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-data'], 1500)
    await core.clickPaneAction(page, 'top', 'add-points', 1000)
    await map.moveMap(page, 'left', 2)
    await page.waitForNetworkIdle()
    await core.click(page, '#map', 1000)
    await map.moveMap(page, 'right', 4)
    await core.click(page, '#map', 1000)
    await page.waitForNetworkIdle()
    await core.clickPaneAction(page, 'top', 'accept')
    // await page.screenshot({ path: './test/data/schema/screenrefs/t2-points.png' })
    expect(await runner.captureAndMatch('t2-points')).beTrue()
  })

  it('save layer', async () => {
    await map.saveLayer(page, userLayersTab, 'saisie', 1500)
  })

  it('add rectangle', async () => {
    await map.goToPosition(page, 43.31501, 1.9547)
    await map.zoomToLevel(page, 17)
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-data'], 1500)
    await core.clickPaneAction(page, 'top', 'add-rectangles', 1000)
    await core.click(page, '#map', 1000)
    await map.moveMap(page, 'down', 2)
    await map.moveMap(page, 'right', 2)
    await core.click(page, '#map', 1000)
    await core.clickPaneAction(page, 'top', 'accept')
    // await page.screenshot({ path: './test/data/schema/screenrefs/t3-rectangle.png' })
    expect(await runner.captureAndMatch('t3-rectangle')).beTrue()
  })

  it('add polygon', async () => {
    await map.goToPosition(page, 43.31359, 1.95684)
    await map.zoomToLevel(page, 17)
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-data'], 1500)
    await core.clickPaneAction(page, 'top', 'add-polygons', 1000)
    await core.click(page, '#map')
    await map.moveMap(page, 'down', 1)
    await core.click(page, '#map')
    await map.moveMap(page, 'down', 1)
    await map.moveMap(page, 'right', 1)
    await core.click(page, '#map')
    await map.moveMap(page, 'right', 1)
    await core.click(page, '#map')
    await map.moveMap(page, 'up', 1)
    await core.click(page, '#map')
    await map.moveMap(page, 'up', 1)
    await map.moveMap(page, 'left', 1)
    await core.click(page, '#map')
    await map.moveMap(page, 'left', 1)
    await core.click(page, '#map')
    await core.click(page, '#map')
    await core.clickPaneAction(page, 'top', 'accept')
    expect(await runner.captureAndMatch('t4-polygon')).beTrue()
  })

  it('show all features', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'zoom-to-layer'], 1500)
    await page.waitForTimeout(3000)
    expect(await runner.captureAndMatch('t5-zoom-to')).beTrue()
  })

  it('remove rectangle', async () => {
    await map.goToPosition(page, 43.31523, 1.95554)
    await map.zoomToLevel(page, 17)
    await map.moveMap(page, 'down', 1)
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-data'], 1500)
    await core.clickPaneAction(page, 'top', 'remove', 1000)
    await core.click(page, '#map', 1500)
    await core.clickPaneAction(page, 'top', 'accept')
    await page.waitForTimeout(1500)
    expect(await runner.captureAndMatch('t6-remove-rectangle')).beTrue()
  })

  it('remove point', async () => {
    await map.goToPosition(page, 43.31904, 1.96055)
    await map.zoomToLevel(page, 17)
    await map.moveMap(page, 'down', 1)
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-data'], 1500)
    await core.clickPaneAction(page, 'top', 'remove', 1000)
    await core.click(page, '#map', 1500)
    // stop editing using 'accept' arrow
    await core.clickPaneAction(page, 'top', 'accept')
    await page.waitForTimeout(1500)
    expect(await runner.captureAndMatch('t7-remove-point')).beTrue()
  })

  it('remove line', async () => {
    await map.goToPosition(page, 43.31652, 1.95110)
    await map.zoomToLevel(page, 17)
    await map.moveMap(page, 'down', 1)
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-data'], 1500)
    await core.clickPaneAction(page, 'top', 'remove', 1000)
    await core.click(page, '#map', 1500)
    // stop editing using layer menu link
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-data'], 1500)
    await page.waitForTimeout(1500)
    expect(await runner.captureAndMatch('t8-remove-line')).beTrue()
  })

  it('edit point', async () => {
    await map.goToPosition(page, 43.31902, 1.94681)
    await map.zoomToLevel(page, 17)
    await map.moveMap(page, 'down', 1)
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-data'], 1500)
    await core.clickPaneAction(page, 'top', 'edit-properties', 1500)
    await core.click(page, '#map', 500)
    await core.type(page, '#id-field', 'pt1', false, true)
    await core.type(page, '#Nom-field', 'Point 1')
    await core.type(page, '#Information-field', 'Point 1 description')
    await core.click(page, '#apply-button', 1500)
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-data'], 1500)
  })

  it('edit polygon', async () => {
    await map.goToPosition(page, 43.31379, 1.95728)
    await map.zoomToLevel(page, 17)
    await map.moveMap(page, 'down', 1)
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-data'], 1500)
    await core.clickPaneAction(page, 'top', 'edit-properties', 1500)
    await core.click(page, '#map', 500)
    await core.type(page, '#id-field', 'pol1', false, true)
    await core.type(page, '#Nom-field', 'Polygon 1')
    await core.type(page, '#Information-field', 'Polygon 1 description')
    await core.click(page, '#apply-button', 1500)
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-data'], 1500)
  })

  it('view data', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'view-layer-data'], 1500)
    await page.waitForTimeout(1500)
    expect(await runner.captureAndMatch('t9-view-data')).beTrue()
    await core.click(page, '#item-actions #zoom-to', 1500)
    expect(await runner.captureAndMatch('t10-go-to-feature')).beTrue()
  })

  it('remove layer', async () => {
    await map.removeLayer(page, userLayersTab, 'saisie')
  })

  after(async () => {
    await page.waitForTimeout(5000)
    await core.logout(page)
    await runner.stop()
  })
})
