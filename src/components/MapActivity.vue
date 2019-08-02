<template>
  <q-page>
    
    <div ref="map" :style="viewStyle">
      <q-resize-observer @resize="onMapResized" />
      <k-widget ref="timeseriesWidget" :offset="{ minimized: [18,18], maximized: [0,0] }" :title="probedLocationName" @state-changed="onUpdateTimeseries">
        <div slot="widget-content">
          <k-location-time-series ref="timeseries"
            :feature="probedLocation" 
            :variables="currentVariables"
            :current-time-format="currentTimeFormat"
            :current-formatted-time="currentFormattedTime" />
        </div>
      </k-widget>
      
    </div>

    <q-btn
      id="side-nav-toggle"
      color="secondary"
      class="fixed"
      style="left: 18px; top: 18px"
      icon="menu"
      @click="klayout.toggleLeftDrawer()">
      {{ appName }}
    </q-btn>
    
    <q-btn
      id="map-panel-toggle"
      color="secondary"
      class="fixed"
      style="right: 18px; top: 18px"
      small
      round 
      icon="layers"
      @click="klayout.toggleRightDrawer()" />

    <k-color-legend v-if="colorLegend.visible"
      class="fixed"
      :style="colorLegendStyle"
      :unit="colorLegend.unit"
      :hint="colorLegend.hint"
      :colorMap="colorLegend.colorMap"
      :colors="colorLegend.colors"
      :values="colorLegend.values"
      :unitValues="colorLegend.unitValues"
      :showGradient="colorLegend.showGradient"
      @click="onColorLegendClick" />
    />

    <k-widget ref="timeseriesWidget" :offset="{ minimized: [18,18], maximized: [0,0] }" :title="probedLocationName" @state-changed="onUpdateTimeseries">
      <div slot="widget-content">
        <k-location-time-series ref="timeseries"
          :feature="probedLocation" 
          :variables="currentVariables"
           :current-time-format="currentTimeFormat"
           :current-formatted-time="currentFormattedTime" />
      </div>
    </k-widget>

    <q-page-sticky position="bottom-left" :offset="[110, 60]">   
      <div :style="timelineContainerStyle">
        <k-time-controller
          v-if="timelineEnabled"
          :key="timelineRefreshKey"
          :min="timeline.start" 
          :max="timeline.end"
          :step="'h'"
          :value="timeline.current"
          :timeInterval="timelineInterval"
          :timeFormatter="timelineFormatter"
          @change="onTimelineUpdated"
          pointerColor="#FC6E44" 
          pointerTextColor="white"
          style="width: 100%;"
        />
      </div>
    </q-page-sticky>

    <q-page-sticky v-if="hasForecastLevels" position="bottom-right" :offset="[0, 400]">
      <vue-slider class="text-primary"
        v-model="forecastLevel"
        :direction="'btt'"
        :height="100"
        :width="4"
        :lazy="true"
        :marks="true"
        :hide-label="true"
        :data="forecastLevels.values"
        :tooltip="'focus'"
        :tooltip-formatter="getFormatedForecastLevel"
        @change="onForecastLevelChanged"
      />
      <p class="text-secondary" style="transform: rotate(-90deg) translateX(-32px) translateX(96px);">
        <b>{{$t(forecastLevels.label)}}</b>
      </p>
    </q-page-sticky>
      
  </q-page>
</template>

<script>
import _ from 'lodash'
import L from 'leaflet'
import postRobot from 'post-robot'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/material.css'
import 'leaflet-timedimension/dist/leaflet.timedimension.src.js'
import 'leaflet-timedimension/dist/leaflet.timedimension.control.css'
import moment from 'moment'
import { mixins as kCoreMixins, utils as kCoreUtils } from '@kalisio/kdk-core/client'
import { mixins as kMapMixins, utils as kMapUtils } from '@kalisio/kdk-map/client'
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
    kMapMixins.timeline,
    kMapMixins.timeseries,
    kMapMixins.activity('map'),
    kMapMixins.legend,
    kMapMixins.locationIndicator,
    kMapMixins.map.baseMap,
    kMapMixins.map.geojsonLayers,
    kMapMixins.map.forecastLayers,
    kMapMixins.map.fileLayers,
    kMapMixins.map.georasterLayers,
    kMapMixins.map.editLayers,
    kMapMixins.map.style,
    kMapMixins.map.tooltip,
    kMapMixins.map.popup,
    kMapMixins.map.activity
  ],
  components: {
    VueSlider
  },
  inject: ['klayout'],
  methods: {
    async refreshActivity () {  
      this.clearActivity()
      // Wait until map is ready
      await this.initializeMap()
      // Add a scale control
      L.control.scale().addTo(this.map)
      // Add app hooks to weacast client if separate from app client
      if (this.weacastApi && (this.weacastApi !== this.$api)) this.weacastApi.hooks(appHooks)
      // Setup the right pane
      this.setRightPanelContent('KCatalogPanel', this.$data)
      this.registerActivityActions()
      utils.sendEmbedEvent('map-ready')
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
            this.getForecastForLocation(event.target.getLatLng().lng, event.target.getLatLng().lat,
              moment.utc(this.timeline.start), moment.utc(this.timeline.end))
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
      this.createProbedLocationLayer()
    },
    onTimelineChanged (timeline) {
      let times = []
      // Round to nearest hour - FIXME: should be based on available times
      for (let time = this.timeline.start; time <= this.timeline.end; time += 3600000) {
        times.push(moment.utc(time).minutes(0).seconds(0).milliseconds(0).format())
      }
      this.map.timeDimension.setAvailableTimes(times.join(), 'replace')
    },
    onForecastLevelChanged (level) {
      this.setForecastLevel(level)
    },
    generateHandlerForLayerEvent (event) {
      return (layer) => utils.sendEmbedEvent(event, { layer })
    }
  },
  created () {
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

<style>
.probe-cursor {
  cursor: crosshair;
}
.processing-cursor {
  cursor: wait;
}
.vue-slider-rail {
  background-color: #FC6E44;
}
.vue-slider-disabled .vue-slider-rail {
  background-color: #FC6E44;
}
.vue-slider-process {
  background-color: #FC6E44;
}
.vue-slider-dot-handle {
  background-color: #FC6E44;
}
.vue-slider-dot-handle::after {
  background-color: #FC6E4499;
}
.vue-slider-dot-tooltip-inner {
  background-color: #FC6E44;
}
.vue-slider-dot-tooltip-text {
  width: 60px;
  height: 60px;
  font-size: 1em;
}
.vue-slider-mark-step {
  background-color: #642879;
}
.vue-slider-mark-step-active {
  background-color: #642879;
}
</style>