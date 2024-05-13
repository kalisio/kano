import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client.js'

const suite = 'info-display'

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

  it('import geojson file', async () => {
    await map.importLayer(page, runner.getDataPath('Castelnaudary_Hydro.geojson'), 'id')
  })

  it('configure and check information box', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-style'])
    await core.click(page, '#style-infobox-group')
    await core.click(page, '#style-infobox-field')
    await core.click(page, '#id')
    await core.click(page, '#longueur-en-km')
    await core.click(page, '#nom-usite')
    await core.click(page, '#style-infobox-field')
    await core.click(page, '#apply-button')
    await page.waitForTimeout(2000)
    await map.goToPosition(page, 43.30312, 1.95054)
    await core.click(page, '#map', 2000)
    expect(await runner.captureAndMatch('t1-infobox')).beTrue()
    await core.closeWindow(page, 'top')
  })

  it('disable information box', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-style'])
    await core.click(page, '#style-infobox-group')
    await core.click(page, '#style-toggle-infobox')
    await core.click(page, '#apply-button')
    await page.waitForTimeout(2000)
    await map.goToPosition(page, 43.30312, 1.95054)
    await core.click(page, '#map', 2000)
    expect(await runner.captureAndMatch('t2-no-infobox')).beTrue()
    await core.closeWindow(page, 'top')
  })

  it('disable selectable', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-style'])
    await core.click(page, '#style-is-selectable')
    await core.click(page, '#apply-button')
    await page.waitForTimeout(2000)
    await map.goToPosition(page, 43.30312, 1.95054)
    await core.click(page, '#map', 1000)
    await page.waitForTimeout(2000)
    expect(await runner.captureAndMatch('t3-no-empty-infobox')).beTrue()
  })

  it('configure and check popup', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-style'])
    await core.click(page, '#style-popup-group')
    await core.click(page, '#style-toggle-popup')
    await core.click(page, '#style-popup-field')
    await core.click(page, '#nom')
    await core.click(page, '#longueur-en-km')
    await core.click(page, '#style-popup-field')
    await core.click(page, '#apply-button')
    await page.waitForTimeout(2000)
    await map.goToPosition(page, 43.30312, 1.95054)
    await core.click(page, '#map', 1000)
    await page.waitForTimeout(2000)
    const match = await runner.captureAndMatch('t4-popup')
    expect(match).beTrue()
    await core.click(page, '.leaflet-popup-close-button', 1000)
  })

  it('disable popup', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-style'])
    await core.click(page, '#style-popup-group')
    await core.click(page, '#style-toggle-popup')
    await page.waitForTimeout(2000)
    await core.click(page, '#apply-button')
    await page.waitForTimeout(2000)
    await map.goToPosition(page, 43.30312, 1.95054)
    await core.click(page, '#map', 1000)
    await page.waitForTimeout(2000)
    expect(await runner.captureAndMatch('t5-no-popup')).beTrue()
  })

  it('configure and check tooltip', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-style'])
    await core.click(page, '#style-tooltip-group')
    await core.click(page, '#style-toggle-tooltip')
    await core.click(page, '#style-tooltip-field')
    await core.click(page, '#nom')
    await core.click(page, '#style-tooltip-field')
    await core.click(page, '#apply-button')
    await page.waitForTimeout(2000)
    await map.goToPosition(page, 43.30312, 1.95054)
    await core.click(page, '#map', 1000)
    await page.waitForTimeout(2000)
    expect(await runner.captureAndMatch('t6-tooltip')).beTrue()
  })

  it('disable tooltip', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer-style'])
    await core.click(page, '#style-tooltip-group')
    await core.click(page, '#style-toggle-tooltip')
    await page.waitForTimeout(2000)
    await core.click(page, '#apply-button')
    await page.waitForTimeout(2000)
    await map.goToPosition(page, 43.30312, 1.95054)
    await core.click(page, '#map', 1000)
    await page.waitForTimeout(2000)
    expect(await runner.captureAndMatch('t7-no-tooltip')).beTrue()
  })

  after(async () => {
    await page.waitForTimeout(5000)
    await core.logout(page)
    await runner.stop()
  })
})
