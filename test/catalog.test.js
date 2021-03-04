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
const timeline = new pages.Timeline()
const catalog = new pages.Catalog()

fixture`catalog`// declare the fixture
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
    await layout.clickLeftDrawer(test, pages.Layout.LOGOUT)
    // check for console error messages
    // await pages.checkNoClientError(test)
  })

test('Check base layers', async test => {
  const category = 'BaseLayers'
  const layers = [
    'Layers.OSM_BRIGHT',
    'Layers.OSM_DARK',
    'Layers.OSMT_BRIGHT',
    'Layers.OSMT_DARK'
  ]

  await layout.clickRightOpener(test)
  await catalog.clickCategory(category, true)
  await layout.clickRightOpener(test)

  for (const layer of layers) {
    await layout.clickRightOpener(test)
    await catalog.clickLayer(layer, true)
    await layout.clickRightOpener(test)

    const runKey = `${category}-${layer}`
    await pages.assertScreenshotMatches(t, runKey)
    // await pages.takeScreenshot(t, runKey)
  }

  await layout.clickRightOpener(test)
  await catalog.clickCategory(category, false)
  await layout.clickRightOpener(test)
})

test('Check measure layers', async test => {
  const category = 'MeasureLayers'
  const layers = [
    'Layers.VIGICRUES',
    'Layers.HUBEAU',
    'Layers.TELERAY'
  ]

  await layout.clickRightOpener(test)
  await catalog.clickCategory(category, true)
  await layout.clickRightOpener(test)

  for (const layer of layers) {
    await layout.clickRightOpener(test)
    await catalog.clickLayer(layer, true)
    await layout.clickRightOpener(test)

    const runKey = `${category}-${layer}`
    await pages.takeScreenshot(test, runKey)
  }

  await layout.clickRightOpener(test)
  await catalog.clickCategory(category, false)
  await layout.clickRightOpener(test)
})

test('Check meteo layers', async test => {
  const category = 'MeteoLayers'
  const forecastLayers = [
    ['gfs-world', 'Layers.WIND_TILED'],
    ['gfs-world', 'Layers.GUST_TILED'],
    ['gfs-world', 'Layers.PRECIPITATIONS_TILED'],
    ['gfs-world', 'Layers.TEMPERATURE_TILED'],

    ['arpege-world', 'Layers.WIND_TILED'],
    ['arpege-world', 'Layers.GUST_TILED'],
    ['arpege-world', 'Layers.PRECIPITATIONS_TILED'],
    ['arpege-world', 'Layers.TEMPERATURE_TILED']
  ]

  const refKey = 'BaseLayers-Layers.OSM_DARK'

  await layout.clickRightOpener(test)
  await catalog.clickCategory('BaseLayers', true)
  await catalog.clickLayer('Layers.OSM_DARK', true)
  await catalog.clickCategory('BaseLayers', false)
  await catalog.clickCategory(category, true)
  await layout.clickRightOpener(test)

  for (const [model, layer] of forecastLayers) {
    await layout.clickRightOpener(test)
    await catalog.clickForecast()
    await catalog.selectMeteoModel(model)
    await catalog.clickLayer(layer, true)
    await layout.clickRightOpener(test)

    // let layer time to display data
    await test.wait(2000)
    const runKey = `${category}-${model}-${layer}`
    const minDiff = layer.includes('WIND') ? 2 : 50
    await pages.assertScreenshotMismatches(test, runKey, { refKey: refKey, minDiffRatio: minDiff })
  }

  await layout.clickRightOpener(test)
  await catalog.clickCategory(category, false)
  await layout.clickRightOpener(test)
})

test('Check imported layers', async test => {
  const dialog = new pages.LayerImportDialog()
  layout.openAndClickFab(test, '#import-layer')
  // geojson
  const runKey = 'regions-version-simplifiee'
  await dialog.importLayer(`data/${runKey}.geojson`)
  await pages.assertScreenshotMatches(test, runKey)
})
