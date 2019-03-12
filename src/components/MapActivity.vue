<template>
  <div>
    
    <div ref="map" :style="mapStyle">
      <q-resize-observable @resize="onMapResized" />
      <k-widget ref="widget" :offset="{ minimized: [18,18], maximized: [0,0] }" :title="probedLocationName" @state-changed="onResizeTimeseries">
        <div slot="widget-content">
          <time-series ref="timeseries"
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
      Kano
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
          v-if="forecastModel"
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

    <k-modal ref="geocodingModal" :title="$t('Activity.GEOCODING')" :toolbar="getGeocodingToolbar()" :buttons="getGeocodingButtons()" :route="false">
      <div slot="modal-content" class="column xs-gutter">
        <k-form ref="geocodingForm" :schema="getGeocodingSchema()" />
      </div>
    </k-modal>

  </div>
</template>

<script>
import _ from 'lodash'
import L from 'leaflet'
import 'leaflet-timedimension/dist/leaflet.timedimension.src.js'
import 'leaflet-timedimension/dist/leaflet.timedimension.control.css'
import logger from 'loglevel'
import moment from 'moment'
import 'weacast-leaflet'
import { QPopover, QModal, QResizeObservable, dom, QBtn, QFixedPosition } from 'quasar'
import { weacast } from 'weacast-core/client'
import { utils as kCoreUtils } from '@kalisio/kdk-core/client'
import { mixins as kCoreMixins } from '@kalisio/kdk-core/client'
import { mixins as kMapMixins, utils as kMapUtils } from '@kalisio/kdk-map/client'
import appHooks from '../main.hooks'
import mixins from '../mixins'
import TimeSeries from './TimeSeries'

const { offset } = dom

export default {
  name: 'k-map-activity',
  components: {
    QPopover,
    QModal,
    QResizeObservable,
    QBtn,
    QFixedPosition,
    TimeSeries
  },
  mixins: [
    kCoreMixins.baseActivity,
    kCoreMixins.refsResolver(['map']),
    kMapMixins.geolocation,
    kMapMixins.featureService,
    kMapMixins.time,
    kMapMixins.map.baseMap,
    kMapMixins.map.geojsonLayers,
    kMapMixins.map.forecastLayers,
    kMapMixins.map.fileLayers,
    kMapMixins.map.geotiffLayers,
    mixins.activity,
    mixins.legend    
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
    mapStyle () {
      let style = 'width: 100%; height: 100%; fontWeight: normal; zIndex: 0; position: absolute;'
      return style
    },
    timelineContainerStyle () {
      return {
        width: 0.8 * this.mapWidth + 'px'
      }
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
            await this.getWeatherForFeature(_.get(this.probedLocation, this.probe.featureId))
          }
        } else { // Location mode
          await this.getWeatherForLocation(this.probedLocation.geometry.coordinates[0], this.probedLocation.geometry.coordinates[1])
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
      // Add a scale control
      L.control.scale().addTo(this.map)
      this.map.on('moveend', this.onMapMoved)
    },
    finalizeViewer () {
      this.map.off('moveend', this.onMapMoved)
    },
    async refreshActivity () {  
      this.clearActivity()
      // Setup the right pane
      this.setRightPanelContent('Panel', this.$data)
      this.registerActivityActions()
      // FAB
      this.registerFabAction({
        name: 'probe', label: this.$t('MapActivity.PROBE'), icon: 'colorize', handler: this.onWeatherForLocation
      })
      // Wait until viewer is ready
      await this.initializeViewer()
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
    getTelerayMarker (feature, latlng) {
      if (_.has(feature, 'properties.irsnId')) {
        const valid = _.get(feature, 'properties.libelle')
        const icon = (valid === 'VA' ? 'info-circle' : (valid === 'NV' ? 'question-circle' : 'times-circle'))
        const color = (valid === 'VA' ? 'darkblue' : (valid === 'NV' ? 'orange' : 'dark'))
        return this.createMarkerFromStyle(latlng, {
          icon: {
            type: 'icon.fontAwesome',
            options: {
              iconClasses: 'fa fa-' + icon,
              markerColor: color,
              iconColor: '#FFF'
            }
          }
        })
      }
      return null
    },
    getVigicruesMarker (feature, latlng) {
      const isVigicruesProbe = (_.has(feature, 'properties.H') ||
                                _.has(feature, 'properties.Q'))
      if (isVigicruesProbe) {
        return this.createMarkerFromStyle(latlng, {
          type: 'circleMarker',
          options: {
            opacity: 1,
            color: 'black',
            fillOpacity: 1,
            fillColor: 'blue'
          }
        })
      }
      return null
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
          marker.on('dragend', (event) => this.getWeatherForLocation(event.target.getLatLng().lng, event.target.getLatLng().lat))
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
        let content = this.$t('Activity.VIGICRUES_LEVEL_' + level)
        return tooltip.setContent('<b>' + content + '</b>')
      }
      const H = _.get(feature, 'properties.H')
      const Q = _.get(feature, 'properties.Q')
      if (!_.isNil(H) || !_.isNil(Q)) {
        let tooltip = L.tooltip({ permanent: false }, layer)
        if (!_.isNil(H) && !_.isNil(Q)) return tooltip.setContent(`<b>${H.toFixed(2)} m - ${Q.toFixed(2)} m3/h`)
        else if (!_.isNil(H)) return tooltip.setContent(`<b>${H.toFixed(2)} m`)
        else if (!_.isNil(Q)) return tooltip.setContent(`<b>${Q.toFixed(2)} m3/h`)
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
      if (options.probe) {
        const probe = await this.getForecastProbe(options.probe)
        if (probe) {
          await this.getWeatherForFeature(_.get(feature, this.probe.featureId))
        }
      } else if (options.service) {
        await this.getMeasureForFeature(options, feature,
          moment.utc(this.timeLine.current).clone().subtract({ seconds: options.history }), moment.utc(this.timeLine.current))
      }
      if (this.probedLocation) this.openTimeseries()
      else this.closeTimeseries()
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
    onMapMoved () {
      this.bounds = this.map.getBounds()
      const south = this.bounds.getSouth()
      const west = this.bounds.getWest()
      const north = this.bounds.getNorth()
      const east = this.bounds.getEast()
      this.$router.push({ query: { south, west, north, east } })
    },
    onForecastModelSelected (model) {
      this.forecastModel = model
    },
    onToggleFullscreen () {
      this.map.toggleFullscreen()
    },
    onResizeTimeseries(state) {
      if (state !== 'closed') this.$refs.timeseries.setupTimeTicks()
    },
    onLayerShown (event) {
      // Show timeseries on probed location
      if (event.layer.name === this.$t('MapActivity.PROBED_LOCATION')) {
        if (!this.isTimeseriesOpen()) {
          this.openTimeseries()
          this.center(...this.probedLocation.geometry.coordinates)
        }
      }
    },
    onLayerHidden (event) {
      // Hide timeseries on probed location
      if (event.layer.name === this.$t('MapActivity.PROBED_LOCATION')) {
        if (this.isTimeseriesOpen()) this.closeTimeseries()
      }
    },
    async createProbedLocationLayer () {
      if (!this.probedLocation) return
      const name = this.$t('MapActivity.PROBED_LOCATION')
      // Use wind barbs on weather probed features
      const isWeatherProbe = (_.has(this.probedLocation, 'properties.windDirection') &&
                              _.has(this.probedLocation, 'properties.windSpeed'))
      // Get any previous layer or create it the first time
      let layer = this.getLeafletLayerByName(name)
      if (!layer) {
        await this.addLayer({
          name,
          type: 'OverlayLayer',
          icon: 'colorize',
          leaflet: {
            type: 'geoJson',
            isVisible: true
          }
        })
        layer = this.getLeafletLayerByName(name)
      }
      // Update data
      layer.clearLayers()
      layer.addData(isWeatherProbe ?
        this.getProbedLocationForecastAtCurrentTime() :
        this.getProbedLocationMeasureAtCurrentTime())
    },
    getMeasureValueAtCurrentTime (times, values) {
      // Check for the right value at time
      if (Array.isArray(times) && Array.isArray(values)) {
        /// Look for the nearest time
        const nearestTime = kMapUtils.getNearestTime(this.currentTime, times.map(time => moment.utc(time)))
        return (nearestTime.index > 0 ? values[nearestTime.index] : null)
      } else {
        // Constant value
        return values
      }
    },
    getProbedLocationMeasureAtCurrentTime () {
      // Create new geojson from raw response containing all times
      let feature = _.cloneDeep(this.probedLocation)
      // Then check for the right value at time
      _.forOwn(feature.properties, (value, key) => {
        if (Array.isArray(value)) {
          const times = _.get(feature, 'time.' + key)
          if (times) {
            feature.properties[key] = this.getMeasureValueAtCurrentTime(times, value)
          }
        }
      })
      return feature
    },
    async getMeasureForFeature (layer, feature, startTime, endTime) {
      this.setMapCursor('processing-cursor')
      try {
        let result = await this.getFeatures(Object.assign({
          baseQuery: { ['properties.' + layer.featureId]: _.get(feature, 'properties.' + layer.featureId) }
        }, layer), {
          $gte: startTime.format(),
          $lte: endTime.format()
        })
        /*
        this.$api.getService(layer.service).find({
          query: {
            time: {
              $gte: startTime.format(),
              $lte: endTime.format()
            },
            ['properties.' + layer.featureId]: _.get(feature, 'properties.' + layer.featureId),
            $groupBy: layer.featureId,
            $aggregate: elements
          }
        })
        */
        if (result.features.length > 0) this.probedLocation = result.features[0]
        else throw new Error('Cannot find valid measure for feature')
        this.createProbedLocationLayer()
      } catch (error) {
        this.probedLocation = null
        logger.error(error)
      }
      this.unsetMapCursor('processing-cursor')
    },
    async getWeatherForLocation (long, lat) {
      this.setMapCursor('processing-cursor')
      try {
        await this.getForecastForLocation(long, lat,
          moment.utc(this.timeLine.start), moment.utc(this.timeLine.end))
        this.createProbedLocationLayer()
      } catch (error) {
        this.probedLocation = null
        logger.error(error)
      }
      this.unsetMapCursor('processing-cursor')
    },
    async getWeatherForFeature (featureId) {
      this.setMapCursor('processing-cursor')
      try {
        await this.getForecastForFeature(featureId,
          moment.utc(this.timeLine.start), moment.utc(this.timeLine.end))
        this.createProbedLocationLayer()
      } catch (error) {
        this.probedLocation = null
        logger.error(error)
      }
      this.unsetMapCursor('processing-cursor')
    },
    onWeatherForLocation () {
      let probe = async (event) => {
        this.unsetMapCursor('probe-cursor')
        this.map.off('click', probe)
        await this.getWeatherForLocation(event.latlng.lng, event.latlng.lat)
        this.openTimeseries()
      }
      this.setMapCursor('probe-cursor')
      this.map.on('click', probe)
    },
    isTimeseriesOpen () {
      return this.$refs.widget.isOpen()
    },
    openTimeseries () {
      this.$refs.widget.open()
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
    async setupWeacast () {
      let config = this.$config('weacast')
      const catalogService = this.$api.getService('catalog')
      // Check for existing service in catalog overriding default config
      let response = await catalogService.find({ query: { type: 'service', name: 'weacast' } })
      if (response.data.length > 0) config.apiUrl = response.data[0].endpoint
      this.weacastApi = weacast(config)
      // Setup app hooks
      this.weacastApi.hooks(appHooks)
      // Ensure we also logout from weacast on app logout
      this.$api.on('logout', () => this.weacastApi.logout())
      try {
        // Transfer app token to Weacast
        const accessToken = await this.$api.passport.getJWT()
        const weacastAccessToken = await this.weacastApi.passport.getJWT()
        if (weacastAccessToken) await this.weacastApi.authenticate()
        else await this.weacastApi.authenticate({ strategy: 'jwt', accessToken })
        this.setupForecastModels()
      } catch(error) {
        logger.error('Cannot initialize weacast API', error)
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
    this.registerLeafletStyle('markerStyle', this.getTelerayMarker)
    this.registerLeafletStyle('markerStyle', this.getVigicruesMarker)
    this.registerLeafletStyle('markerStyle', this.getMeteoMarker)
    // Load the required components
    this.$options.components['k-time-controller'] = this.$load('time/KTimeController')
    this.$options.components['k-color-legend'] = this.$load('KColorLegend')
    this.$options.components['k-widget'] = this.$load('frame/KWidget')
  },
  mounted () {
    this.$on('current-time-changed', this.onCurrentTimeChanged)
    this.$on('leaflet-layer-shown', this.onLayerShown)
    this.$on('leaflet-layer-hidden', this.onLayerHidden)
    // Setup event connections
    // this.$on('popupopen', this.onFeaturePopupOpen)
    this.$on('click', this.onFeatureClicked)
    this.$on('collection-refreshed', this.onCollectionRefreshed)
  },
  beforeDestroy () {
    this.$off('current-time-changed', this.onCurrentTimeChanged)
    this.$off('leaflet-layer-shown', this.onLayerShown)
    this.$off('leaflet-layer-hidden', this.onLayerHidden)
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