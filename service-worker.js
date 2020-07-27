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
    "revision": "1ce14e6b0217b0d30febb173b12672d8"
  },
  {
    "url": "about/contact.html",
    "revision": "304c057283e65c3870c644b804178fd9"
  },
  {
    "url": "about/contributing.html",
    "revision": "3c5c9059cad8f6ac9958cc7bdf2c8053"
  },
  {
    "url": "about/introduction.html",
    "revision": "b04575d5b25c99c6c82b4b93a555f785"
  },
  {
    "url": "about/license.html",
    "revision": "cc0b4a92f6ac15e7652547a68a9fe872"
  },
  {
    "url": "about/roadmap.html",
    "revision": "8cb39b3a2ab7394a07706fb50d36e2d5"
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
    "url": "assets/js/13.e95bf20f.js",
    "revision": "ec84d0d2cb86d619196385c120126815"
  },
  {
    "url": "assets/js/14.aa2135b5.js",
    "revision": "d3b966d52abd9f85df33fc8ad43bde4d"
  },
  {
    "url": "assets/js/15.1d6618a1.js",
    "revision": "5b0cb8fa7cf383934d7c3bc9f9402c07"
  },
  {
    "url": "assets/js/16.2fd4ba97.js",
    "revision": "e0bb8f30a4cf0d9315ca674a0c661668"
  },
  {
    "url": "assets/js/17.14434c17.js",
    "revision": "70ad3dba72739f5aca0090715074650b"
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
    "url": "assets/js/app.cbcc9b7e.js",
    "revision": "9966cf066297e838482fb44461484caf"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "fdd8b9d25f2885794ecade1ba3c27d3d"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "a5e338cc27c5894032c2bc262edfa967"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "a0fc65208f086b8c66950265b41b61c1"
  },
  {
    "url": "index.html",
    "revision": "e64a14df21c433a0e715bb2a0b941d94"
  },
  {
    "url": "reference/api.html",
    "revision": "66e727f34f9e4d7a2a8fc9c8aa535a41"
  },
  {
    "url": "reference/configuration.html",
    "revision": "7fac9ecd3d13b1c1d1936e1c5d9b1ce2"
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
