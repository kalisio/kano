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
    "revision": "b866af2a3b1f266420030271bf89b988"
  },
  {
    "url": "about/contact.html",
    "revision": "a44b362acce000be4657f9dc9ced17da"
  },
  {
    "url": "about/contributing.html",
    "revision": "e2dcea88c269f573ebceab60297d23db"
  },
  {
    "url": "about/introduction.html",
    "revision": "7a6b157d51f87fe8c2205754df8ea385"
  },
  {
    "url": "about/license.html",
    "revision": "5c6466d353fabf3f403b36a7fd0a7600"
  },
  {
    "url": "about/roadmap.html",
    "revision": "313e04cdbff5e75e5e3785df28344304"
  },
  {
    "url": "assets/css/0.styles.115df119.css",
    "revision": "567b537603cb179f668eeb9e80d3ad39"
  },
  {
    "url": "assets/img/kano-components.281bbce1.png",
    "revision": "281bbce1d1da3a6231654e3afd3ac0ba"
  },
  {
    "url": "assets/img/kano-screenshot.b497d7cf.png",
    "revision": "b497d7cf9c1c251461efe52328e9bb6b"
  },
  {
    "url": "assets/img/kano-tour.de2df74b.png",
    "revision": "de2df74b46fb4c67c2393a9580fb85f6"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.664c3c8c.js",
    "revision": "3efc9406f3cac1edef33c17badc9c92b"
  },
  {
    "url": "assets/js/11.03529bf9.js",
    "revision": "7dbb2fd987a109bc4413b971e8ada2a5"
  },
  {
    "url": "assets/js/12.cd14d667.js",
    "revision": "ad6e184280ca77698279ec2e7b86dd5e"
  },
  {
    "url": "assets/js/13.39378468.js",
    "revision": "7945cd3dabf1a02deeffed99f31fcb2b"
  },
  {
    "url": "assets/js/14.9eff586c.js",
    "revision": "5263b1732a55b4d5d08c2d115b78eda2"
  },
  {
    "url": "assets/js/15.0c31f0df.js",
    "revision": "5b94560beab6d491c5aa2f1745a8bcd2"
  },
  {
    "url": "assets/js/16.36a15f34.js",
    "revision": "a6270df57301bc75f5ccb6838b60fc7a"
  },
  {
    "url": "assets/js/17.bb9a41ec.js",
    "revision": "c2a3ade44f1f35fec4d437a5ef82aefa"
  },
  {
    "url": "assets/js/18.350e6469.js",
    "revision": "f7018e7cb1836d20c04e943ac17d6177"
  },
  {
    "url": "assets/js/19.94a48a4b.js",
    "revision": "ac56434dce1a8ff9a16c8458409e8f37"
  },
  {
    "url": "assets/js/2.dcc45cf2.js",
    "revision": "296444c686755f74c5e9abd025a29dbd"
  },
  {
    "url": "assets/js/20.1c4465bc.js",
    "revision": "33c40c767eb10832cc4d1f5aa1d21214"
  },
  {
    "url": "assets/js/21.763d11ae.js",
    "revision": "1e7785edadff8ace155fdf8790004285"
  },
  {
    "url": "assets/js/22.7442df89.js",
    "revision": "4d4f626b0538988e1fe453bcb191d834"
  },
  {
    "url": "assets/js/23.1578d28e.js",
    "revision": "675cb3ca5664bf88643e804be9177631"
  },
  {
    "url": "assets/js/24.5e683d50.js",
    "revision": "e0e26a5e2be9fb41b05ab37eb2597ea5"
  },
  {
    "url": "assets/js/3.f8d3f49a.js",
    "revision": "f4d79dc00fa17f2a2f86f7fa796fbbf6"
  },
  {
    "url": "assets/js/4.7297749f.js",
    "revision": "5ebe60cd2f6bf2a80b7ad7071d854565"
  },
  {
    "url": "assets/js/5.e42f3ebc.js",
    "revision": "729b30467816d4b8fadd9b76c852e8ad"
  },
  {
    "url": "assets/js/6.9a6ea1e5.js",
    "revision": "e48cafc2c648b3de0e2c8430085944f2"
  },
  {
    "url": "assets/js/7.fdf48948.js",
    "revision": "e7bcc8fac8928ee83d7f6c72bf32ca50"
  },
  {
    "url": "assets/js/8.06b37109.js",
    "revision": "95461d4214d74d34dadf5f5ce626c50c"
  },
  {
    "url": "assets/js/9.95da9bf9.js",
    "revision": "f696af29dd804383b7b6206fef2e9014"
  },
  {
    "url": "assets/js/app.6d5db540.js",
    "revision": "79a8b329eb3be2cd29cc4d0f49570fa1"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "b1e8aecd4ca186fa73d60cb53c498376"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "ec5bab3d5be75c26017628756152978d"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "4e1c9c0e2a5324a4519d102ff311760f"
  },
  {
    "url": "index.html",
    "revision": "805fabb519d8982920f0ab4b8c434024"
  },
  {
    "url": "reference/api.html",
    "revision": "bfe4541d444f9cd99cf36b05ef604284"
  },
  {
    "url": "reference/configuration.html",
    "revision": "a7f39fafd65a1b48d901c1c507fb8f8f"
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
