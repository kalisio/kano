<template>
  <div>
    <k-layers-panel :layers="layers" :layerHandlers="layerHandlers" :categories="layerCategories" />
    <forecastmodels-panel v-if="forecastModels.length > 0" :forecastModels="forecastModels" :forecastModelHandlers="forecastModelHandlers" :forecastModel="forecastModel" />
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
    layerCategories: {
      type: Array,
      default: () => []
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
      default: () => {}
    },
    forecastModel: {
      type: Object,
      default: () => {}
    }
  },
  async created () {
    this.$options.components['k-layers-panel'] = this.$load('KLayersPanel')
    this.$options.components['forecastmodels-panel'] = this.$load('ForecastModelsPanel')
  }
}
</script>

