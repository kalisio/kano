import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import { core } from '@kalisio/kdk/test.client.js'

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
      }
    })
    page = await runner.start()
    await core.login(page, user)
  })

  it('locate user', async () => {
    await core.clickPaneAction(page, 'top', 'locate-user')
    await page.waitForNetworkIdle()
    await page.waitForTimeout(1000)
    // await page.screenshot({ path: './test/data/controls/screenrefs/geolocation-test.png' })
    expect(await runner.captureAndMatch('geolocation')).beTrue()
    await core.clickPaneAction(page, 'top', 'locate-user')
  })

  it('search location', async () => {
    await core.clickPaneAction(page, 'top', 'search-location')
    let selector = '#place-chooser'
    await core.type(page, selector, 'place du capitole')
    await page.waitForTimeout(3000)
    selector = '.q-menu .q-item'
    await core.click(page, selector)
    await page.waitForNetworkIdle()
    await page.waitForTimeout(1000)
    // await page.screenshot({ path: './test/data/controls/screenrefs/location-test.png' })
    expect(await runner.captureAndMatch('location')).beTrue()
    await core.clickAction(page, 'back')
  })

  it('display position', async () => {
    await core.clickPaneActions(page, 'top', ['tools', 'display-position'])
    // await page.screenshot({ path: './test/data/controls/screenrefs/position-test.png' })
    expect(await runner.captureAndMatch('position')).beTrue()
    await core.clickAction(page, 'back')
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
