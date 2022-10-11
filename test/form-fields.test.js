import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client'

const suite = 'form-fields'

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
      }/* ,
      mode: 'screenshots' */
    })
    page = await runner.start()
    await core.login(page, currentUser)
  })

  it('load layer', async () => {
    await map.createLayer(page, 'form-fields', runner.getDataPath('form-fields.json'), 'id', 500)
    await core.clickTopPaneAction(page, 'accept')
  })

  it('save layer', async () => {
    await page.waitForTimeout(2000)
    await map.saveLayer(page, userLayersTab, 'form-fields', 1500)
  })

  it('add point', async () => {
    await map.goToPosition(page, 43.31902, 1.94681, 1500)
    await map.zoomToLevel(page, 17)
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-layer-data', 1500)
    await core.clickTopPaneAction(page, 'add-points', 1000)
    await map.moveMap(page, 'left', 1)
    await core.click(page, '#map', 1000)
    await core.clickTopPaneAction(page, 'accept')
    await page.waitForTimeout(2000)
    // await page.screenshot({ path: './test/data/schema/screenrefs/t1-point-test.png' })
    expect(await runner.captureAndMatch('t1-point')).beTrue()
  })

  it('edit point', async () => {
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'edit-layer-data', 1500)
    await core.clickTopPaneAction(page, 'edit-properties', 1500)
    await core.click(page, '#map', 500)
    await core.type(page, '#id-field', 'pt1', false, true)
    await core.type(page, '#nom-field', 'Point 1')
    await core.type(page, '#information-field', 'Point 1 description')
    await core.click(page, '#type-field', 500)
    await core.click(page, '#a', 500)
    await core.type(page, '#number-field', '19aa09zz1978')
    await page.waitForTimeout(2000)
    // await page.screenshot({ path: './test/data/schema/screenrefs/t2-form.png' })
    expect(await runner.captureAndMatch('t2-form')).beTrue()
    await core.click(page, '#apply-button', 1500)
  })

  it('view data', async () => {
    await core.clickRightPaneAction(page, 'layer-actions', 1500)
    await core.clickRightPaneAction(page, 'view-layer-data', 1500)
    await page.waitForTimeout(1500)
    expect(await runner.captureAndMatch('t3-view-data')).beTrue()
    await core.click(page, '#close-button', 500)
  })

  it('remove layer', async () => {
    await map.removeLayer(page, userLayersTab, 'form-fields')
  })

  after(async () => {
    await page.waitForTimeout(5000)
    await core.logout(page)
    await runner.stop()
  })
})
