<template>
  <div>
    <div class="column justify-center full-width">
      <div class="row full-width">
        <div id="globe" :style="globeStyle">
          <q-resize-observable @resize="onGlobeResized" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import L from 'leaflet'
import { QWindowResizeObservable, QResizeObservable, dom } from 'quasar'
import { mixins as kMapMixins } from 'kMap/client'

const { offset } = dom

export default {
  name: 'k-globe',
  components: {
    QWindowResizeObservable,
    QResizeObservable
  },
  mixins: [
    kMapMixins.globe.baseGlobe,
    kMapMixins.globe.baseLayers,
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
    onGlobeResized (size) {
      // Avoid to refresh the layout when leaving the component
      if (this.observe) this.refreshGlobe()
    }
  },
  created () {
    // Enable the observers in order to refresh the layout
    this.observe = true
  },
  mounted () {
    this.setupGlobe()
  },
  beforeDestroy () {
  }
}
</script>
