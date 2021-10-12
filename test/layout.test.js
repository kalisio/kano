import { expect } from 'chai'
import { core } from '@kalisio/kdk/test.client'

const suite = 'layout'

describe(`suite:${suite}`, () => {
  let runner, page
  const user = { email: 'kalisio@kalisio.xyz', password: 'Pass;word1' }

  before(async () => {
    runner = new core.Runner(suite, {
      appName: 'kano',
      geolocation: { latitude: 43.10, longitude:1.71 },
      localStorage: {
        'kano-welcome': false
      }
    })
    page = await runner.start()
    await core.login(page, user)
  })

  it('check layout', async () => {
    expect(await core.isTopPaneVisible(page)).be.true
    expect(await core.isRightPaneVisible(page)).be.false
    expect(await core.isBottomPaneVisible(page)).be.false
    expect(await core.isLeftPaneVisible(page)).be.false        
    await core.clickTopOpener(page)
    expect(await core.isTopPaneVisible(page)).be.false
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})