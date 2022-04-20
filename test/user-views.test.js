import _ from 'lodash'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client'

const suite = 'user-views'

const userViewsTab = 'user-views-tab'
const catalogLayersTab = 'catalog-layers-tab'

describe(`suite:${suite}`, () => {
  let runner, page
  const user = { email: 'admin-kano@kalisio.xyz', password: 'Pass;word1' }

  before(async () => {
    chailint(chai, util)

    runner = new core.Runner(suite, {
      appName: 'kano',
      geolocation: { latitude: 43.10, longitude: 1.71 },
      localStorage: {
        'kano-welcome': false
      },
      mode: 'screenshots'
    })
    page = await runner.start()
    await core.login(page, user)
  })

  it('create views', async () => {
    const andorraExtent = [42.3915, 1.2847, 42.7051, 1.9315]
    const toulouseExtent = [43.5895, 1.41584, 43.6087, 1.4562]
    await map.zoomToExtent(page, andorraExtent)
    await map.createView(page, 'Andorra', false)
    await map.zoomToExtent(page, toulouseExtent)
    await map.clickLayer(page, catalogLayersTab, 'HYBRID')
    await map.createView(page, 'Toulouse', true)
    expect(await map.viewExists(page, userViewsTab, 'Andorra')).beTrue()
    expect(await map.viewExists(page, userViewsTab, 'Toulouse')).beTrue()
  })

  it('restore andorra', async () => {
    await map.clickView(page, userViewsTab, 'Andorra')
    const match = await runner.captureAndMatch('andorra')
    expect(match).beTrue()
  })

  it('restore toulouse', async () => {
    await map.clickView(page, userViewsTab, 'Toulouse')
    const match = await runner.captureAndMatch('toulouse')
    expect(match).beTrue()
  })

  it('remove views', async () => {
    await map.removeView(page, userViewsTab, 'Andorra')
    await map.removeView(page, userViewsTab, 'Toulouse')
    expect(await map.viewExists(page, userViewsTab, 'Andorra')).beFalse()
    expect(await map.viewExists(page, userViewsTab, 'Toulouse')).beFalse()
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
