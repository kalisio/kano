import _ from 'lodash'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'

import { core, map } from '@kalisio/kdk/test.client.js'

const suite = 'user-layers'

const userLayersTab = 'user-layers'

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

  it('user: drop geojson gradient file', async () => {
    await map.dropFile(page, runner.getDataPath('flight.geojson'))
    const match = await runner.captureAndMatch('flight')
    await map.clickLayer(page, userLayersTab, 'flight')
    expect(match).beTrue()
  })

  it('user: import geojson file with bbox', async () => {
    await map.importLayer(page, runner.getDataPath('landing.geojson'))
    const match = await runner.captureAndMatch('landing')
    await map.clickLayer(page, userLayersTab, 'landing')
    expect(match).beTrue()
  })

  it('user: import geojson file', async () => {
    await map.importLayer(page, runner.getDataPath('departements.geojson'), 'code')
    const match = await runner.captureAndMatch('departements')
    await map.clickLayer(page, userLayersTab, 'departements')
    expect(match).beTrue()
  })

  it('user: import kml file', async () => {
    await map.importLayer(page, runner.getDataPath('regions.kml'))
    const match = await runner.captureAndMatch('regions')
    await map.clickLayer(page, userLayersTab, 'regions')
    expect(match).beTrue()
  })

  it('user: import gpx file', async () => {
    await map.importLayer(page, runner.getDataPath('trace.gpx'))
    const match = await runner.captureAndMatch('trace')
    await map.clickLayer(page, userLayersTab, 'trace')
    expect(match).beTrue()
  })

  it('user: import shp file', async () => {
    await map.dropFile(page, runner.getDataPath('espaces-naturels.shp'))
    const match = await runner.captureAndMatch('espaces-naturels')
    await map.clickLayer(page, userLayersTab, 'espaces-naturels')
    expect(match).beTrue()
  })
  
  it('user: add polygon mask', async () => {
    await map.dropFile(page, runner.getDataPath('ariege.geojson'))
    const match = await runner.captureAndMatch('polygon-mask')
    expect(match).beTrue()
    await map.removeLayer(page, userLayersTab, 'ariege')
  })

  it('user: add multi-polygon mask', async () => {
    await map.dropFile(page, runner.getDataPath('occitanie.geojson'))
    const match = await runner.captureAndMatch('multi-polygon-mask')
    expect(match).beTrue()
    await map.removeLayer(page, userLayersTab, 'occitanie')
  })

  it('user: connect wms layer', async () => {
    await core.clickPaneActions(page, 'top', ['tools', 'display-legend'])
    await map.goToPosition(page, 46.62681, 2.59277)
    await map.zoomToLevel(page, 7)
    const service = 'https://geoservices.brgm.fr/geologie?service=wms&request=getcapabilities'
    const layerId = 'litho-1-m-simplifiee'
    const layerName = 'Carte lithologique'
    await map.connectLayer(page, service, layerId, layerName)
    const match = await runner.captureAndMatch(layerId)
    await core.closeWindow(page, 'left')
    await map.clickLayer(page, userLayersTab, _.kebabCase('Carte lithologique simplifiée au 1/1 000 000'))
    expect(match).beTrue()
  })
  it('user: connect wfs layer', async () => {
    await core.clickPaneActions(page, 'top', ['tools', 'display-legend'])
    const service = 'https://wxs.ign.fr/choisirgeoportail/geoportail/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetCapabilities'
    const layerId = 'bdcarto-v-5-region'
    const layerName = 'region'
    await map.connectLayer(page, service, layerId, layerName, 'code-insee')
    const match = await runner.captureAndMatch(layerId)
    await core.closeWindow(page, 'left')
    await map.clickLayer(page, userLayersTab, _.kebabCase('region'))
    expect(match).beTrue()
  })
  it('user: connect wmts layer', async () => {
    await core.clickPaneActions(page, 'top', ['tools', 'display-legend'])
    await map.goToPosition(page, 46.83201, 8.31116)
    await map.zoomToLevel(page, 8)
    const service = 'https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml'
    const layerId = 'ch-bakom-notruf-112-zentral'
    const layerName = '112 Alarmzentralen'
    await map.connectLayer(page, service, layerId, layerName)
    const match = await runner.captureAndMatch(layerId)
    await core.closeWindow(page, 'left')
    await map.clickLayer(page, userLayersTab, _.kebabCase('112 Alarmzentralen'))
    expect(match).beTrue()
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
