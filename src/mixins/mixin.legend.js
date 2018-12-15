import math from 'mathjs'
import L from 'leaflet'

// TODO the following was taken from Weacast's legend mixin, however maybe we should get this from a config file?
// Add knot unit not defined by default
math.createUnit('knot', { definition: '0.514444 m/s', aliases: ['knots', 'kt', 'kts'] })

const COLOR_STEPS = 10

let legendMixin = {
  data () {
    return {
      colorLayer: null,
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
    onColorLegendShowLayer (event) {
      // We only manage forecast layers
      if (this.isForecastLayer(event.leafletLayer)) {

        const forecastLayer = event.leafletLayer

        let colorLayer = {
          layer: event.layer,
          forecastLayer
        }

        // Callback to be triggered once the data for the forecastLayer has been loaded, the color legend can then be shown
        colorLayer.callback = () => this.addColorLegend(colorLayer)

        // We need to wait until data is here because it is require to get color map
        if (forecastLayer.hasData) this.addColorLegend(colorLayer)
        else forecastLayer.on('data', colorLayer.callback)
      }
    },
    onColorLegendHideLayer (event) {
      const forecastLayer = event.leafletLayer

      // We only manage forecast layers
      if (this.isForecastLayer(forecastLayer)) {
        this.hideColorLegend()
      }
    },
    addColorLegend (layer) {
      const forecastLayer = layer.forecastLayer
      forecastLayer.off('data', layer.callback)

      this.updateColorLegend(layer)
    },
    hideColorLegend () {
      this.updateColorLegend(null)
    },
    resetColorLegend () {
      this.colorLegend.visible = false
      this.colorLegend.unit = null
      this.colorLegend.hint = null
      this.colorLegend.steps = null
    },
    updateColorLegend (colorLayer) {
      this.colorLayer = colorLayer

      // Reset & hide the color legend
      if (!this.colorLayer) {
        this.resetColorLegend()

      } else {
        const forecastLayer = colorLayer.forecastLayer
        const colorMap = forecastLayer.getColorMap(COLOR_STEPS)        

        const units = this.getColorLegendUnits(colorLayer)  //const units = ['m/s', 'knot']   // TODO only for testing

        const unit = !units || units.length === 0 ? null : units[0]
        const hint = this.getColorLegendHint(units, unit, colorLayer.layer.name)
        const steps = this.getColorLegendSteps(colorMap, units, unit)

        // We don't have units or steps for this layer, hide it
        if (unit === null || steps.length === 0) {
          this.hideColorLegend()

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
      const colorLayer = this.colorLayer
      const forecastLayer = colorLayer.forecastLayer

      const units = this.getColorLegendUnits(colorLayer)  //const units = ['m/s', 'knot']   // TODO only for testing

      // There's only one unit, no toggling to do, we're done
      if (units.length <= 1) {
        return
      }

      const colorMap = forecastLayer.getColorMap(COLOR_STEPS)

      // Get next unit and recalculate hint and steps
      const nextUnit = this.getNextUnit(units, event.unit)
      const hint = this.getColorLegendHint(units, nextUnit, colorLayer.layer.name)
      const steps = this.getColorLegendSteps(colorMap, units, nextUnit)

      // Units and steps (re)calculated, update the color legend
      this.colorLegend.unit = nextUnit
      this.colorLegend.hint = hint
      this.colorLegend.steps = steps
    },
    isForecastLayer (layer) {
      return layer instanceof L.weacast.ForecastLayer      
    },
    getColorLegendUnits(colorLayer) {
      return colorLayer.layer.variables[0].units
    },
    getColorLegendHint (units, unit, layerName) {
      if (!units || units.length <= 1 || !unit) {
        return null
      }

      // Determine hint by calling "this.getNextUnit"
      const nextUnit = this.getNextUnit(units, unit)

      return this.$t('ColorLegend.CONVERT_UNITS', {layer: layerName, unit: nextUnit})
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
    this.colorLayer = null
    this.resetColorLegend()

    // Connect the events fired by mixin.base-map
    this.$on('leaflet-layer-added', this.onColorLegendShowLayer)
    this.$on('leaflet-layer-shown', this.onColorLegendShowLayer)
    this.$on('leaflet-layer-hidden', this.onColorLegendHideLayer)
    // TODO necessary? we just ignore this and set this.colorLayer to null in "beforeDestroy"
    // this.$on('map-remove-leaflet-layer', this.onColorLegendRemoveLayer)
  },
  beforeDestroy () {
    // Delete reference to the colorLayer
    this.colorLayer = null
    this.resetColorLegend()

    // Disconnect the events
    this.$off('leaflet-layer-added', this.onColorLegendShowLayer)
    this.$off('leaflet-layer-shown', this.onColorLegendShowLayer)
    this.$off('leaflet-layer-hidden', this.onColorLegendHideLayer)
    // this.$off('map-remove-leaflet-layer', this.onColorLegendRemoveLayer)
  }  
}

export default legendMixin
