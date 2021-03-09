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
    "revision": "7bdeb63bfd560885645996dc6c0d3b34"
  },
  {
    "url": "about/contact.html",
    "revision": "f1298067af83351a5faac60fdf8afc25"
  },
  {
    "url": "about/contributing.html",
    "revision": "324c86ed463aa164c1658bf52a2585db"
  },
  {
    "url": "about/introduction.html",
    "revision": "8ebd275b9fb8322ae8ceed24e6861b74"
  },
  {
    "url": "about/license.html",
    "revision": "0f44ed93f87455e2f6b62873d33b3a9b"
  },
  {
    "url": "about/roadmap.html",
    "revision": "52392ded09d3e59643b6b82a1982a216"
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
    "url": "assets/js/10.052dac23.js",
    "revision": "198435b65c90e2345393420e6327196c"
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
    "url": "assets/js/18.1c434a64.js",
    "revision": "fce268ffb285584422ec5ea83d29c86a"
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
    "url": "assets/js/20.fcc944fc.js",
    "revision": "57919109c7a5ae27d41dff33794599c4"
  },
  {
    "url": "assets/js/21.46bd74e1.js",
    "revision": "9d7114ed561d7b3801d993ae96223fc0"
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
    "url": "assets/js/9.f0bff0e9.js",
    "revision": "a0448ff0ec6a783152c950bccb9de7d9"
  },
  {
    "url": "assets/js/app.37f57025.js",
    "revision": "de11962d47aa03d1e9637ecda27f3156"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "bdc5262bb37d6e6e20bde203cb54be88"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "2401e89721c4f0f49b95bfe868f10ce7"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "ec4010b5e944f907473e06f49f267ceb"
  },
  {
    "url": "index.html",
    "revision": "c4f81c42dd5e2de3500a8130a798b2ae"
  },
  {
    "url": "reference/api.html",
    "revision": "2736a5848079e4ec980fbe0489ee1f67"
  },
  {
    "url": "reference/configuration.html",
    "revision": "70e2d87774e4520821897abcb2cfd87b"
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
