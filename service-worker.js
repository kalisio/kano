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
    "revision": "e83977b54a78aac8a78d16083b707935"
  },
  {
    "url": "about/contact.html",
    "revision": "1462a25c4b409ac456691995dccce46b"
  },
  {
    "url": "about/contributing.html",
    "revision": "b60bc1b4c5692b36bc29e070881647e6"
  },
  {
    "url": "about/introduction.html",
    "revision": "cbae337168ec759c52367ed585ca9f00"
  },
  {
    "url": "about/license.html",
    "revision": "3d03076347c81972f92d0cc8dbb71738"
  },
  {
    "url": "about/roadmap.html",
    "revision": "f5b3005908518e8cf9b4403e953eaf15"
  },
  {
    "url": "assets/css/0.styles.cdd4485d.css",
    "revision": "8549cdbf676521177ef4db5c23634b5a"
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
    "url": "assets/js/10.9ea42f12.js",
    "revision": "dea904edddaed8f70a1d7838a33e8a27"
  },
  {
    "url": "assets/js/11.8cf0f675.js",
    "revision": "e33c31f577f6fd29375c8dc212502e9a"
  },
  {
    "url": "assets/js/12.e67c2774.js",
    "revision": "eb033040e570c673c1605d20f4300cfb"
  },
  {
    "url": "assets/js/13.177ca055.js",
    "revision": "6b4cef92edab7c68dbf3441df4f8d055"
  },
  {
    "url": "assets/js/14.672325f9.js",
    "revision": "8caac51aac2bf3a00242fc62f2877821"
  },
  {
    "url": "assets/js/15.eef4d95a.js",
    "revision": "1d05da4a4f2e662bf24644ad956ab77a"
  },
  {
    "url": "assets/js/16.f329fa05.js",
    "revision": "7be7fc8b5f29647dc397b2ced021443a"
  },
  {
    "url": "assets/js/17.60123428.js",
    "revision": "3d7b46e11eac2baa460a227ebae6cd62"
  },
  {
    "url": "assets/js/18.068401d9.js",
    "revision": "618c2dad181850def0f11db51341238e"
  },
  {
    "url": "assets/js/19.a99bff4f.js",
    "revision": "976ecfc9a4031546c2a43f7dbec17abf"
  },
  {
    "url": "assets/js/2.4e87fba6.js",
    "revision": "1b654ca6165cfad7efab7e7ea20f877b"
  },
  {
    "url": "assets/js/3.d9a8bf66.js",
    "revision": "0881e0adc651e92c136761d68cb0854b"
  },
  {
    "url": "assets/js/4.012724ec.js",
    "revision": "0237549b9386cbad6dbf631f05732b4e"
  },
  {
    "url": "assets/js/5.b3686441.js",
    "revision": "ddbc67ef06d006411bee57d0d8395d1d"
  },
  {
    "url": "assets/js/6.3537b684.js",
    "revision": "55bf93e371fc556f88764f320f0cc90a"
  },
  {
    "url": "assets/js/7.7837b9f4.js",
    "revision": "695abce44a65cb6f2c1f9d01417be369"
  },
  {
    "url": "assets/js/8.a6076d44.js",
    "revision": "10c188de6082bfec8f00f273d59a16ad"
  },
  {
    "url": "assets/js/9.722eafc5.js",
    "revision": "646a835454d05dbf489e5ac804a416ae"
  },
  {
    "url": "assets/js/app.fca2fbbf.js",
    "revision": "0a0e3595c57cf94abec2fa1514cd6c05"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "584f4f46d69bedb1880c1b73156ed0d8"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "c53bfa6d38cdd6345ea03ed28468c7ac"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "1e75c2f7861423fd7f35473ff1c8717d"
  },
  {
    "url": "index.html",
    "revision": "c081fbe473ab8071b22ae6ae7274d919"
  },
  {
    "url": "reference/api.html",
    "revision": "fce5f330121f8373023dfbf4cfac02ab"
  },
  {
    "url": "reference/configuration.html",
    "revision": "8fe08b6f1e8016aff605fe7f8f9d2736"
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
