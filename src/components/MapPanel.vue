<template>
  <div>
    <k-layers-panel v-if="layers.length > 0" :layers="layers" :types="layerTypes" />
  </div>
</template>

<script>

export default {
  name: 'map-panel',
  data () {
    return {
      layers: [],
      layerTypes: []
    }
  },
  async created () {
    // Load the layers
    const layersService = this.$api.getService('layers')
    let response = await layersService.find()
    this.layers = response.data
    console.log(this.layers)
    // Load the layer types
    this.layerTypes = this.$config('mapPanel.layerTypes')
    // Load the require components
    this.$options.components['k-layers-panel'] = this.$load('KLayersPanel')
  }
}
</script>

