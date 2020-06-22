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
    "revision": "20f82a4c86044446415af41b985a4d0d"
  },
  {
    "url": "about/contact.html",
    "revision": "097f4b60d8ca1d4009465519111a612b"
  },
  {
    "url": "about/contributing.html",
    "revision": "c1f2235fd2b59b3e123cb3f193a8cd0b"
  },
  {
    "url": "about/introduction.html",
    "revision": "bda7546f6e769b4dc56fe8d0febe4993"
  },
  {
    "url": "about/license.html",
    "revision": "5ee1fb297c4369711d89a841895e32cf"
  },
  {
    "url": "about/roadmap.html",
    "revision": "f3bb05b1aa70023aa26969d263aa2271"
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
    "url": "assets/js/10.d0b49833.js",
    "revision": "04e3c19598b0e542bdee28bce2cc9dae"
  },
  {
    "url": "assets/js/11.a9f96873.js",
    "revision": "017bb4a68ed511c8598c8cad6d1c5a69"
  },
  {
    "url": "assets/js/12.47b6819e.js",
    "revision": "80d75a8853f5bb7c9c03b2e2b2c8bcb4"
  },
  {
    "url": "assets/js/13.8f314768.js",
    "revision": "0d122942d120b8ed4c505cb3396e7bc4"
  },
  {
    "url": "assets/js/14.ea559124.js",
    "revision": "8b0c781d3b5fb19a49f4fd5e7f63b3b3"
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
    "url": "assets/js/5.d89342f8.js",
    "revision": "50a1021bbc66d0e3fad8133a9642a4f5"
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
    "url": "assets/js/9.428545f4.js",
    "revision": "6aca10dceffd72a8bbd101cc004ec84c"
  },
  {
    "url": "assets/js/app.87e21fc1.js",
    "revision": "07e43c0759effd40f30117096c1568c9"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "0e4aa3a9ee1c11f6be48f6b500fc1d22"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "ab802619ab535e08949360f21c405f50"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "435093df05e94456a8ed6ce237781449"
  },
  {
    "url": "index.html",
    "revision": "c44538c67d160bbbf8cde4a9a383d2be"
  },
  {
    "url": "reference/api.html",
    "revision": "14a60787d1824832c0ea30bd08111119"
  },
  {
    "url": "reference/configuration.html",
    "revision": "4c335ed3e114b19b8a412cc3e2c394d3"
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
