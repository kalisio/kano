<template>
  <k-layers-panel :layers="layers" :layerHandlers="layerHandlers" :categories="layerCategories" >
      <q-collapsible slot="panel-footer" v-if="forecastModels.length > 0" icon="fa-globe" :label="$t('ForecastModelsPanel.LABEL')">
        <k-forecast-models-selector :forecastModels="forecastModels" :forecastModelHandlers="forecastModelHandlers" :forecastModel="forecastModel" />
      </q-collapsible>
  </k-layers-panel>
</template>

<script>
import { QCollapsible } from 'quasar'

export default {
  name: 'map-panel',
  components: {
    QCollapsible
  },
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
    this.$options.components['k-forecast-models-selector'] = this.$load('KForecastModelsSelector')
  }
}
</script>

