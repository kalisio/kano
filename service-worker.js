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
    "revision": "476d573450622d29ece07fbb5ba78ed5"
  },
  {
    "url": "about/contact.html",
    "revision": "8c352e0ae807a456e3241b7751102383"
  },
  {
    "url": "about/contributing.html",
    "revision": "d92fa452346d6edfdf31f5bcec9c5abb"
  },
  {
    "url": "about/introduction.html",
    "revision": "88604cfe5a3f9262bc4e7bf8955bc266"
  },
  {
    "url": "about/license.html",
    "revision": "3753b1d97be5afa3af9f16fc50795b4b"
  },
  {
    "url": "about/roadmap.html",
    "revision": "7d28f68b06a85e42019a0486300a1036"
  },
  {
    "url": "assets/css/0.styles.185e5d0b.css",
    "revision": "8b73b7848b2913fde69822d22673dc2c"
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
    "url": "assets/js/10.3c0a93ca.js",
    "revision": "2385fc51ac4b34acf8f989987a5e36fb"
  },
  {
    "url": "assets/js/11.30308204.js",
    "revision": "1032806063e6e332c5d0ee4016fa1d5c"
  },
  {
    "url": "assets/js/12.6f38fb9b.js",
    "revision": "1c4925de8716408385eee6e1d02c29b5"
  },
  {
    "url": "assets/js/13.694bbb09.js",
    "revision": "0555892c67b2c5fd4ce6271ad82136d0"
  },
  {
    "url": "assets/js/14.22039893.js",
    "revision": "2f33b65ff4ed858818f81ee6aa6f4e9d"
  },
  {
    "url": "assets/js/15.66a16b78.js",
    "revision": "2f75f7e26d2fdde395c752a98ccb421b"
  },
  {
    "url": "assets/js/16.d056b3a2.js",
    "revision": "b711053de6aa3fabb4f10241c1d800ab"
  },
  {
    "url": "assets/js/17.9ae51943.js",
    "revision": "39ed73a7c840fbdcf817183d4c47265c"
  },
  {
    "url": "assets/js/18.5dbf808b.js",
    "revision": "6b4e0b3b82e8e4bde6f884cb85303eb9"
  },
  {
    "url": "assets/js/19.4dc18adc.js",
    "revision": "71f769c090545bce48024016671ce5bf"
  },
  {
    "url": "assets/js/2.c486a646.js",
    "revision": "92edcf613f40f2f8efe8c56c18dba71b"
  },
  {
    "url": "assets/js/20.7385a0ea.js",
    "revision": "2a4f72816fc9a1857b1a5b8b6764fdbd"
  },
  {
    "url": "assets/js/21.5f76b672.js",
    "revision": "958eaad33b7e8200715ff89e4157ef69"
  },
  {
    "url": "assets/js/22.a755eb8d.js",
    "revision": "f76bb30fcdd05cb437ecc97b8cf474ce"
  },
  {
    "url": "assets/js/23.3960ba89.js",
    "revision": "f2e61f0f475df742ea02b19ffb4e5ccc"
  },
  {
    "url": "assets/js/24.e39e8b6c.js",
    "revision": "6d071f865d746029eb4642eeed1f2186"
  },
  {
    "url": "assets/js/25.515af4f3.js",
    "revision": "8ff9d9afa471f05342f8b7f36bb8fe14"
  },
  {
    "url": "assets/js/3.4c00beac.js",
    "revision": "b38d407c121d2c5f4cb14065f9c52a26"
  },
  {
    "url": "assets/js/4.3e614c16.js",
    "revision": "3a0e6fcfc7e97fac05f6fa98f041c6ac"
  },
  {
    "url": "assets/js/5.17de683f.js",
    "revision": "1a1a2509794fbee960de5cd8ef6615ba"
  },
  {
    "url": "assets/js/6.960284e4.js",
    "revision": "b31f0dcff6b63d6aaa812ed032ce6f0c"
  },
  {
    "url": "assets/js/7.5487d1f1.js",
    "revision": "3a9d19fb02fa9bde31a78740ed9db419"
  },
  {
    "url": "assets/js/8.3ea32b71.js",
    "revision": "724282099de59079513ae7339063d565"
  },
  {
    "url": "assets/js/9.7278b170.js",
    "revision": "24433021307b93424be5f6c92e014265"
  },
  {
    "url": "assets/js/app.0932346c.js",
    "revision": "c2824711eec09d8426bb6b305f14816b"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "ef723a1f5d2b3e765c5b4aa36c4f4a69"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "47f6618aca5b3586639c7c4cb1155baf"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "b808cc2a92345eaf0cbbfbca981cab2e"
  },
  {
    "url": "index.html",
    "revision": "313f20bdf8341642369542ab64818b00"
  },
  {
    "url": "reference/api.html",
    "revision": "7f623de396b9dca269e1baaea4c4b931"
  },
  {
    "url": "reference/configuration.html",
    "revision": "3483e51b91ce35710dd00479ec3a2ec6"
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
