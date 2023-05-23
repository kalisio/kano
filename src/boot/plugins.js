import { MixinStore } from '../mixin-store.js'
import { ComposableStore } from '../composable-store.js'
import airbus from '../airbus/mixin.js'
import { dragonFlyLib } from '../airbus/canvas.js'
import { Store, utils as kdkCoreUtils } from '@kalisio/kdk/core.client'
import { CanvasDrawContext } from '@kalisio/kdk/map.client'
import { useDragonfly } from '../composables/dragonfly.js'
import { useDragonflyElevationProfile } from '../composables/dragonflyElevationProfile.js'

// Register specific draw commands for canvas layer
CanvasDrawContext.merge(dragonFlyLib)

// and specific mixins
MixinStore.set('airbus', airbus)
// and specific composables
ComposableStore.set('dragonfly', useDragonfly)
ComposableStore.set('dragonflyElevationProfile', useDragonflyElevationProfile)

export default async ({ app, router, Vue }) => {
  // this is the entry point to fetch layer & feature for the elevation profile widget
  Store.set('airbus.elevationProfile', { layer: {}, feature: {} })

  // this is a dependency of the elevation widget v2
  app.component('KChart', await kdkCoreUtils.loadComponent('chart/KChart'))
}
