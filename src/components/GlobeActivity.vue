<template>
  <k-page :padding="false">
    <template v-slot:page-content>
      <!-- Globe -->
      <div id="globe" ref="globe" :style="viewStyle">
        <q-resize-observer @resize="onGlobeResized" />
        <div id="globe-credit" />
      </div>
      <!-- Child views -->
      <router-view />
    </template>
  </k-page>
</template>

<script>
import _ from 'lodash'
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'
import { mixins as kMapMixins } from '@kalisio/kdk/map.client'
import utils from '../utils.js'

const baseActivityMixin = kCoreMixins.baseActivity()

export default {
  name: 'globe-activity',
  mixins: [
    kCoreMixins.refsResolver(['globe']),
    baseActivityMixin,
    kMapMixins.activity,
    kMapMixins.style,
    kMapMixins.featureSelection,
    kMapMixins.featureService,
    kMapMixins.infobox,
    kMapMixins.weacast,
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
  methods: {
    async configureActivity () {
      baseActivityMixin.methods.configureActivity.call(this)
      const token = this.$store.get('capabilities.api.cesium.token')
      // Not yet ready wait for capabilities to be there
      if (!token) return
      // Wait until viewer is ready
      await this.initializeGlobe(token)
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
    onLayerShown (layer, leafletLayer) {
      kMapMixins.globe.baseGlobe.methods.configureActivity.call(this, layer, leafletLayer)
      utils.sendEmbedEvent('layer-shown', { layer })
    },
    onLayerHidden (layer, leafletLayer) {
      kMapMixins.globe.baseGlobe.methods.configureActivity.call(this, layer, leafletLayer)
      utils.sendEmbedEvent('layer-hidden', { layer })
    },
    onLayerAdded (layer) {
      kMapMixins.globe.baseGlobe.methods.configureActivity.call(this, layer)
      utils.sendEmbedEvent('layer-added', { layer })
    },
    onLayerRemoved (layer) {
      kMapMixins.globe.baseGlobe.methods.configureActivity.call(this, layer)
      utils.sendEmbedEvent('layer-removed', { layer })
    }
  },
  mounted () {
    this.$events.on('capabilities-api-changed', this.refreshActivity)
    this.$engineEvents.on('click', this.onClicked)
    this.$engineEvents.on('dblclick', this.onDblClicked)
  },
  beforeUnmounted () {
    this.$events.off('capabilities-api-changed', this.refreshActivity)
    this.$engineEvents.off('click', this.onClicked)
    this.$engineEvents.off('dblclick', this.onDblClicked)
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
    cursor: url('../statics/position-cursor.png'), auto;
  }
</style>
