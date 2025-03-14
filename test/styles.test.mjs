import chai, { util } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client.js'

const suite = 'styles'

const userLayersTab = 'user-layers'

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
    await client.login(currentUser)
    page = await runner.start()
    await core.login(page, currentUser)
  })

  it('2D styles: import styled geojson file', async () => {
    await map.dropFile(page, runner.getDataPath('features-with-style.geojson'))
    const match = await runner.captureAndMatch('2D-features-with-style', null, 3)
    await map.saveLayer(page, userLayersTab, 'features-with-style')
  })

  it('2D styles: realtime pane update', async () => {
    await client.getService('features').patch(null, { 'properties.stroke-color': 'green', 'properties.stroke-width': 3 }, { query: { 'properties.name': 'Sainte-Geneviève' } })
    await client.getService('features').patch(null, { style: { color: 'blue', opacity: 1, stroke: { color: '#000000' } } }, { query: { 'properties.name': 'Parc de la Colline' } })
    await client.getService('features').patch(null, { 'style.shape': 'star', 'style.radius': 32, 'style.stroke.color': 'black', 'style.icon.color': 'black', 'style.icon.size': 32 }, { query: { 'properties.name': 'Saint-Luc' } })
    const match = await runner.captureAndMatch('2D-features-updated-style', null, 3)
  })

  it('2D styles: remove styled geojson layer', async () => {
    await map.removeLayer(page, userLayersTab, 'features-with-style')
  })

  it('2D styles: import geojson file with panes', async () => {
    await map.dropFile(page, runner.getDataPath('features-with-panes.geojson'))
    const match = await runner.captureAndMatch('2D-features-with-panes', null, 3)
    await map.saveLayer(page, userLayersTab, 'features-with-panes')
  })

  it('2D styles: realtime pane update', async () => {
    await client.getService('features').patch(null, { 'style.pane': '501' }, { query: { 'style.pane': '503' } })
    const match = await runner.captureAndMatch('2D-features-updated-pane', null, 3)
  })

  it('2D styles: remove geojson with panes layer', async () => {
    await map.removeLayer(page, userLayersTab, 'features-with-panes')
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
