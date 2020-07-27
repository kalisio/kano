import * as pages from './page-models'

const width = 1280
const height = 1024

const user = {
  name: 'kalisio',
  email: 'kalisio@kalisio.xyz',
  password: 'Pass;word1'
}

const screens = new pages.Screens()
const layout = new pages.Layout()
const sideNav = new pages.SideNav()
const timeline = new pages.Timeline()
const mapActivity = new pages.MapActivity()
const catalog = new pages.Catalog()

fixture `Catalog`// declare the fixture
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
    await test.expect(await layout.isLeftDrawerOpened()).ok()
    await sideNav.logout(test)

    // check for console error messages
    // await pages.checkNoClientError(test)
  })

test('Check base layers', async t => {
  const category = 'BaseLayers'
  const layers = [
    'Layers.S2',
    'Layers.OSM_BRIGHT',
    'Layers.OSM_DARK',
    'Layers.OSMT_BRIGHT',
    'Layers.OSMT_DARK',
    // 'Layers.MOSAIC',
    // 'Layers.IGN_ORTHO',
    // 'Layers.IGN_SCAN',
    // 'Layers.IGN_SCAN_CLASSIC',
    // 'Layers.MAPTILER_BRIGHT',
    // 'Layers.MAPTILER_TOPO',
    // 'Layers.MAPTILER_HYBRID',
  ]

  await catalog.open()
  await catalog.clickCategory(category, true)
  await catalog.close()

  for (const layer of layers) {
    await catalog.open()
    await catalog.clickLayer(layer, true)
    await catalog.close()

    const runKey = `${category}-${layer}`
    await pages.assertScreenshotMatches(t, runKey)
    // await pages.takeScreenshot(t, runKey)
  }

  await catalog.open()
  await catalog.clickCategory(category, false)
  await catalog.close()
})

test('Check measure layers', async t => {
  const category = 'MeasureLayers'
  const layers = [
    'Layers.VIGICRUES',
    // 'Layers.HUBEAU',
    // 'Layers.OPENAQ',
    // 'Layers.TELERAY',
  ]

  await catalog.open()
  await catalog.clickCategory(category, true)
  await catalog.close()

  for (const layer of layers) {
    await catalog.open()
    await catalog.clickLayer(layer, true)
    await catalog.close()

    const runKey = `${category}-${layer}`
    await pages.takeScreenshot(t, runKey)
  }

  await catalog.open()
  await catalog.clickCategory(category, false)
  await catalog.close()
})

test('Check meteo layers', async t => {
  const category = 'MeteoLayers'
  const forecastLayers = [
    ['gfs-world', 'Layers.WIND_TILED'],
    ['gfs-world', 'Layers.GUST_TILED'],
    ['gfs-world', 'Layers.PRECIPITATIONS_TILED'],
    ['gfs-world', 'Layers.TEMPERATURE_TILED'],

    ['arpege-world', 'Layers.WIND_TILED'],
    ['arpege-world', 'Layers.GUST_TILED'],
    ['arpege-world', 'Layers.PRECIPITATIONS_TILED'],
    ['arpege-world', 'Layers.TEMPERATURE_TILED'],
  ]

  const archiveLayers = [
    ['gfs-world', 'Layers.S3_ARCHIVE_WIND'],
    ['gfs-world', 'Layers.S3_ARCHIVE_GUST'],
    ['gfs-world', 'Layers.S3_ARCHIVE_PRECIPITATIONS'],
    ['gfs-world', 'Layers.S3_ARCHIVE_TEMPERATURE'],

    ['arpege-world', 'Layers.S3_ARCHIVE_WIND'],
    ['arpege-world', 'Layers.S3_ARCHIVE_GUST'],
    ['arpege-world', 'Layers.S3_ARCHIVE_PRECIPITATIONS'],
    ['arpege-world', 'Layers.S3_ARCHIVE_TEMPERATURE'],

    ['arpege-world', 'Layers.ARCHIVED_WIND'],
    ['arpege-world', 'Layers.ARCHIVED_PRECIPITATIONS'],
    ['arpege-world', 'Layers.ARCHIVED_TEMPERATURE'],
  ]

  const refKey = 'BaseLayers-Layers.OSM_DARK'

  await catalog.open()
  await catalog.clickCategory('BaseLayers', true)
  await catalog.clickLayer('Layers.OSM_DARK', true)
  await catalog.clickCategory('BaseLayers', false)
  await catalog.clickCategory(category, true)
  await catalog.close()

  for (const [model, layer] of forecastLayers) {
    await catalog.open()
    await catalog.clickForecast()
    await catalog.selectMeteoModel(model)
    await catalog.clickLayer(layer, true)
    await catalog.close()

    // let layer time to display data
    await t.wait(2000)
    const runKey = `${category}-${model}-${layer}`
    const minDiff = layer.includes('WIND') ? 2 : 50
    await pages.assertScreenshotMismatches(t, runKey, { refKey: refKey, minDiffRatio: minDiff })
  }

  timeline.open()
  timeline.clickDay('-')
  timeline.close()

  for (const [model, layer] of archiveLayers) {
    await catalog.open()
    await catalog.clickArchives()
    await catalog.selectMeteoModel(model)
    await catalog.clickLayer(layer, true)
    await catalog.close()

    // let layer time to display data
    await t.wait(2000)
    const runKey = `${category}-${model}-${layer}`
    const minDiff = layer.includes('WIND') ? 2 : 50
    await pages.assertScreenshotMismatches(t, runKey, { refKey: refKey, minDiffRatio: minDiff })
  }

  await catalog.open()
  await catalog.clickCategory(category, false)
  await catalog.close()
})

test('Check imported layers', async t => {
  const dialog = new pages.LayerImportDialog()

  layout.openAndClickFab(t, '#import-layer')

  // geojson
  const runKey = 'regions-version-simplifiee'
  await dialog.importLayer(`data/${runKey}.geojson`)
  await pages.assertScreenshotMatches(t, runKey)
})
