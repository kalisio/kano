<template>
  <div>
    <forecastmodels-panel :forecastModels="forecastModels" :forecastModel="forecastModel" />
    <k-layers-panel :layers="layers" :categories="layerCategories" />
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
    },
    forecastModel: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      layerCategories: []
    }
  },
  async created () {
    this.$options.components['k-layers-panel'] = this.$load('KLayersPanel')
    this.$options.components['forecastmodels-panel'] = this.$load('ForecastModelsPanel')
  },
  async mounted () {
    // Load the layer types
    this.layerCategories = this.$config('mapPanel.categories')
  }
}
</script>

