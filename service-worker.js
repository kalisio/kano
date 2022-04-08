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
    "revision": "3fbfcad36c78f746f76af18ad539cf56"
  },
  {
    "url": "about/contact.html",
    "revision": "4cbb8fa129fd81605e0fc0e9390eca9a"
  },
  {
    "url": "about/contributing.html",
    "revision": "cdfd88d9a19fadd553e3b963b3deda56"
  },
  {
    "url": "about/introduction.html",
    "revision": "54a2dabe0f3e221cb11b786ee2832b87"
  },
  {
    "url": "about/license.html",
    "revision": "441e9035a31de48680a732ebf2d9772c"
  },
  {
    "url": "about/roadmap.html",
    "revision": "964c43de2571d1c92900d3b1f83d3207"
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
    "url": "assets/js/10.c843a196.js",
    "revision": "a176576d61a212fc59c2afeb3623d399"
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
    "url": "assets/js/app.0db7ada4.js",
    "revision": "103e234fcb14454e271b2643d14c10a1"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "6cbdb2748cc4424ad3647b5b803391bd"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "d562e9f232388f8a2fbfc41c978dc37b"
  },
  {
    "url": "guides/installing-kano.html",
    "revision": "ce9fd8a084462188865b1fc887ed1d99"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "c776b15be44b1aa0582985d022e15b06"
  },
  {
    "url": "index.html",
    "revision": "a27ef45d8e4191a37e55084bb0a8203e"
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
    "revision": "e02295221756baa7e9b791b89ccb526b"
  },
  {
    "url": "reference/configuration.html",
    "revision": "ffe3cbd49f614ed10cc7a4e351b6c7cb"
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
