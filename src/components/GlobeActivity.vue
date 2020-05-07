<template>
  <k-page :padding="false">
    <template v-slot:page-content>
      <!--
        Globe
       -->
      <div id="globe" ref="globe" :style="viewStyle">
        <q-resize-observer @resize="onGlobeResized" />
        <div id="globe-credit" />
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
        Extra components
       -->  
      <component v-for="component in components" :is="component.name" :key="component.name"></component>
    </template>
  </k-page>
</template>

<script>
import _ from 'lodash'
import postRobot from 'post-robot'
import Cesium from 'cesium/Source/Cesium.js'
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'
import { mixins as kMapMixins } from '@kalisio/kdk/map.client'
import utils from '../utils'

export default {
  name: 'k-globe-activity',
  mixins: [
    kCoreMixins.refsResolver(['globe']),
    kCoreMixins.baseActivity,
    kMapMixins.activity('globe'),    
    kMapMixins.geolocation,
    kMapMixins.style,
    kMapMixins.featureSelection,
    kMapMixins.featureService,
    kMapMixins.weacast,
    kMapMixins.time,
    kMapMixins.globe.baseGlobe,
    kMapMixins.globe.geojsonLayers,
    kMapMixins.globe.fileLayers,
    kMapMixins.globe.style,
    kMapMixins.globe.tooltip,
    kMapMixins.globe.popup,
    kMapMixins.globe.activity,
    kMapMixins.globe.opendapLayers
  ],
  inject: ['klayout'],
  provide () {
    return {
      kActivity: this,
      kGlobe: this
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
      const token = this.$store.get('capabilities.api.cesium.token')
      // Not yet ready wait for capabilities to be there
      if (!token) return
      // Wait until viewer is ready
      await this.initializeGlobe(token)
      // Setup the right pane
      this.setRightDrawer('catalog/KCatalogPanel', this.$data)
      // Setup the widgets
      this.registerWidget('information-box', 'las la-digital-tachograph', 'widgets/KInformationBox', this.selection)
      this.registerWidget('time-series', 'las la-chart-line', 'widgets/KTimeSeries', this.$data)
      // Setup the actions
      this.registerActivityActions()      
      utils.sendEmbedEvent('globe-ready')
    },
    getViewKey () {
      // We'd like to share view settings between 2D/3D
      return this.appName.toLowerCase() + `-view`
    },
    getVigicruesTooltip (entity, options) {
      const properties = entity.properties
      if (!properties) return
      const level = properties.NivSituVigiCruEnt
      if (level > 1) {
        return Object.assign({ show: false, text: this.$t('MapActivity.VIGICRUES_LEVEL_' + level) }, this.options.tooltip)
      }
      return null
    },
    async onClicked (options, event) {
      const feature = _.get(event, 'target.feature')
      if (!feature) return
      utils.sendEmbedEvent('click', { feature, layer: options })
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
    this.components.forEach(component => this.$options.components[component.name] = this.$load(component.component))
    // Setup the engine
    this.registerStyle('tooltip', this.getVigicruesTooltip)
    // Required to get the access token from server
  },
  mounted () {
    this.$events.$on('capabilities-api-changed', this.refreshActivity)
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
    this.$events.$off('capabilities-api-changed', this.refreshActivity)
    this.$off('click', this.onClicked)
    this.$off('layer-added', this.onAddedLayerEvent)
    this.$off('layer-shown', this.onShownLayerEvent)
    this.$off('layer-hidden', this.onHiddenLayerEvent)
    this.$off('layer-removed', this.onRemovedLayerEvent)
  },
  destroyed () {
    utils.sendEmbedEvent('globe-destroyed')
  }
}
</script>

<style>
  .probe-cursor {
    cursor: crosshair;
  }
  .processing-cursor {
    cursor: wait;
  }
</style>
