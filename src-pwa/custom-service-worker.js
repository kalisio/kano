import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import logger from 'loglevel'
import { LocalForage } from '@kalisio/feathers-localforage'
// Ensure same underlying configuration as we are in another process and instance may differ
LocalForage.config({
  name: 'offline_views',
  storeName: 'cache_entries'
})

let cachedUrls
let updatingCachedUrls = false
// Disable workbox logs 
self.__WB_DISABLE_DEV_LOGS = true

// Activate new service worker
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// As route function cannot be async and localforage is, we have to retrieve
// the cached layer list on a reccurent basis to be able to respond synchronously
setInterval(async () => {
  // Avoid reentrance in any case
  if (updatingCachedUrls) return
  updatingCachedUrls = true
  cachedUrls = new Map()
  await LocalForage.iterate((value, key) => {
    cachedUrls.set(key, value)
  })
  updatingCachedUrls = false
}, 1000)

// Caching for offline mode
// Preload and cache all resources defined in the manifest
precacheAndRoute(self.__WB_MANIFEST)

async function cacheKeyWillBeUsed({request, mode}) {
  const url = new URL(request.url)
    url.searchParams.delete('jwt')
    return url.href
}

// Register the `NetworkFirst` caching strategy for offline data
// targetting layers data
registerRoute(
  ({url}) => {
    const key = new URL(url.href)
    key.searchParams.delete('jwt')
    const isCached = cachedUrls && cachedUrls.has(key.href)
    if (isCached) {
      logger.debug(`[Kano] Return response for ${url.href} from layers cache`)
    }
    return isCached
  },
  new NetworkFirst({
    cacheName: 'layers',
    plugins : [{ cacheKeyWillBeUsed }]
  })
)
// Register the `NetworkFirst` caching strategy for all others HTTP requests
registerRoute(
  ({url}) => {
    return url.href.startsWith('http')
  },
  new NetworkFirst({
    cacheName: 'app',
    plugins: [
      new ExpirationPlugin({
        // Keep at most N entries.
        maxEntries: 1000000,
        // Don't keep any entries for more than N days.
        maxAgeSeconds: 30 * (24 * 60 * 60),
        // Automatically cleanup if quota is exceeded.
        purgeOnQuotaError: true
      })
    ]
  })
)
