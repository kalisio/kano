<template>
  <q-page>
    
    <div ref="map" :style="viewStyle">
      <q-resize-observer @resize="onMapResized" />
    </div>

    <q-page-sticky position="top" :offset="[0, 18]">
      <k-navigation-bar />
    </q-page-sticky>

    <q-page-sticky position="left" :offset="[18, 0]">
      <k-feature-info-box style="min-width: 150px; width: 15vw; max-height: 40vh" />
    </q-page-sticky>

    <q-page-sticky position="top" :offset="[0, 0]">
      <k-location-time-series :variables="currentVariables" />
    </q-page-sticky>

    <q-page-sticky position="left" :offset="[18, 0]">
      <k-color-legend/>
    </q-page-sticky>

    <q-page-sticky position="bottom" :offset="[0, 40]">
      <k-timeline v-show="timelineEnabled"/>
    </q-page-sticky>

    <q-page-sticky position="right" :offset="[40, 0]">
      <k-level-slider/>
    </q-page-sticky>

    <component v-for="component in components" :is="component.name" :key="component.name"></component>

  </q-page>
</template>

<script>
import _ from 'lodash'
import L from 'leaflet'
import postRobot from 'post-robot'
import 'leaflet-timedimension/dist/leaflet.timedimension.src.js'
import 'leaflet-timedimension/dist/leaflet.timedimension.control.css'
import moment from 'moment'
import { mixins as kCoreMixins, utils as kCoreUtils } from '@kalisio/kdk-core/client'
import { mixins as kMapMixins } from '@kalisio/kdk-map/client'
import appHooks from '../main.hooks'
import utils from '../utils'

export default {
  name: 'k-map-activity',
  mixins: [
    kCoreMixins.refsResolver(['map']),
    kCoreMixins.baseActivity,
    kMapMixins.geolocation,
    kMapMixins.featureService,
    kMapMixins.weacast,
    kMapMixins.time,
    kMapMixins.activity('map'),
    kMapMixins.locationIndicator,
    kMapMixins.levels,
    kMapMixins.map.baseMap,
    kMapMixins.map.geojsonLayers,
    kMapMixins.map.forecastLayers,
    kMapMixins.map.fileLayers,
    kMapMixins.map.georasterLayers,
    kMapMixins.map.editLayers,
    kMapMixins.map.style,
    kMapMixins.map.tooltip,
    kMapMixins.map.popup,
    kMapMixins.map.activity,
    kMapMixins.map.tiledMeshLayers,
    kMapMixins.map.mapillary
  ],
  inject: ['klayout'],
  provide () {
    return {
      kActivity: this,
      kMap: this
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
      this.clearNavigationBar()
      // Wait until map is ready
      await this.initializeMap()
      // Add app hooks to weacast client if separate from app client
      if (this.weacastApi && (this.weacastApi !== this.$api)) this.weacastApi.hooks(appHooks)
      // Setup the right pane
      this.setRightDrawer('KCatalogPanel', this.$data)
      this.registerActivityActions()      
      utils.sendEmbedEvent('map-ready')
    },
    getViewKey () {
      // We'd like to share view settings between 2D/3D
      return this.appName.toLowerCase() + `-view`
    },
    createLeafletTimedWmsLayer (options) {
      let leafletOptions = options.leaflet || options
      // Check for valid type
      if (leafletOptions.type !== 'tileLayer.wms') return
      let layer = this.createLeafletLayer(options)
      // Specific case of time dimension layer where we embed the underlying WMS layer
      if (leafletOptions.timeDimension) {
        layer = this.createLeafletLayer(Object.assign({
          type: 'timeDimension.layer.wms',
          source: layer
        }, leafletOptions.timeDimension))
        layer.setAvailableTimes(this.map.timeDimension.getAvailableTimes())
      }
      return layer
    },
    getMeteoMarker (feature, latlng) {
      // Use wind barbs on weather probed features
      const windDirection = (this.forecastLevel ? `windDirection-${this.forecastLevel}` : 'windDirection')
      const windSpeed = (this.forecastLevel ? `windSpeed-${this.forecastLevel}` : 'windSpeed')
      const isWeatherProbe = (_.has(feature, `properties.${windDirection}`) &&
                              _.has(feature, `properties.${windSpeed}`))
      if (isWeatherProbe) {
        let marker = this.getProbedLocationForecastMarker(feature, latlng)
        if (marker) {
          marker.on('dragend', (event) => {
            const { start, end } = this.getTimeRange()
            this.getForecastForLocation(event.target.getLatLng().lng, event.target.getLatLng().lat, start, end)
          })
        }
        return marker
      }
      return null
    },
    getVigicruesTooltip (feature, layer) {
      const level = _.get(feature, 'properties.NivSituVigiCruEnt')
      if (level > 1) {
        let tooltip = L.tooltip({ permanent: false }, layer)
        return tooltip.setContent(this.$t('MapActivity.VIGICRUES_LEVEL_' + level))
      }
      return null
    },
    getMeteoTooltip (feature, layer) {
      // Only wind/temperature can be available at different levels now
      const windDirection = (this.forecastLevel ? `windDirection-${this.forecastLevel}` : 'windDirection')
      const windSpeed = (this.forecastLevel ? `windSpeed-${this.forecastLevel}` : 'windSpeed')
      const temperature = (this.forecastLevel ? `temperature-${this.forecastLevel}` : 'temperature')
      const direction = _.get(feature, `properties.${windDirection}`)
      const speed = _.get(feature, `properties.${windSpeed}`)
      const gust = _.get(feature, 'properties.gust')
      const t = _.get(feature, `properties.${temperature}`)
      const precipitations = _.get(feature, 'properties.precipitations')
      let html = ''
      if (!_.isNil(speed)) {
        html += `${speed.toFixed(2)} m/s</br>`
      }
      if (!_.isNil(gust)) {
        html += `max ${gust.toFixed(2)} m/s</br>`
      }
      if (!_.isNil(direction)) {
        html += `${direction.toFixed(2)} °</br>`
      }
      if (!_.isNil(precipitations)) {
        html += `${precipitations.toFixed(2)} mm/h</br>`
      }
      if (!_.isNil(t)) {
        html += `${t.toFixed(2)} °C</br>`
      }
      return (html ? L.tooltip({ permanent: false }, layer).setContent(`<b>${html}</b>`) : null)
    },
    onFeaturePopupOpen (options, event) {
      const feature = _.get(event, 'layer.feature')
      if (!feature) return
    },
    async onFeatureClicked (options, event) {
      const feature = _.get(event, 'target.feature')
      if (!feature) return
      utils.sendEmbedEvent('click', { feature, layer: options })
    },
    onCurrentTimeChanged (time) {
      // Round to nearest hour - FIXME: should be based on available times
      this.map.timeDimension.setCurrentTime(time.clone().minutes(0).seconds(0).milliseconds(0).valueOf())
    },
    onTimelineChanged (timeline) {
      let times = []
      // Round to nearest hour - FIXME: should be based on available times
      for (let time = this.timeline.start; time <= this.timeline.end; time += 3600000) {
        times.push(moment.utc(time).minutes(0).seconds(0).milliseconds(0).format())
      }
      this.map.timeDimension.setAvailableTimes(times.join(), 'replace')
    },
    generateHandlerForLayerEvent (event) {
      return (layer) => utils.sendEmbedEvent(event, { layer })
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-navigation-bar'] = this.$load('KNavigationBar')
    this.$options.components['k-feature-info-box'] = this.$load('KFeatureInfoBox')
    this.$options.components['k-color-legend'] = this.$load('KColorLegend')
    this.$options.components['k-timeline'] = this.$load('KTimeline')
    this.$options.components['k-location-time-series'] = this.$load('KLocationTimeSeries')
    this.$options.components['k-level-slider'] = this.$load('KLevelSlider')
    this.components.forEach(component => this.$options.components[component.name] = this.$load(component.component))
    // Setup the engine
    this.registerLeafletConstructor(this.createLeafletTimedWmsLayer)
    this.registerLeafletStyle('tooltip', this.getVigicruesTooltip)
    this.registerLeafletStyle('tooltip', this.getMeteoTooltip)
    this.registerLeafletStyle('markerStyle', this.getMeteoMarker)
  },
  mounted () {
    this.$on('current-time-changed', this.onCurrentTimeChanged)
    this.$on('timeline-changed', this.onTimelineChanged)
    // Setup event connections
    // this.$on('popupopen', this.onFeaturePopupOpen)
    this.$on('click', this.onFeatureClicked)
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
    this.$off('current-time-changed', this.onCurrentTimeChanged)
    this.$off('timeline-changed', this.onTimelineChanged)
    // Remove event connections
    // this.$off('popupopen', this.onFeaturePopupOpen)
    this.$off('click', this.onFeatureClicked)
    this.$off('layer-added', this.onAddedLayerEvent)
    this.$off('layer-shown', this.onShownLayerEvent)
    this.$off('layer-hidden', this.onHiddenLayerEvent)
    this.$off('layer-removed', this.onRemovedLayerEvent)
  },
  destroyed () {
    utils.sendEmbedEvent('map-destroyed')
  }
}
</script>

<style lang="stylus">
.probe-cursor 
  cursor: crosshair;

.processing-cursor 
  cursor: wait;
</style>
