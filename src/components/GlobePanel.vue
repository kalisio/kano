<template>
  <div>
    <k-layers-panel :layers="layers" :types="layerTypes" />
  </div>
</template>

<script>

export default {
  name: 'globe-panel',
  props: {
    layers: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      layerTypes: []
    }
  },
  async created () {
    // Load the require components
    this.$options.components['k-layers-panel'] = this.$load('KLayersPanel')
  },
  async mounted () {
    // Load the layer types
    this.layerTypes = this.$config('globePanel.layerTypes')
  }
}
</script>

