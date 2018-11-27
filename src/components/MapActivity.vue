<template>
  <div>
    <div id="map" ref="map" :style="mapStyle">
      <q-resize-observable @resize="onMapResized" />
      <q-popover ref="popover" :anchor-click="false" anchor="center left" self="center left" :offset="[-20, 0]"
                 max-height="20vw" style="{ min-width: 30vw; max-width: 30vw; min-height: 20vw; max-height: 20vw; }">
        <q-btn icon="close" flat @click="onCloseProbePopover"></q-btn>
        <q-btn icon="fullscreen" flat @click="onToggleProbeFullscreen"></q-btn>
        <time-series
          :feature="probedLocation" :stepSize="3 * forecastInterval" :interval="forecastInterval">
        </time-series>
      </q-popover>
      <q-modal ref="modal" maximized>
        <q-btn icon="close" flat @click="onCloseProbeModal"></q-btn>
        <time-series
          :feature="probedLocation" :stepSize="forecastInterval" :interval="forecastInterval">
        </time-series>
      </q-modal>
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

    <q-fixed-position corner="bottom-left" :offset="[110, 60]" :style="timelineContainerStyle">   
        <k-time-controller v-if="forecastModel"
          :min="timeLine.start" 
          :max="timeLine.end"
          :step="'h'"
          :value="timeLine.current"
          :timeInterval="timeLineInterval"
          :timeFormatter="timeLineFormatter"
          @change="onTimeLineUpdated"
          pointerColor="red" 
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
    mixins.activity
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
      mapWidth: null
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
    forecastInterval () {
      return (this.forecastModel ? this.forecastModel.interval / 3600 : 1)
    }
  },
  watch: {
    forecastModel: function (model) {
      // Update layers
      _.forOwn(this.leafletLayers, layer => {
        if (layer instanceof L.weacast.ForecastLayer) layer.setForecastModel(model)
      })
      // Update timeLine
      this.setupTimeline()
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
        name: 'probe', label: this.$t('MapActivity.PROBE'), icon: 'colorize', handler: this.onProbeDynamicLocation
      })
    },
    createLeafletTimedWmsLayer (options) {
      // Check for valid type
      if (options.type !== 'tileLayer.wms') return
      const layerOptions = _.get(options, 'arguments[1]', {})
      let layer = this.createLeafletLayer(options)
      // Specific case of time dimension layer where we embed the underlying WMS layer
      if (layerOptions.timeDimension) {
        layer = this.createLeafletLayer({ type: 'timeDimension.layer.wms', arguments: [ layer, layerOptions.timeDimension ] })
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
          marker.on('dragend', (event) => this.performDynamicLocationProbing(event.target.getLatLng().lng, event.target.getLatLng().lat))
          marker.on('click', (event) => this.$refs.popover.toggle())
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
    onPopupOpen (options, event) {
      const feature = _.get(event, 'layer.feature')
      if (!feature) return
    },
    onFeatureClicked (options, event) {
      const feature = _.get(event, 'target.feature')
      if (!feature) return
      if (options.name === 'Sites') {
        this.performStaticLocationProbing(_.get(feature, 'properties.NAME'))
      } else if (options.service) {
        this.getTimeserie(options, feature, ['H', 'Q'],
          moment.utc(this.timeLine.start).clone().subtract({ days: 7 }), moment.utc(this.timeLine.end))
      }
    },
    onMapResized (size) {
      // Avoid to refresh the layout when leaving the component
      if (this.observe) {
        this.refreshMap()
        if (this.$refs.map) {
          this.mapWidth = this.$refs.map.getBoundingClientRect().width
        }
      }
    },
    onMapMoved () {
      this.bounds = this.map.getBounds()
      this.$store.set('bounds', [
        [this.bounds.getSouth(), this.bounds.getWest()],
        [this.bounds.getNorth(), this.bounds.getEast()]
      ])
    },
    onForecastModelSelected (model) {
      this.forecastModel = model
    },
    onToggleFullscreen () {
      this.map.toggleFullscreen()
    },
    onToggleProbeFullscreen () {
      this.$refs.popover.close(() => this.$refs.modal.open())
    },
    onCloseProbePopover () {
      this.$refs.popover.close()
    },
    onCloseProbeModal () {
      this.$refs.modal.close()
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
          arguments: [ this.getProbedLocationAtCurrentTime(), {} ]
        }
      })
    },
    async getTimeserie (layer, feature, elements, startTime, endTime) {
      let result = await this.$api.getService(layer.service).find({
        query: {
          time: {
            $gte: startTime.format(),
            $lte: endTime.format()
          },
          ['properties.' + layer.featureId]: _.get(feature, 'properties.' + layer.featureId),
          $groupBy: 'properties.' + layer.featureId,
          $aggregate: elements
        }
      })
      if (result.features.length > 0) this.probedLocation = result.features[0]
    },
    async performDynamicLocationProbing (long, lat) {
      this.setMapCursor('processing-cursor')
      try {
        await this.probeDynamicLocation(long, lat,
          moment.utc(this.timeLine.start), moment.utc(this.timeLine.end))
      } catch (error) {
        logger.error(error)
      }
      this.unsetMapCursor('processing-cursor')
      this.createProbedLocationLayer()
    },
    async performStaticLocationProbing (featureId) {
      this.setMapCursor('processing-cursor')
      try {
        await this.probeStaticLocation(featureId,
          moment.utc(this.timeLine.start), moment.utc(this.timeLine.end))
      } catch (error) {
        logger.error(error)
      }
      this.unsetMapCursor('processing-cursor')
      this.createProbedLocationLayer()
    },
    onProbeDynamicLocation () {
      let probe = async (event) => {
        this.unsetMapCursor('probe-cursor')
        this.map.off('click', probe)
        await this.performDynamicLocationProbing(event.latlng.lng, event.latlng.lat)
        // Quasar popover is not persistent and closes when clicking outside
        // We manually remove event listeners so that it becomes persistent
        setTimeout(() => {
          document.body.removeEventListener('click', this.$refs.popover.close, true)
          document.body.removeEventListener('touchstart', this.$refs.popover.close, true)
        }, 1000)
        this.$refs.popover.open()
      }
      this.setMapCursor('probe-cursor')
      this.map.on('click', probe)
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
      const config = this.$config('weacast')
      this.weacastApi = weacast(config)
      // Alter the get service function because we rewrite the access path by prefixing by 'weacast'
      /*
      this.weacastApi.getService = (path) => {
        return this.weacastApi.service(this.$config('apiPath') + '/' + path)
      }
      */
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
      if (!this.forecastModel) return
      let now = moment.utc()
      // Start just before the first available data
      const start = this.forecastModel.lowerLimit - this.forecastModel.interval
      // Start just after the last available data
      const end = this.forecastModel.upperLimit + this.forecastModel.interval
      this.timeLine.start = now.clone().add({ seconds: start }).valueOf()
      this.timeLine.end = now.clone().add({ seconds: end }).valueOf()
      // Clamp current time to range
      this.timeLine.current = Math.max(Math.min(this.timeLine.current, this.timeLine.end), this.timeLine.start)
      this.setCurrentTime(moment.utc(this.timeLine.current))
      this.timeLineInterval = this.getTimeLineInterval()
      this.timeLineFormatter = this.getTimeLineFormatter()
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
  },
  mounted () {
    this.setupMap({ timeDimension: true })
    // Add aa scale control
    L.control.scale().addTo(this.map)
    this.$on('current-time-changed', this.onCurrentTimeChanged)
    this.map.on('moveend', this.onMapMoved)
    if (this.$store.has('bounds')) {
      this.map.fitBounds(this.$store.get('bounds'))
    }
    // Setup event connections
    // this.$on('popupopen', this.onPopupOpen)
    this.$on('click', this.onFeatureClicked)
    this.$on('collection-refreshed', this.onCollectionRefreshed)
    if (this.$store.get('user.position')) this.geolocate()
  },
  beforeDestroy () {
    this.$off('current-time-changed', this.onCurrentTimeChanged)
    this.map.off('moveend', this.onMapMoved)
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

<style>
.probe-cursor {
  cursor: crosshair;
}
.processing-cursor {
  cursor: wait;
}
</style>