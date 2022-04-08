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
    "revision": "a1742cee71e4ab326d9db6624357f452"
  },
  {
    "url": "about/contact.html",
    "revision": "222019344330699d08a07b074fadd124"
  },
  {
    "url": "about/contributing.html",
    "revision": "b73be2c9d85e06637e1a0d8c47b33a3e"
  },
  {
    "url": "about/introduction.html",
    "revision": "047bb9dabbad0f667d19c259a26b3477"
  },
  {
    "url": "about/license.html",
    "revision": "a27fe2ae0f0a1a9a90714a44c4c5ff6b"
  },
  {
    "url": "about/roadmap.html",
    "revision": "5932588db7b84544acbb87787ebc1e30"
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
    "url": "assets/js/10.3a2bee70.js",
    "revision": "c9509a424d3df7dac1bdcefefff79102"
  },
  {
    "url": "assets/js/11.03529bf9.js",
    "revision": "7dbb2fd987a109bc4413b971e8ada2a5"
  },
  {
    "url": "assets/js/12.ff48dabd.js",
    "revision": "7d5ae417dc095a38b04b9e5697ab2725"
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
    "url": "assets/js/18.0f35a021.js",
    "revision": "bcf067dc055b1632d6a5c2311d452a56"
  },
  {
    "url": "assets/js/19.9cd8a92a.js",
    "revision": "3aef8033b82c1ad077170fb6d709c49c"
  },
  {
    "url": "assets/js/2.dcc45cf2.js",
    "revision": "296444c686755f74c5e9abd025a29dbd"
  },
  {
    "url": "assets/js/20.589752f5.js",
    "revision": "2f8108416d2ef566aa8b38bf841cfb91"
  },
  {
    "url": "assets/js/21.c1b4270c.js",
    "revision": "c16006d3bc2c97511d416bdda450fc8b"
  },
  {
    "url": "assets/js/22.a304bf0e.js",
    "revision": "dbe381635c88ae6ca27d85f3fce4c314"
  },
  {
    "url": "assets/js/23.6635392f.js",
    "revision": "fd5a2772c08f6c4a0db04aea188b97d3"
  },
  {
    "url": "assets/js/24.971d20eb.js",
    "revision": "f1b23a421f8a1cc69bf7330c3e3b1c16"
  },
  {
    "url": "assets/js/25.7bb38aae.js",
    "revision": "2c524dbdb0dc246e99b0c422a675df75"
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
    "url": "assets/js/5.07f40ca8.js",
    "revision": "1d06059143b1cf28534fc7fea3bf32ba"
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
    "url": "assets/js/app.1d23ff2b.js",
    "revision": "4bee52e33911f02ec6f0cc6d4e62510b"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "e4b56b3dffef509400c7eaafbe5f3dd9"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "8c4fa1f81bf06d192bc4eabe6bc3de0d"
  },
  {
    "url": "guides/installing-kano.html",
    "revision": "62b02f5b1012f046c12dec1421ddd586"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "3c3ae71bd0cea33a6bd0508644c24639"
  },
  {
    "url": "index.html",
    "revision": "ab03eb7084356fe3367b15cdc9dad2ce"
  },
  {
    "url": "local.js",
    "revision": "d61b602a8f8f19bbf0a7bb042e5c75c8"
  },
  {
    "url": "my-layers.js",
    "revision": "9f402f70b98b571937fa55bd39dc8ee9"
  },
  {
    "url": "reference/api.html",
    "revision": "44082abca7c1a99e797f89b10eec468c"
  },
  {
    "url": "reference/configuration.html",
    "revision": "e2f0971fdf9df7fcbba1410b457ff3fa"
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
