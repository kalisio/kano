import _ from 'lodash'
import logger from 'loglevel'
import moment from 'moment'
import postRobot from 'post-robot'
import Cesium from 'cesium/Source/Cesium.js'
import { Events, Dialog } from 'quasar'
import { mixins as kCoreMixins } from '@kalisio/kdk-core/client'

export default {
  mixins: [
    kCoreMixins.refsResolver(['geocodingForm'])
  ],
  data () {
    return {
      forecastModelHandlers: {},
      layerCategories: {},
      layerHandlers: {},
      engine: null
    }
  },
  methods: {
    getGeocodingSchema () {
      return {
        '$schema': 'http://json-schema.org/draft-06/schema#',
        '$id': 'http://kalisio.xyz/schemas/geocoding#',
        'title': 'Geocoding Form',
        'type': 'object',
        'properties': {
          "location": {
            "type": "object", 
            "field": {
              "component": "KLocationField",
              "helper": "schemas.ACTIVITY_LOCATION_FIELD_HELPER"
            }
          }
        },
        'required': ['user', 'role']
      }
    },
    getGeocodingToolbar () {
      return [
        { name: 'close-action', label: this.$t('Activity.CLOSE_GEOCODING_ACTION'), icon: 'close', handler: this.onCloseGeocoding }
      ]
    },
    getGeocodingButtons () {
      return [
        { name: 'geocode-button', label: this.$t('Activity.GEOCODE_BUTTON'), color: 'primary', handler: (event, done) => this.onGeocode(done) }
      ]
    },
    registerActivityActions () {
      // FAB
      this.registerFabAction({
        name: 'toggle-fullscreen', label: this.$t('Activity.TOGGLE_FULLSCREEN'), icon: 'fullscreen', handler: this.onToggleFullscreen
      })
      this.registerFabAction({
        name: 'geolocate', label: this.$t('Activity.GEOLOCATE'), icon: 'my_location', handler: this.onGeolocate
      })
      this.registerFabAction({
        name: 'geocode', label: this.$t('Activity.GEOCODE'), icon: 'location_searching', handler: this.onGeocoding
      })
    },
    async refreshLayers (engine) {
      this.layers = {}
      this.layerCategories = (engine === 'leaflet' ? this.$config('mapPanel.categories') : this.$config('globePanel.categories'))
      this.layerHandlers = {
        toggle: (layer) => this.onTriggerLayer(layer),
        zoomTo: (layer) => this.onZoomToLayer(layer),
        remove: (layer) => this.onRemoveLayer(layer)
      }
      const catalogService = this.$api.getService('catalog')
      let response = await catalogService.find()
      _.forEach(response.data, (layer) => {
        if (layer[engine]) {
          // Process i18n
          if (this.$t(layer.name)) layer.name = this.$t(layer.name)
          if (this.$t(layer.description)) layer.description = this.$t(layer.description)
          this.addLayer(layer)
        }
      })
    },
    onLayerAdded (layer) {
      // Add supported actions
      if (layer.type === 'OverlayLayer') {
        layer.actions = [{
          name: 'zoomTo',
          label: this.$t('Activity.ZOOM_TO_LABEL'),
          icon: 'zoom_out_map'
        }, {
          name: 'remove',
          label: this.$t('Activity.REMOVE_LABEL'),
          icon: 'remove_circle'
        }]
      }
    },
    onTriggerLayer (layer) {
      if (!this.isLayerVisible(layer.name)) {
        this.showLayer(layer.name)
      } else {
        this.hideLayer(layer.name)
      } 
    },
    onZoomToLayer (layer) {
      this.zoomToLayer(layer.name)
    },
    onRemoveLayer (layer) {
      Dialog.create({
        title: this.$t('Activity.REMOVE_DIALOG_TITLE', { layer: layer.name }),
        message: this.$t('Activity.REMOVE_DIALOG_MESSAGE', { layer: layer.name }),
        buttons: [
          {
            label: 'Ok',
            handler: () => { this.removeLayer(layer.name) }
          },
          'Cancel'
        ]
      })
    },
    onMapReady () {
      this.engine = 'leaflet'
    },
    onGlobeReady () {
      this.engine = 'cesium'
    },
    onGeolocate () {
      // Force a refresh
      this.$router.push({ query: {} })
      this.updatePosition()
    },
    onCloseGeocoding (done) {
      this.$refs.geocodingModal.close(done)
    },
    onGeocoding () {
      this.$refs.geocodingModal.open()
    },
    onGeocode (done) {
      this.onCloseGeocoding(() => {
        let result = this.$refs.geocodingForm.validate()
        const longitude = _.get(result, 'values.location.longitude')
        const latitude = _.get(result, 'values.location.latitude')
        if (longitude && latitude) {
          this.center(longitude, latitude)
        }
        done()
      })
    },
    geolocate () {
      if (!this.engine) {
        //logger.error('Engine not ready to geolocate')
        return
      }
      if (this.$route.query.south) return
      const position = this.$store.get('user.position')
      // 3D or 2D centering ?
      if (position) {
        if (this.viewer) this.center(position.longitude, position.latitude, 10000)
        else if (this.map) this.center(position.longitude, position.latitude)
      }
    },
    async initializeView () {
      if (this.$route.query.south) {
        const bounds= [ [this.$route.query.south, this.$route.query.west], [this.$route.query.north, this.$route.query.east] ]
        if (this.viewer) this.viewer.camera.flyTo({ duration: 0, destination : Cesium.Rectangle.fromDegrees(bounds[0][1], bounds[0][0], bounds[1][1], bounds[1][0]) })
        else if (this.map) this.map.fitBounds(bounds)
      } else {
        if (this.$store.get('user.position')) this.geolocate()
      }

      // Retrieve the layers
      try {
        await this.refreshLayers(this.engine)
      } catch (error) {
        logger.error(error)
      }
      // Retrieve the forecast models
      if (this.setupWeacast) {
        try {
          await this.setupWeacast()
        } catch (error) {
          logger.error(error)
        }
        this.forecastModelHandlers = { toggle: (model) => this.onForecastModelSelected(model) }
      } else {
        this.forecastModelHandlers = {}
      }
      // TimeLine
      if (this.setupTimeline) this.setupTimeline()
    },
    getTimeLineInterval () {
      // interval length: length of 1 day in milliseconds
      const length = 24 * 60 * 60000

      return {
        length,
        getIntervalStartValue (rangeStart) {
          let startTime = moment.utc(rangeStart)
          startTime.local()
          const hour = startTime.hours()
          const minute = startTime.minutes()
          let startValue
          // range starts on a day (ignoring seconds)
          if (hour == 0 && minute == 0) {
            startValue = rangeStart
          } else {
            let startOfDay = startTime.startOf('day')
            startOfDay.add({ days: 1 })
            startValue = startOfDay.valueOf()
          } 
          return startValue
        },
        valueChanged (value, previousValue, step) {
          let changed = true
          if (step !== null) {
            changed = false
            if (previousValue === null) {
              changed = true
            } else {
              const difference = Math.abs(value - previousValue)
              switch (step) {
                case 'h':
                  changed = (difference >= 60 * 60000)
                  break
                case 'm':
                  changed = (difference >= 60000)   
                  break
                default:
                  changed = true
              }
            }
          }
          return changed
        }
      }
    },
    getTimeLineFormatter () {
      return {
        format: (value, type, displayOptions) => {
          const time = new Date(value)
          let label
          switch (type) {
            case 'interval':
              if (displayOptions.width >= 110) {
                label = this.formatTime('date.long', time)
              } else {
                label = this.formatTime('date.short', time)
              }
              break 
            case 'pointer':
              label = `${this.formatTime('date.long', time)} - ${this.formatTime('time.short', time)}`
              break 
            case 'indicator':
              label = this.formatTime('time.short', time)
              break 
          }
          return label
        }        
      }
    }
  },
  beforeCreate () {   
  },
  created () {
    // Load the required components
    this.$options.components['k-modal'] = this.$load('frame/KModal')
    this.$options.components['k-form'] = this.$load('form/KForm')
    /* Cross-window test */
    this.getLayerListener = postRobot.on('getLayer', (event) => {
      const data = event.data
      return {
        hide: () => this.hideLayer(data.name),
        show: () => this.showLayer(data.name)
      }
    })
  },
  mounted () {
    this.$on('map-ready', this.onMapReady)
    this.$on('globe-ready', this.onGlobeReady)
    this.$on('layer-added', this.onLayerAdded)
    Events.$on('user-position-changed', this.geolocate)
  },
  beforeDestroy () {
    this.$off('map-ready', this.onMapReady)
    this.$off('globe-ready', this.onGlobeReady)
    this.$off('layer-added', this.onLayerAdded)
    Events.$off('user-position-changed', this.geolocate)
    this.getLayerListener.cancel()
  }
}
