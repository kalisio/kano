import { expect } from 'chai'
import { core, map } from '@kalisio/kdk/test.client'

const suite = 'mask'

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

  it('add polygon mask', async () => {
    await map.dropFile(page, runner.getDataPath('ariege.geojson'))
    expect(await runner.captureAndMatch('polygon-mask')).to.true
    await map.removeLayer(page, 'ariege')
    await core.clickRightOpener(page)
  })

  it('add multi-polygon mask', async () => {
    await map.dropFile(page, runner.getDataPath('occitanie.geojson'))
    expect(await runner.captureAndMatch('multi-polygon-mask')).to.true
    await map.removeLayer(page, 'occitanie')
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})