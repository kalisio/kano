import chai, { expect, util } from 'chai'
import chailint from 'chai-lint'
import _ from 'lodash'

import { core, map } from './kdk/index.mjs'

const suite = 'user-layers'

const userLayersTab = 'user-layers'

describe(`suite:${suite}`, function () {
  // min timeout is 60s because some tests needs to scroll back a
  // lot to get to low zoom levels (7/6) and it takes time
  this.timeout(60 * 1000 * core.TestTimeoutMultiplier)

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
        'kano-welcome': false,
        'kano-install': false
      }
    })
    page = await runner.start()
    await core.login(page, user[0])
  })

  it('user: drop geojson gradient file', async () => {
    await map.dropFile(page, runner.getDataPath('flight.geojson'))
    await map.zoomToLevel(page, 'mapActivity', 4)
    const match = await runner.captureAndMatch('flight', null, 3)
    await map.clickLayer(page, userLayersTab, 'flight')
    expect(match).beTrue()
  })

  it('user: import geojson file with bbox', async () => {
    await map.importLayer(page, runner.getDataPath('landing.geojson'))
    const match = await runner.captureAndMatch('landing', null, 3)
    await map.clickLayer(page, userLayersTab, 'landing')
    expect(match).beTrue()
  })

  it('user: import geojson file', async () => {
    await map.importLayer(page, runner.getDataPath('departements.geojson'), 'code')
    await map.zoomToLevel(page, 'mapActivity', 6)
    const match = await runner.captureAndMatch('departements', null, 3)
    await map.clickLayer(page, userLayersTab, 'departements')
    expect(match).beTrue()
  })

  it('user: import kml file', async () => {
    await map.importLayer(page, runner.getDataPath('regions.kml'))
    await map.zoomToLevel(page, 'mapActivity', 6)
    const match = await runner.captureAndMatch('regions', null, 3)
    await map.clickLayer(page, userLayersTab, 'regions')
    expect(match).beTrue()
  })

  it('user: import gpx file', async () => {
    await map.importLayer(page, runner.getDataPath('trace.gpx'))
    await map.zoomToLevel(page, 'mapActivity', 14)
    const match = await runner.captureAndMatch('trace', null, 3)
    await map.clickLayer(page, userLayersTab, 'trace')
    expect(match).beTrue()
  })

  it('user: import shp file', async () => {
    await map.dropFile(page, runner.getDataPath('espaces-naturels.shp'))
    await map.zoomToLevel(page, 'mapActivity', 9)
    const match = await runner.captureAndMatch('espaces-naturels', null, 3)
    await map.clickLayer(page, userLayersTab, 'espaces-naturels')
    expect(match).beTrue()
  })

  it('user: add polygon mask', async () => {
    await map.dropFile(page, runner.getDataPath('ariege.geojson'))
    const match = await runner.captureAndMatch('polygon-mask', null, 3)
    await map.removeLayer(page, userLayersTab, 'ariege')
    expect(match).beTrue()
  })

  it('user: add multi-polygon mask', async () => {
    await map.dropFile(page, runner.getDataPath('occitanie.geojson'))
    const match = await runner.captureAndMatch('multi-polygon-mask', null, 3)
    await map.removeLayer(page, userLayersTab, 'occitanie')
    expect(match).beTrue()
  })

  it('user: connect wms layer', async () => {
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-legend-widget'])
    await map.goToPosition(page, 46.62681, 2.59277)
    await map.zoomToLevel(page, 'mapActivity', 7)
    const service = 'https://geoservices.brgm.fr/geologie?service=wms&request=getcapabilities'
    const layerId = 'litho-1-m-simplifiee'
    const layerName = 'Carte lithologique'
    await map.connectLayer(page, service, layerId, layerName)
    const match = await runner.captureAndMatch(layerId, null, 3)
    await core.closeWindow(page, 'left')
    await map.clickLayer(page, userLayersTab, _.kebabCase('Carte lithologique simplifiée au 1/1 000 000'))
    expect(match).beTrue()
  })

  it('user: connect wfs layer', async () => {
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-legend-widget'])
    const service = 'https://data.geopf.fr/wfs/ows?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetCapabilities'
    const layerId = 'bdcarto-v-5-region'
    const layerName = 'region'
    await map.connectLayer(page, service, layerId, layerName, 'code-insee')
    const match = await runner.captureAndMatch(layerId, null, 3)
    await core.closeWindow(page, 'left')
    await map.clickLayer(page, userLayersTab, _.kebabCase('BD CARTO® region'))
    expect(match).beTrue()
  })

  it('user: connect wmts layer', async () => {
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-legend-widget'])
    await map.goToPosition(page, 46.83201, 8.31116)
    await map.zoomToLevel(page, 'mapActivity', 8)
    const service = 'https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml'
    const layerId = 'ch-bakom-notruf-112-festnetz'
    const layerName = '112 Festnetz'
    await map.connectLayer(page, service, layerId, layerName)
    const match = await runner.captureAndMatch(layerId, null, 3)
    await core.closeWindow(page, 'left')
    await map.clickLayer(page, userLayersTab, _.kebabCase('112 Festnetz'))
    expect(match).beTrue()
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
