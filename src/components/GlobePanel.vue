<template>
  <div>
    <k-layers-panel :layers="layers" :layerHandlers="layerHandlers" :categories="layerCategories" />
  </div>
</template>

<script>

export default {
  name: 'globe-panel',
  props: {
    layers: {
      type: Object,
      default: () => {}
    },
    layerHandlers: {
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
    // Load the require components
    this.$options.components['k-layers-panel'] = this.$load('KLayersPanel')
  },
  async mounted () {
    // Load the layer types
    this.layerCategories = this.$config('globePanel.categories')
  }
}
</script>

