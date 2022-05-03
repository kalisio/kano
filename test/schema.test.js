import _ from 'lodash'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client'

const suite = 'schema'

const userLayersTab = 'user-layers-tab'

describe(`suite:${suite}`, () => {
  let runner, page
  const user = [
    { email: 'user-kano@kalisio.xyz', password: 'Pass;word1' },
    { email: 'admin-kano@kalisio.xyz', password: 'Pass;word1' }
  ]
  const current_user = user[1]

  before(async () => {
    chailint(chai, util)

    runner = new core.Runner(suite, {
      appName: 'kano',
      user: current_user.email,
      geolocation: { latitude: 43.31486, longitude: 1.95557 },
      localStorage: {
        'kano-welcome': false
      }/* ,
      mode: 'screenshots' */
    })
    page = await runner.start()
    await core.login(page, current_user)
  })

  it('create layer', async () => {
    await map.createLayer(page, 'test', runner.getDataPath('test.json'), 'id')
    //await map.importLayer(page, runner.getDataPath('trace.gpx'))
  })

  it('save layer', async () => {
    await map.saveLayer(page, userLayersTab, 'test')
  })
  
  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})