<template>
  <div>
    <div class="column justify-center full-width">
      <div class="row full-width">
        <div id="map" :style="mapStyle">
          <q-resize-observable @resize="onMapResized" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import L from 'leaflet'
import { QWindowResizeObservable, QResizeObservable, dom } from 'quasar'
import { utils as kCoreUtils } from 'kCore/client'
import { mixins as kMapMixins } from 'kMap/client'

const { offset } = dom

export default {
  name: 'k-map',
  components: {
    QWindowResizeObservable,
    QResizeObservable
  },
  mixins: [
    kMapMixins.map.baseMap,
    kMapMixins.map.baseLayers,
    kMapMixins.map.geojsonLayers,
    kMapMixins.map.fileLayers,
    kMapMixins.map.fullscreen,
    kMapMixins.map.scalebar
  ],
  computed: {
    mapStyle () {
      return 'width: 100%; height: 100%; fontWeight: normal; zIndex: 0; position: absolute'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    getPointMarker (feature, latlng) {
      const icon = feature.icon
      return this.createMarkerFromStyle(latlng, {
        icon: {
          type: 'icon.fontAwesome',
          options: {
            iconClasses: 'fa ' + (icon.name || 'fa-user'),
            markerColor: kCoreUtils.Colors[(icon.color || 'blue')],
            iconColor: '#FFF'
          }
        }
      })
    },
    getFeaturePopup (feature, layer) {
      let popup = L.popup({ autoPan: false }, layer)
      const name = _.get(feature, 'name')
      return popup.setContent(name)
    },
    getFeatureTooltip (feature, layer) {
      // Default content is participant name
      let tooltip = L.tooltip({ permanent: true }, layer)
      const name = _.get(feature, 'name')
      return tooltip.setContent('<b>' + name + '</b>')
    },
    onPopupOpen (event) {
      const feature = _.get(event, 'layer.feature')
      if (!feature) return
    },
    onFeatureClicked (event) {
      const feature = _.get(event, 'target.feature')
      if (!feature) return
    },
    onMapResized (size) {
      // Avoid to refresh the layout when leaving the component
      if (this.observe) this.refreshMap()
    }
  },
  created () {
    // Enable the observers in order to refresh the layout
    this.observe = true
  },
  mounted () {
    this.setupMap()
    //this.addCollectionLayer('Actors', { spiderfyDistanceMultiplier: 5.0 })
    // Setup event connections
    // this.$on('popupopen', this.onPopupOpen)
    this.$on('click', this.onFeatureClicked)
    this.$on('collection-refreshed', this.onCollectionRefreshed)
  },
  beforeDestroy () {
    // No need to refresh the layout when leaving the component
    this.observe = false
    //this.removeCollectionLayer('Actors')
    // Remove event connections
    // this.$off('popupopen', this.onPopupOpen)
    this.$off('click', this.onFeatureClicked)
    this.$off('collection-refreshed', this.onCollectionRefreshed)
  }
}
</script>
