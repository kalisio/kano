<template>
  <q-collapsible icon="language" :label="$t('ForecastModelsPanel.LABEL')">
    <div class="row justify-around">
      <template v-for="model in forecastModels">
        <q-btn :id="model.name" :key="model.name" @click="onModelClicked(model)" :flat="model.name !== selected.name" :outline="model.name === selected.name" round>
          <img :src="model.iconUrl" width="32" height="32" />
          <q-tooltip>
            {{model.label}}
          </q-tooltip>
        </q-btn>
      </template>
    </div>
  </q-collapsible>
</template>

<script>
import _ from 'lodash'
import { QCollapsible, QBtn, QIcon, QTooltip } from 'quasar'

export default {
  name: 'forecast-models-panel',
  components: {
    QCollapsible,
    QBtn,
    QIcon,
    QTooltip
  },
  data () {
    return {
      selected: {}
    }
  },
  props: {
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
  watch: {
    forecastModel: function (model) {
      this.selected = model
    }
  },
  methods: {
    callHandler(action, layer) {
      if (this.forecastModelHandlers[action]) this.forecastModelHandlers[action](layer)
    },
    onModelClicked (model) {
      this.callHandler('toggle', model)
    }
  },
  created () {
    this.selected = this.forecastModel
  }
}
</script>

