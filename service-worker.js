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
    "revision": "4705f1c857144da4cc84d9ac1c560523"
  },
  {
    "url": "about/contact.html",
    "revision": "982486c2964c5c3e9536affbfe1973b5"
  },
  {
    "url": "about/contributing.html",
    "revision": "ee23854c4012fb520c35c832a6dbbe1a"
  },
  {
    "url": "about/introduction.html",
    "revision": "76f15b87b5d35bccc41b20c0703cef10"
  },
  {
    "url": "about/license.html",
    "revision": "f8e6f4e82ab1f98d58542889e4629b2e"
  },
  {
    "url": "about/roadmap.html",
    "revision": "e9b560d9590123ae898dcc150a2882fb"
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
    "url": "assets/js/app.a361d2e5.js",
    "revision": "0bcbcc7adf48dc22a0a10800abfe27bb"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "5f1d8b5fc5d6a7b4eae3c15e8a8e69e9"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "9af875862162f2486cf64e338b954e3a"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "70666ec498b34ec4bec1d44ca50d1cf3"
  },
  {
    "url": "index.html",
    "revision": "0217b27de23d741be1abb758c487cb4a"
  },
  {
    "url": "reference/api.html",
    "revision": "6737377144a2fd5679835a42425e84a1"
  },
  {
    "url": "reference/configuration.html",
    "revision": "d059626d2f42ce26806be797f82fcd15"
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
