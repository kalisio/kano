/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxPluginMode is set to "InjectManifest"
 */

import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'

// Disable workbox logs 
self.__WB_DISABLE_DEV_LOGS = true

// Activate new service worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Caching for offline mode

// Preload and cache all resources defined in the manifest
precacheAndRoute(self.__WB_MANIFEST)

// Register the `NetworkFirst` caching strategy for all HTTP requests
registerRoute(
  ({url}) => url.href.startsWith('http'),
  new NetworkFirst()
)