import _ from 'lodash'
import moment from 'moment'
import { Events, Dialog } from 'quasar'

export default {
  data () {
    return {
      layerHandlers: {}
    }
  },
  methods: {
    async refreshLayers (engine) {
      this.layers = {}
      this.layerHandlers = {
        toggle: (layer) => this.onTriggerLayer(layer),
        remove: (layer) => this.onRemoveLayer(layer)
      }
      const layersService = this.$api.getService('layers')
      let response = await layersService.find()
      _.forEach(response.data, (layer) => {
        if (layer[engine]) this.addLayer(layer)
      })
    },
    onLayerAdded (layer) {
      // FIXME: Add supported actions
      if (layer.type === 'OverlayLayer') {
        layer.actions = [{
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
      this.updatePosition()
    },
    refreshOnGeolocation () {
      const position = this.$store.get('user.position')
      this.center(position.longitude, position.latitude, 10000)
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
    this.$on('layer-added', this.onLayerAdded)
    Events.$on('user-position-changed', this.refreshOnGeolocation)
    if (this.$store.get('user.position')) this.refreshOnGeolocation()
  },
  beforeDestroy () {
    this.$off('layer-added', this.onLayerAdded)
    Events.$off('user-position-changed', this.refreshOnGeolocation)
  }
}
