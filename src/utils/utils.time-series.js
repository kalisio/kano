import _ from 'lodash'
import moment from 'moment'
import { unref } from 'vue'
import sift from 'sift'
import chroma from 'chroma-js'
import { Time, Store } from '@kalisio/kdk/core.client'
import { composables as kMapComposables, utils as kMapUtils } from '@kalisio/kdk/map.client.map'

// When organizing time series by feature the dataset color is the variable color as given in the layer
// eg 'temperature' data in red and 'humidity' data in blue
// When organizing time series by variable the dataset color should be different for each feature
// eg 'Toulouse' data in red, 'Paris' data in blue, etc.
// We pregenerate a fixed set of colors for this to ensure they are always assigned in the same order
const nbColors = 10
const Colors = chroma.scale('Set1').colors(nbColors)

// Add a small delta (minutes) to data time range so that some ticks are always visible
// and points on on the left/right side are not cut
const TimeRangeDelta = 2

export function getChartOptions (title) {
  return {
    title: {
      display: true,
      text: title,
      align: 'start'
    },
    scales: {
      x: {
        min: (startTime, endTime) => startTime.clone().subtract(TimeRangeDelta, 'minutes').valueOf(),
        max: (startTime, endTime) => endTime.clone().add(TimeRangeDelta, 'minutes').valueOf()
      }
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          generateLabels: (chart) => {
            return chart.data.datasets.map((dataset, index) => {
              // If we have a single value but like to draw a line it does not make sense so that we "force" point display
              const hasSingleValue = (dataset.data.length === 1)
              return {
                text: dataset.label,
                datasetIndex: index,
                fillStyle: dataset.backgroundColor,
                strokeStyle: dataset.borderColor,
                pointStyle: (hasSingleValue ? 'rectRot' : 'line'),
                hidden: !chart.isDatasetVisible(index)
              }
            })
          }
        }
      }
    }
  }
}

export async function updateTimeSeries (previousTimeSeries) {
  const { CurrentActivity, hasSelectedItems, getSelectedItems, hasProbedLocation, getProbedLocation } = kMapComposables.useCurrentActivity()
  const activity = unref(CurrentActivity)
  if (!activity) return
  // Initialize the time range
  const span = Store.get('timeseries.span')
  const start = moment(Time.getCurrentTime()).subtract(span, 'm')
  const end = moment(Time.getCurrentTime()).add(span, 'm')
  Time.patchRange({ start, end })
  // Weather probe targets variables coming from multiple layers
  const forecastLayers = _.values(activity.layers).filter(sift({ tags: ['weather', 'forecast'] }))
  const featureLevel = activity.selectableLevelsLayer ? ` - ${activity.selectedLevel} ${activity.selectableLevels.unit}` : ''
  
  let timeSeries = []
  if (hasProbedLocation()) {
    const coordinates = kMapUtils.formatUserCoordinates(getProbedLocation().lat, getProbedLocation().lng, Store.get('locationFormat', 'FFf'))
    const label = (activity.forecastModel ? activity.forecastModel.label : '') + `(${coordinates})` + (activity.forecastLevel ? featureLevel : '')
    // Due to a possible custom probe function we provide possible visible layers as input
    const variableLayers = (activity.probeLocation ? _.values(activity.layers).filter(sift({ variables: { $exists: true }, isVisible: true })) : [])
    timeSeries.push({
      id: 'probe',
      label,
      series: kMapUtils.getTimeSeries({
        location: getProbedLocation(),
        layers: forecastLayers.concat(variableLayers),
        level: activity.selectedLevel,
        forecastModel: activity.forecastModel,
        forecastLevel: activity.forecastLevel,
        probeFunction: activity.probeLocation,
        weacastApi: activity.getWeacastApi()
      })
    })
  }
  if (hasSelectedItems()) {
    getSelectedItems().forEach(item => {
      const featureLabel = _.get(item, `feature.properties.${item.layer.featureLabel || 'name'}`)
      const featureId = kMapUtils.getFeatureId(item.feature, item.layer)
      const label = (_.has(item, 'layer.probe') ?
        `${activity.forecastModel.label} (${item.layer.label} - ${featureLabel})` + featureLevel :
        `${item.layer.label} - ${featureLabel}` + featureLevel)
      timeSeries.push({
        id: `${item.layer.name}-${featureId}`,
        label,
        series: kMapUtils.getTimeSeries({
          feature: item.feature,
          layer: item.layer,
          layers: _.has(item, 'layer.probe') ? forecastLayers : [],
          level: activity.selectedLevel,
          forecastModel: activity.forecastModel,
          forecastLevel: activity.forecastLevel,
          weacastApi: activity.getWeacastApi()
        })
      })
    })
  }

  const groupBy = Store.get('timeseries.groupBy')
  // Default is to group by feature
  if (groupBy === 'variable') {
    const timeSeriesByVariable = {}
    timeSeries.forEach((timeSerie, index) => {
      timeSerie.series.forEach(serie => {
        // We do not mix variables with different units
        const variable = `${_.get(serie, 'variable.name')}-${_.get(serie, 'variable.unit.name')}`
        const variableLabel = _.get(serie, 'variable.label')
        // When organizing time series by feature chart name is the feature name while the dataset label is the variable name,
        // eg a 'Toulouse' station collecting 'temperature' and 'humidity' data
        // When organizing time series by variable the chart name is the variable name while the dataset label is the feature name
        // eg the 'temperature' data for different stations 'Toulouse', 'Paris', etc.
        _.set(serie, 'variable.label', timeSerie.label)
        _.set(serie, 'variable.chartjs.backgroundColor', Colors[index % nbColors])
        _.set(serie, 'variable.chartjs.borderColor', Colors[index % nbColors])
        if (timeSeriesByVariable[variable]) {
          timeSeriesByVariable[variable].series.push(serie)
        } else {
          timeSeriesByVariable[variable] = {
            id: variable,
            label: variableLabel,
            series: [serie]
          }
        }
      })
    })
    timeSeries = _.values(timeSeriesByVariable)
  }
  // Restore previous state if any
  if (previousTimeSeries) {
    timeSeries.forEach(timeSerie => {
      const previousTimeSerie = _.find(previousTimeSeries, { id: timeSerie.id })
      // Keep track of some states only
      if (previousTimeSerie) Object.assign(timeSerie, _.pick(previousTimeSerie, ['visible', 'pinned', 'logarithmic']))
    })
  }
  // Make first serie visible if required
  if (!_.isEmpty(timeSeries) && !_.find(timeSeries, { visible: true })) timeSeries[0].visible = true
  return timeSeries
}
