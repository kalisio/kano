import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client'

const suite = 'user-views'

const userViewsTab = 'user-views-tab'
const catalogLayersTab = 'catalog-layers-tab'

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
      geolocation: { latitude: 43.10, longitude: 1.71 },
      localStorage: {
        'kano-welcome': false
      }
    })
    page = await runner.start()
    await core.login(page, user[1])
  })

  it('admin: create Andorra view', async () => {
    const extent = [42.3915, 1.2847, 42.7051, 1.9315]
    await map.zoomToExtent(page, extent)
    await map.createView(page, 'Andorra', false)
    expect(await map.viewExists(page, userViewsTab, 'Andorra')).beTrue()
  })

  it('admin: create Toulouse view', async () => {
    const extent = [43.5895, 1.41584, 43.6087, 1.4562]
    await map.zoomToExtent(page, extent)
    await map.clickLayer(page, catalogLayersTab, 'HYBRID')
    await map.createView(page, 'Toulouse', true)
    expect(await map.viewExists(page, userViewsTab, 'Toulouse')).beTrue()
  })

  it('switch to user', async () => {
    await core.logout(page)
    await core.goToLoginScreen(page)
    await core.login(page, user[0])
  })

  it('user: restore andorra view', async () => {
    await map.clickView(page, userViewsTab, 'Andorra')
    const match = await runner.captureAndMatch('andorra')
    expect(match).beTrue()
  })

  it('user: restore toulouse view', async () => {
    await map.clickView(page, userViewsTab, 'Toulouse')
    const match = await runner.captureAndMatch('toulouse')
    expect(match).beTrue()
  })

  it('user: can\'t create views', async () => {
    expect(await core.elementExists(page, 'create-view')).beFalse()
  })

  it('user: can\'t remove views', async () => {
    expect(await core.elementExists(page, 'remove-view')).beFalse()
  })

  it('switch to admin', async () => {
    await core.logout(page)
    await core.goToLoginScreen(page)
    await core.login(page, user[1])
  })

  it('admin: remove views', async () => {
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
