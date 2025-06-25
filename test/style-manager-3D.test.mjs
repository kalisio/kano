import chai, { expect, util } from 'chai'
import chailint from 'chai-lint'

import { core, map } from './kdk/index.mjs'

const suite = 'style-manager-3D'

const userLayersTab = 'user-layers'

describe(`suite:${suite}`, () => {
  let runner, page
  const user = [
    { email: 'user-kano@kalisio.xyz', password: 'Pass;word1' },
    { email: 'admin-kano@kalisio.xyz', password: 'Pass;word1' }
  ]

  before(async () => {
    chailint(chai, util)

    // NOTE: chrome 113 is bundled with puppeteer 20.5
    // When running on a wayland session use --ozone-platform=wayland browser args
    // otherwise the test fails to initialize a webgl context with
    // powerPreference = 'high-performance' as requested by cesium 1.117
    // This might not be needed in later chrome versions ...
    const waylandArg = 'WAYLAND_DISPLAY' in process.env ? '--ozone-platform=wayland' : ''

    runner = new core.Runner(suite, {
      appName: 'kano',
      user: user[1].email,
      geolocation: { latitude: 43.31486, longitude: 1.95557 },
      localStorage: {
        'kano-welcome': false,
        'kano-install': false
      },
      browser: { args: [waylandArg] }
    })
    page = await runner.start()
    await core.login(page, user[1])
  })

  it('import geojson file', async () => {
    await map.importLayer(page, runner.getDataPath('samples.geojson'), 'name')
    await map.saveLayer(page, userLayersTab, 'samples')
  })

  /* Step 1: Style manager and style editor */
  it('create a new style', async () => {
    await core.clickPaneAction(page, 'top', 'globe-activity-action', 5000)
    await map.zoomToLayer(page, userLayersTab, 'samples')
    // Show style manager
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-style-manager'], 1000)
    // Create a new style with default style and "test-style" as name
    await core.click(page, '#add-style')
    await core.type(page, '#name-field', 'test-style')
    await core.click(page, '#apply-style', 1000)
    expect(await runner.captureAndMatch('S1_create_style', null, 3)).beTrue()
  })

  it('edit a style', async () => {
    // Edit the style created in the previous step
    await core.click(page, '#edit-style')
    // Point section
    await core.click(page, '#style-editor-point-section')
    await core.click(page, '#style-point-color #color-picker')
    await core.type(page, '.q-color-picker .fit', '#A65CCC')
    await page.keyboard.press('Escape')
    await core.waitForTimeout(1000)
    await core.click(page, '#style-point-size .q-btn')
    await core.moveSlider(page, 'style-property-slider', 'right', 8)
    await core.click(page, '#style-point-opacity .q-btn')
    await core.moveSlider(page, 'style-property-slider', 'left', 20)
    await core.click(page, '#style-point-shape #icon-picker', 1000)
    await core.click(page, '.q-menu .q-btn:nth-child(9)', 1000)
    await page.keyboard.press('Escape')
    await core.waitForTimeout(1000)

    // Line section
    await core.click(page, '#style-editor-line-section')
    await core.click(page, '#style-line-color #color-picker')
    await core.type(page, '.q-color-picker .fit', '#ff8000')
    await page.keyboard.press('Escape')
    await core.waitForTimeout(1000)
    await core.click(page, '#style-line-width .q-btn')
    await core.moveSlider(page, 'style-property-slider', 'right', 5)
    await core.click(page, '#style-line-opacity .q-btn')
    await core.moveSlider(page, 'style-property-slider', 'left', 50)

    // Polygon section
    await core.click(page, '#style-editor-polygon-section')
    await core.click(page, '#style-polygon-color #color-picker')
    await core.type(page, '.q-color-picker .fit', '#00ff00')
    await page.keyboard.press('Escape')
    await core.waitForTimeout(1000)
    await core.click(page, '#style-polygon-opacity .q-btn')
    await core.moveSlider(page, 'style-property-slider', 'right', 50)
    await core.click(page, '#style-polygon-stroke-color #color-picker')
    await core.type(page, '.q-color-picker .fit', '#000000')
    await page.keyboard.press('Escape')
    await core.waitForTimeout(1000)

    await core.click(page, '#apply-style', 1000)
    expect(await runner.captureAndMatch('S1_edit_style', null, 3)).beTrue()
    // Hide style manager
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-style-manager'])
  })

  it('apply a style to layer', async () => {
    // Show style manager
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-style-manager'])
    await core.click(page, '#apply-to-layer')
    await core.click(page, '.q-menu #menu-entries .q-item', 1000)
    // Hide style manager
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-style-manager'])
    expect(await runner.captureAndMatch('S1_apply_style_layer', null, 3)).beTrue()
  })

  it('reset layer style', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'reset-layer-style'])
    expect(await runner.captureAndMatch('S1_reset_style_layer', null, 3)).beTrue()
  })

  it('apply a style to selection', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'edit-layer'])
    await core.type(page, '#featureLabel-field', 'name')
    await core.click(page, '#apply-edit-layer', 1000)
    await core.waitForTimeout(2000)

    await map.goToPosition(page, 47.87870, -71.51716)
    await core.click(page, '#globe', 4000)
    await core.click(page, '#close-top-window')
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-style-manager'])
    await core.click(page, '#apply-to-selection')
    await map.zoomToLayer(page, userLayersTab, 'samples', 5000)
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-style-manager'])

    expect(await runner.captureAndMatch('S1_apply_style_selection', null, 3)).beTrue()
  })

  it('reset feature style', async () => {
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-selection-widget'])
    await core.click(page, '.q-tree__children #feature-actions')
    await core.click(page, '#reset-style-selected-feature')
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-selection-widget'])

    expect(await runner.captureAndMatch('S1_reset_style_selection', null, 3)).beTrue()
  })

  /* Step 2: Filters */

  it('create a new filter without style', async () => {
    await map.zoomToLayer(page, userLayersTab, 'samples', 5000)
    await core.clickPaneActions(page, 'right', ['layer-actions', 'filter-layer-data'])
    await core.click(page, '#add-filter')
    await core.type(page, '#name-field', 'test-filter-without-style')
    await core.click(page, '#condition-property')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(1)')
    await core.click(page, '#condition-comparison')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(1)')
    await core.click(page, '#condition-value')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(1)')
    await core.click(page, '#apply-edit-filter', 1000)
    await core.click(page, '#apply-edit-filter', 1000)

    expect(await runner.captureAndMatch('S2_create_filter_without_style', null, 3)).beTrue()
  })

  it('create a new filter with existing style', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'filter-layer-data'])
    await core.click(page, '#add-filter')
    await core.type(page, '#name-field', 'test-filter-with-existing-style')
    await core.click(page, '#condition-property')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(1)')
    await core.click(page, '#condition-comparison')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(1)')
    await core.click(page, '#condition-value')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(2)')
    await core.click(page, '#filter-style-field')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(3)')
    await core.click(page, '#apply-edit-filter', 1000)
    await core.click(page, '#apply-edit-filter', 1000)

    expect(await runner.captureAndMatch('S2_create_filter_with_existing_style', null, 3)).beTrue()
  })

  it('create a new filter with new style', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'filter-layer-data'])
    await core.click(page, '#add-filter')
    await core.type(page, '#name-field', 'test-filter-with-new-style')
    await core.click(page, '#condition-property')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(1)')
    await core.click(page, '#condition-comparison')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(1)')
    await core.click(page, '#condition-value')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(3)')
    await core.click(page, '#filter-style-field')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(2)')

    await core.type(page, '#style-editor #name-field', 'filter-style')
    await core.click(page, '#style-editor-polygon-section')
    await core.click(page, '#style-polygon-color #color-picker')
    await core.type(page, '.q-color-picker .fit', '#A65CCC')
    await page.keyboard.press('Escape')
    await core.waitForTimeout(1000)
    await core.click(page, '#style-polygon-opacity .q-btn')
    await core.moveSlider(page, 'style-property-slider', 'right', 50)
    await core.click(page, '#style-polygon-stroke-color #color-picker')
    await core.type(page, '.q-color-picker .fit', '#F05F40')
    await page.keyboard.press('Escape')
    await core.waitForTimeout(1000)

    await core.click(page, '#apply-edit-filter', 1000)
    await core.click(page, '#apply-edit-filter', 1000)

    expect(await runner.captureAndMatch('S2_create_filter_with_new_style', null, 3)).beTrue()
  })

  it('edit a filter with another condition', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'filter-layer-data'])
    await core.click(page, '#filter-manager-content .q-list .q-item:nth-child(3) #edit-filter')
    await core.click(page, '#add-condition')
    await core.click(page, '#filter-editor-rule .q-list .q-item:nth-child(3) #condition-boolean')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(1)')
    await core.click(page, '#filter-editor-rule .q-list .q-item:nth-child(3) #condition-property')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(1)')
    await core.click(page, '#filter-editor-rule .q-list .q-item:nth-child(3) #condition-comparison')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(2)')
    await core.click(page, '#filter-editor-rule .q-list .q-item:nth-child(3) #condition-value')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(1)')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(2)')
    await core.click(page, '.q-virtual-scroll__content .q-item:nth-child(3)')

    await core.click(page, '#apply-edit-filter', 1000)
    await core.click(page, '#apply-edit-filter', 1000)

    expect(await runner.captureAndMatch('S2_edit_filter', null, 3)).beTrue()
  })

  it('update style linked to a filter', async () => {
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-style-manager'])
    await core.click(page, '#edit-style')
    await core.click(page, '#style-editor-polygon-section')
    await core.click(page, '#style-polygon-color #color-picker')
    await core.type(page, '.q-color-picker .fit', '#F05F40', false, true)
    await page.keyboard.press('Escape')
    await core.waitForTimeout(1000)
    await core.click(page, '#style-polygon-stroke-color #color-picker')
    await core.type(page, '.q-color-picker .fit', '#A65CCC', false, true)
    await page.keyboard.press('Escape')
    await core.waitForTimeout(1000)

    await core.click(page, '#apply-style', 1000)
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-style-manager'])

    expect(await runner.captureAndMatch('S2_update_style', null, 3)).beTrue()
  })

  it('remove filters', async () => {
    await core.clickPaneActions(page, 'right', ['layer-actions', 'filter-layer-data'])
    for (let i = 0; i < 3; i++) {
      await core.click(page, '#remove-filter')
    }
    await core.click(page, '#apply-edit-filter', 1000)

    expect(await runner.captureAndMatch('S2_remove_filters', null, 3)).beTrue()
  })

  it('remove geojson file: points', async () => {
    await map.removeLayer(page, userLayersTab, 'samples')
  })

  it('delete a style', async () => {
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-style-manager'])
    for (let i = 0; i < 2; i++) {
      await core.click(page, '#delete-style')
      await core.click(page, '.q-dialog button:nth-child(2)', 1000)
    }
    await core.clickPaneActions(page, 'top', ['tools', 'toggle-style-manager'])
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
