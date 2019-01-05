import math from 'mathjs'
import Vue from 'vue'

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
        colorMap: null,
        colors: null,
        values: null,
        unitValues: null,
        showGradient: false
      }
    }
  },
  methods: {
    onColorLegendShowLayer (event) {
      // In case the color legend was already visible then make sure it's first reset & hidden, and call
      // Vue.nextTick() to let Vue know about it and update its DOM, before we (re)display it for the new layer

      this.updateColorLegend(null)

      Vue.nextTick(() => {
        const leafletLayer = event.leafletLayer

        let colorLayer = {
          layer: event.layer,
          leafletLayer
        }

        // Callback to be triggered once the data for the leafletLayer has been loaded, the color legend can then be shown
        colorLayer.callback = () => this.addColorLegend(colorLayer)

        // We need to wait until data is here because it is require to get color map
        if (leafletLayer.hasData) this.addColorLegend(colorLayer)
        else leafletLayer.on('data', colorLayer.callback)
      })
    },
    onColorLegendHideLayer (event) {
      if (this.colorLayer && this.colorLayer.leafletLayer._leaflet_id === event.leafletLayer._leaflet_id) {
        this.hideColorLegend()
      }
    },
    addColorLegend (layer) {
      const leafletLayer = layer.leafletLayer
      leafletLayer.off('data', layer.callback)

      if (leafletLayer.colorMap) {
        this.updateColorLegend(layer)
      }
    },
    hideColorLegend () {
      this.updateColorLegend(null)
    },
    setColorLegend(visible, unit, hint, colorMap, colors, values, unitValues, showGradient) {
      this.colorLegend.visible = visible
      this.colorLegend.unit = unit
      this.colorLegend.hint = hint
      this.colorLegend.colorMap = colorMap
      this.colorLegend.colors = colors
      this.colorLegend.values = values
      this.colorLegend.unitValues = unitValues
      this.colorLegend.showGradient = showGradient
    },
    resetColorLegend () {
      this.setColorLegend(false, null, null, null, null, null, null, false)
    },
    updateColorLegend (colorLayer) {
      this.colorLayer = colorLayer

      // Reset & hide the color legend
      if (!this.colorLayer) {
        this.resetColorLegend()

      } else {
        const leafletLayer = colorLayer.leafletLayer
        const colorMap = leafletLayer.colorMap
        const units = this.getColorLegendUnits(colorLayer)

        const unit = !units || units.length === 0 ? null : units[0]
        const hint = this.getColorLegendHint(units, unit, colorLayer.layer.name)
        const [ showGradient, colors, values, unitValues ] =
          this.getColorLegendValues(colorMap, leafletLayer.options.scale, units, unit, COLOR_STEPS)

        // We don't have units or steps for this layer, hide it
        if (unit === null || values.length === 0) {
          this.hideColorLegend()

        // Units and steps (re)calculated, update the color legend
        } else {
          this.setColorLegend(true, unit, hint, colorMap, colors, values, unitValues, showGradient)
        }
      }
    },
    // Color legend was clicked - toggle to the next unit
    onColorLegendClick (event) {
      const colorLayer = this.colorLayer
      const leafletLayer = colorLayer.leafletLayer
      const colorMap = leafletLayer.colorMap

      const units = this.getColorLegendUnits(colorLayer)

      // There's only one unit, no toggling to do, we're done
      if (units.length <= 1) {
        return
      }

      // Get next unit and recalculate hint and steps
      const nextUnit = this.getNextUnit(units, event.unit)
      const hint = this.getColorLegendHint(units, nextUnit, colorLayer.layer.name)
      const [ showGradient, colors, values, unitValues ] =
        this.getColorLegendValues(colorMap, leafletLayer.options.scale, units, nextUnit, COLOR_STEPS)

      // Units and steps (re)calculated, update the color legend
      this.setColorLegend(true, nextUnit, hint, colorMap, colors, values, unitValues, showGradient)
    },
    getColorLegendUnits (colorLayer) {
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
    getColorLegendValues (colorMap, scale, units, unit, steps) {
      if (!colorMap || !units || units.length === 0 || !unit) return []

      let showGradient
      let colors
      let values
      let unitValues

      const unitFrom = units[0]   // base unit
      const unitTo = unit

      function valueMap (value) {
        let unitValue = math.unit(value, unitFrom).toNumber(unitTo)

        return Math.round(unitValue, 0).toFixed(0)
      }
      
      const classes = colorMap.classes()

      // Some tricky logic below:
      //
      // - Depending on whether we have one unit or more than one unit, we perform a unit conversion (or not)
      // - Depending on whether we have 'classes' (predefined values) or not, we display a color 'gradient' or color 'steps'
      // - Depending on whether the Chroma scale is specified as an array of colors, we pass these as "the" colors to
      //   display; otherwise, we'll depend on calling "colorMap(value)" (chroma.js) to determine the colors

      if (classes) {
        showGradient = false
        values = classes

        // Special case: if we have classes, AND the scale is specified as an array of colors, then we take these
        // as THE "colors" to be displayed by the color legend, so we then bypass "colorMap(value)" for getting the color
        if (scale && Array.isArray(scale)) {
          colors = scale
        }

        // Only one unit, we don't need to convert, return the class values as-is
        if (units.length === 1) {
          unitValues = values
        } else {
          unitValues = values.map(valueMap)
        }

      } else {
        showGradient = true
        values = []

        const dm = colorMap.domain()[0]
        const dd = colorMap.domain()[1] - dm

        for (let i = 0; i < steps; i++) {
          const value = dm + i / (steps - 1) * dd
          values.push(value)
        }

        unitValues = values.map(valueMap)
      }

      return [ showGradient, colors, values, unitValues ]
    },
    getNextUnit (units, currentUnit) {
      // No available units
      if (!units || units.length <= 1 || !currentUnit) return null

      // 'Rotate' from the current unit to the next
      const index = units.findIndex(unit => unit === currentUnit)
      const newIndex = index === -1 ? null : index === units.length - 1 ? 0 : index + 1
      const unit = newIndex === null ? null : units[newIndex]

      return unit
    }
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
