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
    "revision": "6ec00f4088980495502897f38c4f30c6"
  },
  {
    "url": "about/contact.html",
    "revision": "3f34270d06cb0e6e230d2711389d184e"
  },
  {
    "url": "about/contributing.html",
    "revision": "91e1cb11d4d841c34c3efc71639b755c"
  },
  {
    "url": "about/introduction.html",
    "revision": "0c079cd44d315a2be202fc1d585d0a4e"
  },
  {
    "url": "about/license.html",
    "revision": "efbebea71a39aebd2b6f393aabd24a56"
  },
  {
    "url": "about/roadmap.html",
    "revision": "397ea9eede1aea4ac87b367d5c51464e"
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
    "url": "assets/js/app.33295135.js",
    "revision": "72cd953516f82a2b3b3fba8831f4c39b"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "09921489938c19259876896fc8a0cf83"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "bf1f4630284cbb35dd08b595af0d9663"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "bd45ce0fa879f4aee6452342527e0ef5"
  },
  {
    "url": "index.html",
    "revision": "5a54af8cfb399c189d95f8c75bd9395b"
  },
  {
    "url": "reference/api.html",
    "revision": "e842cb339569641eeefe378a55183c2d"
  },
  {
    "url": "reference/configuration.html",
    "revision": "baf2051c40b92de87d659ac5f58df9e5"
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
