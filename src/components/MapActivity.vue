<template>
  <KPage :padding="false">
    <template v-slot:page-content>
      <!-- Map -->
      <div id="map" :ref="configureMap" :style="viewStyle">
        <q-resize-observer @resize="onMapResized" />
      </div>
      <!-- Child views -->
      <router-view />
    </template>
  </KPage>
</template>

<script>
import _ from 'lodash'
import L from 'leaflet'
import 'leaflet-rotate/dist/leaflet-rotate-src.js'
import 'leaflet-arrowheads'
import { computed } from 'vue'
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'
import { mixins as kMapMixins, composables as kMapComposables } from '@kalisio/kdk/map.client'
import { MixinStore } from '../mixin-store.js'
import { ComposableStore } from '../composable-store.js'
import utils from '../utils.js'
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
      this.setRightPaneMode(this.hasProject() ? 'project-layers' : 'user-layers')
    },
    getViewKey () {
      // We'd like to share view settings between 2D/3D
      return this.geAppName().toLowerCase() + '-view'
    },
    async updateLayer (name, geoJson, options = {}) {
      // We let any embedding iframe process features if required
      const response = await utils.sendEmbedEvent('layer-update', { name, geoJson, options })
      kMapMixins.map.geojsonLayers.methods.updateLayer.call(this, name, (response && response.data) || geoJson, options)
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
        const html = this.getForecastAsHtml(feature)
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
          let okForward = leafletEvent === 'click' || leafletEvent === 'dblclick'
          if (opts.allowForwardEvents) okForward = okForward || opts.allowForwardEvents.indexOf(leafletEvent) !== -1
          if (opts.disallowForwardEvents) okForward = okForward && opts.disallowForwardEvents.indexOf(leafletEvent) === -1
          if (!okForward) return

          const latlng = _.get(event, 'latlng')
          const feature = _.get(event, 'target.feature') || _.get(event, 'feature')
          // feature required for those events
          if (leafletEvent === 'mouseover' && !feature) return
          // Retrieve original layer options not processed ones
          // as they can include internal objects not to be serialized
          const layer = (options ? this.getLayerByName(options.name) : undefined)
          utils.sendEmbedEvent(leafletEvent, { longitude: latlng.lng, latitude: latlng.lat, feature, layer })
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
      // Update navigation information in store
      const center = this.map.getCenter()
      const zoom = this.map.getZoom()
      const bounds = this.map.getBounds()
      const south = bounds.getSouth()
      const west = bounds.getWest()
      const north = bounds.getNorth()
      const east = bounds.getEast()
      this.$store.patch(this.activityName, {
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
    const allLeafletEvents = ['click', 'dblclick', 'mouseover']
    this.forwardLeafletEvents(allLeafletEvents)
    const allLayerEvents = ['layer-added', 'layer-shown', 'layer-hidden', 'layer-removed', 'layer-updated']
    this.forwardLayerEvents(allLayerEvents)
    this.$engineEvents.on('edit-start', this.onEditStartEvent)
    this.$engineEvents.on('edit-stop', this.onEditStopEvent)
    // We store some information about the current navigation state in store, initialize it
    this.$store.set(this.activityName, {})
    this.$engineEvents.on('moveend', this.onMoveEnd)
  },
  beforeUnmount () {
    // Remove event connections
    this.removeForwardedLeafletEvents()
    this.removeForwardedLayerEvents()
    this.$engineEvents.off('edit-start', this.onEditStartEvent)
    this.$engineEvents.off('edit-stop', this.onEditStopEvent)
    this.$engineEvents.off('moveend', this.onMoveEnd)
    this.unregisterStyle('point', this.getHighlightMarker)
    this.unregisterStyle('tooltip', this.getHighlightTooltip)
  },
  unmounted () {
    utils.sendEmbedEvent('map-destroyed')
  },
  async setup () {
    const expose = {
      ...kMapComposables.useActivity(name),
      ...kMapComposables.useWeather(name),
      ...kMapComposables.useProject()
    }
    await expose.loadProject()
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
