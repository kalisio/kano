import fs from 'fs-extra'
import moment from 'moment'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client.js'

const suite = 'widgets'

const catalogLayersTab = 'catalog-layers-tab'

function setTime (data) {
  // TODO: we should set a pre-defined time to compare images
  const time = moment.utc()
  data.forEach(measure => {
    measure.time = time.format()
    time.subtract(1, 'hours')
  })
}

describe(`suite:${suite}`, () => {
  let runner, api, client, page
  const user = [
    { email: 'user-kano@kalisio.xyz', password: 'Pass;word1' },
    { email: 'admin-kano@kalisio.xyz', password: 'Pass;word1' }
  ]
  const currentUser = user[1]

  before(async () => {
    chailint(chai, util)

    api = new core.Api({
      appName: 'kano'
    })
    client = api.createClient()
    runner = new core.Runner(suite, {
      appName: 'kano',
      user: currentUser.email,
      geolocation: { latitude: 43.31486, longitude: 1.95557 },
      localStorage: {
        'kano-welcome': false
      }
    })
    // Prepare data for current run
    await client.login(currentUser)
    let data = fs.readJsonSync(runner.getDataPath('lab-stations.geojson'))
    await client.getService('lab-stations').create(data)
    data = fs.readJsonSync(runner.getDataPath('lab-observations.geojson'))
    setTime(data)
    await client.getService('lab-observations').create(data)
    data = fs.readJsonSync(runner.getDataPath('lab-measurements.geojson'))
    setTime(data)
    await client.getService('lab-measurements').create(data)

    page = await runner.start()
    await core.login(page, currentUser)
  })

  beforeEach(() => {
    runner.clearErrors()
  })

  afterEach(() => {
    expect(runner.hasError()).beFalse()
  })

  it('see timeseries for station measurements', async () => {
    await map.clickLayer(page, catalogLayersTab, 'LAB')
    await map.goToPosition(page, 43.547168883180966, 1.5059948323127268)
    await core.click(page, '#map', 1000)
    await page.waitForTimeout(2000)
    // TODO: we should set a pre-defined time to compare images
    //expect(await runner.captureAndMatch('station-measurements')).beTrue()
    await core.clickAction(page, 'close-top-window', 1000)
  })

  it('see timeseries for mobile measurements', async () => {
    await map.clickLayer(page, catalogLayersTab, 'LAB_MEASUREMENTS')
    await map.goToPosition(page, 43.54, 1.505)
    await core.click(page, '#map', 1000)
    await page.waitForTimeout(2000)
    // TODO: we should set a pre-defined time to compare images
    //expect(await runner.captureAndMatch('mobile-measurements')).beTrue()
    await core.clickAction(page, 'close-top-window', 1000)
  })

  it('see elevation profile', async () => {
    await map.importLayer(page, runner.getDataPath('elevation-line.geojson'), 'id')
    await map.goToPosition(page, 43.31465, 1.94985)
    await core.click(page, '#map', 1000)
    await core.clickAction(page, 'top-window-menu', 1000)
    await core.clickAction(page, 'elevation-profile', 1000)
    await page.waitForTimeout(2000)
    expect(await runner.captureAndMatch('elevation-line')).beTrue()
    await core.clickAction(page, 'close-top-window', 1000)
  })

  it('see mapillary view', async () => {
    await map.goToPosition(page, 43.31465, 1.94985)
    await core.click(page, '#map', 1000)
    await core.click(page, '#map', 1000)
    await core.clickAction(page, 'top-window-menu', 1000)
    await core.clickAction(page, 'mapillary-viewer', 1000)
    await page.waitForTimeout(2000)
    expect(await runner.captureAndMatch('mapillary-view')).beTrue()
  })

  after(async () => {
    await runner.stop()
    // Remove test data
    await client.getService('lab-stations').remove(null)
    await client.getService('lab-observations').remove(null)
    await client.getService('lab-measurements').remove(null)
  })
})
