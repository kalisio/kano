<template>
  <KPage>
    <!-- Map -->
    <div id="map" :ref="configureMap" :style="viewStyle">
      <q-resize-observer @resize="onMapResized" />
    </div>
    <!-- Child views -->
    <router-view />
  </KPage>
</template>

<script>
import { Configurations, Layout, TemplateContext, api, mixins as kCoreMixins, utils as kCoreUtils } from '@kalisio/kdk/core.client'
import { composables as kMapComposables, mixins as kMapMixins, utils as kMapUtils } from '@kalisio/kdk/map.client'
import config from 'config'
import L from 'leaflet'
import 'leaflet-arrowheads'
import _ from 'lodash'
import sift from 'sift'
import { computed } from 'vue'
import { ComposableStore } from '../composable-store.js'
import { MixinStore } from '../mixin-store.js'
import * as utils from '../utils'

const name = 'mapActivity'
const baseActivityMixin = kCoreMixins.baseActivity(name)

const buildVectorHats = L.Polyline.prototype.buildVectorHats
L.Polyline.prototype.buildVectorHats = function (options) {
  const rotate = this._map._rotate
  this._map._rotate = false
  buildVectorHats.bind(this)(options)
  this._map._rotate = rotate
}

export default {
  mixins: [
    kMapMixins.map.baseMap,
    kMapMixins.map.canvasLayers,
    kMapMixins.map.geojsonLayers,
    kMapMixins.map.heatmapLayers,
    kMapMixins.map.fileLayers,
    kMapMixins.map.editLayers,
    kMapMixins.map.style,
    kMapMixins.map.tooltip,
    kMapMixins.map.popup,
    kMapMixins.map.activity,
    kMapMixins.map.tiledMeshLayers,
    kMapMixins.map.tiledWindLayers,
    kMapMixins.map.mapillaryLayers,
    kMapMixins.map.panoramaxLayers,
    kMapMixins.map.gsmapLayers,
    kMapMixins.map.pmtilesLayers,
    baseActivityMixin,
    kMapMixins.activity,
    kMapMixins.style,
    kMapMixins.featureSelection,
    kMapMixins.featureService,
    kMapMixins.infobox,
    kMapMixins.weacast,
    kMapMixins.levels,
    kMapMixins.context
  ].concat(config.mapActivity.additionalMixins.map((name) => MixinStore.get(name))),
  provide () {
    return {
      kActivity: this,
      kMap: this,
      selectedLayer: computed(() => this.selectedLayer)
    }
  },
  data () {
    return {
      leftWindow: this.$store.get('layout.windows.left'),
      rightWindow: this.$store.get('layout.windows.right'),
      topWindow: this.$store.get('layout.windows.top'),
      bottomWindow: this.$store.get('layout.windows.bottom'),
      leftPane: this.$store.get('layout.panes.left'),
      rightPane: this.$store.get('layout.panes.right'),
      topPane: this.$store.get('layout.panes.top'),
      bottomPane: this.$store.get('layout.panes.bottom')
    }
  },
  watch: {
    // window visibility, to send postrobot events
    'leftWindow.visible': function (newValue, oldValue) { this.onWindowVisibleEvent('left', this.leftWindow) },
    'rightWindow.visible': function (newValue, oldValue) { this.onWindowVisibleEvent('right', this.rightWindow) },
    'topWindow.visible': function (newValue, oldValue) { this.onWindowVisibleEvent('top', this.topWindow) },
    'bottomWindow.visible': function (newValue, oldValue) { this.onWindowVisibleEvent('bottom', this.bottomWindow) },
    // window visibility, to send postrobot events
    'leftPane.visible': function (newValue, oldValue) { this.onPaneVisibleEvent('left', this.leftPane) },
    'rightPane.visible': function (newValue, oldValue) { this.onPaneVisibleEvent('right', this.rightPane) },
    'topPane.visible': function (newValue, oldValue) { this.onPaneVisibleEvent('top', this.topPane) },
    'bottomPane.visible': function (newValue, oldValue) { this.onPaneVisibleEvent('bottom', this.bottomPane) },
    $route: {
      handler (to, from) {
        const toProject = _.get(to, 'query.project')
        const fromProject = _.get(from, 'query.project')
        if (toProject !== fromProject) {
          this.loadProject()
          this.configureActivity()
        }
      }
    },
    project: {
      handler () {
        this.refreshLayers()
      }
    }
  },
  methods: {
    async configureMap (container) {
      // Avoid reentrance during awaited operations
      if (!container || this.mapContainer) return
      this.mapContainer = container
      // Wait until map is ready
      await this.initializeMap(container)
      // Need to disable for reentrance when using touch emulator
      if (window.TouchEmulator) this.map.tap.disable()
      // Notify the listener
      utils.sendEmbedEvent('map-ready')
    },
    configureActivity () {
      baseActivityMixin.methods.configureActivity.call(this)
      this.setRightPaneMode(this.hasProject() ? 'project' : 'default')
    },
    layersDraggable () {
      // Event if not authorized the user can temporarily change the layer order locally
      return true
    },
    categoriesDraggable () {
      // Authorized for users allowed to update the catalog
      return api.can('update', 'catalog')
    },
    async getCatalogCategories () {
      const categories = await kMapMixins.activity.methods.getCatalogCategories()
      
      // Order categories using the configuration objects
      const userCategoriesOrder = await Configurations.getValue('userCategoriesOrder')
      const defaultCategoriesOrder = await Configurations.getValue('defaultCategoriesOrder')
      
      // Reorder default categories
      kMapUtils.orderCatalogItemsBy(categories, defaultCategoriesOrder)

      // Reorder user categories, unordered first
      const unorderedUserCategoriesOrder = categories.filter(category => category._id && !userCategoriesOrder.includes(category._id)).map(category => category._id)
      kMapUtils.orderCatalogItemsBy(categories, unorderedUserCategoriesOrder)
      // Then ordered ones
      kMapUtils.orderCatalogItemsBy(categories, userCategoriesOrder)

      return categories
    },
    async getOrphanLayers () {
      const layers = await kMapMixins.activity.methods.getOrphanLayers.call(this)
      const userOrphanLayersOrder = await Configurations.getValue('userOrphanLayersOrder')
      kMapUtils.orderCatalogItemsBy(layers, userOrphanLayersOrder)
      return layers
    },
    async updateCategoriesOrder (sourceCategoryId, targetCategoryId) {
      if (!sourceCategoryId || !targetCategoryId) return
      // Update frontend structure
      const sourceIndex = this.layerCategories.findIndex(category => category?._id === sourceCategoryId)
      const targetIndex = this.layerCategories.findIndex(category => category?._id === targetCategoryId)
      this.layerCategories.splice(targetIndex, 0, this.layerCategories.splice(sourceIndex, 1)[0])
      await kMapMixins.activity.methods.updateCategoriesOrder.call(this, sourceCategoryId, targetCategoryId)
      // Serialize the change only if the user is authorized, otherwise this will only be a temporary local change
      if (api.can('update', 'configurations')) {
        // We only reorder user defined categories
        const userCategories = this.layerCategories.filter(category => category._id).map(category => category._id)
        // Update backend configuration
        await Configurations.update('userCategoriesOrder', userCategories)
      }
    },
    async updateLayersOrder (sourceCategoryId, data, movedLayer) {
      // Serialize the change only if the user is authorized, otherwise this will only be a temporary local change
      // Also check for in-memory layer
      if (api.can('update', 'catalog') && movedLayer?._id) {
        const catalogService = this.$api.getService('catalog')
        if (catalogService && sourceCategoryId && data) {
          await catalogService.patch(sourceCategoryId, data)
        }
      }
      await kMapMixins.activity.methods.updateLayersOrder.call(this, sourceCategoryId, data)
    },
    async updateOrphanLayersOrder (orphanLayers, movedLayer) {
      // Serialize the change only if the user is authorized, otherwise this will only be a temporary local change
      // Also check for in-memory layer
      if (api.can('update', 'configurations') && movedLayer?._id) {
        await Configurations.update('userOrphanLayersOrder', orphanLayers)
      }
      await kMapMixins.activity.methods.updateOrphanLayersOrder.call(this, orphanLayers)
    },
    async addLayer (layer) {
      // We let any embedding iframe process layer if required
      // Event is disabled by config by default however (as it can be costly)
      if (this.activityOptions.allowForwardEvents && this.activityOptions.allowForwardEvents.indexOf('layer-add') !== -1) {
        const response = await utils.sendEmbedEvent('layer-add', utils.serializeLayerForEmbedEvent(layer))
        // Do not erase with returned object as some internals might have been lost in serialization
        if (response && response.data) _.merge(layer, response.data)
      }
      layer = await kMapMixins.map.baseMap.methods.addLayer.call(this, layer)
      return layer
    },
    async updateLayer (name, geoJson, options = {}) {
      // We let any embedding iframe process features if required
      // Event is disabled by config by default however (as it can be costly)
      if (this.activityOptions.allowForwardEvents && this.activityOptions.allowForwardEvents.indexOf('layer-update') !== -1) {
        const response = await utils.sendEmbedEvent('layer-update', { name, geoJson, options })
        if (response && response.data) geoJson = response.data
      }
      await kMapMixins.map.geojsonLayers.methods.updateLayer.call(this, name, geoJson, options)
    },
    onLayerUpdated (layer, leafletLayer, data) {
      // Do not send update event at each frame for animated layers
      if (_.has(this.updateAnimations, `${layer.name}.id`)) return
      kMapMixins.map.geojsonLayers.methods.onLayerUpdated.call(this, layer, leafletLayer, data)
    },
    async onSaveLayer (layer) {
      await kMapMixins.activity.methods.onSaveLayer.call(this, layer)
    },
    async updateSelection () {
      await kMapMixins.featureSelection.methods.updateSelection.call(this)
      if (!this.hasProbedLocation() && !this.hasSelectedItems()) {
        // Hide the window
        Layout.setWindowVisible('top', false)
      }
    },
    async updateProbedLocationHighlight () {
      await kMapMixins.featureSelection.methods.updateProbedLocationHighlight.call(this)
      if (this.hasProbedLocation()) {
        this.unhighlight(this.getProbedLocation(), this.getProbedLayer() || { name: kMapUtils.ForecastProbeId })
        // Find time serie for probe, probed location is shared by all series
        const probedLocation = await _.get(this.state.timeSeries, '[0].series[0].probedLocationData')
        if (!probedLocation) return
        const isWeatherProbe = this.isWeatherProbe(probedLocation)
        const feature = (isWeatherProbe
          ? this.getProbedLocationForecastAtCurrentTime(probedLocation)
          : this.getProbedLocationMeasureAtCurrentTime(probedLocation))
        this.highlight(feature, this.getProbedLayer() || { name: kMapUtils.ForecastProbeId })
      }
    },
    getHighlightMarker (feature, options) {
      if ((options.name === kMapComposables.HighlightsLayerName) && this.isWeatherProbe(feature)) {
        return {
          icon: this.createWindBarbIcon(feature)
        }
      }
    },
    getHighlightTooltip (feature, layer, options) {
      if ((options.name === kMapComposables.HighlightsLayerName) && this.isWeatherProbe(feature)) {
        // Get labels from forecast layers
        const layers = _.values(this.layers).filter(sift({ tags: ['weather', 'forecast'] }))
        const variables = _.reduce(layers, (result, layer) => result.concat(_.get(layer, 'variables', [])), [])
        const fields = this.getProbedLocationForecastFields(variables)
        const html = this.getForecastAsHtml(feature, fields)
        return L.tooltip({ permanent: false }, layer).setContent(`<b>${html}</b>`)
      }
    },
    onEditStartEvent (event) {
      this.setTopPaneMode('edit-layer-data')
      utils.sendEmbedEvent('edit-start', { layer: event.layer })
    },
    onEditPointMovedEvent (event) {
      utils.sendEmbedEvent('edit-point-moved', event)
    },
    onEditStopEvent (event) {
      this.setTopPaneMode('default')
      utils.sendEmbedEvent('edit-stop', { layer: event.layer, status: event.status, geojson: this.toGeoJson(event.layer.name) })
    },
    onWindowVisibleEvent (placement, window) {
      const eventName = window.visible ? 'window-opened' : 'window-closed'
      utils.sendEmbedEvent(eventName, { placement, widget: window.current })
    },
    onPaneVisibleEvent (placement, pane) {
      const eventName = pane.visible ? 'pane-opened' : 'pane-closed'
      utils.sendEmbedEvent(eventName, { placement })
    },
    onUpdateBearing () {
      TemplateContext.set('bearing', this.map.getBearing())
    },
    forwardLayerEvents (layerEvents) {
      if (!_.has(this, 'layerHandlers')) { this.layerHandlers = {} }

      for (const layerEvent of layerEvents) {
        // Event may be disabled by config
        const options = this.activityOptions
        const defaultLayerEvents = ['layer-added', 'layer-shown', 'layer-hidden', 'layer-removed']
        let okForward = (defaultLayerEvents.indexOf(layerEvent) !== -1)
        if (options.allowForwardEvents) okForward = okForward || (options.allowForwardEvents.indexOf(layerEvent) !== -1)
        if (options.disallowForwardEvents) okForward = okForward && (options.disallowForwardEvents.indexOf(layerEvent) === -1)
        if (!okForward) continue

        const handler = (layer) => {
          utils.sendEmbedEvent(layerEvent, { layer: utils.serializeLayerForEmbedEvent(layer) })
        }
        this.layerHandlers[layerEvent] = handler
        this.$engineEvents.on(layerEvent, handler)
      }
    },
    removeForwardedLayerEvents () {
      for (const layerEvent in this.layerHandlers) { this.$engineEvents.off(layerEvent, this.layerHandlers[layerEvent]) }
      this.layerHandlers = {}
    },
    forwardPaneEvents (paneEvents) {
      if (!_.has(this, 'paneHandlers')) { this.paneHandlers = {} }

      for (const paneEvent of paneEvents) {
        // Event may be disabled by config
        const options = this.activityOptions
        const defaultPaneEvents = ['pane-added', 'pane-shown', 'pane-hidden', 'pane-removed']
        let okForward = (defaultPaneEvents.indexOf(paneEvent) !== -1)
        if (options.allowForwardEvents) okForward = okForward || (options.allowForwardEvents.indexOf(paneEvent) !== -1)
        if (options.disallowForwardEvents) okForward = okForward && (options.disallowForwardEvents.indexOf(paneEvent) === -1)
        if (!okForward) continue

        const handler = (pane) => {
          utils.sendEmbedEvent(paneEvent, { pane })
        }
        this.paneHandlers[paneEvent] = handler
        this.$engineEvents.on(paneEvent, handler)
      }
    },
    removeForwardedPaneEvents () {
      for (const paneEvent in this.paneHandlers) { this.$engineEvents.off(paneEvent, this.paneHandlers[paneEvent]) }
      this.paneHandlers = {}
    },
    forwardLeafletEvents (leafletEvents) {
      if (!_.has(this, 'leafletHandlers')) { this.leafletHandlers = {} }

      for (const leafletEvent of leafletEvents) {
        // Event may be disabled by config
        const options = this.activityOptions
        const defaultLeafletEvents = ['click', 'dblclick', 'contextmenu']
        let okForward = (defaultLeafletEvents.indexOf(leafletEvent) !== -1)
        if (options.allowForwardEvents) okForward = okForward || (options.allowForwardEvents.indexOf(leafletEvent) !== -1)
        if (options.disallowForwardEvents) okForward = okForward && (options.disallowForwardEvents.indexOf(leafletEvent) === -1)
        if (!okForward) continue
        const isMoveEvent = leafletEvent.startsWith('move')
        const isZoomEvent = leafletEvent.startsWith('zoom')
        const isRotateEvent = (leafletEvent === 'rotate')
        const isStateEvent = (isMoveEvent || isZoomEvent || isRotateEvent)
        const isMouseEvent = leafletEvent.startsWith('mouse') || leafletEvent.startsWith('drag')
        const isTouchEvent = leafletEvent.startsWith('touch')
        const hasThrottle = (isStateEvent || isMouseEvent || isTouchEvent)
        const throttle = (isStateEvent
          ? _.get(this.activityOptions, 'eventsThrottle.state', 1000)
          : isMouseEvent
            ? _.get(this.activityOptions, 'eventsThrottle.mouse', 1000)
            : _.get(this.activityOptions, 'eventsThrottle.touch', 1000))

        let handler = (options, event) => {
          let latlng = _.get(event, 'latlng')
          // For some events like marker drag we get the new position fro mthe target
          if (!latlng && _.has(event, 'target') && (typeof event.target.getLatLng === 'function')) latlng = event.target.getLatLng()
          const feature = _.get(event, 'target.feature') || _.get(event, 'feature')
          // Retrieve original layer options not processed ones
          // as they can include internal objects not to be serialized
          const layer = (options ? this.getLayerByName(options.name) : undefined)
          const payload = {
            longitude: _.get(latlng, 'lng'),
            latitude: _.get(latlng, 'lat'),
            feature,
            layer: utils.serializeLayerForEmbedEvent(layer),
            containerPoint: _.get(event, 'containerPoint'),
            layerPoint: _.get(event, 'layerPoint')
          }
          if (isRotateEvent) {
            payload.bearing = this.getBearing()
          }
          // Check if we need to stop propagation, should be done before sending event to postrobot
          // as it's an async operation and if we do it after others event listeners will have been already processed
          const stopMethods = ['stopPropagation', 'stopImmediatePropagation']
          stopMethods.forEach(stopMethod => {
            const stopEvents = _.get(feature, `style.${stopMethod}`)
            if (Array.isArray(stopEvents) && (stopEvents.indexOf(leafletEvent) !== -1)) {
              event.originalEvent[stopMethod]()
            }
          })
          utils.sendEmbedEvent(leafletEvent, payload)
        }
        // Some events might be numerous, notably when using animations,
        // as a consequence we only trigger it as a configured throttle
        handler = (hasThrottle ? _.throttle(handler, throttle) : handler)
        this.leafletHandlers[leafletEvent] = handler
        this.$engineEvents.on(leafletEvent, handler)
      }
    },
    removeForwardedLeafletEvents () {
      for (const leafletEvent in this.leafletHandlers) { this.$engineEvents.off(leafletEvent, this.leafletHandlers[leafletEvent]) }
      this.leafletHandlers = {}
    },
    onMoveEnd () {
      if (!this.state) return
      // Update navigation information in store, this is useful eg in test to be able to retrieve current state
      const center = this.map.getCenter()
      const zoom = this.map.getZoom()
      const bounds = this.map.getBounds()
      const south = bounds.getSouth()
      const west = bounds.getWest()
      const north = bounds.getNorth()
      const east = bounds.getEast()
      Object.assign(this.state, {
        longitude: center.lng,
        latitude: center.lat,
        zoom,
        south,
        west,
        north,
        east
      })
    },
    async cacheView (view, layers, options = {}) {
      // Override to add configurations in cache as well
      await kMapUtils.addViewToCache(view, options)
      // Generate offline document for views in cache
      const query = await kMapUtils.getOfflineDocumentQueryForViews()
      query.configurations = {}
      const offlineDocument = await kCoreUtils.createOfflineDocument(query)
      await kCoreUtils.getOfflineDocumentContent(offlineDocument)
      // Then offline services
      const { metadata } = offlineDocument
      await kCoreUtils.addServiceToCache('configurations', Object.assign({}, _.get(metadata, 'configurations')))
      await kMapUtils.createOfflineServicesForViews(offlineDocument)
      // Then data layer
      await kMapUtils.cacheLayersForView(view, layers, options)
    }
  },
  created () {
    this.setCurrentActivity(this)
    this.registerStyle('point', this.getHighlightMarker)
    this.registerStyle('tooltip', this.getHighlightTooltip)
  },
  mounted () {
    // Setup event connections
    const allLeafletEvents = ['click', 'dblclick', 'contextmenu', 'mouseover', 'mouseout', 'mousemove', 'mousedown', 'mouseup',
      'movestart', 'moveend', 'move', 'zoomstart', 'zoomend', 'zoom', 'rotate', 'dragstart', 'dragend', 'drag'].concat(kMapUtils.TouchEvents)
    this.forwardLeafletEvents(allLeafletEvents)
    const allLayerEvents = ['layer-added', 'layer-shown', 'layer-hidden', 'layer-removed', 'layer-updated']
    this.forwardLayerEvents(allLayerEvents)
    const allPaneEvents = ['pane-added', 'pane-shown', 'pane-hidden', 'pane-removed']
    this.forwardPaneEvents(allPaneEvents)
    this.$engineEvents.on('edit-start', this.onEditStartEvent)
    this.$engineEvents.on('edit-point-moved', this.onEditPointMovedEvent)
    this.$engineEvents.on('edit-stop', this.onEditStopEvent)
    this.$engineEvents.on('moveend', this.onMoveEnd)
    this.$engineEvents.on('rotate', this.onUpdateBearing)
  },
  beforeUnmount () {
    // Remove event connections
    this.removeForwardedLeafletEvents()
    this.removeForwardedLayerEvents()
    this.removeForwardedPaneEvents()
    this.$engineEvents.off('edit-start', this.onEditStartEvent)
    this.$engineEvents.off('edit-point-moved', this.onEditPointMovedEvent)
    this.$engineEvents.off('edit-stop', this.onEditStopEvent)
    this.$engineEvents.off('moveend', this.onMoveEnd)
    this.$engineEvents.off('rotate', this.onUpdateBearing)
    this.unregisterStyle('point', this.getHighlightMarker)
    this.unregisterStyle('tooltip', this.getHighlightTooltip)
  },
  unmounted () {
    utils.sendEmbedEvent('map-destroyed')
  },
  async setup () {
    const activity = kMapComposables.useActivity(name, { state: { timeSeries: [] } })
    const weather = kMapComposables.useWeather()
    const measure = kMapComposables.useMeasure()
    const project = kMapComposables.useProject()
    await project.loadProject()
    activity.setSelectionMode('multiple')
    const expose = {
      ...activity,
      ...activity.CurrentActivityContext,
      ...weather,
      ...measure,
      ...project
    }
    const additionalComposables = _.get(config, `${name}.additionalComposables`, [])
    for (const use of additionalComposables.map((name) => ComposableStore.get(name))) { Object.assign(expose, use(name)) }
    return expose
  }
}
</script>

<style lang="scss">
  .probe-cursor {
    cursor: crosshair;
  }
  .processing-cursor {
    cursor: wait;
  }
  .position-cursor {
    cursor: url('/kdk/position-cursor.png'), auto;
  }
</style>
