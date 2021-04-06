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
import 'leaflet-timedimension/dist/leaflet.timedimension.src.js'
import 'leaflet-timedimension/dist/leaflet.timedimension.control.css'
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
    createLeafletTimedWmsLayer (options) {
      let leafletOptions = options.leaflet || options
      // Check for valid type
      if (leafletOptions.type !== 'tileLayer.wms') return
      let layer = this.createLeafletLayer(options)
      // Specific case of time dimension layer where we embed the underlying WMS layer
      if (leafletOptions.timeDimension) {
        layer = this.createLeafletLayer(Object.assign({
          type: 'timeDimension.layer.wms',
          source: layer
        }, leafletOptions.timeDimension))
        layer.setAvailableTimes(this.map.timeDimension.getAvailableTimes())
      }
      return layer
    },
    onFeaturePopupOpen (options, event) {
      const feature = _.get(event, 'layer.feature')
      if (!feature) return
    },
    async onClicked (options, event) {
      const feature = _.get(event, 'target.feature')
      if (!feature) return
      // Retrieve original layer options not processed ones
      // as they can include internal objects not to be serialized
      if (options) { // Check for internal objects not coming from a layer
        utils.sendEmbedEvent('click', { feature, layer: this.getLayerByName(options.name) })
      }
    },
    onCurrentTimeChanged (time) {
      // Round to nearest hour - FIXME: should be based on available times
      this.map.timeDimension.setCurrentTime(time.clone().minutes(0).seconds(0).milliseconds(0).valueOf())
    },
    generateHandlerForLayerEvent (event) {
      return (layer) => utils.sendEmbedEvent(event, { layer })
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
    // Setup the engine
    this.registerLeafletConstructor(this.createLeafletTimedWmsLayer)
    this.registerStyle('tooltip', this.getProbedLocationForecastTooltip)
    this.registerStyle('markerStyle', this.getProbedLocationForecastMarker)
  },
  mounted () {
    this.$on('current-time-changed', this.onCurrentTimeChanged)
    // Setup event connections
    // this.$on('popupopen', this.onFeaturePopupOpen)
    this.$on('click', this.onClicked)
    this.onAddedLayerEvent = this.generateHandlerForLayerEvent('layer-added')
    this.$on('layer-added', this.onAddedLayerEvent)
    this.onShownLayerEvent = this.generateHandlerForLayerEvent('layer-shown')
    this.$on('layer-shown', this.onShownLayerEvent)
    this.onHiddenLayerEvent = this.generateHandlerForLayerEvent('layer-hidden')
    this.$on('layer-hidden', this.onHiddenLayerEvent)
    this.onRemovedLayerEvent = this.generateHandlerForLayerEvent('layer-removed')
    this.$on('layer-removed', this.onRemovedLayerEvent)
  },
  beforeDestroy () {
    this.$off('current-time-changed', this.onCurrentTimeChanged)
    // Remove event connections
    // this.$off('popupopen', this.onFeaturePopupOpen)
    this.$off('click', this.onClicked)
    this.$off('layer-added', this.onAddedLayerEvent)
    this.$off('layer-shown', this.onShownLayerEvent)
    this.$off('layer-hidden', this.onHiddenLayerEvent)
    this.$off('layer-removed', this.onRemovedLayerEvent)
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
