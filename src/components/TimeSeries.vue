<template>
  <!-- root node required -->
  <div ref="timeseries">
    <q-resize-observable @resize="onResized" />
    <q-collapsible opened icon="list" :label="$t('TimeSeries.GRAPH', { location })">
      <!--canvas ref="chart" :width="chartWidth" :height="chartHeight"></canvas-->
      <canvas ref="chart"></canvas>
    </q-collapsible>
    <q-collapsible icon="list" :label="$t('TimeSeries.WIND')">
      <div class="text-center" v-if="feature">
        <span v-for="(direction, i) in feature.properties.windDirection">
            <span style="font-size: 0.5em;">
              <span class="vertical-text">{{ formatDateTime(feature.forecastTime.windDirection[i]) }}</span>
            </span>
            <span style="font-size: 1.5em;">
              <q-icon name="arrow_downward" :style="`transform: rotateZ(${direction}deg);`"></q-icon>
              <q-tooltip anchor="bottom middle" self="top middle">{{ feature.properties.windDirection[i].toFixed(2) }}°</q-tooltip>
            </span>
        </span>
      </div>
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
    feature: { type: Object, default: () => null }
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
      const forecastTime = this.feature.forecastTime
      if (forecastTime.gust) times.push(forecastTime.gust)
      if (forecastTime.windSpeed) times.push(forecastTime.windSpeed)
      if (forecastTime.precipitations) times.push(forecastTime.precipitations)
      // Make union of all available times for x-axis
      return _.union(...times).map(time => moment.utc(time)).sort((a, b) => a - b).filter(this.filter)
    },
    setupAvailableDatasets () {
      let datasets = []
      const color = Chart.helpers.color
      const forecastTime = this.feature.forecastTime
      const properties = this.feature.properties
      if (properties.gust) {
        datasets.push({
          label: this.$t('TimeSeries.WIND_GUST'),
          backgroundColor: color('rgb(255, 99, 132)').alpha(0.5).rgbString(),
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          data: properties.gust.map((value, index) => ({ x: new Date(forecastTime.gust[index]), y: value })).filter(this.filter),
          yAxisID: 'speed'
        })
      }
      if (properties.windSpeed) {
        datasets.push({
          label: this.$t('TimeSeries.WIND_SPEED'),
          backgroundColor: color('rgb(255, 159, 64)').alpha(0.5).rgbString(),
          borderColor: 'rgb(255, 159, 64)',
          fill: false,
          data: properties.windSpeed.map((value, index) => ({ x: new Date(forecastTime.windSpeed[index]), y: value })).filter(this.filter),
          yAxisID: 'speed'
        })
      }
      if (properties.precipitations) {
        datasets.push({
          label: this.$t('TimeSeries.PRECIPITATIONS'),
          backgroundColor: color('rgb(54, 162, 235)').alpha(0.5).rgbString(),
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          data: properties.precipitations.map((value, index) => ({ x: new Date(forecastTime.precipitations[index]), y: value })).filter(this.filter),
          yAxisID: 'precipitations'
        })
      }
      return datasets
    },
    setupAvailableYAxes () {
      let yAxes = []
      const properties = this.feature.properties
      if (properties.gust || properties.windSpeed) {
        yAxes.push({
          id: 'speed',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'm/s'
          }
        })
      }
      if (properties.precipitations) {
        yAxes.push({
          id: 'precipitations',
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: 'mm (last 3h)'
          }
        })
      }
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
