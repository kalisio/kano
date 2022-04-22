import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import { core } from '@kalisio/kdk/test.client'

const suite = 'layout'

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
    await core.login(page, user[0])
  })

  it('user: check layout', async () => {
    expect(await core.isTopPaneVisible(page)).beTrue()
    expect(await core.isRightPaneVisible(page)).beFalse()
    expect(await core.isBottomPaneVisible(page)).beFalse()
    expect(await core.isLeftPaneVisible(page)).beFalse()
    await core.clickTopOpener(page)
    expect(await core.isTopPaneVisible(page)).beFalse()
  })

  it('switch to admin', async () => {
    await core.logout(page)
    await core.goToLoginScreen(page)
    await core.login(page, user[1])
  })

  it('admin: check layout', async () => {
    expect(await core.isTopPaneVisible(page)).beTrue()
    expect(await core.isRightPaneVisible(page)).beFalse()
    expect(await core.isBottomPaneVisible(page)).beFalse()
    expect(await core.isLeftPaneVisible(page)).beFalse()
    await core.clickTopOpener(page)
    expect(await core.isTopPaneVisible(page)).beFalse()
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
