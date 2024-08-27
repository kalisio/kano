<template>
  <KPanel
    id="time-series-toolbar"
    :content="content"
    :context="context"
  />
</template>

<script setup>
import { computed, inject } from 'vue'
import { Store, composables as kCoreComposables } from '@kalisio/kdk/core.client'

const { state } = kCoreComposables.useCurrentActivity()

// Props
const props = defineProps({
  context: {
    type: Object,
    default: () => null
  }
})

// Data
const widget = inject('widget')

// Computed
const context = computed(() => {
  return props.context
})
const hasSingleSerie = computed(() => {
  return state.timeSeries.length === 1
})
const content = computed(() => {
  if (!widget.value) return []
  return [{
    id: 'time-series-selector',
    component: 'TimeSeriesSelector',
    visible: () => !hasSingleSerie.value && Store.get('layout.windows.top.lt.md')
  }, {
    id: 'restore-time-series-zoom',
    icon: 'las la-undo',
    tooltip: 'TimeSeries.RESTORE_ZOOM',
    visible: widget.value.isZoomed,
    handler: () => widget.value.onRestoreZoom()
  }, {
    id: 'absolute-time-range',
    component: 'time/KAbsoluteTimeRange'
  }, {
    id: 'relative-time-ranges',
    component: 'menu/KMenu',
    icon: 'las la-history',
    content: [{
      component: 'time/KRelativeTimeRanges',
      ranges: ['last-hour', 'last-2-hours', 'last-3-hours', 'last-6-hours',
        'last-12-hours', 'last-day', 'last-2-days', 'last-3-days', 'last-week',
        'next-12-hours', 'next-day', 'next-2-days', 'next-3-days']
    }]
  }]
  /* TODO: actions previously available on KTimeSeries
  {
    id: 'run-options',
    component: 'input/KOptionsChooser',
    icon: 'las la-clock',
    tooltip: 'TimeSeries.RUN',
    visible: 'hasRunTimes',
    hideSelected: false,
    options: ':runOptions',
    on: { event: 'option-chosen', listener: 'onUpdateRun' }
  }, {
    id: 'center-view',
    icon: 'las la-eye',
    tooltip: 'TimeSeries.CENTER_ON',
    visible: 'probedVariables',
    handler: 'onCenterOn'
  }
  */
})
</script>
