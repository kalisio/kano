<template>
  <div id="globe-credit"/>
  <k-page :padding="false">
    <template v-slot:page-content>
      <!-- Globe -->
      <div id="globe" :ref="configureGlobe" :style="viewStyle">
        <q-resize-observer @resize="onGlobeResized" />
      </div>
      <!-- Child views -->
      <router-view />
    </template>
  </k-page>
</template>

<script>
import _ from 'lodash'
import { computed } from 'vue'
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'
import { mixins as kMapMixins } from '@kalisio/kdk/map.client'
import utils from '../utils.js'

const baseActivityMixin = kCoreMixins.baseActivity()

export default {
  name: 'globe-activity',
  mixins: [
    kMapMixins.globe.baseGlobe,
    kMapMixins.globe.geojsonLayers,
    kMapMixins.globe.fileLayers,
    kMapMixins.globe.style,
    kMapMixins.globe.tooltip,
    kMapMixins.globe.popup,
    kMapMixins.globe.activity,
    kMapMixins.globe.opendapLayers,
    baseActivityMixin,
    kMapMixins.activity,
    kMapMixins.style,
    kMapMixins.featureSelection,
    kMapMixins.featureService,
    kMapMixins.infobox,
    kMapMixins.weacast,
    kMapMixins.context
  ],
  provide () {
    return {
      kActivity: this,
      kGlobe: this,
      layer: computed(() => this.selectedLayer)
    }
  },
  methods: {
    async configureGlobe (container) {
      // Avoid reentrance during awaited operations
      if (!container || this.globeContainer) return
      this.globeContainer = container
      const token = this.$store.get('capabilities.api.cesium.token')
      // Not yet ready wait for capabilities to be there
      if (!token) return
      // Wait until viewer is ready
      await this.initializeGlobe(container, token)
      // Notifie the listener
      utils.sendEmbedEvent('globe-ready')
    },
    getViewKey () {
      // We'd like to share view settings between 2D/3D
      return this.geAppName.toLowerCase() + '-view'
    },
    async onClicked (options, event) {
      const latlng = _.get(event, 'latlng')
      const pickedPosition = _.get(event, 'pickedPosition')
      const feature = _.get(event, 'target.feature')
      // Retrieve original layer options not processed ones
      // as they can include internal objects not to be serialized
      const layer = (options ? this.getLayerByName(options.name) : undefined)
      utils.sendEmbedEvent('click', Object.assign({ longitude: latlng.lng, latitude: latlng.lat, feature, layer }, pickedPosition))
    },
    async onDblClicked (options, event) {
      const latlng = _.get(event, 'latlng')
      const pickedPosition = _.get(event, 'pickedPosition')
      const feature = _.get(event, 'target.feature')
      // Retrieve original layer options not processed ones
      // as they can include internal objects not to be serialized
      const layer = (options ? this.getLayerByName(options.name) : undefined)
      utils.sendEmbedEvent('dblclick', Object.assign({ longitude: latlng.lng, latitude: latlng.lat, feature, layer }, pickedPosition))
    },
    generateHandlerForLayerEvent (event) {
      return (layer) => utils.sendEmbedEvent(event, { layer })
    }
  },
  mounted () {
    this.$engineEvents.on('click', this.onClicked)
    this.$engineEvents.on('dblclick', this.onDblClicked)
    this.onAddedLayerEvent = this.generateHandlerForLayerEvent('layer-added')
    this.$engineEvents.on('layer-added', this.onAddedLayerEvent)
    this.onShownLayerEvent = this.generateHandlerForLayerEvent('layer-shown')
    this.$engineEvents.on('layer-shown', this.onShownLayerEvent)
    this.onHiddenLayerEvent = this.generateHandlerForLayerEvent('layer-hidden')
    this.$engineEvents.on('layer-hidden', this.onHiddenLayerEvent)
    this.onRemovedLayerEvent = this.generateHandlerForLayerEvent('layer-removed')
    this.$engineEvents.on('layer-removed', this.onRemovedLayerEvent)
  },
  beforeUnmounted () {
    this.$engineEvents.off('click', this.onClicked)
    this.$engineEvents.off('dblclick', this.onDblClicked)
    this.$engineEvents.off('layer-added', this.onAddedLayerEvent)
    this.$engineEvents.off('layer-shown', this.onShownLayerEvent)
    this.$engineEvents.off('layer-hidden', this.onHiddenLayerEvent)
    this.$engineEvents.off('layer-removed', this.onRemovedLayerEvent)
  },
  unmounted () {
    utils.sendEmbedEvent('globe-destroyed')
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
