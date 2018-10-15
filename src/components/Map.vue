<template>
  <div>
    <div id="map" :style="mapStyle">
      <q-resize-observable @resize="onMapResized" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import L from 'leaflet'
import moment from 'moment'
import { QWindowResizeObservable, QResizeObservable, dom } from 'quasar'
import feathers from '@feathersjs/client'
import weacast from 'weacast-client'
import { utils as kCoreUtils } from '@kalisio/kdk-core/client'
import { mixins as kMapMixins } from '@kalisio/kdk-map/client'

const { offset } = dom
function roundHours (hours, interval) {
  return (Math.floor(hours / interval) * interval)
}

export default {
  name: 'k-map',
  components: {
    QWindowResizeObservable,
    QResizeObservable
  },
  mixins: [
    kMapMixins.map.baseMap,
    kMapMixins.map.baseLayers,
    kMapMixins.map.overlayLayers,
    kMapMixins.map.geojsonLayers,
    //kMapMixins.map.fileLayers,
    kMapMixins.map.fullscreen,
    kMapMixins.map.timedimension,
    kMapMixins.map.scalebar,
    kMapMixins.map.measure,
    kMapMixins.map.forecastLayers
  ],
  computed: {
    mapStyle () {
      return 'width: 100%; height: 100%; fontWeight: normal; zIndex: 0; position: absolute'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    getPointMarker (feature, latlng) {
      // ADS-B
      if (_.has(feature, 'properties.icao')) {
        return this.createMarkerFromStyle(latlng, {
          icon: {
            type: 'icon',
            options: {
              iconUrl: '/statics/paper-plane.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            }
          }
        })
      }
      // Téléray
      else if (_.has(feature, 'properties.irsnId')) {
        const valid = _.get(feature, 'properties.libelle')
        const icon = (valid === 'VA' ? 'info-circle' : (valid === 'NV' ? 'question-circle' : 'times-circle'))
        const color = (valid === 'VA' ? 'darkblue' : (valid === 'NV' ? 'orange' : 'dark'))
        return this.createMarkerFromStyle(latlng, {
          icon: {
            type: 'icon.fontAwesome',
            options: {
              iconClasses: 'fa fa-' + icon,
              markerColor: color,
              iconColor: '#FFF'
            }
          }
        })
      }
      return null
    },
    getFeatureStyle (feature) {
      return this.convertFromSimpleStyleSpec(feature.properties || {})
    },
    getFeaturePopup (feature, layer) {
      let popup = L.popup({ autoPan: false }, layer)
      const name = _.get(feature, 'properties.name', _.get(feature, 'properties.NomEntVigiCru', _.get(feature, 'properties.icao')))
      return popup.setContent(name)
    },
    getFeatureTooltip (feature, layer) {
      const level = _.get(feature, 'properties.NivSituVigiCruEnt')
      if (level > 1) {
        let tooltip = L.tooltip({ permanent: true }, layer)
        let content
        switch (level) {
          case 2:
            content = 'Risque de crue génératrice de débordements'
            break
          case 3:
            content = 'Risque de crue génératrice de débordements importants'
            break
          case 4:
            content = 'Risque de crue majeure'
            break
        }
        return tooltip.setContent('<b>' + content + '</b>')
      }
      const callsign = _.get(feature, 'properties.callsign')
      if (callsign) {
        let tooltip = L.tooltip({ permanent: true }, layer)
        return tooltip.setContent('<b>' + callsign + '</b>')
      }
      const value = _.get(feature, 'properties.value')
      if (value) {
        let tooltip = L.tooltip({ permanent: false }, layer)
        return tooltip.setContent('<b>' + value + ' nSv/h</b>')
      }
      return null
    },
    onPopupOpen (event) {
      const feature = _.get(event, 'layer.feature')
      if (!feature) return
    },
    onFeatureClicked (event) {
      const feature = _.get(event, 'target.feature')
      if (!feature) return
    },
    onMapResized (size) {
      // Avoid to refresh the layout when leaving the component
      if (this.observe) this.refreshMap()
    },
    onMapMoved () {
      this.bounds = this.map.getBounds()
      this.$store.set('bounds', [
        [this.bounds.getSouth(), this.bounds.getWest()],
        [this.bounds.getNorth(), this.bounds.getEast()]
      ])
    },
    async setupWeacast () {
      this.weacastApi = feathers()
      this.weacastApi.configure(feathers.rest('http://demo.weacast.xyz/api').fetch(window.fetch.bind(window)))
      this.weacastApi.configure(feathers.authentication({
        storage: window.localStorage,
        storageKey: 'weacast-key'
      }))
      try {
        await this.weacastApi.authenticate({
          strategy: 'local',
          email: 'weacast@weacast.xyz',
          password: 'weacast'
        })
        console.log('Connected to weacast API')
        await this.setupForecastModels()
        this.setupForecastLayers()
      }
      catch (error) {
        console.log('Cannot initialize weacast API', error)
      }
    }
  },
  created () {
    // Enable the observers in order to refresh the layout
    this.observe = true
  },
  mounted () {
    this.setupMap()
    this.setupWeacast()
    this.map.on('moveend', this.onMapMoved)
    if (this.$store.has('bounds')) {
      this.map.fitBounds(this.$store.get('bounds'))
    }
    // Setup times
    /*
    const upperLimit = 24 * 3600
    const interval = 3 * 3600
    // Compute nearest forecast T0
    const now = moment.utc(now)
    let offsetDateTime = now.clone().add({ seconds: 0.5 * interval })
    const startTime = now.clone().hours(roundHours(offsetDateTime.hours(), interval / 3600)).minutes(0).seconds(0).milliseconds(0)
    let times = []
    this.setCurrentTime(startTime)
    for (let timeOffset = 0; timeOffset <= upperLimit; timeOffset += interval) {
      times.push(startTime.clone().add({ seconds: timeOffset }))
    }
    this.map.timeDimension.setAvailableTimes(times.map(time => time.format()), 'replace')
    */
    //this.addCollectionLayer('Actors', { spiderfyDistanceMultiplier: 5.0 })
    // Setup event connections
    // this.$on('popupopen', this.onPopupOpen)
    this.$on('click', this.onFeatureClicked)
    this.$on('collection-refreshed', this.onCollectionRefreshed)
  },
  beforeDestroy () {
    this.map.off('moveend', this.onMapMoved)
    // No need to refresh the layout when leaving the component
    this.observe = false
    //this.removeCollectionLayer('Actors')
    // Remove event connections
    // this.$off('popupopen', this.onPopupOpen)
    this.$off('click', this.onFeatureClicked)
    this.$off('collection-refreshed', this.onCollectionRefreshed)
  }
}
</script>
