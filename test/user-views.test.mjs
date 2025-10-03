import chai, { expect, util } from 'chai'
import chailint from 'chai-lint'

import { core, map } from './kdk/index.mjs'

const suite = 'user-views'

const userViewsTab = 'user-views'
const catalogLayersTab = 'catalog-layers'

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
        'kano-welcome': false,
        'kano-install': false
      }
    })
    page = await runner.start()
    await core.login(page, user[1])
  })

  it('admin: create Andorra view', async () => {
    // const extent = [42.3915, 1.2847, 42.7051, 1.9315]
    // await map.zoomToExtent(page, extent)
    // Use alternative as zoom to extent, as it is currently broken
    await map.goToPosition(page, 42.54419, 1.59070)
    await map.zoomToLevel(page, 'mapActivity', 11)
    await map.createView(page, 'Andorra', false)
    const exists = await map.viewExists(page, userViewsTab, 'Andorra')
    expect(exists).beTrue()
  })

  it('admin: create Toulouse view', async () => {
    // const extent = [43.5895, 1.41584, 43.6087, 1.4562]
    // await map.zoomToExtent(page, extent)
    // Use alternative as zoom to extent, as it is currently broken
    await map.goToPosition(page, 43.60234, 1.44159)
    await map.zoomToLevel(page, 'mapActivity', 15)
    await map.clickLayer(page, catalogLayersTab, 'HYBRID')
    await map.createView(page, 'Toulouse', true)
    const exists = await map.viewExists(page, userViewsTab, 'Toulouse')
    expect(exists).beTrue()
  })

  it('switch to user', async () => {
    await core.logout(page)
    await core.goToLoginScreen(page)
    await core.login(page, user[0])
  })

  it('user: restore andorra view', async () => {
    await map.clickView(page, userViewsTab, 'Andorra')
    const match = await runner.captureAndMatch('andorra', null, 3)
    expect(match).beTrue()
  })

  it('user: restore toulouse view', async () => {
    await map.clickView(page, userViewsTab, 'Toulouse')
    const match = await runner.captureAndMatch('toulouse', null, 3)
    expect(match).beTrue()
  })

  it('user: can\'t create views', async () => {
    const exists = await core.elementExists(page, 'create-view')
    expect(exists).beFalse()
  })

  it('user: can\'t remove views', async () => {
    const exists = await core.elementExists(page, 'remove-view')
    expect(exists).beFalse()
  })

  it('switch to admin', async () => {
    await core.logout(page)
    await core.goToLoginScreen(page)
    await core.login(page, user[1])
  })

  it('admin: remove views', async () => {
    await map.removeView(page, userViewsTab, 'Andorra')
    await map.removeView(page, userViewsTab, 'Toulouse')
    let exists = await map.viewExists(page, userViewsTab, 'Andorra')
    expect(exists).beFalse()
    exists = await map.viewExists(page, userViewsTab, 'Toulouse')
    expect(exists).beFalse()
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
}).timeout(2 * 1000 * core.TestTimeoutMultiplier)
