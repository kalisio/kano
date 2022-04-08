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
    "revision": "12b3a265bf7e4893d25d9c938447c8cb"
  },
  {
    "url": "about/contact.html",
    "revision": "4a38c620ecc3eb4205fd0ec7a473664b"
  },
  {
    "url": "about/contributing.html",
    "revision": "56c7f028661fed5ac3ff84381e463fa2"
  },
  {
    "url": "about/introduction.html",
    "revision": "c01e766bb1932341dc3a648c7f4068d0"
  },
  {
    "url": "about/license.html",
    "revision": "bcce847fd349b1058d34cf0d6916a593"
  },
  {
    "url": "about/roadmap.html",
    "revision": "df5b16040da6c533f4f15f4fe48551bc"
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
    "url": "assets/img/kano-installation.bfcc84a4.png",
    "revision": "bfcc84a40b98f561acb9133a40a87bcf"
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
    "url": "assets/js/10.ef050858.js",
    "revision": "bb4f3b316c4390b48e95b229223868e9"
  },
  {
    "url": "assets/js/11.1e14b922.js",
    "revision": "8345b9dd9ccd210445cf704b5c11f538"
  },
  {
    "url": "assets/js/12.8d1223bd.js",
    "revision": "18fabf58c26c9402f92d35658196cdad"
  },
  {
    "url": "assets/js/13.8cf5201c.js",
    "revision": "4b8b12bde525bec8cdc2815d480700e3"
  },
  {
    "url": "assets/js/14.81e37cd1.js",
    "revision": "82a9fab35747df93101378041eea011c"
  },
  {
    "url": "assets/js/15.0c4aac3b.js",
    "revision": "f943eed7131c8070cfaaf105240574d6"
  },
  {
    "url": "assets/js/16.a69c5949.js",
    "revision": "c32d15b322eec589b1790423b834c790"
  },
  {
    "url": "assets/js/17.350a7eb7.js",
    "revision": "ad0862d6ff96844a5c3841c5c829aca2"
  },
  {
    "url": "assets/js/18.0acb2525.js",
    "revision": "c70a0f77b326853ed2280c88afe36c70"
  },
  {
    "url": "assets/js/19.f8fd735e.js",
    "revision": "0b739ae8fbc39fa23504a46e76a92110"
  },
  {
    "url": "assets/js/2.459fed15.js",
    "revision": "1cb0eb0341fe1d00cdad7ce86f44e324"
  },
  {
    "url": "assets/js/20.d59a330d.js",
    "revision": "9dc40e5b69087ceef34c84e17bdb54c6"
  },
  {
    "url": "assets/js/21.088bd38d.js",
    "revision": "468ec3f4e7ceb3fdefb8c18897307a1b"
  },
  {
    "url": "assets/js/22.76a14276.js",
    "revision": "b1c5d3bea768268b300fa410268d6d12"
  },
  {
    "url": "assets/js/23.33a693e3.js",
    "revision": "6eb86638ac4027fd97b55fbeb990ec38"
  },
  {
    "url": "assets/js/24.977ef3b0.js",
    "revision": "08a8b20e08eca53fbc8b5e571f38f4e0"
  },
  {
    "url": "assets/js/25.28a48760.js",
    "revision": "42cd1756939d65ff4f24f231a492282d"
  },
  {
    "url": "assets/js/3.8a319d0a.js",
    "revision": "42c9307879304e90b60f4b6df4e8b41e"
  },
  {
    "url": "assets/js/4.281c020d.js",
    "revision": "57c43c0c2a5d2d7e35f2574fbedbb222"
  },
  {
    "url": "assets/js/5.60dbe34f.js",
    "revision": "295ef5ea0437f0422c8a6d7d7058d287"
  },
  {
    "url": "assets/js/6.72cc9e0c.js",
    "revision": "1b5fcc14c85ec22cccc44f5ede66f2b1"
  },
  {
    "url": "assets/js/7.60820639.js",
    "revision": "94c1d2dce936a89cb45652830dfebe8a"
  },
  {
    "url": "assets/js/8.fe1cc5ff.js",
    "revision": "d273373f0e68ce4d99c66bd5b2785160"
  },
  {
    "url": "assets/js/9.0eb02cca.js",
    "revision": "3d9ad36c2b33ea2cb1c96fcd7f05eb54"
  },
  {
    "url": "assets/js/app.0f2b6f5f.js",
    "revision": "ec1cbc685dbfb9f582972e4b1568e6ed"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "46e317ce71770c91563c519c2ba9534c"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "790c742e252b5b1fc30925c6a56337e9"
  },
  {
    "url": "guides/installing-kano.html",
    "revision": "dd0adf9b858099847b566a032d5be4f9"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "f2b3140158e1a7a730b6ddf4ebafa8f4"
  },
  {
    "url": "index.html",
    "revision": "48e6e190d3e385f859fe06134dad08ee"
  },
  {
    "url": "local.js",
    "revision": "d61b602a8f8f19bbf0a7bb042e5c75c8"
  },
  {
    "url": "my-layers.js",
    "revision": "97c6024a2dc3a87b549dd34cbe060c6a"
  },
  {
    "url": "reference/api.html",
    "revision": "76474f13ab81462fa455b2f3bb57dfe2"
  },
  {
    "url": "reference/configuration.html",
    "revision": "72b42369e30fe6a6c5dec35a8dc31f50"
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
