import { expect } from 'chai'
import { core } from '@kalisio/kdk/test.client'

const suite = 'controls'

describe(`suite:${suite}`, () => {
  let runner, page
  const user = { email: 'kalisio@kalisio.xyz', password: 'Pass;word1' }

  before(async () => {
    runner = new core.Runner(suite, {
      appName: 'kano',
      geolocation: { latitude: 43.10, longitude: 1.71 },
      localStorage: {
        'kano-welcome': false
      }
    })
    page = await runner.start()
    await core.login(page, user)
  })

  it('locate user', async () => {
    await core.clickTopPaneAction(page, 'locate-user')
    await core.waitForImagesLoaded(page)
    await page.waitForTimeout(1000)
    expect(await runner.captureAndMatch('geolocation')).beTrue()
    await core.clickTopPaneAction(page, 'locate-user')
  })

  it('search location', async () => {
    await core.clickTopPaneAction(page, 'search-location')
    let selector = '#place-chooser input'
    await core.type(page, selector, 'place du capitole')
    await page.waitForTimeout(3000)
    selector = '.q-menu .q-item'
    await core.click(page, selector)
    await core.waitForImagesLoaded(page)
    await page.waitForTimeout(1000)
    expect(await runner.captureAndMatch('location')).beTrue()
    await core.clickAction(page, 'back')
  })

  it('display position', async () => {
    await core.clickTopPaneAction(page, 'tools')
    await core.clickTopPaneAction(page, 'display-position')
    expect(await runner.captureAndMatch('position')).beTrue()
    await core.clickAction(page, 'back')
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
