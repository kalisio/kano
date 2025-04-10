<template>
  <div id="globe-credit"/>
  <KPage>
    <!-- Globe -->
    <div id="globe" :ref="configureGlobe" :style="viewStyle">
      <q-resize-observer @resize="onGlobeResized" />
    </div>
    <!-- Child views -->
    <router-view />
  </KPage>
</template>

<script>
import _ from 'lodash'
import { computed } from 'vue'
import { Layout, mixins as kCoreMixins } from '@kalisio/kdk/core.client'
import { mixins as kMapMixins, composables as kMapComposables } from '@kalisio/kdk/map.client'
import { MixinStore } from '../mixin-store.js'
import { ComposableStore } from '../composable-store.js'
import * as utils from '../utils'
import config from 'config'

const name = 'globeActivity'
const baseActivityMixin = kCoreMixins.baseActivity(name)

export default {
  mixins: [
    kMapMixins.globe.baseGlobe,
    kMapMixins.globe.geojsonLayers,
    kMapMixins.globe.fileLayers,
    kMapMixins.globe.style,
    kMapMixins.globe.tooltip,
    kMapMixins.globe.popup,
    kMapMixins.globe.activity,
    kMapMixins.globe.opendapLayers,
    baseActivityMixin,
    kMapMixins.activity,
    kMapMixins.style,
    kMapMixins.featureService,
    kMapMixins.infobox,
    kMapMixins.weacast,
    kMapMixins.context
  ].concat(config.globeActivity.additionalMixins.map((name) => MixinStore.get(name))),
  provide () {
    return {
      kActivity: this,
      kGlobe: this,
      layer: computed(() => this.selectedLayer)
    }
  },
  data () {
    return {
      leftWindow: this.$store.get('layout.windows.left'),
      rightWindow: this.$store.get('layout.windows.right'),
      topWindow: this.$store.get('layout.windows.top'),
      bottomWindow: this.$store.get('layout.windows.bottom'),
      leftPane: this.$store.get('layout.panes.left'),
      rightPane: this.$store.get('layout.panes.right'),
      topPane: this.$store.get('layout.panes.top'),
      bottomPane: this.$store.get('layout.panes.bottom')
    }
  },
  watch: {
    // window visiblity, to send postrobot events
    'leftWindow.visible': function (newValue, oldValue) { this.onWindowVisibleEvent('left', this.leftWindow) },
    'rightWindow.visible': function (newValue, oldValue) { this.onWindowVisibleEvent('right', this.rightWindow) },
    'topWindow.visible': function (newValue, oldValue) { this.onWindowVisibleEvent('top', this.topWindow) },
    'bottomWindow.visible': function (newValue, oldValue) { this.onWindowVisibleEvent('bottom', this.bottomWindow) },
    // window visiblity, to send postrobot events
    'leftPane.visible': function (newValue, oldValue) { this.onPaneVisibleEvent('left', this.leftPane) },
    'rightPane.visible': function (newValue, oldValue) { this.onPaneVisibleEvent('right', this.rightPane) },
    'topPane.visible': function (newValue, oldValue) { this.onPaneVisibleEvent('top', this.topPane) },
    'bottomPane.visible': function (newValue, oldValue) { this.onPaneVisibleEvent('bottom', this.bottomPane) },
    $route: {
      handler (to, from) {
        const toProject = _.get(to, 'query.project')
        const fromProject = _.get(from, 'query.project')
        if (toProject !== fromProject) {
          this.loadProject()
          this.configureActivity()
        }
      }
    },
    project: {
      handler () {
        this.refreshLayers()
      }
    },
    'selection.items': {
      handler () {
        this.updateSelection()
      }
    },
    'probe.item': {
      handler () {
        this.updateSelection()
      }
    }
  },
  methods: {
    async configureGlobe (container) {
      // Avoid reentrance during awaited operations
      if (!container || this.globeContainer) return
      this.globeContainer = container
      const token = this.$store.get('capabilities.api.cesium.token')
      // Not yet ready wait for capabilities to be there
      if (!token) return
      // Wait until viewer is ready
      await this.initializeGlobe(container, token)
      // Notify the listener
      utils.sendEmbedEvent('globe-ready')
    },
    getViewKey () {
      // We'd like to share view settings between 2D/3D
      return this.geAppName.toLowerCase() + '-view'
    },
    async addLayer (layer) {
      // We let any embedding iframe process layer if required
      const response = await utils.sendEmbedEvent('layer-add', _.omit(layer, ['getPlanetApi']))
      // Do not erase with returned object as some internals might have been lost in serialization
      if (response && response.data) _.merge(layer, response.data)
      layer = await kMapMixins.globe.baseGlobe.methods.addLayer.call(this, layer)
      return layer
    },
    async updateLayer (name, geoJson, options = {}) {
      // We let any embedding iframe process features if required
      const response = await utils.sendEmbedEvent('layer-update', { name, geoJson, options })
      await kMapMixins.globe.geojsonLayers.methods.updateLayer.call(this, name, (response && response.data) || geoJson, options)
    },
    handleWidget (widget) {
      // If window already open on another widget keep it
      if (widget && (widget !== 'none') && !this.isWidgetWindowVisible(widget)) this.openWidget(widget)
    },
    async updateTimeSeries () {
      this.state.timeSeries = await utils.updateTimeSeries(this.state.timeSeries)
    },
    updateHighlights () {
      this.clearHighlights()
      this.getSelectedItems().forEach(item => {
        this.highlight(item.feature || item.location, item.layer)
      })
      if (this.hasProbedLocation()) this.highlight(this.getProbedLocation(), this.getProbedLayer())
    },
    async updateSelection () {
      this.updateHighlights()
      await this.updateTimeSeries()
      if (this.hasProbedLocation() || this.hasSelectedItems()) {
        this.handleWidget(this.getWidgetForProbe() || this.getWidgetForSelection())
      } else {
        // Hide the window
        Layout.setWindowVisible('top', false)
      }
    },
    forwardLayerEvents (layerEvents) {
      if (!_.has(this, 'layerHandlers')) this.layerHandlers = {}

      for (const layerEvent of layerEvents) {
        const handler = this.generateHandlerForLayerEvent(layerEvent)
        this.layerHandlers[layerEvent] = handler
        this.$engineEvents.on(layerEvent, handler)
      }
    },
    removeForwardedLayerEvents () {
      for (const layerEvent in this.layerHandlers) {
        this.$engineEvents.off(layerEvent, this.layerHandlers[layerEvent])
      }
      this.layerHandlers = {}
    },
    forwardCesiumEvents (cesiumEvents) {
      if (!_.has(this, 'cesiumHandlers')) this.cesiumHandlers = {}

      const options = this.activityOptions
      const defaultCesiumEvents = ['click', 'dblclick']
      for (const cesiumEvent of cesiumEvents) {
        let okForward = (defaultCesiumEvents.indexOf(cesiumEvent) !== -1)
        if (options.allowForwardEvents) okForward = okForward || (options.allowForwardEvents.indexOf(cesiumEvent) !== -1)
        if (options.disallowForwardEvents) okForward = okForward && (options.disallowForwardEvents.indexOf(cesiumEvent) === -1)
        if (!okForward) continue

        const handler = (options, event) => {
          const latlng = _.get(event, 'latlng')
          const altitude = _.get(event, 'altitude')

          const pickedPosition = _.get(event, 'pickedPosition')
          const feature = _.get(event, 'target.feature')
          // Retrieve original layer options not processed ones
          // as they can include internal objects not to be serialized
          const layer = (options ? this.getLayerByName(options.name) : undefined)
          const payload = Object.assign({
            longitude: latlng.lng,
            latitude: latlng.lat,
            altitude,
            feature,
            layer
          }, pickedPosition)

          utils.sendEmbedEvent(cesiumEvent, payload)
        }

        this.cesiumHandlers[cesiumEvent] = handler
        this.$engineEvents.on(cesiumEvent, handler)
      }
    },
    removeForwardedCesiumEvents () {
      for (const cesiumEvent in this.cesiumHandlers) {
        this.$engineEvents.off(cesiumEvent, this.cesiumHandlers[cesiumEvent])
      }
      this.cesiumHandlers = {}
    },
    generateHandlerForLayerEvent (event) {
      return (layer) => utils.sendEmbedEvent(event, { layer })
    },
    onWindowVisibleEvent (placement, window) {
      const eventName = window.visible ? 'window-opened' : 'window-closed'
      utils.sendEmbedEvent(eventName, { placement, widget: window.current })
    },
    onPaneVisibleEvent (placement, pane) {
      const eventName = pane.visible ? 'pane-opened' : 'pane-closed'
      utils.sendEmbedEvent(eventName, { placement })
    }
  },
  created () {
    this.setCurrentActivity(this)
  },
  mounted () {
    const allCesiumEvents = ['click', 'dblclick', 'movestart', 'moveend', 'move']
    this.forwardCesiumEvents(allCesiumEvents)
    const allLayerEvents = ['layer-added', 'layer-shown', 'layer-hidden', 'layer-removed', 'layer-updated']
    this.forwardLayerEvents(allLayerEvents)
    this.$engineEvents.on('selected-level-changed', this.updateTimeSeries)
    this.$events.on('timeseries-group-by-changed', this.updateTimeSeries)
  },
  beforeUnmount () {
    this.removeForwardedCesiumEvents()
    this.removeForwardedLayerEvents()
    this.$engineEvents.off('selected-level-changed', this.updateTimeSeries)
    this.$events.off('timeseries-group-by-changed', this.updateTimeSeries)
  },
  unmounted () {
    utils.sendEmbedEvent('globe-destroyed')
  },
  async setup () {
    const activity = kMapComposables.useActivity(name, { state: { timeSeries: [] } })
    const project = kMapComposables.useProject()
    await project.loadProject()
    activity.setSelectionMode('multiple')
    const expose = {
      ...activity,
      ...activity.CurrentActivityContext,
      ...project
    }
    const additionalComposables = _.get(config, `${name}.additionalComposables`, [])
    for (const use of additionalComposables.map((name) => ComposableStore.get(name))) { Object.assign(expose, use(name)) }
    return expose
  }
}
</script>

<style lang="scss">
  .probe-cursor {
    cursor: crosshair;
  }
  .processing-cursor {
    cursor: wait;
  }
  .position-cursor {
    cursor: url('/icons/kdk/position-cursor.png'), auto;
  }
</style>
