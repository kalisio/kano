import * as fs from 'fs'
import png from 'pngjs'
import pixelmatch from 'pixelmatch'
import * as pages from './page-models'

const recordRef = false

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

function refScreenshot (t, key) {
  const screenshotBase = t.testRun.opts.screenshots.path
  return `${screenshotBase}/../reference/${key}.png`
}

function screenshot (t, key, absolute = false) {
  return absolute ? `${t.testRun.opts.screenshots.path}/${key}.png` : `${key}.png`
}

function diffScreenshots (t, key) {
  if (recordRef) return

  const ref = png.PNG.sync.read(fs.readFileSync(refScreenshot(t, key)))
  const img = png.PNG.sync.read(fs.readFileSync(screenshot(t, key, true)))
  const { width, height } = ref
  const diff = new png.PNG({ width, height })

  const opts = {
    alpha: 0.3,
    diffColor: [255, 0, 0],
    diffColorAlt: [0, 255, 0]
  }
  const numDiffs = pixelmatch(ref.data, img.data, diff.data, width, height, opts)
  const diffRatio = 100.0 * (numDiffs / (width * height))
  if (diffRatio > 1.0) {
    const output = screenshot(t, `diff-${key}`, true)
    fs.writeFileSync(output, png.PNG.sync.write(diff))
    throw new Error(`Diff ratio for ${key} is too high: ${diffRatio.toPrecision(2)}%`)
  }
}

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
  })
  .afterEach(async test => {
    // logout
    await mapActivity.click(test)
    await layout.clickLeftOpener(test)
    await test.expect(await layout.isLeftDrawerOpened()).ok()
    await sideNav.logout(test)

    // check for console error messages
    // await pages.checkNoClientError(test)
  })

test('Check base layers', async t => {
  const category = 'Fonds cartographiques'
  const layers = {
    sentinel2: 'Sentinel 2',
    osm_light: 'OpenStreetMap (Clair)',
    osm_dark: 'OpenStreetMap (Sombre)',
    osm_terrain_light: 'OpenStreetMap et Terrain (Clair)',
    osm_terrain_dark: 'OpenStreetMap et Terrain (Sombre)',
    /*
    mosaic: 'Mosaique',
    bd_ortho_ign: 'BD ORTHO IGN',
    scan_std_ign: 'SCAN standard IGN',
    scan_cla_ign: 'SCAN classique IGN',
    maptiler_light: 'Maptiler (Clair)',
    maptiler_topo: 'Maptiler (Topographique)',
    maptiler_hybrid: 'Maptiler (Hybride)'
    */
  }

  await catalog.open()
  await catalog.clickCategory(category, true)
  await catalog.close()

  for (const [key, value] of Object.entries(layers)) {
    await catalog.open()
    await catalog.clickLayer(value, true)
    await catalog.close()

    const sshotKey = `baselayers-${key}`
    await t.takeScreenshot({ path: screenshot(t, sshotKey) })

    diffScreenshots(t, sshotKey)
  }

  await catalog.open()
  await catalog.clickCategory(category, false)
  await catalog.close()
})

test('Check measure layers', async t => {
  const category = 'Couches des mesures'
  const layers = {
    srtm: 'Élévation SRTM',
    vigicrues: 'Vigicrues',
    // openaq: 'OpenAQ',
    // teleray: 'Téléray'
  }

  await catalog.open()
  await catalog.clickCategory(category, true)
  await catalog.close()

  for (const [key, value] of Object.entries(layers)) {
    await catalog.open()
    await catalog.clickLayer(value, true)
    await catalog.close()

    const sshotKey = `measurelayers-${key}`
    await t.takeScreenshot({ path: screenshot(t, sshotKey) })

    // diffScreenshots(t, sshotKey)
  }

  await catalog.open()
  await catalog.clickCategory(category, false)
  await catalog.close()
})

test('Check meteo layers', async t => {
  const category = 'Prévisions météo'
  const forecast_layers = {
    // wind_gfs05: ['gfs-world', 'Vent'],
    // gust_gfs05: ['gfs-world', 'Rafales'],
    // precipitations_gfs05: ['gfs-world', 'Précipitations'],
    // temperature_gfs05: ['gfs-world', 'Température'],

    tiled_wind_gfs05: ['gfs-world', 'Vent (tuilé)'],
    tiled_gust_gfs05: ['gfs-world', 'Rafales (tuilé)'],
    tiled_precipitations_gfs05: ['gfs-world', 'Précipitations (tuilé)'],
    tiled_temperature_gfs05: ['gfs-world', 'Température (tuilé)'],

    // wind_arpege01: ['arpege-europe', 'Vent'],
    // gust_arpege01: ['arpege-europe', 'Rafales'],
    // precipitations_arpege01: ['arpege-europe', 'Précipitations'],
    // temperature_arpege01: ['arpege-europe', 'Température'],

    tiled_wind_arpege01: ['arpege-europe', 'Vent (tuilé)'],
    tiled_gust_arpege01: ['arpege-europe', 'Rafales (tuilé)'],
    tiled_precipitations_arpege01: ['arpege-europe', 'Précipitations (tuilé)'],
    tiled_temperature_arpege01: ['arpege-europe', 'Température (tuilé)'],

    // wind_arpege025: ['arpege-world', 'Vent'],
    // gust_arpege025: ['arpege-world', 'Rafales'],
    // precipitations_arpege025: ['arpege-world', 'Précipitations'],
    // temperature_arpege025: ['arpege-world', 'Température'],

    tiled_wind_arpege025: ['arpege-world', 'Vent (tuilé)'],
    tiled_gust_arpege025: ['arpege-world', 'Rafales (tuilé)'],
    tiled_precipitations_arpege025: ['arpege-world', 'Précipitations (tuilé)'],
    tiled_temperature_arpege025: ['arpege-world', 'Température (tuilé)'],
  }
  const archive_layers = {
    wind_s3_gfs05: ['gfs-world', 'Vent (S3)'],
    gust_s3_gfs05: ['gfs-world', 'Rafales (S3)'],
    precipitations_s3_gfs05: ['gfs-world', 'Précipitations (S3)'],
    temperature_s3_gfs05: ['gfs-world', 'Température (S3)'],

    wind_s3_arpege01: ['arpege-europe', 'Vent (S3)'],
    gust_s3_arpege01: ['arpege-europe', 'Rafales (S3)'],
    precipitations_s3_arpege01: ['arpege-europe', 'Précipitations (S3)'],
    temperature_s3_arpege01: ['arpege-europe', 'Température (S3)'],

    wind_opendap_arpege01: ['arpege-europe', 'Vent (archivé)'],
    precipitations_opendap_arpege01: ['arpege-europe', 'Précipitations (archivé)'],
    temperature_opendap_arpege01: ['arpege-europe', 'Température (archivé)'],

    wind_s3_arpege025: ['arpege-world', 'Vent (S3)'],
    gust_s3_arpege025: ['arpege-world', 'Rafales (S3)'],
    precipitations_s3_arpege025: ['arpege-world', 'Précipitations (S3)'],
    temperature_s3_arpege025: ['arpege-world', 'Température (S3)'],

    wind_opendap_arpege025: ['arpege-world', 'Vent (archivé)'],
    precipitations_opendap_arpege025: ['arpege-world', 'Précipitations (archivé)'],
    temperature_opendap_arpege025: ['arpege-world', 'Température (archivé)'],
  }

  await catalog.open()
  await catalog.clickCategory(category, true)
  await catalog.close()

  for (const [key, value] of Object.entries(forecast_layers)) {
    await catalog.open()
    await catalog.clickForecast()
    await catalog.selectMeteoModel(value[0])
    await catalog.clickLayer(value[1], true)
    // await catalog.clickMeteoLayer('Prévisions', ...value, true)
    await catalog.close()

    const sshotKey = `meteolayers-${key}`
    await t.takeScreenshot({ path: screenshot(t, sshotKey) })

    // diffScreenshots(t, sshotKey)
  }

  timeline.open()
  timeline.clickDay('-')
  timeline.close()

  for (const [key, value] of Object.entries(archive_layers)) {
    await catalog.open()
    await catalog.clickArchives()
    await catalog.selectMeteoModel(value[0])
    await catalog.clickLayer(value[1], true)
    // await catalog.clickMeteoLayer('Archives', ...value, true)
    await catalog.close()

    const sshotKey = `meteolayers-${key}`
    await t.takeScreenshot({ path: screenshot(t, sshotKey) })

    // diffScreenshots(t, sshotKey)
  }

  await catalog.open()
  await catalog.clickCategory(category, false)
  await catalog.close()
})

// test('meteolayers', async t => {
//   await timeline.open()
//   /*
//   await timeline.clickChip('08/06')
//   await t.wait(2000)
//   await timeline.clickPreviousDay()
//   await t.wait(2000)
//   */
//   /*
//   await timeline.clickDay('+')
//   await t.wait(2000)
//   await timeline.clickDay('-')
//   await t.wait(2000)
//   await timeline.clickHour('+')
//   await t.wait(2000)
//   await timeline.clickHour('-')
//   await t.wait(2000)
//   await timeline.clickHour('13h')
//   await t.wait(2000)
//   await timeline.clickDay('07/06')
//   await t.wait(2000)
//   */

//   await timeline.clickDay('07/06')
//   await timeline.clickHour('15h')
//   await timeline.close()

//   const category = 'Prévisions météo'
//   const layers = {
//     wind_s3_arpege01: ['Archives', 'arpege-europe', 'Vent (S3)'],
//     wind_s3_gfs05: ['Archives', 'gfs-world', 'Vent (S3)'],
//   }

//   await catalog.open()
//   await catalog.clickCategory(category)
//   await catalog.close()

//   for (const [key, value] of Object.entries(layers)) {
//     await catalog.open()
//     await catalog.clickMeteoLayer(...value)
//     await catalog.close()
//     await t.takeScreenshot({ path: `measurelayers/${key}.png` })

//     // diffScreenshots(t, key)
//   }
// })
