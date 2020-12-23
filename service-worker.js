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
    "revision": "11285e58734b9a6e8ea3af900c337d60"
  },
  {
    "url": "about/contact.html",
    "revision": "adaed801c47fdbd2fead2fb04fae89d4"
  },
  {
    "url": "about/contributing.html",
    "revision": "b6eb94b404c71e75e04298b52fe79f19"
  },
  {
    "url": "about/introduction.html",
    "revision": "10428bebfe7dd376ddd6c675e2095d9b"
  },
  {
    "url": "about/license.html",
    "revision": "fa7f3ca81f55376b43fc85065ee3e3da"
  },
  {
    "url": "about/roadmap.html",
    "revision": "6534cfc135a7b242d6b75ed4f544f938"
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
    "url": "assets/js/app.482bc461.js",
    "revision": "aaf18f6be227d0540e8fd8cdad36c00d"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "051a50f5915cd7fca1e4bc9ef04f6b54"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "1c4f99ee575b5f4ea0512bf001dad1d2"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "b13247e58dea4ab2fd23deba45e19b7d"
  },
  {
    "url": "index.html",
    "revision": "d246ef47baa3bb118f56a0f397e4a42b"
  },
  {
    "url": "reference/api.html",
    "revision": "a6cc95f81a7100907eeebfeac7d10f31"
  },
  {
    "url": "reference/configuration.html",
    "revision": "4747949e25b9c74ac4ffb8577f2a50d3"
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
