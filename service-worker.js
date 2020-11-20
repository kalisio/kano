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
    "revision": "62693d3ecb25d17823e5789865960be0"
  },
  {
    "url": "about/contact.html",
    "revision": "d6c845dd1bf31986d2ec5b4a36945d2f"
  },
  {
    "url": "about/contributing.html",
    "revision": "f1a399ee96a4ba6ed462203e283e67ba"
  },
  {
    "url": "about/introduction.html",
    "revision": "e6073f8e730e0255c3d2aa845cb1b43b"
  },
  {
    "url": "about/license.html",
    "revision": "a69a9791486d497e357d9eedd3210fa1"
  },
  {
    "url": "about/roadmap.html",
    "revision": "c8962ef1a32288afcf06925a7660c082"
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
    "url": "assets/js/16.57a517bd.js",
    "revision": "0d369ce5215a1f7c161d8063ed421bc6"
  },
  {
    "url": "assets/js/17.f392bf81.js",
    "revision": "2235d3c65264ac48589ca7e71c72be7c"
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
    "url": "assets/js/6.e06a4ad9.js",
    "revision": "bdce1620895964ee5649c14a5b9cb70b"
  },
  {
    "url": "assets/js/7.0b802c99.js",
    "revision": "0fc033e0e1a5901d5c5de95b7b3d1dd3"
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
    "url": "assets/js/app.74b63bc0.js",
    "revision": "56e58524783e3004f25b1cc75b76c40e"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "15d67750dc88ca1c112d5dd43665e8ee"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "947be9e0e9e79b83be7e0d242334f1a6"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "15a6e582c10c1592dedbd5c89c686e24"
  },
  {
    "url": "index.html",
    "revision": "5077680789fdebb3b983a7a2d8b10d3a"
  },
  {
    "url": "reference/api.html",
    "revision": "9d3dbc8fd2b2426571171acc880106f7"
  },
  {
    "url": "reference/configuration.html",
    "revision": "1c7532d2bd0104abce8aa01f0b343280"
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
