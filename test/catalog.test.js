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
    await layout.clickLeftPaneAction(test, pages.Layout.LOGOUT)
    // check for console error messages
    // await pages.checkNoClientError(test)
  })

test('Check base layers', async test => {
  const category = 'BASE_LAYERS'
  const layers = [
    'Layers.OSM_DARK',
    'Layers.OSMT_BRIGHT',
    'Layers.OSM_BRIGHT'
  ]
  // Close the top pane
  await layout.clickTopOpener(test)
  // Open the category
  await layout.clickRightOpener(test)
  await catalog.clickCategory(test, category)
  const categoryObj = await catalog.getCategory(category)
  console.log(categoryObj)
  await layout.clickRightOpener(test)
  // Active each layer
  for (const layer of layers) {
    await layout.clickRightOpener(test)
    await catalog.clickLayer(test, layer, true)
    await layout.clickRightOpener(test)
    const runKey = `${category}-${layer}`
    await pages.takeScreenshot(test, runKey)
    await pages.assertScreenshotMatches(test, runKey)
  }
  // Close the category
  await layout.clickRightOpener(test)
  await catalog.clickCategory(test, category, false)
  await layout.clickRightOpener(test)
})

test('Check measure layers', async test => {
  const category = 'MEASURE_LAYERS'
  const layers = [
    'Layers.VIGICRUES',
    'Layers.HUBEAU',
    'Layers.TELERAY'
  ]
  await layout.clickRightOpener(test)
  await catalog.clickCategory(test, category, true)
  await layout.clickRightOpener(test)

  for (const layer of layers) {
    await layout.clickRightOpener(test)
    await catalog.clickLayer(test, layer, false)
    await layout.clickRightOpener(test)
    // const runKey = `${category}-${layer}`
    // await pages.takeScreenshot(test, runKey)
  }
  await layout.clickRightOpener(test)
  await catalog.clickCategory(test, category, false)
  await layout.clickRightOpener(test)
})

test('Check meteo layers', async test => {
  const category = 'KCatalogPanel.METEO_LAYERS'
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
  await catalog.clickCategory(test, 'KCatalogPanel.BASE_LAYERS', true)
  await catalog.clickLayer(test, 'Layers.OSM_DARK', true)
  await catalog.clickCategory(test, 'KCatalogPanel.BASE_LAYERS', false)
  await catalog.clickCategory(category, true)
  await layout.clickRightOpener(test)

  for (const [model, layer] of forecastLayers) {
    await layout.clickRightOpener(test)
    await catalog.clickForecast(test)
    await catalog.selectMeteoModel(test, model)
    await catalog.clickLayer(test, layer, true)
    await layout.clickRightOpener(test)
    // let layer time to display data
    /* await test.wait(2000)
    const runKey = `${category}-${model}-${layer}`
    const minDiff = layer.includes('WIND') ? 2 : 50
    await pages.assertScreenshotMismatches(test, runKey, { refKey: refKey, minDiffRatio: minDiff })
    */
  }
  await layout.clickRightOpener(test)
  await catalog.clickCategory(test, category, false)
  await layout.clickRightOpener(test)
})

/* test('Check categories', async test => {

  const categoryName = 'Test category'
  await layout.clickRightOpener(test)
  await catalog.clickCategories()
  const dialog = Selector('.q-dialog')
  await test
    .typeText(dialog.find('#name-field'), categoryName)
    .click(dialog.find('#add-layer-category'))
    .wait(1000)
  let category = await catalog.getCategory(categoryName)
  category = await category.getVue()
  await test
    .expect(category).ok(`catalog category '${category}' has been created`)
  await layout.clickRightOpener(test)
})
*/
