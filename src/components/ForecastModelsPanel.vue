<template>
  <q-collapsible icon="language" :label="$t('ForecastModelsPanel.LABEL')">
    <div class="row">
      <template v-for="model in forecastModels">
        <q-btn :id ="model.name" :key="model.name" flat round>
          <img src="https://s3.eu-central-1.amazonaws.com/kalisioscope/collections/sjjb/accommodation_chalet2.n.24.png" />
          <q-tooltip>
            {{model.name}}
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
  props: {
    forecastModels: {
      type: Array,
      default: () => []
    }
  }
}
</script>

