<template>
  <div>

    <div ref="globe" :style="viewStyle">
      <q-resize-observable @resize="onGlobeResized" />
      <k-widget ref="timeseriesWidget" :offset="{ minimized: [18,18], maximized: [0,0] }" :title="probedLocationName" @state-changed="onUpdateTimeseries">
        <div slot="widget-content">
          <k-location-time-series ref="timeseries"
            :feature="probedLocation" 
            :variables="variables"
            :current-time-format="currentTimeFormat"
            :current-formatted-time="currentFormattedTime" />
        </div>
      </k-widget>
      <div id="globe-credit" />
    </div>

    <q-btn v-if="sideNavToggle"
      id="side-nav-toggle"
      color="secondary"
      class="fixed"
      style="left: 18px; top: 18px"
      icon="menu"
      @click="layout.toggleLeft()">
      {{ appName }}
    </q-btn>

    <q-btn v-if="panelToggle"
      id="globe-panel-toggle"
      color="secondary"
      class="fixed"
      style="right: 18px; top: 18px"
      small
      round 
      icon="layers"
      @click="layout.toggleRight()" />

    <k-color-legend v-if="colorLegend.visible"
      class="fixed"
      :style="colorLegendStyle"
      :unit="colorLegend.unit"
      :hint="colorLegend.hint"
      :colorMap="colorLegend.colorMap"
      :colors="colorLegend.colors"
      :values="colorLegend.values"
      :unitValues="colorLegend.unitValues"
      :showGradient="colorLegend.showGradient"
      @click="onColorLegendClick" />
    />

    <q-fixed-position corner="bottom-left" :offset="[110, 60]" :style="timelineContainerStyle">   
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
    </q-fixed-position>

  </div>
</template>

<script>
import _ from 'lodash'
import postRobot from 'post-robot'
import Cesium from 'cesium/Source/Cesium.js'
import { Events, QResizeObservable, QFixedPosition, QBtn } from 'quasar'
import { mixins as kCoreMixins } from '@kalisio/kdk-core/client'
import { mixins as kMapMixins } from '@kalisio/kdk-map/client'
import utils from '../utils'

export default {
  name: 'k-globe-activity',
  components: {
    QResizeObservable,
    QBtn,
    QFixedPosition
  },
  mixins: [
    kCoreMixins.refsResolver(['globe']),
    kCoreMixins.baseActivity,
    kMapMixins.geolocation,
    kMapMixins.featureService,
    kMapMixins.time,
    kMapMixins.weacast,
    kMapMixins.time,
    kMapMixins.timeline,
    kMapMixins.timeseries,
    kMapMixins.activity('globe'),
    kMapMixins.legend,
    kMapMixins.locationIndicator,
    kMapMixins.globe.baseGlobe,
    kMapMixins.globe.geojsonLayers,
    kMapMixins.globe.fileLayers,
    kMapMixins.globe.style,
    kMapMixins.globe.tooltip,
    kMapMixins.globe.popup,
    kMapMixins.globe.activity
  ],
  inject: ['layout'],
  methods: {
    async refreshActivity () {
      this.clearActivity()
      const token = this.$store.get('capabilities.api.cesium.token')
      // Not yet ready wait for capabilities to be there
      if (!token) return
      // Wait until viewer is ready
      await this.initializeGlobe(token)
      // Setup the right pane
      this.setRightPanelContent('KCatalogPanel', this.$data)
      this.registerActivityActions()
      const actions = _.get(this, 'activityOptions.actions', ['vr'])
      // FAB
      if (actions.includes('vr')) this.registerFabAction({
        name: 'toggle-vr', label: this.$t('GlobeActivity.TOGGLE_VR'), icon: 'terrain', handler: this.onToggleVr
      })
      utils.sendEmbedEvent('globe-ready')
    },
    getVigicruesTooltip (entity, options) {
      const properties = entity.properties
      if (!properties) return
      const level = properties.NivSituVigiCruEnt
      if (level > 1) {
        return Object.assign({ show: false, text: this.$t('MapActivity.VIGICRUES_LEVEL_' + level) }, this.options.tooltip)
      }
      /*
      const H = properties.H
      const Q = properties.Q
      if (!_.isNil(H) || !_.isNil(Q)) {
        let tooltip = L.tooltip({ permanent: false }, layer)
        if (!_.isNil(H) && !_.isNil(Q)) return tooltip.setContent(`<b>${H.toFixed(2)} m - ${Q.toFixed(2)} m3/h`)
        else if (!_.isNil(H)) return tooltip.setContent(`<b>${H.toFixed(2)} m`)
        else if (!_.isNil(Q)) return tooltip.setContent(`<b>${Q.toFixed(2)} m3/h`)
      }
      */
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
    }
  },
  created () {
    this.registerCesiumStyle('tooltip', this.getVigicruesTooltip)
    // Required to get the access token from server
    Events.$on('capabilities-api-changed', this.refreshActivity)
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
    Events.$off('capabilities-api-changed', this.refreshActivity)
    this.$off('click', this.onFeatureClicked)
    this.$off('layer-added', this.onAddedLayerEvent)
    this.$off('layer-shown', this.onShownLayerEvent)
    this.$off('layer-hidden', this.onHiddenLayerEvent)
    this.$off('layer-removed', this.onRemovedLayerEvent)
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