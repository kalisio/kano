<template>
  <div>
    <div id="globe" :style="globeStyle">
      <q-resize-observable @resize="onGlobeResized" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Cesium from 'cesium/Source/Cesium.js'
import { QWindowResizeObservable, QResizeObservable, dom } from 'quasar'
import { mixins as kCoreMixins } from '@kalisio/kdk-core/client'
import { mixins as kMapMixins } from '@kalisio/kdk-map/client'

const { offset } = dom

export default {
  name: 'k-globe-activity',
  components: {
    QWindowResizeObservable,
    QResizeObservable
  },
  mixins: [
    kCoreMixins.baseActivity,
    kMapMixins.globe.baseGlobe,
    kMapMixins.globe.baseLayers,
    kMapMixins.globe.overlayLayers,
    kMapMixins.globe.geojsonLayers,
    kMapMixins.globe.fileLayers
  ],
  computed: {
    globeStyle () {
      return 'width: 100%; height: 100%; fontWeight: normal; zIndex: 0; position: absolute'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    async refreshActivity () {
      this.clearActivity()
      // Title
      this.setTitle('Kano')
      // RightPanel
      const layersService = this.$api.getService('layers')
      let response = await layersService.find()
      this.setRightPanelContent('KLayersPanel', [ { layers: response.data }, { types: this.$config('globeActivity.layerTypes') } ])
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
  },
  beforeDestroy () {
    this.viewer.clock.onTick.removeEventListener(this.onGlobeMoved)
  }
}
</script>
