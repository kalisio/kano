<template>
  <q-page>

    <div ref="globe" :style="viewStyle">
      <q-resize-observer @resize="onGlobeResized" />
      <div id="globe-credit" />
    </div>

    <q-page-sticky position="top" :offset="[0, 18]">
      <k-navigation-bar @location-changed="onLocationChanged" :style="navBarStyle()"/>
    </q-page-sticky>

    <q-page-sticky :position="timeseriesWidgetPosition" :offset="[0, 0]">
      <q-resize-observer @resize="onTimeseriesWidgetResized" />
      <k-widget ref="timeseriesWidget" :title="probedLocationName"
        :style="timeseriesWidgetStyle()" @state-changed="onUpdateTimeseriesWidget">
        <div slot="widget-content">
          <k-location-time-series ref="timeseries"
            :feature="probedLocation" 
            :variables="currentVariables"
             :current-time-format="currentTimeFormat"
             :current-formatted-time="currentFormattedTime" />
        </div>
      </k-widget>
    </q-page-sticky>

    <q-page-sticky position="bottom-left" :offset="[110, 60]">
      <div :style="timelineContainerStyle">
        <k-time-controller
          v-if="timelineEnabled"
          :key="timelineRefreshKey"
          :min="timeline.start" 
          :max="timeline.end"
          :step="'h'"
          :value="timeline.current"
          :timeInterval="timelineInterval"
          :timeFormatter="timelineFormatter"
          @change="onTimelineUpdated"
          pointerColor="#FC6E44" 
          pointerTextColor="white"
          style="width: 100%;"
        />
      </div>
    </q-page-sticky>

    <component v-for="component in components" :is="component.name" :key="component.name"></component>
    
  </q-page>
</template>

<script>
import _ from 'lodash'
import postRobot from 'post-robot'
import Cesium from 'cesium/Source/Cesium.js'
import { mixins as kCoreMixins } from '@kalisio/kdk-core/client'
import { mixins as kMapMixins } from '@kalisio/kdk-map/client'
import utils from '../utils'

export default {
  name: 'k-globe-activity',
  mixins: [
    kCoreMixins.refsResolver(['globe']),
    kCoreMixins.baseActivity,
    kMapMixins.geolocation,
    kMapMixins.featureService,
    kMapMixins.weacast,
    kMapMixins.time,
    kMapMixins.timeline,
    kMapMixins.timeseries,
    kMapMixins.activity('globe'),
    kMapMixins.locationIndicator,
    kMapMixins.globe.baseGlobe,
    kMapMixins.globe.geojsonLayers,
    kMapMixins.globe.fileLayers,
    kMapMixins.globe.style,
    kMapMixins.globe.tooltip,
    kMapMixins.globe.popup,
    kMapMixins.globe.activity
  ],
  inject: ['klayout'],
  provide () {
    return {
      kActivity: this,
      kGlobe: this
    }
  },
  data () {
    return {
      timeseriesWidgetPosition: 'top'
    }
  },
  computed: {
    components () {
      return _.get(this, 'activityOptions.components', [])
    }
  },
  methods: {
    navBarStyle() {
      if (this.$q.screen.lt.md) return ''
      return 'width: 80vw'
    },
    timeseriesWidgetStyle () {
      if (this.$refs.timeseriesWidget && this.$refs.timeseriesWidget.isOpen()) {
        if (!this.$refs.timeseriesWidget.isMinimized()) return 'width: 100vw;height: 100vh;'
        else if (this.$q.screen.lt.md) return 'width: 100vw;height: 40vh;'
      }
      return 'width: 80vw;height: 40vh;'
    },
    async refreshActivity () {
      this.clearActivity()
      const token = this.$store.get('capabilities.api.cesium.token')
      // Not yet ready wait for capabilities to be there
      if (!token) return
      // Wait until viewer is ready
      await this.initializeGlobe(token)
      // Setup the right pane
      this.setRightDrawer('KCatalogPanel', this.$data)
      this.registerActivityActions()      
      utils.sendEmbedEvent('globe-ready')
    },
    getVigicruesTooltip (entity, options) {
      const properties = entity.properties
      if (!properties) return
      const level = properties.NivSituVigiCruEnt
      if (level > 1) {
        return Object.assign({ show: false, text: this.$t('MapActivity.VIGICRUES_LEVEL_' + level) }, this.options.tooltip)
      }
      return null
    },
    async onFeatureClicked (options, event) {
      const entity = event.target
      if (!entity) return
      const properties = (entity.properties ? entity.properties.getValue(0) : null)
      utils.sendEmbedEvent('click', { properties, layer: options })
    },
    generateHandlerForLayerEvent (event) {
      return (layer) => utils.sendEmbedEvent(event, { layer })
    },
    async onUpdateTimeseriesWidget (state) {
      if (state === 'closed') {
        this.closeTimeseries()
        return
      }
      this.timeseriesWidgetPosition = (state === 'maximized' ? 'top-left' : 'top')
      // We need to force a refresh so that the prop is correctly updated by Vuejs in child component
      await this.$nextTick()        
      this.onTimeseriesWidgetResized()
    },
    onTimeseriesWidgetResized () {
      // It appears chartjs does not take time ticks into account in chart height
      this.resizeTimeseries(
        Math.floor(this.$refs.timeseriesWidget.$el.getBoundingClientRect().width),
        Math.floor(this.$refs.timeseriesWidget.$el.getBoundingClientRect().height * 0.8)
      )
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-navigation-bar'] = this.$load('KNavigationBar')    
    this.components.forEach(component => this.$options.components[component.name] = this.$load(component.component))
    // Setup the engine
    this.registerCesiumStyle('tooltip', this.getVigicruesTooltip)
    // Required to get the access token from server
    this.$events.$on('capabilities-api-changed', this.refreshActivity)
    this.$on('click', this.onFeatureClicked)
    this.onAddedLayerEvent = this.generateHandlerForLayerEvent('layer-added')
    this.$on('layer-added', this.onAddedLayerEvent)
    this.onShownLayerEvent = this.generateHandlerForLayerEvent('layer-shown')
    this.$on('layer-shown', this.onShownLayerEvent)
    this.onHiddenLayerEvent = this.generateHandlerForLayerEvent('layer-hidden')
    this.$on('layer-hidden', this.onHiddenLayerEvent)
    this.onRemovedLayerEvent = this.generateHandlerForLayerEvent('layer-removed')
    this.$on('layer-removed', this.onRemovedLayerEvent)
  },
  mounted () {
  },
  beforeDestroy () {
    this.$events.$off('capabilities-api-changed', this.refreshActivity)
    this.$off('click', this.onFeatureClicked)
    this.$off('layer-added', this.onAddedLayerEvent)
    this.$off('layer-shown', this.onShownLayerEvent)
    this.$off('layer-hidden', this.onHiddenLayerEvent)
    this.$off('layer-removed', this.onRemovedLayerEvent)
  },
  destroyed () {
    utils.sendEmbedEvent('globe-destroyed')
  }
}
</script>

<style>
.probe-cursor {
  cursor: crosshair;
}
.processing-cursor {
  cursor: wait;
}
</style>