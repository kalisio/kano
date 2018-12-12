import math from 'mathjs'
import L from 'leaflet'

// TODO the following was taken from Weacast's legend mixin, however maybe we should get this from a config file?
// Add knot unit not defined by default
math.createUnit('knot', { definition: '0.514444 m/s', aliases: ['knots', 'kt', 'kts'] })

let legendMixin = {
  data () {
    return {
      // We manage a "stack" of layers which can be displayed in the color legend, however only one
      // layer (the most recent activated layer, i.e. the "top" of the "stack") is displayed in the legend.
      // When another layer is activated (clicked in the Map interface) then it gets moved to the top of the stack
      // and displayed in the legend.
      colorLayers: [],
      // These are the properties for the KColorLegend component, which are calculated from the 'active' layer.
      // If there are no visible/active layers then we set "visible" to false to completely hide the color legend.
      colorLegend: {
        visible: false,
        unit: null,
        hint: null,
        steps: null
      }
    }
  },  
  methods: {
    // Handler for the 'map-create-leaflet-layer' event
    onColorLegendCreateLayer (event) {
      const forecastLayer = event.leafletLayer

      // We only manage forecast layers
      if (this.isForecastLayer(forecastLayer)) {

        let colorLayer = {
          id: forecastLayer._leaflet_id,
          layer: event.layer,
          forecastLayer: forecastLayer,
          available: false  // not available yet, becomes available only after the data has been loaded
        }

        // Callback to be triggered once the data for the forecastLayer has been loaded, the color legend can then be shown
        colorLayer.callback = () => this.addColorLegend(colorLayer)

        // We need to wait until data is here because it is require to get color map
        if (forecastLayer.hasData) this.addColorLegend(colorLayer)
        else forecastLayer.on('data', colorLayer.callback)
      }
    },
    // Handler for the 'map-show-leaflet-layer' event
    onColorLegendShowLayer (event) {
      const forecastLayer = event.leafletLayer

      // We only manage forecast layers
      if (this.isForecastLayer(forecastLayer)) {
        this.showColorLegend(forecastLayer)
      }
    },
    // Handler for the 'map-hide-leaflet-layer' event
    onColorLegendHideLayer (event) {
      const forecastLayer = event.leafletLayer

      // We only manage forecast layers
      if (this.isForecastLayer(forecastLayer)) {
        this.hideColorLegend(forecastLayer)
      }
    },
    addColorLegend (layer) {
      const forecastLayer = layer.forecastLayer
      forecastLayer.off('data', layer.callback)

      layer.available = true

      // Push it to the 'top' of the 'stack' to make it the active layer
      this.colorLayers.push(layer)

      this.updateColorLegend()
    },
    showColorLegend (forecastLayer) {
      let index = this.findColorLayer(forecastLayer)

      if (index >= 0) {
        let layer = this.colorLayers[index]
        layer.available = true

        // Move it to the 'top' of the 'stack' to make it the active layer
        this.colorLayers.splice(index, 1)
        this.colorLayers.push(layer)

        this.updateColorLegend()
      }
    },
    hideColorLegend (forecastLayer) {
      let index = this.findColorLayer(forecastLayer)

      if (index >= 0) {
        let layer = this.colorLayers[index]
        layer.available = false

        if (index === this.colorLayers.length - 1) {  // it was the last active legend
          // Move it to the 'bottom' of the 'stack' because it's not the active layer anymore
          this.colorLayers.splice(index, 1)
          this.colorLayers.unshift(layer)

          this.updateColorLegend()
        }
      }
    },
    findColorLayer (forecastLayer) {
      return this.colorLayers.findIndex((layer) => layer.id === forecastLayer._leaflet_id)
    },
    getCurrentColorLayer () {
        // The 'active' layer is always at the 'top' of the 'stack'
        return this.colorLayers[this.colorLayers.length - 1]
    },
    resetColorLegend () {
      this.colorLegend.visible = false
      this.colorLegend.unit = null
      this.colorLegend.hint = null
      this.colorLegend.steps = null
    },
    updateColorLegend () {
      // No available layers - reset & hide the color legend
      if (this.colorLayers.length === 0 || this.colorLayers[this.colorLayers.length - 1].available === false) {
        this.resetColorLegend()

      } else {

        const colorLayer = this.getCurrentColorLayer()
        const forecastLayer = colorLayer.forecastLayer

// TODO - forecastLayer.options.units is undefined for some reason - hardcoding the units for now
//const units = forecastLayer.options.units
const units = ['m/s', 'knot']   // TODO hardcoded

        const unit = !units || units.length === 0 ? null : units[0]
        const hint = this.getColorLegendHint(units, unit, colorLayer.layer.name)
        const steps = this.getColorLegendSteps(forecastLayer.getColorMap(), units, unit)

        // We don't have units or steps for this layer, hide it
        if (unit === null || steps.length === 0) {
          this.colorLegend.visible = false
          // hide it and possibly show another one
          this.hideColorLegend(forecastLayer)

        // Units and steps (re)calculated, update the color legend
        } else {
          this.colorLegend.unit = unit
          this.colorLegend.hint = hint
          this.colorLegend.steps = steps

          this.colorLegend.visible = true
        }
      }
    },
    // Color legend was clicked - toggle to the next unit
    onColorLegendClick (event) {
      const colorLayer = this.getCurrentColorLayer()
      const forecastLayer = colorLayer.forecastLayer

// TODO - forecastLayer.options.units is undefined for some reason - hardcoding the units for now
//const units = forecastLayer.options.units
const units = ['m/s', 'knot']   // TODO hardcoded

      // There's only one unit, no toggling to do, we're done
      if (units.length <= 1) {
        return
      }

      // Get next unit and recalculate hint and steps
      const nextUnit = this.getNextUnit(units, event.unit)
      const hint = this.getColorLegendHint(units, nextUnit, colorLayer.layer.name)
      const steps = this.getColorLegendSteps(forecastLayer.getColorMap(), units, nextUnit)

      // Units and steps (re)calculated, update the color legend
      this.colorLegend.unit = nextUnit
      this.colorLegend.hint = hint
      this.colorLegend.steps = steps
    },
    isForecastLayer (layer) {
      return layer instanceof L.weacast.ForecastLayer      
    },
    getColorLegendHint (units, unit, layerName) {
      if (!units || units.length <= 1 || !unit) {
        return null
      }

      // Determine hint by calling "this.getNextUnit"
      const nextUnit = this.getNextUnit(units, unit)
        
      return layerName + ': click to convert to ' + nextUnit
    },
    getColorLegendSteps (colorMap, units, unit) {
      if (!colorMap || colorMap.length === 0 || !units || units.length === 0 || !unit) return []

      const unitFrom = units[0]   // base unit
      const unitTo = unit

      return colorMap.map((entry) => {
        return {
          color: entry.color,
          value: math.unit(entry.value, unitFrom).toNumber(unitTo).toFixed(0)        
        }
      })
    },
    getNextUnit(units, currentUnit) {
      // No available units
      if (!units || units.length <= 1 || !currentUnit) return null

      // 'Rotate' from the current unit to the next
      const index = units.findIndex(unit => unit === currentUnit)
      const newIndex = index === -1 ? null : index === units.length-1 ? 0 : index+1 
      const unit = newIndex === null ? null : units[newIndex]

      return unit
    },
  },
  mounted () {
    this.colorLayers = []
    this.resetColorLegend()

    // Connect the events fired by mixin.base-map
    this.$on('map-create-leaflet-layer', this.onColorLegendCreateLayer)
    this.$on('map-show-leaflet-layer', this.onColorLegendShowLayer)
    this.$on('map-hide-leaflet-layer', this.onColorLegendHideLayer)
    // TODO necessary? we just ignore this and set this.colorLayers to null in "beforeDestroy"
    // this.$on('map-remove-leaflet-layer', this.onColorLegendRemoveLayer)
  },
  beforeDestroy () {
    // Delete references to the colorLayers
    this.colorLayers = null
    this.resetColorLegend()

    // Disconnect the events
    this.$off('map-create-leaflet-layer', this.onColorLegendCreateLayer)
    this.$off('map-show-leaflet-layer', this.onColorLegendShowLayer)
    this.$off('map-hide-leaflet-layer', this.onColorLegendHideLayer)
    // this.$off('map-remove-leaflet-layer', this.onColorLegendRemoveLayer)
  }  
}

export default legendMixin
