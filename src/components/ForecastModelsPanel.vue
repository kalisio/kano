<template>
  <q-collapsible icon="fa-globe" :label="$t('ForecastModelsPanel.LABEL')">
    <div class="row justify-center">
      <q-list dense no-border>
        <template v-for="model in forecastModels">
          <q-item :id="model.name" :key="model.name" inset-separator link @click="onModelClicked(model)">
          <q-item-side v-if="!model.iconUrl" :icon="model.icon || 'fa-globe'" left>
          </q-item-side>
          <q-item-side v-else :avatar="model.iconUrl" left>
          </q-item-side>
          <q-item-main :label="model.label" :sublabel="model.description" :tag="model.name === selected.name ? 'b' : 'i'"></q-item-main>
          <q-item-side right>
          </q-item-side>
        </q-item>
        </template>
      </q-list>
    </div>
  </q-collapsible>
</template>

<script>
import _ from 'lodash'
import { QCollapsible, QBtn, QIcon, QTooltip, QList, QItem, QItemSide, QItemTile, QItemMain } from 'quasar'

export default {
  name: 'forecast-models-panel',
  components: {
    QCollapsible,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSide,
    QItemTile,
    QItemMain,
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
      default: () => {}
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

