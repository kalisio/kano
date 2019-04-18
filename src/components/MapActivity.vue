<template>
  <div>
    
    <div ref="map" :style="mapStyle">
      <q-resize-observable @resize="onMapResized" />
      <k-widget ref="widget" :offset="{ minimized: [18,18], maximized: [0,0] }" :title="probedLocationName" @state-changed="onResizeTimeseries">
        <div slot="widget-content">
          <k-location-time-series ref="timeseries"
            :feature="probedLocation" 
            :variables="variables"
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
      @click="layout.toggleLeft()">
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
      @click="layout.toggleRight()" />

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

    <q-fixed-position corner="bottom-left" :offset="[110, 60]" :style="timelineContainerStyle">   
        <k-time-controller
          v-if="timeControllerEnabled"
          :key="timeControllerRefreshKey"
          :min="timeLine.start" 
          :max="timeLine.end"
          :step="'h'"
          :value="timeLine.current"
          :timeInterval="timeLineInterval"
          :timeFormatter="timeLineFormatter"
          @change="onTimeLineUpdated"
          pointerColor="#FC6E44" 
          pointerTextColor="white"
          style="width: 100%;"
        />
    </q-fixed-position>

  </div>
</template>

<script>
import _ from 'lodash'
import L from 'leaflet'
import postRobot from 'post-robot'
import 'leaflet-timedimension/dist/leaflet.timedimension.src.js'
import 'leaflet-timedimension/dist/leaflet.timedimension.control.css'
import logger from 'loglevel'
import moment from 'moment'
import { QPopover, QModal, QResizeObservable, dom, QBtn, QFixedPosition } from 'quasar'

import { mixins as kCoreMixins, utils as kCoreUtils } from '@kalisio/kdk-core/client'
import { mixins as kMapMixins, utils as kMapUtils } from '@kalisio/kdk-map/client'
import appHooks from '../main.hooks'

const { offset } = dom

export default {
  name: 'k-map-activity',
  components: {
    QPopover,
    QModal,
    QResizeObservable,
    QBtn,
    QFixedPosition
  },
  mixins: [
    kCoreMixins.refsResolver(['map']),
    kCoreMixins.baseActivity,
    kMapMixins.geolocation,
    kMapMixins.featureService,
    kMapMixins.weacast,
    kMapMixins.time,
    kMapMixins.activity,
    kMapMixins.legend,
    kMapMixins.locationIndicator,
    kMapMixins.map.baseMap,
    kMapMixins.map.geojsonLayers,
    kMapMixins.map.forecastLayers,
    kMapMixins.map.fileLayers,
    kMapMixins.map.georasterLayers,
    kMapMixins.map.pathLayers,
    kMapMixins.map.editLayers
  ],
  inject: ['layout'],
  data () {
    let now = moment.utc()

    return {
      timeLine: {
        start: now.clone().subtract({ days: 7 }).valueOf(),
        end: now.clone().add({ days: 7 }).valueOf(),
        current: now.clone().valueOf()
      },
      timeLineInterval: null,
      timeLineFormatter: null,
      mapWidth: null,
      mapHeight: null,
      timeControllerRefreshKey: 0
    }
  },
  computed: {
    appName () {
      return this.$config('appName')
    },
    mapStyle () {
      let style = 'width: 100%; height: 100%; fontWeight: normal; zIndex: 0; position: absolute;'
      return style
    },
    timelineContainerStyle () {
      return {
        width: 0.8 * this.mapWidth + 'px'
      }
    },
    timeControllerEnabled () {
      // For now only weather forecast requires timeline
      return this.forecastModel &&
        (_.values(this.layers).find(layer => layer.isVisible && layer.tags && layer.tags.includes('weather')) ||
          this.isTimeseriesOpen())
    },
    colorLegendStyle () {
      return {
        left: '18px',
        top: 0.25 * this.mapHeight + 'px',
        height: 0.50 * this.mapHeight + 'px',
        width: '40px',
        border: '1px solid lightgrey',        
        fontSize: '12px'
      }
    },
    variables () {
      // Filter layers with variables and convert from Object to Array type
      return _.flatten(_.values(_.pickBy(this.layers, (layer) => layer.variables)).map(layer => layer.variables))
    },
    probedLocationName: function () {
      if (!this.probedLocation) return ''
      return _.get(this.probedLocation, 'properties.LbStationHydro') ||
             _.get(this.probedLocation, 'properties.name') ||
             _.get(this.probedLocation, 'properties.NAME') || 
            this.$t('TimeSeries.PROBE') + ' (' +
            this.probedLocation.geometry.coordinates[0].toFixed(2) + '°, ' +
            this.probedLocation.geometry.coordinates[1].toFixed(2) + '°)'
    }
  },
  watch: {
    forecastModel: async function (model) {
      // Update layers
      _.forOwn(this.leafletLayers, layer => {
        if (layer instanceof L.weacast.ForecastLayer) layer.setForecastModel(model)
      })
      // Update timeLine
      this.setupTimeline()
      // Update probed location if any
      if (this.probedLocation) {
        // Feature mode
        if (this.probe && this.probedLocation.probeId) {
          const probe = await this.getForecastProbe(this.probe.name)
          if (probe) {
            await this.getForecastForFeature(_.get(this.probedLocation, this.probe.featureId),
              moment.utc(this.timeLine.start), moment.utc(this.timeLine.end))
          }
        } else { // Location mode
          await this.getForecastForLocation(this.probedLocation.geometry.coordinates[0], this.probedLocation.geometry.coordinates[1],
            moment.utc(this.timeLine.start), moment.utc(this.timeLine.end))
        }
      }
    }
  },
  methods: {
    async initializeViewer () {
      if (this.map) return
      // Ensure DOM ref is here as well
      await this.loadRefs()
      this.setupMap(this.$refs.map, this.$config('map.viewer'))
      await this.initializeView()
      // Add app hooks to weacast
      this.weacastApi.hooks(appHooks)
      // Add a scale control
      L.control.scale().addTo(this.map)
      this.map.on('moveend', this.storeView)
    },
    finalizeViewer () {
      this.map.off('moveend', this.storeView)
    },
    async refreshActivity () {  
      this.clearActivity()
      // Setup the right pane
      this.setRightPanelContent('Panel', this.$data)
      this.registerActivityActions()
      // Wait until viewer is ready
      await this.initializeViewer()
      // Will fail if not integrated as iframe so check
      if (window.parent !== window) postRobot.send(window.parent, 'map-ready')
    },
    createLeafletTimedWmsLayer (options) {
      let leafletOptions = options.leaflet || options
      // Check for valid type
      if (leafletOptions.type !== 'tileLayer.wms') return
      let layer = this.createLeafletLayer(options)
      // Specific case of time dimension layer where we embed the underlying WMS layer
      if (leafletOptions.timeDimension) {
        layer = this.createLeafletLayer(Object.assign({ type: 'timeDimension.layer.wms', source: layer }, leafletOptions.timeDimension))
        layer.setAvailableTimes(this.map.timeDimension.getAvailableTimes())
      }
      return layer
    },
    getMeteoMarker (feature, latlng) {
      // Use wind barbs on weather probed features
      const isWeatherProbe = (_.has(feature, 'properties.windDirection') &&
                              _.has(feature, 'properties.windSpeed'))
      if (isWeatherProbe) {
        let marker = this.getProbedLocationForecastMarker(feature, latlng)
        if (marker) {
          // We use custom events on this one to be able to drag probed location
          kMapUtils.unbindLeafletEvents(marker)
          marker.on('dragend', (event) => this.getForecastForLocation(event.target.getLatLng().lng, event.target.getLatLng().lat,
            moment.utc(this.timeLine.start), moment.utc(this.timeLine.end)))
          marker.on('click', (event) => this.toggleTimeseries())
        }
        return marker
      }
      return null
    },
    getVigicruesTooltip (feature, layer) {
      const level = _.get(feature, 'properties.NivSituVigiCruEnt')
      if (level > 1) {
        let tooltip = L.tooltip({ permanent: false }, layer)
        let content = this.$t('MapActivity.VIGICRUES_LEVEL_' + level)
        return tooltip.setContent('<b>' + content + '</b>')
      }
      return null
    },
    getMeteoTooltip (feature, layer) {
      const direction = _.get(feature, 'properties.windDirection')
      const speed = _.get(feature, 'properties.windSpeed')
      const gust = _.get(feature, 'properties.gust')
      const precipitations = _.get(feature, 'properties.precipitations')
      if (!_.isNil(direction) && !_.isNil(speed) && !_.isNil(gust) && !_.isNil(precipitations)) {
        let tooltip = L.tooltip({ permanent: false }, layer)
        return tooltip.setContent(`<b>${speed.toFixed(2)} m/s - ${direction.toFixed(2)}°</br>
                                   max ${gust.toFixed(2)} m/s - ${precipitations.toFixed(2)} mm/h</b>`)
      }
      return null
    },
    onFeaturePopupOpen (options, event) {
      const feature = _.get(event, 'layer.feature')
      if (!feature) return
    },
    async onFeatureClicked (options, event) {
      const feature = _.get(event, 'target.feature')
      if (!feature) return
      // Will fail if not integrated as iframe so check
      if (window.parent !== window) postRobot.send(window.parent, 'click', { feature, layer: options })
      if (options.probe) {
        const probe = await this.getForecastProbe(options.probe)
        if (probe) {
          await this.getForecastForFeature(_.get(feature, this.probe.featureId),
            moment.utc(this.timeLine.start), moment.utc(this.timeLine.end))
        }
      } else if (options.variables && options.service) {
        await this.getMeasureForFeature(options, feature,
          moment.utc(this.timeLine.current).clone().subtract({ seconds: options.history }), moment.utc(this.timeLine.current))
      }
    },
    onMapResized (size) {
      // Avoid to refresh the layout when leaving the component
      if (this.observe) {
        this.refreshMap()
        if (this.$refs.map) {
          this.mapWidth = this.$refs.map.getBoundingClientRect().width
          this.mapHeight = this.$refs.map.getBoundingClientRect().height
        }
      }
    },
    onToggleFullscreen () {
      this.map.toggleFullscreen()
    },
    onResizeTimeseries(state) {
      if (state !== 'closed') this.$refs.timeseries.setupTimeTicks()
    },
    onLayerShown (layer) {
      // Show timeseries on probed location
      if (layer.name === this.$t('mixins.activity.PROBED_LOCATION')) {
        if (!this.isTimeseriesOpen()) {
          this.openTimeseries()
          this.center(...this.probedLocation.geometry.coordinates)
        }
      }
    },
    onLayerHidden (layer) {
      // Hide timeseries on probed location
      if (layer.name === this.$t('mixins.activity.PROBED_LOCATION')) {
        if (this.isTimeseriesOpen()) this.closeTimeseries()
      }
    },
    onProbeLocation () {
      let probe = async (options, event) => {
        this.unsetCursor('probe-cursor')
        await this.getForecastForLocation(event.latlng.lng, event.latlng.lat,
          moment.utc(this.timeLine.start), moment.utc(this.timeLine.end))
        this.openTimeseries()
      }
      this.setCursor('probe-cursor')
      this.$once('click', probe)
    },
    isTimeseriesOpen () {
      return this.$refs.widget.isOpen()
    },
    openTimeseries () {
      this.$refs.widget.open()
      // Minimized widget is 40vw, if we have a small zie open wide directly (eg on mobile)
      if (0.4 * this.mapWidth < 500) this.$refs.widget.setMode('maximized')
    },
    closeTimeseries () {
      this.$refs.widget.close()
    },
    toggleTimeseries () {
      this.$refs.widget.toggle()
    },
    onCurrentTimeChanged (time) {
      // Round to nearest hour - FIXME: should be based on available times
      this.map.timeDimension.setCurrentTime(time.clone().minutes(0).seconds(0).milliseconds(0).valueOf())
      this.createProbedLocationLayer()
    },
    onTimeLineUpdated (event) {
      // Only when drag stops to avoid fetching data permanently 
      if (event.final) {
        this.setCurrentTime(moment.utc(event.value))
      }
    },
    setupTimeline () {
      let now = moment.utc()
      // Start just before the first available data
      const start = this.forecastModel ? this.forecastModel.lowerLimit - this.forecastModel.interval : -7*60*60*24
      // Start just after the last available data
      const end = this.forecastModel ? this.forecastModel.upperLimit + this.forecastModel.interval : 7*60*60*24
      this.timeLine.start = now.clone().add({ seconds: start }).valueOf()
      this.timeLine.end = now.clone().add({ seconds: end }).valueOf()
      // Clamp current time to range
      this.timeLine.current = Math.max(Math.min(this.timeLine.current, this.timeLine.end), this.timeLine.start)
      this.timeLineInterval = this.getTimeLineInterval()
      this.timeLineFormatter = this.getTimeLineFormatter()
      let times = []
      // Round to nearest hour - FIXME: should be based on available times
      for (let time = this.timeLine.start; time <= this.timeLine.end; time += 3600000) {
        times.push(moment.utc(time).minutes(0).seconds(0).milliseconds(0).format())
      }
      this.map.timeDimension.setAvailableTimes(times.join(), 'replace')
      this.setCurrentTime(moment.utc(this.timeLine.current))

      //
      // Make the component aware that it needs to refresh.
      //
      // See: http://michaelnthiessen.com/force-re-render and related to: https://github.com/kalisio/kano/issues/24
      //
      // Core issue is that the :value property of k-time-controller can be changed by this method, but this does not
      // affect the data element "this.currentValue" of the component which is only assigned once (see the expression
      // "currentValue: this.value" in mixin.range-compute.js).
      //
      // Since invoking "setupTimeline" means that the whole component simply needs to be recalculated (because we're
      // changing any/all of its props), forcing an update (using the ":key" technique) seem the simplest solution.  
      //
      this.timeControllerRefreshKey = this.timeControllerRefreshKey + 1
    }
  },
  created () {
    // Enable the observers in order to refresh the layout
    this.observe = true
    this.registerLeafletConstructor(this.createLeafletTimedWmsLayer)
    this.registerLeafletStyle('tooltip', this.getVigicruesTooltip)
    this.registerLeafletStyle('tooltip', this.getMeteoTooltip)
    this.registerLeafletStyle('markerStyle', this.getMeteoMarker)
    // Load the required components
    this.$options.components['k-location-time-series'] = this.$load('KLocationTimeSeries')
    this.$options.components['k-time-controller'] = this.$load('time/KTimeController')
    this.$options.components['k-color-legend'] = this.$load('KColorLegend')
    this.$options.components['k-widget'] = this.$load('frame/KWidget')
  },
  mounted () {
    this.$on('current-time-changed', this.onCurrentTimeChanged)
    this.$on('layer-shown', this.onLayerShown)
    this.$on('layer-hidden', this.onLayerHidden)
    // Setup event connections
    // this.$on('popupopen', this.onFeaturePopupOpen)
    this.$on('click', this.onFeatureClicked)
    this.$on('collection-refreshed', this.onCollectionRefreshed)
  },
  beforeDestroy () {
    this.$off('current-time-changed', this.onCurrentTimeChanged)
    this.$off('layer-shown', this.onLayerShown)
    this.$off('layer-hidden', this.onLayerHidden)
    // No need to refresh the layout when leaving the component
    this.observe = false
    //this.removeCollectionLayer('Actors')
    // Remove event connections
    // this.$off('popupopen', this.onFeaturePopupOpen)
    this.$off('click', this.onFeatureClicked)
    this.$off('collection-refreshed', this.onCollectionRefreshed)
    this.finalizeViewer()
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
</style>