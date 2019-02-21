<template>
  <div>

    <div ref="globe" :style="globeStyle">
      <q-resize-observable @resize="onGlobeResized" />
    </div>

    <q-btn 
      id="side-nav-toggle"
      color="secondary"
      class="fixed"
      style="left: 18px; top: 18px"
      icon="menu"
      @click="layout.toggleLeft()">
      Kano
    </q-btn>
    <q-btn 
      id="globe-panel-toggle"
      color="secondary"
      class="fixed"
      style="right: 18px; top: 18px"
      small
      round 
      icon="layers"
      @click="layout.toggleRight()" />

    <k-modal ref="geocodingModal" :title="$t('Activity.GEOCODING')" :toolbar="getGeocodingToolbar()" :buttons="getGeocodingButtons()" :route="false">
      <div slot="modal-content" class="column xs-gutter">
        <k-form ref="geocodingForm" :schema="getGeocodingSchema()" />
      </div>
    </k-modal>
    
  </div>
</template>

<script>
import _ from 'lodash'
import Cesium from 'cesium/Source/Cesium.js'
import { Events, QWindowResizeObservable, QResizeObservable, dom, QBtn } from 'quasar'
import { mixins as kCoreMixins } from '@kalisio/kdk-core/client'
import { mixins as kMapMixins } from '@kalisio/kdk-map/client'
import mixins from '../mixins'

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
    kMapMixins.globe.baseGlobe,
    kMapMixins.globe.geojsonLayers,
    kMapMixins.globe.fileLayers,
    mixins.activity
  ],
  inject: ['layout'],
  data () {
    return {
    }
  },
  computed: {
    globeStyle () {
      return 'width: 100%; height: 100%; fontWeight: normal; zIndex: 0; position: absolute'
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
      await this.initializeView()
      this.bounds = new Cesium.Rectangle()
      this.viewer.clock.onTick.addEventListener(this.onGlobeMoved)
    },
    finalizeViewer () {
      this.viewer.clock.onTick.removeEventListener(this.onGlobeMoved)
    },
    async refreshActivity () {
      // Wait until viewer is ready
      await this.initializeViewer()
      if (!this.viewer) return
      this.clearActivity()
      // Setup the right pane
      this.setRightPanelContent('Panel', this.$data)
      this.registerActivityActions()
      // FAB
      this.registerFabAction({
        name: 'toggle-vr', label: this.$t('GlobeActivity.TOGGLE_VR'), icon: 'terrain', handler: this.onToggleVr
      })
    },
    onGlobeResized (size) {
      // Avoid to refresh the layout when leaving the component
      if (this.observe) this.refreshGlobe()
    },
    getVigicruesEntity (entity, options) {
      const level = _.get(entity, 'properties.NivSituVigiCruEnt')
      if (level > 1) {
        // TODO: add tooltip
      }
      return null
    },
    onGlobeMoved () {
      const cameraBounds = this.viewer.camera.computeViewRectangle(this.viewer.scene.globe.ellipsoid, this.bounds)
      const south = Cesium.Math.toDegrees(cameraBounds.south)
      const west = Cesium.Math.toDegrees(cameraBounds.west)
      const north = Cesium.Math.toDegrees(cameraBounds.north)
      const east = Cesium.Math.toDegrees(cameraBounds.east)
      this.$router.push({ query: { south, west, north, east } })
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
    }
  },
  created () {
    this.registerCesiumStyle('entityStyle', this.getVigicruesEntity)
    // Enable the observers in order to refresh the layout
    this.observe = true
    // Required to get the access token from server
    Events.$on('capabilities-api-changed', this.refreshActivity)
  },
  mounted () {
  },
  beforeDestroy () {
    Events.$off('capabilities-api-changed', this.refreshActivity)
    this.finalizeViewer()
  }
}
</script>
