<template>
  <div class="column justify-start no-wrap">
    <q-resize-observer @resize="onResized" />
    <q-splitter v-if="isSelectorVisible" v-model="splitterModel" :style="`height: ${height}px`">
      <template v-slot:before>
        <TimeSeriesSelector
         :menu="false"
        />
      </template>
      <template v-slot:after>
        <div class="fit column justify-start no-wrap">
          <KStackableTimeSeries
            ref="chartRef"
            class="col"
            :time-series="timeSeries"
            :chart-options="chartOptions"
            :actions="actions"
            @zoom-end="onZoomEnd"
          />
        </div>
      </template>
    </q-splitter>
    <div v-else class="col column justify-start no-wrap">
      <KStackableTimeSeries
        ref="chartRef"
        class="col"
        :time-series="timeSeries"
        :chart-options="chartOptions"
        :actions="actions"
        @zoom-end="onZoomEnd"
      />
    </div>
  </div>
</template>

<script setup>
import _ from 'lodash'
import { ref, computed, watch } from 'vue'
import { Store, composables as kCoreComposables } from '@kalisio/kdk/core.client'
import KStackableTimeSeries from '@kalisio/kdk/map/client/components/widget/KStackableTimeSeries.vue'
import TimeSeriesSelector from './TimeSeriesSelector.vue'
import { getChartOptions } from '../utils'

// Data
const chartRef = ref(null)
const chartOptions = ref(getChartOptions())
const splitterModel = ref(25)
const isZoomed = ref(false)
const height = ref(0)
const { CurrentActivityContext } = kCoreComposables.useCurrentActivity()
const { state } = CurrentActivityContext

// Computed
const hasSingleSerie = computed(() => {
  return state.timeSeries.length === 1
})
const hasPinnedSerie = computed(() => {
  return _.find(state.timeSeries, timeSerie => timeSerie.pinned)
})
const actions = computed(() => {
  return [{
    id: 'time-serie-logarithmic',
    icon: 'legend_toggle',
    tooltip: 'TimeSeries.LOGARITHMIC_SERIE_TOOLTIP',
    toggle: { icon: 'legend_toggle', tooltip: 'TimeSeries.LINEAR_SERIE_TOOLTIP' },
    toggled: ':timeSerie.logarithmic',
    size: 'sm',
    handler: onLogarithmicSerie
  }, {
    id: 'export-time-serie',
    icon: 'las la-file-download',
    tooltip: 'TimeSeries.EXPORT_SERIE_TOOLTIP',
    size: 'sm',
    handler: onExportData
  }, {
    id: 'pin-time-serie',
    icon: 'las la-thumbtack',
    tooltip: 'TimeSeries.PIN_SERIE_TOOLTIP',
    size: 'sm',
    visible: (timeSerie) => !hasSingleSerie.value && !hasPinnedSerie.value,
    handler: onPinSerie
  }, {
    id: 'unpin-time-serie',
    icon: 'las la-thumbtack',
    color: 'accent',
    tooltip: 'TimeSeries.UNPIN_SERIE_TOOLTIP',
    size: 'sm',
    visible: (timeSerie) => isPinned(timeSerie),
    handler: onPinSerie
  }]
})
const timeSeries = computed(() => state.timeSeries)
const isSelectorVisible = computed(() => {
  const visible = Store.get('layout.windows.top.gt.sm')
  return visible && !hasSingleSerie.value
})

// Watch change in time series drivers like time range, format, ...
watch(Store.get('time.range'), async () => {
  if (chartRef.value) {
    // Reset any zoom
    chartRef.value.resetZoom()
    isZoomed.value = true
  }
  // Update underlying data
  await fetchData()
  // Then graphics
  updateChart()
})
watch([Store.get('time.format'), Store.get('units.default')], () => {
  // Update graphics
  updateChart()
})

// Functions
async function fetchData () {
  if (!chartRef.value) return
  const promises = []
  _.forEach(timeSeries.value, timeSerie => {
    _.forEach(timeSerie.series, serie => {
      promises.push(serie.fetch())
    })
  })
  // Need to wait for data before updating
  await Promise.all(promises)
}
function updateChart () {
  if (!chartRef.value) return
  chartRef.value.requestUpdate()
}
function isPinned (timeSerie) {
  timeSerie = _.find(state.timeSeries, { id: timeSerie.id })
  return timeSerie && timeSerie.pinned
}
function pinTimeSerie (timeSerie) {
  // Pinning means showing an additional graph
  const invisibleTimeSerie = state.timeSeries.find(timeSerie => !timeSerie.visible)

  // Only one graph visible at a time if no pinning
  // Otherwise only one in addition to the pinned one
  // This is managed by pinning action that will hide once pinned
  _.forEach(state.timeSeries, timeSerie => {
    timeSerie.visible = (timeSerie.id === invisibleTimeSerie.id) || timeSerie.pinned
  })
}
function unpinTimeSerie (timeSerie) {
  // Unpinning means hiding the graph
  timeSerie.visible = false
}
function onPinSerie (timeSerie) {
  timeSerie = _.find(state.timeSeries, { id: timeSerie.id })
  if (timeSerie) {
    timeSerie.pinned = !timeSerie.pinned
    if (timeSerie.pinned) {
      pinTimeSerie(timeSerie)
      chartRef.value.zoomToData()
    } else {
      unpinTimeSerie(timeSerie)
      chartRef.value.resetZoom()
    }
  }
}
function onLogarithmicSerie (timeSerie) {
  timeSerie = _.find(state.timeSeries, { id: timeSerie.id })
  if (timeSerie) timeSerie.logarithmic = !timeSerie.logarithmic
}
function onExportData (timeSerie) {
  if (chartRef.value) chartRef.value.exportSeries(timeSerie)
}
function onZoomEnd ({ chart, start, end }) {
  isZoomed.value = true
}
function onRestoreZoom () {
  isZoomed.value = (chartRef.value ? chartRef.value.restorePreviousZoom() : false)
}
function onResized (size) {
  height.value = size.height
}

// Expose
defineExpose({
  isZoomed,
  onRestoreZoom
})
</script>
