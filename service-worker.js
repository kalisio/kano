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
    "revision": "bf97c48eddf3b2c97f62a2025247c9d6"
  },
  {
    "url": "about/contact.html",
    "revision": "be46b4f2bdf7bc93c26c800cd1bdb68b"
  },
  {
    "url": "about/contributing.html",
    "revision": "bd351a6b1b2ea0dcd22d38802c226d13"
  },
  {
    "url": "about/introduction.html",
    "revision": "6e5edcd90e0711ddf431fed54c603042"
  },
  {
    "url": "about/license.html",
    "revision": "98a587cb2872665bab55b14ea099adfa"
  },
  {
    "url": "about/roadmap.html",
    "revision": "19cc9049273f1f18870d699c3d7c1d38"
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
    "url": "assets/js/10.4e1e246f.js",
    "revision": "df058e0abb5a882ac2885ebbf3e7dbc3"
  },
  {
    "url": "assets/js/11.8e2b7142.js",
    "revision": "b2718197fbfdd256ad6182cbc7ecb493"
  },
  {
    "url": "assets/js/12.55bb47a0.js",
    "revision": "df7013ccea575c4f7b6901d7707819db"
  },
  {
    "url": "assets/js/13.c9e9260d.js",
    "revision": "b6452c30ecc235a924f029b74ebe1a4d"
  },
  {
    "url": "assets/js/14.f224c779.js",
    "revision": "26fd2d50cf1035e3abbd40c599b0784a"
  },
  {
    "url": "assets/js/15.1f87c6d9.js",
    "revision": "6fab7c9b52db3cc988c44e00fff162a1"
  },
  {
    "url": "assets/js/16.1a118f2f.js",
    "revision": "52af6695c79c42f4b7223cf63f780906"
  },
  {
    "url": "assets/js/17.41bbab5a.js",
    "revision": "6e359373663e285cbe9f94a603ade119"
  },
  {
    "url": "assets/js/18.9a5449b1.js",
    "revision": "f94f18121d2f8751a5ce0d8af6c0c034"
  },
  {
    "url": "assets/js/19.e033e349.js",
    "revision": "23dd95c1c578f81af031a4a34cdeaf84"
  },
  {
    "url": "assets/js/2.4213bfb0.js",
    "revision": "836e3395f0999db04d606212fe7cd167"
  },
  {
    "url": "assets/js/3.0bd06729.js",
    "revision": "6a0806e8a22e341c09214b9343591e9e"
  },
  {
    "url": "assets/js/4.3c5afdf5.js",
    "revision": "bce91879a21602d7f2f1fe9b3835c334"
  },
  {
    "url": "assets/js/5.d6062ec0.js",
    "revision": "2209621632a085564777a8ccae3a1236"
  },
  {
    "url": "assets/js/6.41b587b7.js",
    "revision": "433f5a72b6fe84adecdb094fcbcab957"
  },
  {
    "url": "assets/js/7.05e19b01.js",
    "revision": "d2a4cb0eb15e94fc3efb2205a6ef0584"
  },
  {
    "url": "assets/js/8.0730485c.js",
    "revision": "13327b455a50ceb8ec607ae76890ad72"
  },
  {
    "url": "assets/js/9.9de555b5.js",
    "revision": "2e092c568765924939815616fa48ce47"
  },
  {
    "url": "assets/js/app.9736d8fb.js",
    "revision": "d3dc1a8b2cf2db77f2a91a21f64b8f95"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "18882a813acba5f3747bbcea90d2d1e1"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "6e4f56b524beaa2a498cbb30b6a47c0e"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "281cc0dd6a9ab5b85ce0cbc13ecc484c"
  },
  {
    "url": "index.html",
    "revision": "8e4aa9cfaa53e832245d7590f7188278"
  },
  {
    "url": "reference/api.html",
    "revision": "b72959bcc8ac4752777e47e1b8de0c09"
  },
  {
    "url": "reference/configuration.html",
    "revision": "36496f2f46800680806f1b197e1e8429"
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
