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
    const match = await runner.captureAndMatch('geolocation')
    await core.clickPaneAction(page, 'top', 'locate-user')
    expect(match).beTrue()
  })

  it('search location', async () => {
    await core.clickPaneAction(page, 'top', 'search-location')
    let selector = '#location-search'
    await core.type(page, selector, 'place du capitole')
    await page.waitForNetworkIdle()
    await page.waitForTimeout(1000)
    selector = '.q-menu .q-item'
    await core.click(page, selector)
    await page.waitForNetworkIdle()
    await page.waitForTimeout(1000)
    const match = await runner.captureAndMatch('location')
    await core.clickAction(page, 'back')
    expect(match).beTrue()
  })

  it('display position', async () => {
    await core.clickPaneActions(page, 'top', ['tools', 'display-position'])
    const match = await runner.captureAndMatch('position')
    await core.clickAction(page, 'back')
    expect(match).beTrue()
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
