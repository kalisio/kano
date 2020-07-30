/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "1e06bed5f1c2e175ad9eba0c759f6f8a"
  },
  {
    "url": "about/contact.html",
    "revision": "ff0c05c88de46b49f875769e85e5ed3b"
  },
  {
    "url": "about/contributing.html",
    "revision": "dbd7672fdea67454c6bc82026a3bc0f7"
  },
  {
    "url": "about/introduction.html",
    "revision": "3e86c2518542f251dc826059b1b67098"
  },
  {
    "url": "about/license.html",
    "revision": "ee150e0b8340c1d45056287bab8695e7"
  },
  {
    "url": "about/roadmap.html",
    "revision": "dd970bf0d3e89559c31b4181dbdceae0"
  },
  {
    "url": "assets/css/0.styles.cdd4485d.css",
    "revision": "8549cdbf676521177ef4db5c23634b5a"
  },
  {
    "url": "assets/img/kano-screenshot.2b6d4bbf.png",
    "revision": "2b6d4bbfa0992bbbbaae5745b2a7db4b"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.35b8793b.js",
    "revision": "b69e8b869eb7d1a00dae19be78c9ce31"
  },
  {
    "url": "assets/js/11.0fc32731.js",
    "revision": "02e7aa1175212a394cc89a9edf900241"
  },
  {
    "url": "assets/js/12.1a2fd7c3.js",
    "revision": "27b7e9742ab90f99ab8b678c75945fac"
  },
  {
    "url": "assets/js/13.8f314768.js",
    "revision": "0d122942d120b8ed4c505cb3396e7bc4"
  },
  {
    "url": "assets/js/14.ac1b2852.js",
    "revision": "e93b7fd6b25891782ded2579132f062e"
  },
  {
    "url": "assets/js/15.92471f87.js",
    "revision": "d49bb367d07d202486b6f07fa87a3121"
  },
  {
    "url": "assets/js/16.74031fec.js",
    "revision": "f5cacb3e8404999ac7418d7d5650e52a"
  },
  {
    "url": "assets/js/17.e3f6386f.js",
    "revision": "31de7c6b0ae4290d6e345c08034b4876"
  },
  {
    "url": "assets/js/18.90dde133.js",
    "revision": "554f2a8dabe839ca64465b367aa58cde"
  },
  {
    "url": "assets/js/19.ed1459d5.js",
    "revision": "aaccd9d9622282c675506f4a06d75fe8"
  },
  {
    "url": "assets/js/2.152a493a.js",
    "revision": "4d4d712b33ef70aea9fc1431279f383f"
  },
  {
    "url": "assets/js/3.7964aa4b.js",
    "revision": "beaed78c873d345744ee0fbb058eaeda"
  },
  {
    "url": "assets/js/4.812c3db4.js",
    "revision": "88a92042cfd2838310da6e20a67a2966"
  },
  {
    "url": "assets/js/5.1c7fa5b0.js",
    "revision": "05a7a350f1ec430c0445e27776609cea"
  },
  {
    "url": "assets/js/6.0f436cef.js",
    "revision": "89fea1ab04c8b20e5cfb8ee8441d87bb"
  },
  {
    "url": "assets/js/7.3a0e51d9.js",
    "revision": "de5002f68439ad0bc85099ef8cb7bc15"
  },
  {
    "url": "assets/js/8.1f952311.js",
    "revision": "9ac97261f92dd2876390fbfaa9436d0e"
  },
  {
    "url": "assets/js/9.8365f715.js",
    "revision": "8d11b2517207fe7667c11d0afbf7a103"
  },
  {
    "url": "assets/js/app.439fa06b.js",
    "revision": "fdd492095cb0a41c66e63ec5d984ca4f"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "47d6b9eb8496201ddb26468225d225a4"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "f90c411765ca33faf0f80f4f9b29e961"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "0121763c28a5433f5a885fc28c9eea02"
  },
  {
    "url": "index.html",
    "revision": "a8409a183164ca28551b25dda2656465"
  },
  {
    "url": "reference/api.html",
    "revision": "57375cabb422d0f3e07c28af6797d7b7"
  },
  {
    "url": "reference/configuration.html",
    "revision": "54729cbf1c3987c6194462dea70dfdb2"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
