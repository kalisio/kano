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
    "revision": "9b9d33a28cb7e91d685dce45258ffd68"
  },
  {
    "url": "about/contact.html",
    "revision": "3dfd3a8274ac3b8ec348ecf92c19eb26"
  },
  {
    "url": "about/contributing.html",
    "revision": "d3e68d6b19875da300c1cb1fee293c2c"
  },
  {
    "url": "about/introduction.html",
    "revision": "e32757f41f1af64e539e060f665f9d70"
  },
  {
    "url": "about/license.html",
    "revision": "bc9b82d2733af4258410ff2ecb13634e"
  },
  {
    "url": "about/roadmap.html",
    "revision": "742466e4ca6fc69a08903071c33145b9"
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
    "url": "assets/js/10.903aaf26.js",
    "revision": "efa03052c94c22fb805cf19d31d81d26"
  },
  {
    "url": "assets/js/11.8e2b7142.js",
    "revision": "b2718197fbfdd256ad6182cbc7ecb493"
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
    "url": "assets/js/app.1acf682d.js",
    "revision": "09db8b3efc2d503a6c1e8c68b91be0c5"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "672e69753a12c520271ed2a61bfc6e32"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "a6465e2033d073e1619a23458ea2a1b6"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "c9434ca38e0bc6f28b4317597e0d4eba"
  },
  {
    "url": "index.html",
    "revision": "41efddd4701b8487d89b2c3686c25108"
  },
  {
    "url": "reference/api.html",
    "revision": "204b188df96793330a6b74f1fb623f97"
  },
  {
    "url": "reference/configuration.html",
    "revision": "071d7de687cad5052c12b9503c1c85cf"
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
