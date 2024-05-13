import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import { core } from '@kalisio/kdk/test.client.js'

const suite = 'layout'

async function checkLayout (page, fabActionsCount) {
  expect(await core.isPaneVisible(page, 'top')).beTrue()
  expect(await core.isPaneVisible(page, 'right')).beFalse()
  expect(await core.isPaneVisible(page, 'bottom')).beFalse()
  expect(await core.isPaneVisible(page, 'left')).beFalse()
  await core.clickOpener(page, 'top')
  expect(await core.isPaneVisible(page, 'top')).beFalse()
  await core.clickOpener(page, 'top')
  expect(await core.isPaneVisible(page, 'top')).beTrue()
  await core.clickOpener(page, 'right')
  expect(await core.isPaneVisible(page, 'top')).beTrue()
  await core.clickOpener(page, 'right')
  expect(await core.isPaneVisible(page, 'right')).beFalse()
  await core.clickOpener(page, 'bottom')
  expect(await core.isPaneVisible(page, 'bottom')).beTrue()
  await core.clickOpener(page, 'bottom')
  expect(await core.isPaneVisible(page, 'bottom')).beFalse()
  await core.clickFab(page)
  expect(await await core.countFabActions(page)).to.equal(fabActionsCount)
}

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
    await checkLayout(page, 2)
  })

  it('switch to admin', async () => {
    await core.logout(page)
    await core.goToLoginScreen(page)
    await core.login(page, user[1])
  })

  it('admin: check layout', async () => {
    await checkLayout(page, 4)
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
