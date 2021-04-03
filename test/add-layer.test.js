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
    await layout.clickLeftPane(test, pages.Layout.LOGOUT)
    // check for console error messages
    // await pages.checkNoClientError(test)
  })

test('Import GeoJson layer', async test => {
  const dialog = new pages.AddLayer()
  layout.openAndClickFab(test, '#add-layer')
  const geojson = 'regions-version-simplifiee'
  let runKey = `created-${{geojson}}`
  // Selection based on text content does not seem to work
  await dialog.importLayer(`data/${geojson}.geojson`, 'code')
  await pages.takeScreenshot(test, runKey)
  //await pages.assertScreenshotMatches(test, runKey)
  // Remove layer
  await catalog.clickLayerAction(runKey, 'remove')
  runKey = `removed-${{geojson}}`
  await test.click(Selector('.q-dialog .q-btn').nth(1))
  await pages.takeScreenshot(test, runKey)
  //await pages.assertScreenshotMatches(test, runKey)
})

test('Connect OGC WMS layer (BRGM)', async test => {
  const dialog = new pages.AddLayer()
  layout.openAndClickFab(test, '#add-layer')
  
  const service = 'http://geoservices.brgm.fr/geologie?service=wms&request=getcapabilities'
  // Selection based on text content does not seem to work
  //const layer = 'Carte géologique 50 000e - harmonisé'
  const layerId = 'bgm-station'
  const runKey = 'wms-geologie-brgm'
  await dialog.connectLayer(service, layerId)
  await mapActivity.zoomTo(test, bbox)
  await pages.takeScreenshot(test, runKey)
  //await pages.assertScreenshotMatches(test, runKey)
})

test('Connect OGC WMS layer (IGN)', async test => {
  const dialog = new pages.AddLayer()
  layout.openAndClickFab(test, '#add-layer')
  
  const service = 'https://wxs.ign.fr/choisirgeoportail/geoportail/r/wms?service=wms&request=getcapabilities'
  // Selection based on text content does not seem to work
  const layerId = 'orthoimagery-orthophotos-bdortho'
  const runKey = 'wms-ortho-ign'
  await dialog.connectLayer(service, layerId)
  await mapActivity.zoomTo(test, bbox)
  await pages.takeScreenshot(test, runKey)
  //await pages.assertScreenshotMatches(test, runKey)
})
/*
test('Connect OGC WFS layer', async test => {
  const dialog = new pages.AddLayer()
  layout.openAndClickFab(test, '#add-layer')
  
  const service = 'https://wxs.ign.fr/choisirgeoportail/geoportail/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetCapabilities'
  const layer = 'BD TOPO'
  await dialog.connectLayer(service, layer)
  await mapActivity.zoomTo(test, bbox)
  const runKey = 'wfs-geologie-ign'
  await pages.takeScreenshot(test, runKey)
  //await pages.assertScreenshotMatches(test, runKey)
})
*/
test('Create blank layer', async test => {
  const dialog = new pages.AddLayer()
  layout.openAndClickFab(test, '#add-layer')
  let runKey = 'created-layer'
  // Selection based on text content does not seem to work
  //const id = 'name'
  const id = 0
  await dialog.createLayer(runKey, 'data/protocole.json', id)
  await mapActivity.zoomTo(test, bbox)
  // Draw a marker and edit properties
  await test.click(Selector('.leaflet-draw-draw-marker'))
  await mapActivity.clickAt(test, 500, 500)
  await mapActivity.clickAt(test, 500, 500)
  await test.click(Selector('.q-dialog #close-action'))
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
  //await pages.assertScreenshotMatches(test, runKey)
  // Remove layer
  await catalog.clickLayerAction(runKey, 'remove')
  runKey = 'removed-layer'
  await test.click(Selector('.q-dialog .q-btn').nth(1))
  await pages.takeScreenshot(test, runKey)
  //await pages.assertScreenshotMatches(test, runKey)
})
