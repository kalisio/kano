import { expect } from 'chai'
import { core } from '@kalisio/kdk/test.client'

const suite = 'layout'

const runnerOptions = {
  geolocation: { latitude: 43.10, longitude:1.71 },
  localStorage: {
    'kano-welcome': false
  }
}

describe(suite, () => {
  let runner
  let page

  before(async () => {
    runner = new core.Runner(suite, runnerOptions)
    page = await runner.start()
    await core.login(page, 'kalisio@kalisio.xyz', 'Pass;word1')
  })

  it('check-layout', async () => {
    let isTopPaneVisible = await core.isTopPaneVisible(page)
    expect(isTopPaneVisible).be.true
    let isRightPaneVisible = await core.isRightPaneVisible(page)
    expect(isRightPaneVisible).be.false
    let isBottomPaneVisible = await core.isBottomPaneVisible(page)
    expect(isBottomPaneVisible).be.false
    let isLeftPaneVisible = await core.isLeftPaneVisible(page)
    expect(isLeftPaneVisible).be.false        
    await core.clickTopOpener(page)
    await page.waitForTimeout(1000)
    isTopPaneVisible = await core.isTopPaneVisible(page)
    expect(isTopPaneVisible).be.false
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})