import _ from 'lodash'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client'

const suite = 'widgets'

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
      }/* ,
      mode: 'screenshots' */
    })
    page = await runner.start()
    await core.login(page, current_user)
  })

  it('import geojson file', async () => {
    await map.importLayer(page, runner.getDataPath('elevation-line.geojson'), 'id')
  })

  it('see elevation profile', async () => {
    await map.goToPosition(page, 43.30955, 1.94464, 500)
    await map.zoomToLevel(page, 15)
    await core.click(page, '#map', 1000)
    await core.clickAction(page, 'widgets-menu-items', 1000)
    await core.clickAction(page, 'elevation-profile', 1000)
    //await page.waitForTimeout(5000)
    expect(await runner.captureAndMatch('elevation-line')).beTrue()
  })

  after(async () => {
    await page.waitForTimeout(5000)
    await core.logout(page)
    await runner.stop()
  })
})
