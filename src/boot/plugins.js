import { CanvasDrawContext } from '@kalisio/kdk/map.client'
import { MixinStore } from '../mixin-store.js'
import { optimateLib } from '../canvas.js'
import mixin from '../optimate-mixin.js'

// Register specific draw commands for canvas layer
CanvasDrawContext.merge(optimateLib)
// Register specific mixin
MixinStore.set('optimate', mixin)