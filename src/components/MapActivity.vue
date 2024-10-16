<template>
  <KPage :padding="false">
    <!-- Map -->
    <div id="map" :ref="configureMap" :style="viewStyle">
      <q-resize-observer @resize="onMapResized" />
    </div>
    <!-- Child views -->
    <router-view />
  </KPage>
</template>

<script>
import _ from 'lodash'
import L from 'leaflet'
import sift from 'sift'
import 'leaflet-rotate/dist/leaflet-rotate-src.js'
import 'leaflet-arrowheads'
import { computed } from 'vue'
import { Store, Layout, TemplateContext, mixins as kCoreMixins } from '@kalisio/kdk/core.client'
import { mixins as kMapMixins, composables as kMapComposables } from '@kalisio/kdk/map.client'
import { MixinStore } from '../mixin-store.js'
import { ComposableStore } from '../composable-store.js'
import * as utils from '../utils'
import config from 'config'

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
    kMapMixins.map.forecastLayers,
    kMapMixins.map.fileLayers,
    kMapMixins.map.georasterLayers,
    kMapMixins.map.editLayers,
    kMapMixins.map.style,
    kMapMixins.map.tooltip,
    kMapMixins.map.popup,
    kMapMixins.map.activity,
    kMapMixins.map.tiledMeshLayers,
    kMapMixins.map.tiledWindLayers,
    kMapMixins.map.mapillaryLayers,
    kMapMixins.map.gsmapLayers,
    kMapMixins.map.pmtilesLayers,
    baseActivityMixin,
    kMapMixins.activity,
    kMapMixins.style,
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
    // window visiblity, to send postrobot events
    'leftWindow.visible': function (newValue, oldValue) { this.onWindowVisibleEvent('left', this.leftWindow) },
    'rightWindow.visible': function (newValue, oldValue) { this.onWindowVisibleEvent('right', this.rightWindow) },
    'topWindow.visible': function (newValue, oldValue) { this.onWindowVisibleEvent('top', this.topWindow) },
    'bottomWindow.visible': function (newValue, oldValue) { this.onWindowVisibleEvent('bottom', this.bottomWindow) },
    // window visiblity, to send postrobot events
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
    },
    'selection.items': {
      handler () {
        this.updateSelection()
      },
      deep: true
    },
    'probe.item': {
      handler () {
        this.updateSelection()
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
      // Notify the listener
      utils.sendEmbedEvent('map-ready')
    },
    configureActivity () {
      baseActivityMixin.methods.configureActivity.call(this)
      this.setRightPaneMode(this.hasProject() ? 'project' : 'default')
    },
    getViewKey () {
      // We'd like to share view settings between 2D/3D
      return this.geAppName().toLowerCase() + '-view'
    },
    async addLayer (layer) {
      // We let any embedding iframe process layer if required
      // Take care that post-robot serialize functions
      const response = await utils.sendEmbedEvent('layer-add', _.omit(layer, ['getPlanetApi']))
      // Do not erase with returned object as some internals might have been lost in serialization
      if (response && response.data) _.merge(layer, response.data)
      layer = await kMapMixins.map.baseMap.methods.addLayer.call(this, layer)
      return layer
    },
    async updateLayer (name, geoJson, options = {}) {
      // We let any embedding iframe process features if required
      const response = await utils.sendEmbedEvent('layer-update', { name, geoJson, options })
      await kMapMixins.map.geojsonLayers.methods.updateLayer.call(this, name, (response && response.data) || geoJson, options)
    },
    setBearing(bearing) {
      kMapMixins.map.baseMap.methods.setBearing.call(this, bearing)
      TemplateContext.get().bearing = bearing
    },
    handleWidget (widget) {
      // If window already open on another widget keep it
      if (widget && (widget !== 'none') && !this.isWidgetWindowVisible(widget)) this.openWidget(widget)
    },
    async updateTimeSeries () {
      this.state.timeSeries = await utils.updateTimeSeries(this.state.timeSeries)
    },
    updateHighlights () {
      this.clearHighlights()
      this.getSelectedItems().forEach(item => {
        this.highlight(item.feature || item.location, item.layer)
      })
      if (this.hasProbedLocation()) this.highlight(this.getProbedLocation(), this.getProbedLayer() || { name: 'probe' })
    },
    async updateSelection () {
      this.updateHighlights()
      await this.updateTimeSeries()
      if (this.hasProbedLocation() || this.hasSelectedItems()) {
        this.handleWidget(this.getWidgetForProbe() || this.getWidgetForSelection())
        // After probing update highlight to use specific weather wind barb
        await this.updateProbedLocationHighlight()
      } else {
        // Hide the window
        Layout.setWindowVisible('top', false)
      }
    },
    async updateProbedLocationHighlight () {
      if (this.hasProbedLocation()) {
        this.unhighlight(this.getProbedLocation(), this.getProbedLayer() || { name: 'probe' })
        // Find time serie for probe, probed location is shared by all series
        const probedLocation = await _.get(this.state.timeSeries, '[0].series[0].probedLocation')
        if (!probedLocation) return
        const isWeatherProbe = this.isWeatherProbe(probedLocation)
        const feature = (isWeatherProbe
          ? this.getProbedLocationForecastAtCurrentTime(probedLocation)
          : this.getProbedLocationMeasureAtCurrentTime(probedLocation))
        this.highlight(feature, this.getProbedLayer() || { name: 'probe' })
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
    forwardLayerEvents (layerEvents) {
      if (!_.has(this, 'layerHandlers')) { this.layerHandlers = {} }

      for (const layerEvent of layerEvents) {
        const handler = (layer) => {
          // Take care to not serialize internal Leaflet structures that might contain circular references
          utils.sendEmbedEvent(layerEvent, {
            layer: Object.assign(_.omit(layer, ['leaflet']), {
              leaflet: _.mapValues(layer.leaflet, value => (value instanceof L.Class) ? null : value)
            })
          })
        }
        this.layerHandlers[layerEvent] = handler
        this.$engineEvents.on(layerEvent, handler)
      }
    },
    removeForwardedLayerEvents () {
      for (const layerEvent in this.layerHandlers) { this.$engineEvents.off(layerEvent, this.layerHandlers[layerEvent]) }
      this.layerHandlers = {}
    },
    forwardLeafletEvents (leafletEvents) {
      if (!_.has(this, 'leafletHandlers')) { this.leafletHandlers = {} }

      for (const leafletEvent of leafletEvents) {
        const handler = (options, event) => {
          // event may be disabled by config
          const opts = this.activityOptions
          const defaultLeafletEvents = ['click', 'dblclick', 'contextmenu']
          let okForward = (defaultLeafletEvents.indexOf(leafletEvent) !== -1 )
          if (opts.allowForwardEvents) okForward = okForward || (opts.allowForwardEvents.indexOf(leafletEvent) !== -1)
          if (opts.disallowForwardEvents) okForward = okForward && (opts.disallowForwardEvents.indexOf(leafletEvent) === -1)
          if (!okForward) return

          let latlng = _.get(event, 'latlng')
          // For some events like marker drag we get the new position fro mthe target
          if (!latlng && _.has(event, 'target') && (typeof event.target.getLatLng === 'function')) latlng = event.target.getLatLng()
          const feature = _.get(event, 'target.feature') || _.get(event, 'feature')
          // Retrieve original layer options not processed ones
          // as they can include internal objects not to be serialized
          const layer = (options ? this.getLayerByName(options.name) : undefined)
          const payload = {
            longitude: _.get(latlng, 'lng'), latitude: _.get(latlng, 'lat'), feature, layer,
            containerPoint: _.get(event, 'containerPoint'), layerPoint: _.get(event, 'layerPoint')
          }
          if (leafletEvent === 'rotate') {
            payload.bearing = this.getBearing()
          }
          utils.sendEmbedEvent(leafletEvent, payload)
        }
        this.leafletHandlers[leafletEvent] = handler
        this.$engineEvents.on(leafletEvent, handler)
      }
    },
    removeForwardedLeafletEvents () {
      for (const leafletEvent in this.leafletHandlers) { this.$engineEvents.off(leafletEvent, this.leafletHandlers[leafletEvent]) }
      this.leafletHandlers = {}
    },
    onMoveEnd () {
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
      'movestart', 'moveend', 'move', 'zoomstart', 'zoomend', 'zoom', 'rotate', 'dragstart', 'dragend', 'drag']
    this.forwardLeafletEvents(allLeafletEvents)
    const allLayerEvents = ['layer-added', 'layer-shown', 'layer-hidden', 'layer-removed', 'layer-updated']
    this.forwardLayerEvents(allLayerEvents)
    this.$engineEvents.on('edit-start', this.onEditStartEvent)
    this.$engineEvents.on('edit-stop', this.onEditStopEvent)
    this.$engineEvents.on('moveend', this.onMoveEnd)
    this.$engineEvents.on('forecast-model-changed', this.updateSelection)
    this.$engineEvents.on('selected-level-changed', this.updateSelection)
    this.$events.on('timeseries-group-by-changed', this.updateTimeSeries)
    this.$events.on('time-current-time-changed', this.updateProbedLocationHighlight)
  },
  beforeUnmount () {
    // Remove event connections
    this.removeForwardedLeafletEvents()
    this.removeForwardedLayerEvents()
    this.$engineEvents.off('edit-start', this.onEditStartEvent)
    this.$engineEvents.off('edit-stop', this.onEditStopEvent)
    this.$engineEvents.off('moveend', this.onMoveEnd)
    this.$engineEvents.off('forecast-model-changed', this.updateSelection)
    this.$engineEvents.off('selected-level-changed', this.updateSelection)
    this.$events.off('timeseries-group-by-changed', this.updateTimeSeries)
    this.$events.off('time-current-time-changed', this.updateProbedLocationHighlight)
    this.unregisterStyle('point', this.getHighlightMarker)
    this.unregisterStyle('tooltip', this.getHighlightTooltip)
  },
  unmounted () {
    utils.sendEmbedEvent('map-destroyed')
  },
  async setup () {
    const activity = kMapComposables.useActivity(name)
    const weather = kMapComposables.useWeather()
    const measure = kMapComposables.useMeasure()
    const project = kMapComposables.useProject()
    // Initialize state and project
    Object.assign(activity.state, {
      timeSeries: []
    })
    await project.loadProject()
    activity.setSelectionMode('multiple')
    const expose = {
      ...activity,
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
    cursor: url('/icons/kdk/position-cursor.png'), auto;
  }
</style>
