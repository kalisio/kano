<template>
  <div>
    <div id="globe" :style="globeStyle">
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
  </div>
</template>

<script>
import _ from 'lodash'
import Cesium from 'cesium/Source/Cesium.js'
import { Events, QWindowResizeObservable, QResizeObservable, dom, QBtn } from 'quasar'
import { mixins as kCoreMixins } from '@kalisio/kdk-core/client'
import { mixins as kMapMixins } from '@kalisio/kdk-map/client'

const { offset } = dom

export default {
  name: 'k-globe-activity',
  components: {
    QWindowResizeObservable,
    QResizeObservable,
    QBtn
  },
  mixins: [
    kCoreMixins.baseActivity,
    kMapMixins.geolocation,
    kMapMixins.globe.baseGlobe,
    kMapMixins.globe.geojsonLayers,
    kMapMixins.globe.fileLayers
  ],
  inject: ['layout'],
  computed: {
    globeStyle () {
      return 'width: 100%; height: 100%; fontWeight: normal; zIndex: 0; position: absolute'
    }
  },
  methods: {
    async refreshActivity () {
      this.clearActivity()
      // Retrive the layers
      this.layers = {}
      const layersService = this.$api.getService('layers')
      let response = await layersService.find()
      _.forEach(response.data, (layer) => {
        if (layer.cesium) {
          layer['handler'] = (options) => this.onLayerTriggered(layer, options)
          this.addLayer(layer)
        }
      })
      // Setup the right pane
      this.setRightPanelContent('GlobePanel', this.$data)
      // FAB
      this.registerFabAction({
        name: 'toggle-fullscreen', label: this.$t('GlobeActivity.TOGGLE_FULLSCREEN'), icon: 'fullscreen', handler: this.onToggleFullscreen
      })
      this.registerFabAction({
        name: 'toggle-vr', label: this.$t('GlobeActivity.TOGGLE_VR'), icon: 'terrain', handler: this.onToggleVr
      })
      this.registerFabAction({
        name: 'geolocate', label: this.$t('GlobeActivity.GEOLOCATE'), icon: 'location_searching', handler: this.onGeolocate
      })
    },
    onGlobeResized (size) {
      // Avoid to refresh the layout when leaving the component
      if (this.observe) this.refreshGlobe()
    },
    getEntityStyle (entity) {
      return {
        billboard: {
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        },
        label: {
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          verticalOrigin: Cesium.VerticalOrigin.BASELINE
        },
        polyline: {
          clampToGround: true
        }
      }
    },
    getClusterStyle (entities, cluster) {
      return {
        label: {
          show: true,
          text: entities.length.toLocaleString()
        }
      }
    },
    onGlobeMoved () {
      const cameraBounds = this.viewer.camera.computeViewRectangle(this.viewer.scene.globe.ellipsoid, this.bounds)
      this.$store.set('bounds', [
        [Cesium.Math.toDegrees(cameraBounds.south), Cesium.Math.toDegrees(cameraBounds.west)],
        [Cesium.Math.toDegrees(cameraBounds.north), Cesium.Math.toDegrees(cameraBounds.east)]
      ])
    },
    onLayerTriggered (layer, options) {
      if (options.isVisible === true) {
        this.showLayer(layer.name)
      } else {
        this.hideLayer(layer.name)
      } 
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
    onGeolocate () {
      this.updatePosition()
    },
    refreshOnGeolocation () {
      const position = this.$store.get('user.position')
      this.center(position.longitude, position.latitude, 10000)
    }
  },
  created () {
    // Enable the observers in order to refresh the layout
    this.observe = true
  },
  mounted () {
    this.setupGlobe()
    const bounds = this.$store.get('bounds')
    if (bounds) {
      this.viewer.camera.flyTo({
        duration: 0,
        destination : Cesium.Rectangle.fromDegrees(bounds[0][1], bounds[0][0], bounds[1][1], bounds[1][0])
      })
    }
    this.bounds = new Cesium.Rectangle()
    this.viewer.clock.onTick.addEventListener(this.onGlobeMoved)
    Events.$on('user-position-changed', this.refreshOnGeolocation)
    if (this.$store.get('user.position')) this.refreshOnGeolocation()
  },
  beforeDestroy () {
    this.viewer.clock.onTick.removeEventListener(this.onGlobeMoved)
    Events.$off('user-position-changed', this.refreshOnGeolocation)
  }
}
</script>
