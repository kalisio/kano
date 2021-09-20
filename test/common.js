import { core } from '@kalisio/kdk/test.client'

export async function addLayer (page) {
  await core.clickFab(page)
  await core.clickAction(page, 'add-layer')
  await page.waitForTimeout(1000)
}

export async function importLayer (page, filePath, featureId, wait = 2000) {
  await addLayer(page)
  await core.upload(page, '#file-field', filePath)
  await core.click(page, '#featureId-field', 500)
  await core.click(page, `#${featureId}`, 500)
  await core.clickAction(page, 'import-layer-action')
  await core.waitForImagesLoaded(page)
  await page.waitForTimeout(wait)
}

export async function connectLayer (page, service, layerId, wait = 2000) {
  await addLayer(page)
  await core.clickAction(page, 'connect-layer')
  await core.type(page, '#service-field', service, true, false, 5000)
  await core.click(page, '#layer-field', 500)
  await core.click(page, `#${layerId}`, 500)
  await core.clickAction(page, 'connect-layer-action', 2000)
  await core.waitForImagesLoaded(page)
  await page.waitForTimeout(wait)
}

export async function createLayer (page, layerName, schemaPath, featureId, wait = 2000) {
  await addLayer(page)
  await core.clickAction(page, 'create-layer')
  await core.type(page, '#name-field', layerName)
  await core.type(page, '#description-field', `${layerName} description`)
  await core.upload(page, '#schema-field', schemaPath)
  await page.click(page, '#featureId-field', 500)
  await core.click(page, `#${featureId}`)
  await core.clickAction(page, 'create-layer-action', 1000)
  await page.waitForTimeout(wait)
}