<template>
  <div>

    <div ref="globe" :style="viewStyle">
      <q-resize-observable @resize="onGlobeResized" />
      <div id="globe-credit" />
    </div>

    <q-btn v-if="sideNavToggle"
      id="side-nav-toggle"
      color="secondary"
      class="fixed"
      style="left: 18px; top: 18px"
      icon="menu"
      @click="layout.toggleLeft()">
      {{ appName }}
    </q-btn>

    <q-btn v-if="panelToggle"
      id="globe-panel-toggle"
      color="secondary"
      class="fixed"
      style="right: 18px; top: 18px"
      small
      round 
      icon="layers"
      @click="layout.toggleRight()" />

  </div>
</template>

<script>
import _ from 'lodash'
import postRobot from 'post-robot'
import Cesium from 'cesium/Source/Cesium.js'
import { Events, QWindowResizeObservable, QResizeObservable, dom, QBtn } from 'quasar'
import { mixins as kCoreMixins } from '@kalisio/kdk-core/client'
import { mixins as kMapMixins } from '@kalisio/kdk-map/client'
import utils from '../utils'

const { offset } = dom

export default {
  name: 'k-globe-activity',
  components: {
    QWindowResizeObservable,
    QResizeObservable,
    QBtn
  },
  mixins: [
    kCoreMixins.refsResolver(['globe']),
    kCoreMixins.baseActivity,
    kMapMixins.geolocation,
    kMapMixins.featureService,
    kMapMixins.time,
    kMapMixins.activity,
    kMapMixins.locationIndicator,
    kMapMixins.globe.baseGlobe,
    kMapMixins.globe.geojsonLayers,
    kMapMixins.globe.fileLayers,
    kMapMixins.globe.style,
    kMapMixins.globe.tooltip,
    kMapMixins.globe.popup
  ],
  inject: ['layout'],
  data () {
    return {
    }
  },
  methods: {
    async initializeViewer () {
      if (this.viewer) return
      const token = this.$store.get('capabilities.api.cesium.token')
      // Not yet ready wait for capabilities to be there
      if (!token) return
      // Ensure DOM ref is here as well
      await this.loadRefs()
      this.setupGlobe(this.$refs.globe, token)
      this.viewer.clock.onTick.addEventListener(this.storeView)
      await this.initializeView()
    },
    finalizeViewer () {
      this.viewer.clock.onTick.removeEventListener(this.storeView)
    },
    async refreshActivity () {
      this.clearActivity()
      // Wait until viewer is ready
      await this.initializeViewer()
      // Setup the right pane
      this.setRightPanelContent('KCatalogPanel', this.$data)
      this.registerActivityActions()
      const actions = this.$config('globeActivity.actions')
      const hasVrAction = (actions ? actions.includes('vr') : true)
      // FAB
      if (hasVrAction) this.registerFabAction({
        name: 'toggle-vr', label: this.$t('GlobeActivity.TOGGLE_VR'), icon: 'terrain', handler: this.onToggleVr
      })
      utils.sendEmbedEvent('globe-ready')
    },
    onGlobeResized (size) {
      // Avoid to refresh the layout when leaving the component
      if (this.observe) this.refreshGlobe()
    },
    getVigicruesTooltip (entity, options) {
      const properties = entity.properties
      if (!properties) return
      const level = properties.NivSituVigiCruEnt
      if (level > 1) {
        return Object.assign({ show: false, text: this.$t('MapActivity.VIGICRUES_LEVEL_' + level) }, this.options.tooltip)
      }
      /*
      const H = properties.H
      const Q = properties.Q
      if (!_.isNil(H) || !_.isNil(Q)) {
        let tooltip = L.tooltip({ permanent: false }, layer)
        if (!_.isNil(H) && !_.isNil(Q)) return tooltip.setContent(`<b>${H.toFixed(2)} m - ${Q.toFixed(2)} m3/h`)
        else if (!_.isNil(H)) return tooltip.setContent(`<b>${H.toFixed(2)} m`)
        else if (!_.isNil(Q)) return tooltip.setContent(`<b>${Q.toFixed(2)} m3/h`)
      }
      */
      return null
    },
    onToggleFullscreen () {
      if (Cesium.Fullscreen.fullscreen) Cesium.Fullscreen.exitFullscreen()
      else Cesium.Fullscreen.requestFullscreen(document.body)
    },
    onToggleVr () {
      // VR requires fullscreen mode
      if (this.viewer.scene.useWebVR) {
        if (Cesium.Fullscreen.fullscreen) Cesium.Fullscreen.exitFullscreen()
        this.viewer.scene.useWebVR = false
      } else {
        if (!Cesium.Fullscreen.fullscreen) Cesium.Fullscreen.requestFullscreen(document.body)
        this.viewer.scene.useWebVR = true
      }
    },
    onFeatureClicked (options, event) {
      const entity = event.target
      if (!entity) return
      const properties = (entity.properties ? entity.properties.getValue(0) : null)
      utils.sendEmbedEvent('click', { properties, layer: options })
    }
  },
  created () {
    // Setup mapping activity mixin
    this.setMappingEngine('cesium')
    this.registerCesiumStyle('tooltip', this.getVigicruesTooltip)
    // Enable the observers in order to refresh the layout
    this.observe = true
    // Required to get the access token from server
    Events.$on('capabilities-api-changed', this.refreshActivity)
    this.$on('click', this.onFeatureClicked)
  },
  mounted () {
  },
  beforeDestroy () {
    Events.$off('capabilities-api-changed', this.refreshActivity)
    this.$off('click', this.onFeatureClicked)
    this.finalizeViewer()
  }
}
</script>
