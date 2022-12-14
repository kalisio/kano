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
import { computed } from 'vue'
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'
import { mixins as kMapMixins, composables as kMapComposables } from '@kalisio/kdk/map.client'
import { MixinStore } from '../mixin-store.js'
import utils from '../utils.js'
import config from 'config'

const name = 'mapActivity'
const baseActivityMixin = kCoreMixins.baseActivity(name)

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
  methods: {
    async configureMap (container) {
      // Avoid reentrance during awaited operations
      if (!container || this.mapContainer) return
      this.mapContainer = container
      // Wait until map is ready
      await this.initializeMap(container)
      // Notifie the listener
      utils.sendEmbedEvent('map-ready')
    },
    getViewKey () {
      // We'd like to share view settings between 2D/3D
      return this.geAppName().toLowerCase() + '-view'
    },
    onEditStartEvent (event) {
      this.setTopPaneMode('edit-layer-data')
      utils.sendEmbedEvent('edit-start', { layer: event.layer })
    },
    onEditStopEvent (event) {
      this.setTopPaneMode('default')
      utils.sendEmbedEvent('edit-stop', { layer: event.layer, status: event.status, geojson: this.toGeoJson(event.layer.name) })
    },
    forwardLayerEvents (layerEvents) {
      if (!_.has(this, 'layerHandlers')) { this.layerHandlers = {} }

      for (const layerEvent of layerEvents) {
        const handler = (layer) => utils.sendEmbedEvent(layerEvent, { layer })
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
    // Setup the engine
    this.registerStyle('tooltip', this.getProbedLocationForecastTooltip)
    this.registerStyle('markerStyle', this.getProbedLocationForecastMarker)
  },
  mounted () {
    // Setup event connections
    const allLeafletEvents = ['click', 'dblclick', 'mouseover']
    this.forwardLeafletEvents(allLeafletEvents)
    const allLayerEvents = ['layer-added', 'layer-shown', 'layer-hidden', 'layer-removed']
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
  },
  unmounted () {
    utils.sendEmbedEvent('map-destroyed')
  },
  setup () {
    return {
      ...kMapComposables.useActivity(name, { selection: { multiple: 'ctrlKey', buffer: 10 } })
    }
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
