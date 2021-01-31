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
        Target
       -->
      <k-target v-if="isTargetVisible" />
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
    kMapMixins.style,
    kMapMixins.featureSelection,
    kMapMixins.featureService,
    kMapMixins.infobox,
    kMapMixins.weacast,
    kMapMixins.time,
    kMapMixins.context,
    kMapMixins.globe.baseGlobe,
    kMapMixins.globe.geojsonLayers,
    kMapMixins.globe.fileLayers,
    kMapMixins.globe.style,
    kMapMixins.globe.tooltip,
    kMapMixins.globe.popup,
    kMapMixins.globe.activity,
    kMapMixins.globe.opendapLayers
  ],
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
      // Setup the panes
      this.configureTopPane()
      this.configureBottomPane()
      this.setRightDrawer([{ component: 'catalog/KCatalogPanel', ...this.$data }])
      this.configureFab()
      const widgets = [
        { name: 'information-box', icon: 'las la-digital-tachograph', component: 'widgets/KInformationBox', props: this.selection },
        { name: 'time-series', icon: 'las la-chart-line', component: 'widgets/KTimeSeries', props: this.$data }
      ]
      if (this.mapillaryClientID) widgets.push({ name: 'mapillary-viewer', icon: 'img:statics/mapillary-icon.svg', component: 'widgets/KMapillaryViewer' })
      this.setWindow(widgets)
      utils.sendEmbedEvent('globe-ready')
    },
    getViewKey () {
      // We'd like to share view settings between 2D/3D
      return this.appName.toLowerCase() + `-view`
    },
    async onClicked (options, event) {
      const feature = _.get(event, 'target.feature')
      if (!feature) return
      // Retrieve original layer options not processed ones
      // as they can include internal objects not to be serialized
      utils.sendEmbedEvent('click', { feature, layer: this.getLayerByName(options.name) })
    },
    generateHandlerForLayerEvent (event) {
      return (layer) => utils.sendEmbedEvent(event, { layer })
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
    this.$options.components['k-target'] = this.$load('controls/KTarget')
    this.components.forEach(component => this.$options.components[component.name] = this.$load(component.component))
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
