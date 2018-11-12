<template>
  <div>
    <forecastmodels-panel :forecastModels="forecastModels" />
    <k-layers-panel :layers="layers" :types="layerTypes" />
  </div>
</template>

<script>

export default {
  name: 'map-panel',
  props: {
    layers: {
      type: Object,
      default: () => {}
    },
    forecastModels: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      layerTypes: []
    }
  },
  async created () {
    this.$options.components['k-layers-panel'] = this.$load('KLayersPanel')
    this.$options.components['forecastmodels-panel'] = this.$load('ForecastModelsPanel')
  },
  async mounted () {
    // Load the layer types
    this.layerTypes = this.$config('mapPanel.layerTypes')
  }
}
</script>

