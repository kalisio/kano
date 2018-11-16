<template>
  <!-- root node required -->
  <div>
    <q-collapsible opened icon="list" :label="$t('TimeSeries.GRAPH', { location })">
      <canvas ref="chart" style="{ width: 100%; }"></canvas>
    </q-collapsible>
    <q-collapsible opened icon="list" :label="$t('TimeSeries.WIND')">
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
import { QCollapsible, QIcon, QTooltip } from 'quasar'

export default {
  name: 'time-series',
  components: {
    QCollapsible,
    QIcon,
    QTooltip
  },
  props: ['feature'],
  data () {
    return {}
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
    setupGraph () {
      // Destroy previous graph if any
      if (this.chart) this.chart.destroy()
      const color = Chart.helpers.color
      const forecastTime = this.feature.forecastTime
      const properties = this.feature.properties
      // Make union of all available times for x-axis
      let times = _.union(forecastTime.gust, forecastTime.windSpeed, forecastTime.precipitations)
        .map(time => moment.utc(time))
        .sort((a, b) => a - b)

      const config = {
        type: 'line',
        data: {
          labels: times,
          datasets: [{
            label: 'Wind gust',
            backgroundColor: color('rgb(255, 99, 132)').alpha(0.5).rgbString(),
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
            data: properties.gust.map((value, index) => ({ x: new Date(forecastTime.gust[index]), y: value })),
            yAxisID: 'speed'
          }, {
            label: 'Wind speed',
            backgroundColor: color('rgb(255, 159, 64)').alpha(0.5).rgbString(),
            borderColor: 'rgb(255, 159, 64)',
            fill: false,
            data: properties.windSpeed.map((value, index) => ({ x: new Date(forecastTime.windSpeed[index]), y: value })),
            yAxisID: 'speed'
          }, {
            label: 'Precipitations',
            backgroundColor: color('rgb(54, 162, 235)').alpha(0.5).rgbString(),
            borderColor: 'rgb(54, 162, 235)',
            fill: false,
            data: properties.precipitations.map((value, index) => ({ x: new Date(forecastTime.precipitations[index]), y: value })),
            yAxisID: 'precipitations'
          }]
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
                stepSize: 3,
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
            yAxes: [{
              id: 'speed',
              position: 'left',
              scaleLabel: {
                display: true,
                labelString: 'm/s'
              }
            }, {
              id: 'precipitations',
              position: 'right',
              scaleLabel: {
                display: true,
                labelString: 'mm (last 3h)'
              }
            }]
          }
        }
      }
      this.chart = new Chart(this.$refs.chart.getContext('2d'), config)
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
