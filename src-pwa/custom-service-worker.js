import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import logger from 'loglevel'
import { LocalForage } from '@kalisio/feathers-localforage'
// Ensure same underlying configuration as we are in another process and instance may differ
const storage = LocalForage.createInstance({
  name: 'offline_cache',
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
  await storage.iterate((value, key) => {
    cachedUrls.set(key, value)
  })
  updatingCachedUrls = false
}, 1000)

// Caching for offline mode
// Preload and cache all resources defined in the manifest
precacheAndRoute(self.__WB_MANIFEST)

async function cacheKeyWillBeUsed({ request, mode }) {
  const url = new URL(request.url)
  url.searchParams.delete('jwt')
  let key = url.href
  // Need to add range request in key as it is ignored by cache otherwise
  if (request.headers && request.headers.Range) {
    const range = request.headers.Range.replace('bytes=', '').split('-')
    key += `/${range[0]}/${range[1]}`
  }
  return key
}

async function fetchDidFail({ error, request }) {
  logger.debug(`[Kano] Fetching ${request.url} from layers cache failed`)
}

// Register the `CacheFirst` caching strategy for offline data
// targetting layers data
registerRoute(
  ({url, request}) => {
    let key = new URL(url.href)
    key.searchParams.delete('jwt')
    key = key.href
    if (request.headers && request.headers.Range) {
      const range = request.headers.Range.replace('bytes=', '').split('-')
      key += `/${range[0]}/${range[1]}`
    }
    const isCached = cachedUrls && cachedUrls.has(key)
    if (isCached) {
      logger.debug(`[Kano] Return response for ${url.href} from layers cache`)
    }
    return isCached
  },
  new CacheFirst({
    cacheName: 'layers',
    plugins : [{ cacheKeyWillBeUsed, fetchDidFail }]
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
