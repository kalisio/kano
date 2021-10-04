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
    "revision": "c2aebbbf67aef563a8cdc069ea16c0d9"
  },
  {
    "url": "about/contact.html",
    "revision": "5e58b9b399e54163738ed7b48ff367c5"
  },
  {
    "url": "about/contributing.html",
    "revision": "7c770cb1319581ddf2bfe7466107d231"
  },
  {
    "url": "about/introduction.html",
    "revision": "31722bedcec22762d4290e14df097b43"
  },
  {
    "url": "about/license.html",
    "revision": "6bde80e7e9c6f010fa39c70fd64a2702"
  },
  {
    "url": "about/roadmap.html",
    "revision": "25ab2d5e13b75f7f8221f42e072c7a69"
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
    "url": "assets/js/20.79a9572d.js",
    "revision": "6533b4ea1bee0cc822efe9765eeeba51"
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
    "url": "assets/js/app.d47d9897.js",
    "revision": "f349143a31e603d285a54c40ef75bf3d"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "9855c1d2ccadbe4211dbe3112b3bea16"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "56ad6a1e2823b83f167875f8ab510a13"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "07f3c77e6fc7a7c0ead56bfec8d2e3f8"
  },
  {
    "url": "index.html",
    "revision": "0ed102841bd52203e04a15953bd105d5"
  },
  {
    "url": "reference/api.html",
    "revision": "7d6b6a3d06f1b824316ea8884970fd26"
  },
  {
    "url": "reference/configuration.html",
    "revision": "62e8085220d1495e85d1efcc90ac1293"
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
