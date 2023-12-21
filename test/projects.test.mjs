import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client.js'

const suite = 'projects'

const catalogLayersTab = 'catalog-layers-tab'
const userLayersTab = 'user-layers-tab'
const userViewsTab = 'user-views-tab'
const userProjectsTab = 'user-projects-tab'
const projectLayersTab = 'project-layers-tab'
const projectViewsTab = 'project-views-tab'

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
    await core.login(page, user[1])
  })

  it('admin: create layer and view', async () => {
    await map.importLayer(page, runner.getDataPath('trace.gpx'))
    await map.saveLayer(page, userLayersTab, 'trace')
    await map.createView(page, 'trace view', false)
  })

  it('admin: create projects', async () => {
    await map.createProject(page, 'trace project', {
      categories: [],
      layers: ['trace'],
      views: ['trace view']
    })
    await map.createProject(page, 'no trace project', {
      categories: ['Fonds cartographiques'],
      layers: ['Plan (Sombre)'],
      views: []
    })
  })

  it('switch to user', async () => {
    await core.logout(page)
    await core.goToLoginScreen(page)
    await core.login(page, user[0])
  })

  it('user: select trace project', async () => {
    await map.clickProject(page, userProjectsTab, 'trace project')
    expect(await core.elementExists(page, '#close-project')).beTrue()
    await core.clickOpener(page, 'right')
    expect(await core.elementExists(page, `#${userLayersTab}`)).beFalse()
    expect(await core.elementExists(page, `#${userViewsTab}`)).beFalse()
    expect(await core.elementExists(page, `#${userProjectsTab}`)).beFalse()
    expect(await core.elementExists(page, `#${catalogLayersTab}`)).beFalse()
    expect(await core.elementExists(page, `#${projectLayersTab}`)).beTrue()
    expect(await core.elementExists(page, `#${projectViewsTab}`)).beTrue()
    const match = await runner.captureAndMatch('trace-project')
    expect(match).beTrue()
  })

  it('user: switch to no trace project', async () => {
    await map.switchProject(page, 'no trace project')
    expect(await core.elementExists(page, '#close-project')).beTrue()
    await core.clickOpener(page, 'right')
    expect(await core.elementExists(page, `#${userLayersTab}`)).beFalse()
    expect(await core.elementExists(page, `#${userViewsTab}`)).beFalse()
    expect(await core.elementExists(page, `#${userProjectsTab}`)).beFalse()
    expect(await core.elementExists(page, `#${catalogLayersTab}`)).beFalse()
    expect(await core.elementExists(page, `#${projectLayersTab}`)).beTrue()
    expect(await core.elementExists(page, `#${projectViewsTab}`)).beTrue()
    const match = await runner.captureAndMatch('no-trace-project')
    expect(match).beTrue()
    await map.closeProject(page)
  })

  it('switch to admin', async () => {
    await core.logout(page)
    await core.goToLoginScreen(page)
    await core.login(page, user[1])
  })

  it('admin: remove projects', async () => {
    await map.removeProject(page, userProjectsTab, 'trace project')
    await map.removeProject(page, userProjectsTab, 'no trace project')
  })

  it('admin: remove data', async () => {
    await map.removeView(page, userViewsTab, 'trace view')
    await map.removeLayer(page, userLayersTab, 'trace') 
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
