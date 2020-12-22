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
    "revision": "2f4e23331ba5d810e4d53d79d3244a7e"
  },
  {
    "url": "about/contact.html",
    "revision": "a8f9224db53d9ade8349f7693148d0d9"
  },
  {
    "url": "about/contributing.html",
    "revision": "ca54bc99d5853237cec8a684af475836"
  },
  {
    "url": "about/introduction.html",
    "revision": "057a845f5af5ef988a3ee321ab1adacf"
  },
  {
    "url": "about/license.html",
    "revision": "f6d52478faa6206038137a1ccded6351"
  },
  {
    "url": "about/roadmap.html",
    "revision": "05ed5f89f8c16944e94b6a42c7c4bbe0"
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
    "url": "assets/js/10.55d8ec1b.js",
    "revision": "dc7f4b72fd76c9b1b1a32ffef66256b9"
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
    "url": "assets/js/14.ca1c976a.js",
    "revision": "3b59be967d0e76aaa1cb853adbef02d1"
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
    "url": "assets/js/18.aa034e4c.js",
    "revision": "2fe6c05808329d97c69927d7f8d9732b"
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
    "url": "assets/js/9.b56c4bf0.js",
    "revision": "b5445405e1551ae10a19d634bd5974d6"
  },
  {
    "url": "assets/js/app.b691506f.js",
    "revision": "34ebe7fd34c1ae5883d19729e7a045ce"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "e0abba8d2a0cf07a5fb2e74670adbdf9"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "3755504158ec6f8be82cf72525565191"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "89d77f253dd178034ce97a0de71308ba"
  },
  {
    "url": "index.html",
    "revision": "1b7eaa4ddfd0a88ec7fee5aba3f2c956"
  },
  {
    "url": "reference/api.html",
    "revision": "a78dc5b3ab7a091cb8de6b85f7475f59"
  },
  {
    "url": "reference/configuration.html",
    "revision": "01181498b05851d220be0d6e93df3f7f"
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
