<template>
  <div v-if="count > 0">
    <KMenu v-if="menu"
      icon="las la-bars" id="time-series-selector"
      :content="actions"
      action-renderer="item"
      :dense="dense"
      :badge="{ color: 'accent', label: count }"
    />
    <KPanel v-else
      id="time-series-selector"
      :content="actions"
      action-renderer="item"
      :dense="dense"
      direction="vertical"
    />
  </div>
</template>

<script setup>
import _ from 'lodash'
import { computed } from 'vue'
import { Store, composables as kCoreComposables } from '@kalisio/kdk/core.client'

// Props
defineProps({
  dense: {
    type: Boolean,
    default: false
  },
  menu: {
    type: Boolean,
    default: true
  }
})

// Data
const { CurrentActivityContext } = kCoreComposables.useCurrentActivity()
const { state } = CurrentActivityContext

// Computed
const actions = computed(() => {
  const timeSeries = []
  for (let i = 0; i < state.timeSeries.length; i++) {
    const timeSerie = state.timeSeries[i]
    // When using list display all available timeseries like tabs
    // When using menu only those that are not yet visible
    if (Store.get('layout.windows.top.gt.sm') || !timeSerie.visible) {
      timeSeries.push(timeSerie)
    }
  }
  return timeSeries.map(timeSerie => ({
    id: timeSerie.id,
    label: timeSerie.label,
    color: timeSerie.visible ? 'primary' : 'grey-9',
    handler: () => showTimeSerie(timeSerie.id)
  }))
})
const count = computed(() => {
  return actions.value.length
})

// Functions
function showTimeSerie (id) {
  // Only one graph visible at a time if no pinning
  // Otherwise only one in addition to the pinned one
  // This is managed by pinning action that will hide once pinned
  _.forEach(state.timeSeries, timeSerie => {
    timeSerie.visible = (timeSerie.id === id) || timeSerie.pinned
  })
}
</script>
