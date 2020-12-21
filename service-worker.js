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
    "revision": "31c8d71ea3645dde54dd48bf3e0d705b"
  },
  {
    "url": "about/contact.html",
    "revision": "308f63f58c4a1bb7a0433eb82dbf6057"
  },
  {
    "url": "about/contributing.html",
    "revision": "784822e22107f67be74a6b7bf90d44d8"
  },
  {
    "url": "about/introduction.html",
    "revision": "2a7e0b679a1c4a486161bd6f10e4e1df"
  },
  {
    "url": "about/license.html",
    "revision": "2d73dd8f9d26f28f998fbbcaeabd55bf"
  },
  {
    "url": "about/roadmap.html",
    "revision": "60463b0f08ede14cd058cc97e10bc76a"
  },
  {
    "url": "assets/css/0.styles.9366b809.css",
    "revision": "d8fec00600eb73bb02e0eb67c79d2aa2"
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
    "url": "assets/js/10.cc295468.js",
    "revision": "04e6d7a97c32eec528535c2323932200"
  },
  {
    "url": "assets/js/11.8ab0af13.js",
    "revision": "900b33bf21c2d7005fa24d60635bf13c"
  },
  {
    "url": "assets/js/12.6b32e1b5.js",
    "revision": "6f4617be4df332c46f9862629984ac29"
  },
  {
    "url": "assets/js/13.e9a0ca1e.js",
    "revision": "312d53275a0871fdb6a31581baa79885"
  },
  {
    "url": "assets/js/14.7cb8fad7.js",
    "revision": "f6817cdcb8195dea2fbec22b82cd283c"
  },
  {
    "url": "assets/js/15.e02157ab.js",
    "revision": "7c0e581064754ee6ad74d654c4d8b30e"
  },
  {
    "url": "assets/js/16.ee7407d0.js",
    "revision": "9cf89f961b085e509ba0df319b3ffbc8"
  },
  {
    "url": "assets/js/17.69dc2d3e.js",
    "revision": "1311940cd252adba58d201b3c0c947d5"
  },
  {
    "url": "assets/js/18.453c3e38.js",
    "revision": "79bd3c5008e6275ca6bbb5e5907b593a"
  },
  {
    "url": "assets/js/19.2eae0e85.js",
    "revision": "191d065974d75012b66d13c6696c02a2"
  },
  {
    "url": "assets/js/2.98de3624.js",
    "revision": "7372615265b193f17ba25e2c6801a51c"
  },
  {
    "url": "assets/js/20.1aab8f79.js",
    "revision": "691697c45ab84ddc208165babe498bb3"
  },
  {
    "url": "assets/js/21.a815c8a4.js",
    "revision": "0ec3025417da41729d728a5377b2d2db"
  },
  {
    "url": "assets/js/22.8003af96.js",
    "revision": "834c0db3634abf46b184b113769fe472"
  },
  {
    "url": "assets/js/23.8a90e01b.js",
    "revision": "2c7ef5537d285a12c82158520e07ce4e"
  },
  {
    "url": "assets/js/24.dd324ff3.js",
    "revision": "5268de11096f7cda21b2a559aa8a7980"
  },
  {
    "url": "assets/js/3.42d95ed0.js",
    "revision": "309d3e1722a607fa9926aecc7a89d048"
  },
  {
    "url": "assets/js/4.f36df419.js",
    "revision": "808fe042e9a57e5dd6894238728fa9bf"
  },
  {
    "url": "assets/js/5.1627be92.js",
    "revision": "9f2cb18fe95df0395ced59ad89cc1f88"
  },
  {
    "url": "assets/js/6.73da5778.js",
    "revision": "649326a05ad6d8af957733131416bc88"
  },
  {
    "url": "assets/js/7.c2898ffc.js",
    "revision": "10613828fa388fa4dde79b3f2d815906"
  },
  {
    "url": "assets/js/8.2108cc8f.js",
    "revision": "a9d34eb69f263e9fe84146f73a4b8e01"
  },
  {
    "url": "assets/js/9.5e27dade.js",
    "revision": "a12d81f1b3fe61fb03775d82418fc992"
  },
  {
    "url": "assets/js/app.9702663e.js",
    "revision": "78a623ce12e5dc14d52667fc657f78be"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "f96552cd907c5b2cd23f791c0754ce59"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "54e64e989ccc7c1f2391d0248e67f791"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "ca4c9e59705d337d2ae25725f645e994"
  },
  {
    "url": "index.html",
    "revision": "993092423e6458f8bebefdf83b85d4de"
  },
  {
    "url": "reference/api.html",
    "revision": "30e95b08f6745aac7f5a601df5026648"
  },
  {
    "url": "reference/configuration.html",
    "revision": "4854465f19937758fa4af856002cc1b5"
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
