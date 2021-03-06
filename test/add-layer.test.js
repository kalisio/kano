import { Selector } from 'testcafe'
import * as pages from './page-models'

const width = 1280
const height = 1024
const bbox = [39.14142217086017, -11.865234375, 54.40187978120916, 16.259765625000004]

const user = {
  name: 'kalisio',
  email: 'kalisio@kalisio.xyz',
  password: 'Pass;word1'
}

const screens = new pages.Screens()
const layout = new pages.Layout()
const mapActivity = new pages.MapActivity()
const catalog = new pages.Catalog()

fixture`add-layer`// declare the fixture
  .page`${pages.getUrl()}`
  // test.before/test.after overrides fixture.beforeEach/fixture.afterEach hook,
  // so implement one in your test if you'd like another behaviour
  .beforeEach(async test => {
    // mock geolocation
    await pages.mockLocationAPI()
    // resize to some predefined size
    await test.resizeWindow(width, height)
    // login
    await screens.login(test, user)
    await layout.closeWelcomeDialog(test)
  })
  .afterEach(async test => {
    // logout
    await layout.clickLeftOpener(test)
    await layout.clickLeftPaneAction(test, pages.Layout.LOGOUT)
    // check for console error messages
    // await pages.checkNoClientError(test)
  })

test('Import GeoJson layer', async test => {
  const dialog = new pages.AddLayer()
  layout.openAndClickFab(test, 'add-layer')
  const geojson = 'regions-version-simplifiee'
  let runKey = `created-${geojson}`
  await dialog.importLayer(`data/${geojson}.geojson`, 'code')
  await pages.takeScreenshot(test, runKey)
  await pages.assertScreenshotMatches(test, runKey)
  // Remove layer
  await layout.clickRightOpener(test)
  await catalog.clickLayerAction(test, geojson, 'remove')
  await test.click(Selector('.q-dialog .q-btn').nth(1))
  await layout.clickRightOpener(test)
  runKey = `removed-${geojson}`
  await pages.takeScreenshot(test, runKey)
  await pages.assertScreenshotMatches(test, runKey)
})

test('Connect OGC WMS layer (BRGM)', async test => {
  const dialog = new pages.AddLayer()
  layout.openAndClickFab(test, 'add-layer')
  const service = 'http://geoservices.brgm.fr/geologie?service=wms&request=getcapabilities'
  const layerId = 'bgm-station'
  const runKey = 'wms-brgm-geologie'
  await dialog.connectLayer(service, layerId)
  await pages.takeScreenshot(test, runKey)
  await pages.assertScreenshotMatches(test, runKey)
})

test('Connect OGC WMS layer (IGN)', async test => {
  const dialog = new pages.AddLayer()
  layout.openAndClickFab(test, 'add-layer')
  const service = 'https://wxs.ign.fr/choisirgeoportail/geoportail/r/wms?service=wms&request=getcapabilities'
  const layerId = 'orthoimagery-orthophotos-bdortho'
  const runKey = 'wms-ign-ortho'
  await dialog.connectLayer(service, layerId)
  await pages.takeScreenshot(test, runKey)
  await pages.assertScreenshotMatches(test, runKey)
})

test('Connect OGC WFS layer', async test => {
  const dialog = new pages.AddLayer()
  layout.openAndClickFab(test, 'add-layer')
  const service = 'https://wxs.ign.fr/choisirgeoportail/geoportail/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetCapabilities'
  const layer = 'bdtopo-v-3-batiment'
  await dialog.connectLayer(service, layer)
  const runKey = 'wfs-ign-bdtopo'
  await pages.takeScreenshot(test, runKey)
  await pages.assertScreenshotMatches(test, runKey)
})

test('Connect OGC WMTS layer', async test => {
  const dialog = new pages.AddLayer()
  layout.openAndClickFab(test, 'add-layer')
  const service = 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/WMTS/1.0.0/WMTSCapabilities.xml'
  const layer = 'usgs-imagery-topo'
  await dialog.connectLayer(service, layer)
  const runKey = 'wmts-usgs-imagery-topo'
  await pages.takeScreenshot(test, runKey)
  await pages.assertScreenshotMatches(test, runKey)
})

test('Create blank layer', async test => {
  const dialog = new pages.AddLayer()
  layout.openAndClickFab(test, 'add-layer')
  let runKey = 'created-layer'
  // Selection based on text content does not seem to work
  await dialog.createLayer(runKey, 'data/protocole.json', 'name')
  await mapActivity.zoomTo(test, bbox)
  // Draw a marker and edit properties
  await test.click(Selector('.leaflet-draw-draw-marker'))
  await mapActivity.clickAt(test, 500, 500)
  // Draw a line
  await test.click(Selector('.leaflet-draw-draw-polyline'))
  await mapActivity.clickAt(test, 300, 300)
  await mapActivity.clickAt(test, 400, 400)
  // Draw a polygon
  await test.click(Selector('.leaflet-draw-draw-polygon'))
  await mapActivity.clickAt(test, 600, 600)
  await mapActivity.clickAt(test, 600, 800)
  await mapActivity.clickAt(test, 800, 800)
  await mapActivity.clickAt(test, 600, 600)
  // Close edition
  await test.click(Selector('.q-notifications button'))
  await pages.takeScreenshot(test, runKey)
  await pages.assertScreenshotMatches(test, runKey)
  // Remove layer
  await catalog.clickLayerAction(runKey, 'remove')
  runKey = 'removed-layer'
  await test.click(Selector('.q-dialog .q-btn').nth(1))
  await pages.takeScreenshot(test, runKey)
  await pages.assertScreenshotMatches(test, runKey)
})
