<template>
  <k-page :padding="false">
    <template v-slot:page-content>
      <!--
        Map
       -->
      <div id="map" ref="map" :style="viewStyle">
        <q-resize-observer @resize="onMapResized" />
      </div>
      <!-- 
        Target
       -->
      <k-target v-if="isTargetVisible" />
      <!--
        ColorLegend
       -->
      <q-page-sticky position="left" :offset="[18, 0]">
        <k-color-legend />
      </q-page-sticky>
      <!--
        LevelSlider
       -->
      <q-page-sticky position="right" :offset="[40, 0]">
        <k-level-slider />
      </q-page-sticky>
       <!--
        Extra components
       -->
      <component v-for="component in components" :is="component.name" :key="component.name"></component>
    </template>
  </k-page>
</template>

<script>
import _ from 'lodash'
import L from 'leaflet'
import postRobot from 'post-robot'
import 'leaflet-timedimension/dist/leaflet.timedimension.src.js'
import 'leaflet-timedimension/dist/leaflet.timedimension.control.css'
import { mixins as kCoreMixins, utils as kCoreUtils } from '@kalisio/kdk/core.client'
import { mixins as kMapMixins } from '@kalisio/kdk/map.client'
import appHooks from '../main.hooks'
import utils from '../utils'

export default {
  name: 'k-map-activity',
  mixins: [
    kCoreMixins.refsResolver(['map']),
    kCoreMixins.baseActivity,
    kMapMixins.activity('map'),
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
  computed: {
    components () {
      return _.get(this, 'activityOptions.components', [])
    }
  },
  methods: {
    async refreshActivity () {  
      this.clearActivity()
      // Wait until map is ready
      await this.initializeMap()
      // Setup the panes
      this.configureTopPane()
      this.configureBottomPane()
      this.setRightDrawer([{ component: 'catalog/KCatalogPanel', ...this.$data }])
      this.configureFab()
      const widgets = [
        { name: 'information-box', icon: 'las la-digital-tachograph', component: 'widget/KInformationBox', props: this.selection },
        { name: 'time-series', icon: 'las la-chart-line', component: 'widget/KTimeSeries', props: this.$data }
      ]
      if (this.mapillaryClientID) widgets.push({ name: 'mapillary-viewer', icon: 'img:statics/mapillary-icon.svg', component: 'widget/KMapillaryViewer' })
      this.setWindow(widgets)
      // Notifie the listener
      utils.sendEmbedEvent('map-ready')
    },
    getViewKey () {
      // We'd like to share view settings between 2D/3D
      return this.appName.toLowerCase() + `-view`
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
      utils.sendEmbedEvent('click', { feature, layer: this.getLayerByName(options.name) })
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
    this.$options.components['k-color-legend'] = this.$load('KColorLegend')
    this.$options.components['k-level-slider'] = this.$load('KLevelSlider')
    this.$options.components['k-target'] = this.$load('control/KTarget')
    // Load extra components
    this.components.forEach(component => this.$options.components[component.name] = this.$load(component.component))
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
