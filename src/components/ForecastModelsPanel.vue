<template>
  <q-collapsible icon="language" :label="$t('ForecastModelsPanel.LABEL')">
    <div class="row justify-around">
      <template v-for="model in forecastModels">
        <q-btn :id="model.name" :key="model.name" @click="model.handler(model)" :flat="model.name !== selected.name" :outline="model.name === selected.name" round>
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
    forecastModel: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    forecastModel: function (model) {
      this.selected = model
      console.log(this.selected)
    }
  }
}
</script>

