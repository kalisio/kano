<template>
  <!-- root node required -->
  <div ref="timeseries">
    <q-resize-observable @resize="onResized" />
    <q-collapsible opened icon="list" :label="$t('TimeSeries.GRAPH', { location })">
      <!--canvas ref="chart" :width="chartWidth" :height="chartHeight"></canvas-->
      <canvas ref="chart"></canvas>
    </q-collapsible>
  </div>
</template>

<script>

import _ from 'lodash'
import moment from 'moment'
import Chart from 'chart.js'
import { QCollapsible, QIcon, QTooltip, QResizeObservable } from 'quasar'

export default {
  name: 'time-series',
  components: {
    QCollapsible,
    QIcon,
    QTooltip,
    QResizeObservable
  },
  props: {
    interval: { type: Number, default: 1 },
    stepSize: { type: Number, default: 1 },
    feature: { type: Object, default: () => null },
    variables: { type: Array, default: () => [] }
  },
  data () {
    return {
      chartWidth: 300,
      chartHeight: 300
    }
  },
  watch: {
    feature: function (feature) {
      this.setupGraph()
    }
  },
  computed: {
    location: function () {
      return (this.feature
        ? this.feature.geometry.coordinates[0].toFixed(2) + '°, ' + this.feature.geometry.coordinates[1].toFixed(2) + '°'
        : '')
    }
  },
  methods: {
    formatDateTime (time) {
      return moment.utc(time).format('MM/DD HH:mm')
    },
    filter (value, index) {
      // We filter one value out of N according to step size
      return (index % (this.stepSize / this.interval)) === 0
    },
    setupAvailableTimes () {
      let times = []
      const time = this.feature.time || this.feature.forecastTime

      this.variables.forEach(variable => {
        if (time && time[variable.name]) times.push(time[variable.name])
      })
      // Make union of all available times for x-axis
      return _.union(...times).map(time => moment.utc(time)).sort((a, b) => a - b).filter(this.filter)
    },
    setupAvailableDatasets () {
      let datasets = []
      const color = Chart.helpers.color
      const time = this.feature.time || this.feature.forecastTime
      const properties = this.feature.properties
      
      this.variables.forEach(variable => {
        // Variable available for feature ?
        if (properties[variable.name]) {
          datasets.push(Object.assign({
            label: this.$t(variable.label) || variable.label,
            data: properties[variable.name].map((value, index) => ({ x: new Date(time[variable.name][index]), y: value })).filter(this.filter),
            yAxisID: variable.units[0]
          }, variable.chartjs))
        }
      })
      
      return datasets
    },
    setupAvailableYAxes () {
      let yAxes = []
      const properties = this.feature.properties
      let isLeft = true

      this.variables.forEach(variable => {
        // Variable available for feature ?
        // Check also if axis already created
        if (properties[variable.name] && !_.find(yAxes, axis => axis.id === variable.units[0])) {
          yAxes.push({
            id: variable.units[0],
            position: isLeft ? 'left' : 'right',
            scaleLabel: {
              display: true,
              labelString: variable.units[0]
            }
          })
          // Alternate axes
          isLeft = !isLeft
        }
      })

      return yAxes
    },
    setupGraph () {
      if (!this.feature) return
      // Destroy previous graph if any
      if (this.chart) this.chart.destroy()
      
      const config = {
        type: 'line',
        data: {
          labels: this.setupAvailableTimes(),
          datasets: this.setupAvailableDatasets()
        },
        options: {
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toFixed(2)
              }
            }
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'hour',
                stepSize: this.stepSize,
                displayFormats: {
                  hour: 'MM/DD HH:mm'
                },
                tooltipFormat: 'MM/DD HH:mm',
                parser: (date) => moment.utc(typeof date === 'number' ? date : date.toISOString())
              },
              scaleLabel: {
                display: false,
                labelString: 'Date'
              }
            }],
            yAxes: this.setupAvailableYAxes()
          }
        }
      }
      this.chart = new Chart(this.$refs.chart.getContext('2d'), config)
    },
    onResized (size) {
      if (this.$refs.chart) {
        this.chartWidth = size.width
        this.chartHeight = size.height * 0.7
      }
    }
  }
}
</script>

<style>
.vertical-text {
    writing-mode: vertical-rl;
    transform: rotate(-120deg);
    transform-origin: 150% 110%;
}
</style>
