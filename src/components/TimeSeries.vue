<template>
  <div ref="timeseries">
    <canvas ref="chart">
    </canvas>
  </div>
</template>

<script>

import _ from 'lodash'
import moment from 'moment'
import Chart from 'chart.js'
import { QIcon, QTooltip } from 'quasar'
import { utils as kMapUtils } from '@kalisio/kdk-map/client'

export default {
  name: 'time-series',
  components: {
    QIcon,
    QTooltip
  },
  props: {
    feature: { type: Object, default: () => null },
    variables: { type: Array, default: () => [] },
    decimationFactor: { type: Number, default: 1 }
  },
  watch: {
    feature: function () { this.setupGraph() },
    variables: function () { this.setupGraph() },
    decimationFactor: function () { this.setupGraph() }
  },
  methods: {
    formatDateTime (time) {
      return moment.utc(time).format('MM/DD HH:mm')
    },
    filter (value, index) {
      // We filter one value out of N according to decimation factor
      return (index % this.decimationFactor) === 0
    },
    setupTimeTicks() {
      const size = this.$el.getBoundingClientRect()
      if (!this.times || !size.width) return
      // Choose the right step size to ensure we have almost 100px between hour ticks
      // If the time interval is less than hour act as if we have only 1 time per hour
      const pixelsPerTick = this.$el.getBoundingClientRect().width / (this.times.length * Math.min(1, this.timeInterval))
      this.timeStepSize = Math.ceil(Math.max(1, Math.round(100 / pixelsPerTick)))
      // Round to nearest multiple of time interval in hours
      const interval = Math.max(1, Math.floor(this.timeInterval))
      this.timeStepSize = Math.ceil(this.timeStepSize / interval) * interval
      // We can update in place when possible
      if (this.chart) {
        let xAxis = _.find(this.config.options.scales.xAxes, axis => axis.type === 'time')
        if (xAxis && xAxis.time) {
          xAxis.time.stepSize = this.timeStepSize
          this.chart.update(this.config)
        }
      }
    },
    setupAvailableTimes () {
      this.times = []
      const time = this.feature.time || this.feature.forecastTime

      this.variables.forEach(variable => {
        if (time && time[variable.name]) this.times.push(time[variable.name])
      })
      // Make union of all available times for x-axis
      this.times = _.union(...this.times).map(time => moment.utc(time)).sort((a, b) => a - b).filter(this.filter)
      // Compute min time interval
      this.timeInterval = 1 // 1h by default
      if (this.times.length > 1) {
        // Convert to hours
        this.timeInterval = kMapUtils.getTimeInterval(this.times) / (3600 * 1000)
      }
    },
    setupAvailableDatasets () {
      this.datasets = []
      const color = Chart.helpers.color
      const time = this.feature.time || this.feature.forecastTime
      const properties = this.feature.properties
      
      this.variables.forEach(variable => {
        const unit = variable.units[0]
        const label = this.$t(variable.label) || variable.label
        // Variable available for feature ?
        if (properties[variable.name]) {
          this.datasets.push(Object.assign({
            label: `${label} (${unit})`,
            data: properties[variable.name].map((value, index) => ({ x: new Date(time[variable.name][index]), y: value })).filter(this.filter),
            yAxisID: unit
          }, variable.chartjs))
        }
      })
    },
    setupAvailableYAxes () {
      this.yAxes = []
      const properties = this.feature.properties
      let isLeft = true

      this.variables.forEach(variable => {
        const unit = variable.units[0]
        // Variable available for feature ?
        // Check also if axis already created
        if (properties[variable.name] && !_.find(this.yAxes, axis => axis.id === unit)) {
          this.yAxes.push({
            id: unit,
            position: isLeft ? 'left' : 'right',
            scaleLabel: {
              display: true,
              labelString: unit
            }
          })
          // Alternate axes
          isLeft = !isLeft
        }
      })
    },
    toggleVariable (variableItem) {
      const dataset = this.datasets[variableItem.datasetIndex]
      let metadata = this.chart.getDatasetMeta(variableItem.datasetIndex)
      const variable = this.variables[variableItem.datasetIndex]
      // Check if there is others variables using the same unit axis
      let datasetsWithYAxis = []
      this.datasets.forEach((otherDataset, index) => {
        if ((dataset.label !== otherDataset.label) &&
            (dataset.yAxisID === otherDataset.yAxisID)) {
          datasetsWithYAxis.push(index)
        }
      })

      if (_.isNil(metadata.hidden)) {
        metadata.hidden = !this.chart.data.datasets[variableItem.datasetIndex].hidden
      } else {
        metadata.hidden = null
      }

      // Check if there is another variable using the same unit axis
      let yAxis = _.find(this.config.options.scales.yAxes, axis => axis.id === dataset.yAxisID) 
      if (metadata.hidden) {
        let hideYAxis = true
        datasetsWithYAxis.forEach(otherDataset => {
          let otherMetadata = this.chart.getDatasetMeta(otherDataset)
          if (!otherMetadata.hidden) hideYAxis = false
        })
        if (hideYAxis) yAxis.display = false
      } else {
        let showYAxis = true
        datasetsWithYAxis.forEach(otherDataset => {
          let otherMetadata = this.chart.getDatasetMeta(otherDataset)
          if (!otherMetadata.hidden) showYAxis = false
        })
        if (showYAxis) yAxis.display = true
      }

      this.chart.update(this.config)
    },
    setupGraph () {
      if (!this.feature) return
      // Destroy previous graph if any
      if (this.chart) {
        this.chart.destroy()
        this.chart = null
      }
      
      this.setupAvailableTimes()
      this.setupTimeTicks()
      this.setupAvailableDatasets()
      this.setupAvailableYAxes()

      this.config = {
        type: 'line',
        data: {
          labels: this.times,
          datasets: this.datasets
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
                stepSize: this.timeStepSize,
                displayFormats: {
                  hour: 'MM/DD HH:mm'
                },
                tooltipFormat: 'MM/DD HH:mm',
                parser: (date) => moment(typeof date === 'number' ? date : date.toISOString())
              },
              scaleLabel: {
                display: false,
                labelString: 'Date'
              }
            }],
            yAxes: this.yAxes
          },
          legend: {
            onClick: (event, legendItem) => this.toggleVariable(legendItem)
          }
        }
      }
      this.chart = new Chart(this.$refs.chart.getContext('2d'), this.config)
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
