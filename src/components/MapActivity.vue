<template>
  <k-page :padding="false">
    <template v-slot:page-content>
      <!-- Map -->
      <div id="map" ref="map" :style="viewStyle">
        <q-resize-observer @resize="onMapResized" />
      </div>
      <!-- Child views -->
      <router-view />
    </template>
  </k-page>
</template>

<script>
import _ from 'lodash'
import { mixins as kCoreMixins, utils as kCoreUtils } from '@kalisio/kdk/core.client'
import { mixins as kMapMixins } from '@kalisio/kdk/map.client'
import utils from '../utils'

const baseActivityMixin = kCoreMixins.baseActivity()

export default {
  name: 'map-activity',
  mixins: [
    kCoreMixins.refsResolver(['map']),
    baseActivityMixin,
    kMapMixins.activity,
    kMapMixins.style,
    kMapMixins.featureSelection,
    kMapMixins.featureService,
    kMapMixins.infobox,
    kMapMixins.weacast,
    kMapMixins.time,
    kMapMixins.levels,
    kMapMixins.context,
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
    kMapMixins.map.gsmapLayers
  ],
  provide () {
    return {
      kActivity: this,
      kMap: this
    }
  },
  methods: {
    async configureActivity () {
      baseActivityMixin.methods.configureActivity.call(this)
      // Wait until map is ready
      await this.initializeMap()
      // Notifie the listener
      utils.sendEmbedEvent('map-ready')
    },
    getViewKey () {
      // We'd like to share view settings between 2D/3D
      return this.geAppName().toLowerCase() + `-view`
    },
    onFeaturePopupOpen (options, event) {
      const feature = _.get(event, 'layer.feature')
      if (!feature) return
    },
    onClicked (options, event) {
      const latlng = _.get(event, 'latlng')
      const feature = _.get(event, 'target.feature') || _.get(event, 'feature')
      // Retrieve original layer options not processed ones
      // as they can include internal objects not to be serialized
      const layer = (options ? this.getLayerByName(options.name) : undefined)
      utils.sendEmbedEvent('click', { longitude: latlng.lng, latitude: latlng.lat, feature, layer })
    },
    onDblClicked (options, event) {
      const latlng = _.get(event, 'latlng')
      const feature = _.get(event, 'target.feature') || _.get(event, 'feature')
      // Retrieve original layer options not processed ones
      // as they can include internal objects not to be serialized
      const layer = (options ? this.getLayerByName(options.name) : undefined)
      utils.sendEmbedEvent('dblclick', { longitude: latlng.lng, latitude: latlng.lat, feature, layer })
    },
    onEditStopEvent (layer) {
      utils.sendEmbedEvent('edit-stop', { layer, geojson: this.toGeoJson(layer.name) })
    },
    generateHandlerForLayerEvent (event) {
      return (layer) => utils.sendEmbedEvent(event, { layer })
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
    // Setup the engine
    this.registerStyle('tooltip', this.getProbedLocationForecastTooltip)
    this.registerStyle('markerStyle', this.getProbedLocationForecastMarker)
  },
  mounted () {
    // Setup event connections
    // this.$on('popupopen', this.onFeaturePopupOpen)
    this.$on('click', this.onClicked)
    this.$on('dblclick', this.onDblClicked)
    this.onAddedLayerEvent = this.generateHandlerForLayerEvent('layer-added')
    this.$on('layer-added', this.onAddedLayerEvent)
    this.onShownLayerEvent = this.generateHandlerForLayerEvent('layer-shown')
    this.$on('layer-shown', this.onShownLayerEvent)
    this.onHiddenLayerEvent = this.generateHandlerForLayerEvent('layer-hidden')
    this.$on('layer-hidden', this.onHiddenLayerEvent)
    this.onRemovedLayerEvent = this.generateHandlerForLayerEvent('layer-removed')
    this.$on('layer-removed', this.onRemovedLayerEvent)
    this.onEditStartEvent = this.generateHandlerForLayerEvent('edit-start')
    this.$on('edit-start', this.onEditStartEvent)
    this.$on('edit-stop', this.onEditStopEvent)
  },
  beforeDestroy () {
    // Remove event connections
    // this.$off('popupopen', this.onFeaturePopupOpen)
    this.$off('click', this.onClicked)
    this.$off('dblclick', this.onDblClicked)
    this.$off('layer-added', this.onAddedLayerEvent)
    this.$off('layer-shown', this.onShownLayerEvent)
    this.$off('layer-hidden', this.onHiddenLayerEvent)
    this.$off('layer-removed', this.onRemovedLayerEvent)
    this.$off('edit-start', this.onEditStartEvent)
    this.$off('edit-stop', this.onEditStopEvent)
  },
  destroyed () {
    utils.sendEmbedEvent('map-destroyed')
  }
}
</script>

<style lang="stylus">
  .probe-cursor {
    cursor: crosshair;
  }
  .processing-cursor {
    cursor: wait;
  }
  .position-cursor {
    cursor: url('../statics/position-cursor.png'), auto; 
  }
</style>
