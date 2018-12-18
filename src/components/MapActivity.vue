<template>
  <div>
    <div id="map" ref="map" :style="mapStyle">
      <q-resize-observable @resize="onMapResized" />
      <k-widget ref="widget" :offset="{ minimized: [18,18], maximized: [0,0] }" :title="$t('TimeSeries.GRAPH', { location: probedLocationName })" @state-changed="onResizeTimeseries">
        <div slot="widget-content">
          <time-series ref="timeseries" 
            :feature="probedLocation" 
            :variables="variables"
            :time-interval="forecastInterval" />
        </div>
      </k-widget>
    </div>
    <q-btn 
      id="side-nav-toggle"
      color="primary"
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
      :steps="colorLegend.steps"
      @click="onColorLegendClick" />
    />

    <q-fixed-position corner="bottom-left" :offset="[110, 60]" :style="timelineContainerStyle">   
        <k-time-controller v-if="forecastModel"
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
import 'leaflet-timedimension/dist/leaflet.timedimension.src.js'
import 'leaflet-timedimension/dist/leaflet.timedimension.control.css'
import logger from 'loglevel'
import moment from 'moment'
import 'weacast-leaflet'
import { QPopover, QModal, QWindowResizeObservable, QResizeObservable, dom, QBtn, QFixedPosition } from 'quasar'
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
    QWindowResizeObservable,
    QResizeObservable,
    QBtn,
    QFixedPosition,
    TimeSeries
  },
  mixins: [
    kCoreMixins.baseActivity,
    kMapMixins.geolocation,
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
      forecastModelHandlers: {},
      timeLine: {
        start: now.clone().subtract({ days: 7 }).valueOf(),
        end: now.clone().add({ days: 7 }).valueOf(),
        current: now.clone().valueOf()
      },
      timeLineInterval: null,
      timeLineFormatter: null,
      mapWidth: null,
      mapHeight: null
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
        width: '34px',
        border: '1px solid lightgrey',        
        fontSize: '12px'
      }
    },
    forecastInterval () {
      return (this.forecastModel ? this.forecastModel.interval / 3600 : 1)
    },
    variables () {
      // Filter layers with variables and convert from Object to Array type
      return _.flatten(_.values(_.pickBy(this.layers, (layer) => layer.variables)).map(layer => layer.variables))
    },
    probedLocationName: function () {
      return (this.probedLocation
        ? this.probedLocation.geometry.coordinates[0].toFixed(2) + '°, ' + this.probedLocation.geometry.coordinates[1].toFixed(2) + '°'
        : '')
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
          await this.getWeatherForFeature(_.get(this.probedLocation, this.probe.featureId))
        } else { // Location mode
          await this.getWeatherForLocation(this.probedLocation.geometry.coordinates[0], this.probedLocation.geometry.coordinates[1])
        }
      }
    }
  },
  methods: {
    async refreshActivity () {  
      this.clearActivity()
      // Retrieve the layers
      try {
        await this.refreshLayers('leaflet')
      } catch (error) {
        logger.error(error)
      }
      // Retrieve the forecast models
      try {
        await this.setupWeacast()
      } catch (error) {
        logger.error(error)
      }
      // TimeLine
      this.setupTimeline()
      this.forecastModelHandlers = { toggle: (model) => this.onForecastModelSelected(model) }
      // Setup the right pane
      this.setRightPanelContent('MapPanel', this.$data)
      // FAB
      this.registerFabAction({
        name: 'toggle-fullscreen', label: this.$t('MapActivity.TOGGLE_FULLSCREEN'), icon: 'fullscreen', handler: this.onToggleFullscreen
      })
      this.registerFabAction({
        name: 'geolocate', label: this.$t('MapActivity.GEOLOCATE'), icon: 'location_searching', handler: this.onGeolocate
      })
      this.registerFabAction({
        name: 'probe', label: this.$t('MapActivity.PROBE'), icon: 'colorize', handler: this.onWeatherForLocation
      })
    },
    createLeafletTimedWmsLayer (options) {
      let leafletOptions = options.leaflet || options
      // Check for valid type
      if (leafletOptions.type !== 'tileLayer.wms') return
      let layer = this.createLeafletLayer(options)
      // Specific case of time dimension layer where we embed the underlying WMS layer
      if (leafletOptions.timeDimension) {
        layer = this.createLeafletLayer(Object.assign({ type: 'timeDimension.layer.wms', source: layer }, leafletOptions.timeDimension))
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
    getMeteoMarker (feature, latlng) {
      // Use wind barbs on probed features
      if (_.has(feature, 'properties.windDirection') && _.has(feature, 'properties.windSpeed')) {
        let marker = this.getProbedLocationMarker(feature, latlng)
        if (marker) {
          // We use custom events on this one
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
        const results = await this.weacastApi.getService('probes').find({
          query: { name: options.probe, $paginate: false, $select: ['elements', 'forecast', 'featureId'] }
        })
        if (results.length > 0) {
          this.probe = results[0]
          await this.getWeatherForFeature(_.get(feature, this.probe.featureId))
          this.openTimeseries()
        }
      } else if (options.service) {
        await this.getMeasureForFeature(options, feature, options.variables.map(variable => variable.name),
          moment.utc(this.timeLine.current).clone().subtract({ seconds: options.history }), moment.utc(this.timeLine.current))
        this.openTimeseries()
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
    onMapMoved () {
      this.bounds = this.map.getBounds()
      this.$store.set('bounds', [
        [this.bounds.getSouth(), this.bounds.getWest()],
        [this.bounds.getNorth(), this.bounds.getEast()]
      ])
      this.$router.push({
        query: {
          south: this.bounds.getSouth(), west: this.bounds.getWest(),
          north: this.bounds.getNorth(), east: this.bounds.getEast()
        }
      })
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
    createProbedLocationLayer () {
      if (!this.probedLocation) return
      const name = this.$t('MapActivity.PROBED_LOCATION')
      // Remove any previous layer
      this.removeLayer(name)
      this.addLayer({
        name,
        type: 'OverlayLayer',
        icon: 'colorize',
        leaflet: {
          type: 'geoJson',
          isVisible: true,
          source: this.getProbedLocationAtCurrentTime()
        }
      })
    },
    async getMeasureForFeature (layer, feature, elements, startTime, endTime) {
      let result = await this.$api.getService(layer.service).find({
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
      if (result.features.length > 0) {
        this.probedLocation = result.features[0]
      }
    },
    async getWeatherForLocation (long, lat) {
      this.setMapCursor('processing-cursor')
      try {
        await this.getForecastForLocation(long, lat,
          moment.utc(this.timeLine.start), moment.utc(this.timeLine.end))
      } catch (error) {
        logger.error(error)
      }
      this.unsetMapCursor('processing-cursor')
      this.createProbedLocationLayer()
    },
    async getWeatherForFeature (featureId) {
      this.setMapCursor('processing-cursor')
      try {
        await this.getForecastForFeature(featureId,
          moment.utc(this.timeLine.start), moment.utc(this.timeLine.end))
      } catch (error) {
        logger.error(error)
      }
      this.unsetMapCursor('processing-cursor')
      this.createProbedLocationLayer()
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
      this.weacastApi.setForecastTime(time)
      this.map.timeDimension.setCurrentTime(time.valueOf())
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
      try {
        // Transfer app token to Weacast
        const accessToken = await this.$api.passport.getJWT()
        await this.weacastApi.authenticate({ strategy: 'jwt', accessToken })
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
      for (let time = this.timeLine.start; time <= this.timeLine.end; time += 3600000) {
        times.push(new Date(time).toISOString())
      }
      this.map.timeDimension.setAvailableTimes(times, 'replace')
      this.setCurrentTime(moment.utc(this.timeLine.current))
    }
  },
  created () {
    // Enable the observers in order to refresh the layout
    this.observe = true
    this.registerLeafletConstructor(this.createLeafletTimedWmsLayer)
    this.registerLeafletStyle('tooltip', this.getVigicruesTooltip)
    this.registerLeafletStyle('tooltip', this.getMeteoTooltip)
    this.registerLeafletStyle('markerStyle', this.getTelerayMarker)
    this.registerLeafletStyle('markerStyle', this.getMeteoMarker)
    // Load the required components
    this.$options.components['k-time-controller'] = this.$load('time/KTimeController')
    this.$options.components['k-color-legend'] = this.$load('KColorLegend')
    this.$options.components['k-widget'] = this.$load('frame/KWidget')
  },
  mounted () {
    this.setupMap(this.$config('map.viewer'))
    // Add aa scale control
    L.control.scale().addTo(this.map)
    this.$on('current-time-changed', this.onCurrentTimeChanged)
    this.map.on('moveend', this.onMapMoved)
    if (this.$store.has('bounds')) {
      this.map.fitBounds(this.$store.get('bounds'))
    } else if (this.$route.query.south) {
      this.$store.set('bounds', [
        [this.$route.query.south, this.$route.query.west],
        [this.$route.query.north, this.$route.query.east]
      ])
      this.map.fitBounds(this.$store.get('bounds'))
    } else {
      if (this.$store.get('user.position')) this.geolocate()
    }
    // Setup event connections
    // this.$on('popupopen', this.onFeaturePopupOpen)
    this.$on('click', this.onFeatureClicked)
    this.$on('collection-refreshed', this.onCollectionRefreshed)
  },
  beforeDestroy () {
    this.$off('current-time-changed', this.onCurrentTimeChanged)
    this.map.off('moveend', this.onMapMoved)
    // No need to refresh the layout when leaving the component
    this.observe = false
    //this.removeCollectionLayer('Actors')
    // Remove event connections
    // this.$off('popupopen', this.onFeaturePopupOpen)
    this.$off('click', this.onFeatureClicked)
    this.$off('collection-refreshed', this.onCollectionRefreshed)
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