import _ from 'lodash'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client'

const suite = 'info-display'

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
    await map.createLayer(page, 'saisie', runner.getDataPath('saisie.json'), 'id', 500)
    await core.clickTopPaneAction(page, 'accept')
  })

  /*
  Création 'K'
  */

  it('add line', async () => {
    await map.goToPosition(page, 43.41735, 1.63782, 500)
    await map.zoomToLevel(page, 9)
    await core.clickRightPaneAction(page, 'layer-actions')
    await core.clickRightPaneAction(page, 'edit-data', 500)
    await core.clickTopPaneAction(page, 'add-lines')
    await page.waitForTimeout(1000)
    await core.click(page, '#map', 1000)
    await map.moveMap(page, 'down', 4)
    await core.click(page, '#map', 1000)
    await page.waitForTimeout(1500)
    await core.click(page, '#map')
    await core.clickRightPaneAction(page, 'layer-actions')
    await core.clickRightPaneAction(page, 'edit-data', 1500)
  })

  it('add line', async () => {
    await map.moveMap(page, 'up', 2)
    await core.clickRightPaneAction(page, 'layer-actions')
    await core.clickRightPaneAction(page, 'edit-data', 500)
    await core.clickTopPaneAction(page, 'add-lines')
    await page.waitForTimeout(1000)
    await core.click(page, '#map', 1000)
    await map.moveMap(page, 'up', 2)
    await map.moveMap(page, 'right', 1)
    await core.click(page, '#map', 1000)
    await page.waitForTimeout(1500)
    await core.click(page, '#map')
    await core.clickRightPaneAction(page, 'layer-actions')
    await core.clickRightPaneAction(page, 'edit-data', 1500)
  })

  it('add line', async () => {
    await map.moveMap(page, 'down', 2)
    await map.moveMap(page, 'left', 1)
    await core.clickRightPaneAction(page, 'layer-actions')
    await core.clickRightPaneAction(page, 'edit-data', 500)
    await core.clickTopPaneAction(page, 'add-lines')
    await page.waitForTimeout(1000)
    await core.click(page, '#map', 1000)
    await map.moveMap(page, 'down', 2)
    await map.moveMap(page, 'right', 1)
    await core.click(page, '#map', 1000)
    await page.waitForTimeout(1500)
    await core.click(page, '#map')
    await core.clickRightPaneAction(page, 'layer-actions')
    await core.clickRightPaneAction(page, 'edit-data', 1500)
    expect(await runner.captureAndMatch('t1-k-lines')).beTrue()
  })

  /*
  Fin création 'K'
  */

   it('add points', async () => {
    await map.zoomToLevel(page, 15)
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-data', 1500)
    await core.clickTopPaneAction(page, 'add-points', 1000)
    await map.moveMap(page, 'left', 2)
    await core.click(page, '#map', 1000)
    await core.clickTopPaneAction(page, 'accept')
    //await page.screenshot({ path: './test/data/schema/screenrefs/t2-points.png' })
    expect(await runner.captureAndMatch('t2-points')).beTrue()
  })

   it('save layer', async () => {
    await map.saveLayer(page, userLayersTab, 'k', 1500)
  })

  /* it('add rectangle', async () => {
    await map.goToPosition(page, 43.31501, 1.9547, 1500)
    await map.zoomToLevel(page, 17)
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-data', 1500)
    await core.clickTopPaneAction(page, 'add-rectangles', 1000)
    await core.click(page, '#map', 1000)
    await map.moveMap(page, 'down', 2)
    await map.moveMap(page, 'right', 2)
    await core.click(page, '#map', 1000)
    await core.clickTopPaneAction(page, 'accept')
    //await page.screenshot({ path: './test/data/schema/screenrefs/t3-rectangle.png' })
    expect(await runner.captureAndMatch('t3-rectangle')).beTrue()
  }) */

  /* it('add polygon', async () => {
    await map.goToPosition(page, 43.31359, 1.95684, 1500)
    await map.zoomToLevel(page, 17)
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-data', 1500)
    await core.clickTopPaneAction(page, 'add-polygons', 1000)
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
    await core.clickTopPaneAction(page, 'accept')
    expect(await runner.captureAndMatch('t4-polygon')).beTrue()
  }) */

  /* it('edit point', async () => {
    await map.goToPosition(page, 43.31902, 1.94681, 1500)
    await map.zoomToLevel(page, 17)
    await map.moveMap(page, 'down', 1)
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-data', 1500)
    await core.clickTopPaneAction(page, 'edit-properties', 1500)
    await core.click(page, '#map', 500)
    await core.type(page, '#id-field', 'pt1', false, true)
    await core.type(page, '#Nom-field', 'Point 1')
    await core.type(page, '#Information-field', 'Point 1 description')
    await core.click(page, '#apply-button', 1500)
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-data', 1500)
  }) */

  /* it('edit polygon', async () => {
    await map.goToPosition(page, 43.31379, 1.95728, 1500)
    await map.zoomToLevel(page, 17)
    await map.moveMap(page, 'down', 1)
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-data', 1500)
    await core.clickTopPaneAction(page, 'edit-properties', 1500)
    await core.click(page, '#map', 500)
    await core.type(page, '#id-field', 'pol1', false, true)
    await core.type(page, '#Nom-field', 'Polygon 1')
    await core.type(page, '#Information-field', 'Polygon 1 description')
    await core.click(page, '#apply-button', 1500)
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-data', 1500)
  }) */
  /* /html/body/div[4]/div[2]/div[2]/div[2]/div */

  it('show feature info', async () => {
    await core.clickRightPaneAction(page, 'layer-actions')
    await core.clickRightPaneAction(page, 'edit-style')
    await core.click(page, '#style-popup-group')
    await core.click(page, '#style-toggle-popup')
    // await core.click(page, '#style-popup-field', 500)
    await page.$eval('.q-virtual-scroll__content', (el) => (el.value = 'Nom'))
    // await page.select('#style-popup-field', 'Nom')
    await page.waitForTimeout(3000)
    await core.click(page, '#apply-button')
  })

  after(async () => {
    await page.waitForTimeout(5000)
    await core.logout(page)
    await runner.stop()
  })
})
