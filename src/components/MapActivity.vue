<template>
  <div>
    <div id="map" ref="map" :style="mapStyle">
      <q-resize-observable @resize="onMapResized" />
      <q-popover ref="popover" :anchor-click="false" anchor="center left" self="center left" :offset="[-20, 0]">
        <q-btn icon="close" flat @click="onCloseProbePopover"></q-btn>
        <q-btn icon="fullscreen" flat @click="onToggleProbeFullscreen"></q-btn>
        <time-series
          :feature="probedLocation"
          style="{ width: 30vw; max-width: 30vw; height: 20vw; max-height: 20vw; overflow: hidden; }">
        </time-series>
      </q-popover>
      <q-modal ref="modal" maximized>
        <q-btn icon="close" flat @click="onCloseProbeModal"></q-btn>
        <time-series
          :feature="probedLocation">
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

    <q-fixed-position corner="bottom-left" :offset="[110, 30]" :style="timelineContainerStyle">   
        <k-time-controller
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
import { Events, QPopover, QModal, QWindowResizeObservable, QResizeObservable, dom, QBtn, QFixedPosition } from 'quasar'
import { weacast } from 'weacast-core/client'
import { utils as kCoreUtils } from '@kalisio/kdk-core/client'
import { mixins as kCoreMixins } from '@kalisio/kdk-core/client'
import { mixins as kMapMixins } from '@kalisio/kdk-map/client'
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
    kMapMixins.map.fileLayers
  ],
  inject: ['layout'],
  data () {
    return {
      layerHandlers: {},
      forecastModelHandlers: {},
      timeLine: {
        start: null,
        end: null,
        current: null
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
    }
  },
  watch: {
    forecastModel: function (model) {
      _.forOwn(this.leafletLayers, layer => {
        if (layer instanceof L.weacast.ForecastLayer) layer.setForecastModel(model)
      })
    }
  },
  methods: {
    async refreshActivity () {  
      this.clearActivity()
      // TimeLine
      this.setupTimeline()
      // Retrieve the layers
      this.layers = {}
      this.layerHandlers = { toggle: (layer) => this.onLayerTriggered(layer) }
      const layersService = this.$api.getService('layers')
      let response = await layersService.find()
      _.forEach(response.data, (layer) => {
        if (layer.leaflet) this.addLayer(layer)
      })
      // Retrieve the forecast models
      await this.setupWeacast()
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
    getPointMarker (feature, latlng) {
      // Use wind barbs on probed features
      if (_.has(feature, 'properties.windDirection') && _.has(feature, 'properties.windSpeed')) {
        let marker = this.getProbedLocationMarker(feature, latlng)
        marker.on('dragend', (event) => {
          const position = event.target.getLatLng()
          this.performDynamicLocationProbing(position.lng, position.lat)
        })
        return marker
      }
      // ADS-B
      else if (_.has(feature, 'properties.icao')) {
        return this.createMarkerFromStyle(latlng, {
          icon: {
            type: 'icon',
            options: {
              iconUrl: '/statics/paper-plane.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            }
          }
        })
      }
      // Téléray
      else if (_.has(feature, 'properties.irsnId')) {
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
    getFeatureStyle (feature) {
      return this.convertFromSimpleStyleSpec(feature.properties || {})
    },
    getFeaturePopup (feature, layer) {
      let popup = L.popup({ autoPan: false }, layer)
      const name = _.get(feature, 'properties.name', _.get(feature, 'properties.NomEntVigiCru', _.get(feature, 'properties.icao')))
      return popup.setContent(name)
    },
    getFeatureTooltip (feature, layer) {
      const level = _.get(feature, 'properties.NivSituVigiCruEnt')
      if (level > 1) {
        let tooltip = L.tooltip({ permanent: false }, layer)
        let content
        switch (level) {
          case 2:
            content = 'Risque de crue génératrice de débordements'
            break
          case 3:
            content = 'Risque de crue génératrice de débordements importants'
            break
          case 4:
            content = 'Risque de crue majeure'
            break
        }
        return tooltip.setContent('<b>' + content + '</b>')
      }
      const callsign = _.get(feature, 'properties.callsign')
      if (callsign) {
        let tooltip = L.tooltip({ permanent: true }, layer)
        return tooltip.setContent('<b>' + callsign + '</b>')
      }
      const value = _.get(feature, 'properties.value')
      if (value) {
        let tooltip = L.tooltip({ permanent: false }, layer)
        return tooltip.setContent('<b>' + value + ' nSv/h</b>')
      }
      return null
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
      if (this.observe) {
        this.refreshMap()
        this.onResizeMap()
      }
    },
    onMapMoved () {
      this.bounds = this.map.getBounds()
      this.$store.set('bounds', [
        [this.bounds.getSouth(), this.bounds.getWest()],
        [this.bounds.getNorth(), this.bounds.getEast()]
      ])
    },
    onLayerTriggered (layer) {
      if (!this.isLayerVisible(layer.name)) {
        this.showLayer(layer.name)
      } else {
        this.hideLayer(layer.name)
      } 
    },
    onForecastModelSelected (model) {
      this.forecastModel = model
    },
    onToggleFullscreen () {
      this.map.toggleFullscreen()
    },
    onToggleProbeFullscreen () {
      this.$refs.popover.close( () => this.$refs.modal.open())
    },
    onCloseProbePopover () {
      this.$refs.popover.close()
    },
    onCloseProbeModal () {
      this.$refs.modal.open()
    },
    onGeolocate () {
      this.updatePosition()
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
    async performDynamicLocationProbing (long, lat) {
      this.setMapCursor('processing-cursor')
      try {
        await this.probeDynamicLocation(long, lat,
          moment.utc(), moment.utc().add({ days: 5 }))
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
      this.createProbedLocationLayer()
    },
    onTimeLineUpdated (event) {
      if (event.final) {
          this.setCurrentTime(moment.utc(event.value))
      }
    },
    refreshOnGeolocation () {
      const position = this.$store.get('user.position')
      this.center(position.longitude, position.latitude)
    },
    setupWeacast () {
      const config = this.$config('weacast')
      this.weacastApi = weacast(config)
      return this.weacastApi.authenticate(config.authentication)
      .then(_ => this.setupForecastModels())
      .catch(error => logger.error('Cannot initialize weacast API', error))
    },
    setupTimeline () {
      let date = moment.utc()
      this.setCurrentTime(date.clone())
      this.timeLine.current = date.valueOf()
      this.timeLine.start = date.add({ days: -1 }).valueOf()
      this.timeLine.end = date.add({ days: 7 }).valueOf()

      this.timeLineInterval = this.getTimeLineInterval()
      this.timeLineFormatter = this.getTimeLineFormatter()
    },
    getTimeLineInterval () {
      // interval length: length of 1 day in milliseconds
      const length = 24 * 60 * 60000

      return {
        length,
        getIntervalStartValue (rangeStart) {
          const startTime = new Date(rangeStart)

          const year = startTime.getFullYear()
          const month = startTime.getMonth()
          const day = startTime.getDate()
          const hour = startTime.getHours()
          const minute = startTime.getMinutes()

          let startValue

          // range starts on a day (ignoring seconds)
          if (hour == 0 && minute == 0) {
            startValue = rangeStart

          } else {
            let startOfDay = new Date(year, month, day, 0, 0, 0)
            startOfDay.setDate(startOfDay.getDate() + 1)

            startValue = startOfDay.getTime()
          } 

          return startValue
        }
      }
    },
    getTimeLineFormatter () {

      return {

        format (value, type, displayOptions) {
          const time = new Date(value)
          let label

          switch (type) {
            case 'interval':
              if (displayOptions.width >= 110) {
                label = moment(time).format('dddd D')
              } else {
                label = moment(time).format('ddd')
              }
              break 
            case 'pointer':
              label = moment(time).format('dddd D - h A')
              break 
            case 'indicator':
              label = moment(time).format('h A')
              break 
          }

          return label
        }        
      }
    },
    onResizeMap () {
      const componentRef = this.$refs.map

      if (componentRef) {
        const componentRect = componentRef.getBoundingClientRect()
        this.mapWidth = componentRect.width
      }
    }
  },
  created () {
    // Enable the observers in order to refresh the layout
    this.observe = true
    this.registerLeafletConstructor(this.createLeafletTimedWmsLayer)
    // Load the required components
    this.$options.components['k-time-controller'] = this.$load('time/KTimeController')
  },
  mounted () {
    this.setupMap()
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
    Events.$on('user-position-changed', this.refreshOnGeolocation)
    if (this.$store.get('user.position')) this.refreshOnGeolocation()
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
    Events.$off('user-position-changed', this.refreshOnGeolocation)
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