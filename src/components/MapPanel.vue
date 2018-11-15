<template>
  <div>
    <forecastmodels-panel :forecastModels="forecastModels" :forecastModelHandlers="forecastModelHandlers" :forecastModel="forecastModel" />
    <k-layers-panel :layers="layers" :layerHandlers="layerHandlers" :categories="layerCategories" />
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
    layerHandlers: {
      type: Object,
      default: () => {}
    },
    forecastModels: {
      type: Array,
      default: () => []
    },
    forecastModelHandlers: {
      type: Object,
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

