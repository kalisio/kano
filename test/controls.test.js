import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import { core } from '@kalisio/kdk/test.client'

const suite = 'controls'

describe(`suite:${suite}`, () => {
  let runner, page
  const user = { email: 'user-kano@kalisio.xyz', password: 'Pass;word1' }

  before(async () => {
    chailint(chai, util)

    runner = new core.Runner(suite, {
      appName: 'kano',
      user: user.email,
      geolocation: { latitude: 43.10, longitude: 1.71 },
      localStorage: {
        'kano-welcome': false
      }/* ,
      mode: 'screenshots' */
    })
    page = await runner.start()
    await core.login(page, user)
  })

  it('locate user', async () => {
    await core.clickTopPaneAction(page, 'locate-user')
    await core.waitForImagesLoaded(page)
    await page.waitForTimeout(1000)
    // await page.screenshot({ path: './test/data/controls/screenrefs/geolocation-test.png' })
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
    // await page.screenshot({ path: './test/data/controls/screenrefs/location-test.png' })
    expect(await runner.captureAndMatch('location')).beTrue()
    await core.clickAction(page, 'back')
  })

  it('display position', async () => {
    await core.clickTopPaneAction(page, 'tools')
    await core.clickTopPaneAction(page, 'display-position')
    // await page.screenshot({ path: './test/data/controls/screenrefs/position-test.png' })
    expect(await runner.captureAndMatch('position')).beTrue()
    await core.clickAction(page, 'back')
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
