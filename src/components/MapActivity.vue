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
        NavigationBar
       -->
      <q-page-sticky position="top">
        <k-opener-proxy position="top" component="KNavigationBar" :opened="true" />
      </q-page-sticky>
      <!--
        TimeLine
       -->
      <q-page-sticky position="bottom">
        <k-opener-proxy position="bottom" component="KTimeline" />
      </q-page-sticky>
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
import moment from 'moment'
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
    kMapMixins.geolocation,
    kMapMixins.style,
    kMapMixins.featureSelection,
    kMapMixins.featureService,
    kMapMixins.infobox,
    kMapMixins.weacast,
    kMapMixins.time,
    kMapMixins.levels,
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
    kMapMixins.map.mapillaryLayers
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
      this.clearNavigationBar()
      // Wait until map is ready
      await this.initializeMap()
      // Add app hooks to weacast client if separate from app client
      if (this.weacastApi && (this.weacastApi !== this.$api)) this.weacastApi.hooks(appHooks)
      // Setup the right pane
      this.setRightDrawer('catalog/KCatalogPanel', this.$data)
      // Setup the widgets
      this.registerWidget('information-box', 'las la-digital-tachograph', 'widgets/KInformationBox', this.selection)
      this.registerWidget('time-series', 'las la-chart-line', 'widgets/KTimeSeries', this.$data)
      if (this.mapillaryClientID) this.registerWidget('mapillary-viewer', 'img:statics/mapillary-icon.svg', 'widgets/KMapillaryViewer')
      // Setup the actions
      this.registerActivityActions()      
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
    getVigicruesTooltip (feature, layer) {
      const level = _.get(feature, 'properties.NivSituVigiCruEnt')
      if (level > 1) {
        let tooltip = L.tooltip({ permanent: false }, layer)
        return tooltip.setContent(this.$t('Layers.VIGICRUES_LEVEL_' + level))
      }
      return null
    },
    onFeaturePopupOpen (options, event) {
      const feature = _.get(event, 'layer.feature')
      if (!feature) return
    },
    async onClicked (options, event) {
      const feature = _.get(event, 'target.feature')
      const layer = _.get(event, 'target')
      if (!feature) return
      utils.sendEmbedEvent('click', { feature, layer: layer })
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
    this.$options.components['k-opener-proxy'] = this.$load('frame/KOpenerProxy')
    this.$options.components['k-navigation-bar'] = this.$load('KNavigationBar')
    this.$options.components['k-timeline'] = this.$load('KTimeline')
    this.$options.components['k-color-legend'] = this.$load('KColorLegend')
    this.$options.components['k-level-slider'] = this.$load('KLevelSlider')
    // Load extra components
    this.components.forEach(component => this.$options.components[component.name] = this.$load(component.component))
    // Setup the engine
    this.registerLeafletConstructor(this.createLeafletTimedWmsLayer)
    this.registerStyle('tooltip', this.getVigicruesTooltip)
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
