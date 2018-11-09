<template>
  <div>
    <k-layers-panel :layers="layers" :types="layerTypes" />
  </div>
</template>

<script>

export default {
  name: 'globe-panel',
  data () {
    return {
      layers: [],
      layerTypes: []
    }
  },
  async created () {
    // Load the require components
    this.$options.components['k-layers-panel'] = this.$load('KLayersPanel')
  },
  async mounted () {
    // Load the layers
    const layersService = this.$api.getService('layers')
    let response = await layersService.find()
    this.layers = response.data
    // Load the layer types
    this.layerTypes = this.$config('globePanel.layerTypes')
  }
}
</script>

