import _ from 'lodash'
import logger from 'loglevel'
import moment from 'moment'
import Cesium from 'cesium/Source/Cesium.js'
import { Events, Dialog } from 'quasar'

export default {
  data () {
    return {
      layerHandlers: {},
      engineReady: false
    }
  },
  methods: {
    async refreshLayers (engine) {
      this.layers = {}
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
    onGeolocate () {
      // Force a refresh
      this.$router.push({ query: {} })
      this.updatePosition()
    },
    onEngineReady () {
      this.engineReady = true
    },
    geolocate () {
      if (!this.engineReady) {
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
    initializeView () {
      if (this.$route.query.south) {
        const bounds= [ [this.$route.query.south, this.$route.query.west], [this.$route.query.north, this.$route.query.east] ]
        if (this.viewer) this.viewer.camera.flyTo({ duration: 0, destination : Cesium.Rectangle.fromDegrees(bounds[0][1], bounds[0][0], bounds[1][1], bounds[1][0]) })
        else if (this.map) this.map.fitBounds(bounds)
      } else {
        if (this.$store.get('user.position')) this.geolocate()
      }
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
    }
  },
  beforeCreate () {
    
  },
  created () {
    
  },
  mounted () {
    this.$on('map-ready', this.onEngineReady)
    this.$on('globe-ready', this.onEngineReady)
    this.$on('layer-added', this.onLayerAdded)
    Events.$on('user-position-changed', this.geolocate)
  },
  beforeDestroy () {
    this.$off('map-ready', this.onEngineReady)
    this.$off('globe-ready', this.onEngineReady)
    this.$off('layer-added', this.onLayerAdded)
    Events.$off('user-position-changed', this.geolocate)
  }
}
