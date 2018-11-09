<template>
  <div>
    <k-layers-panel :layers="layers" :types="layerTypes" />
    <forecastmodels-panel :forecastModels="forecastModels" />
  </div>
</template>

<script>

export default {
  name: 'map-panel',
  props: {
    forecastModels: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      layers: [],
      layerTypes: []
    }
  },
  async created () {
    this.$options.components['k-layers-panel'] = this.$load('KLayersPanel')
    this.$options.components['forecastmodels-panel'] = this.$load('ForecastModelsPanel')
  },
  async mounted () {
    // Load the layers
    const layersService = this.$api.getService('layers')
    let response = await layersService.find()
    this.layers = response.data
    // Load the layer types
    this.layerTypes = this.$config('mapPanel.layerTypes')
  }
}
</script>

