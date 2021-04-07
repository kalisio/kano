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
    "revision": "e8a63bc3684399a7b1b47a7527a43bc8"
  },
  {
    "url": "about/contact.html",
    "revision": "49dbffd3779aa444ae38c5e4f8103d9f"
  },
  {
    "url": "about/contributing.html",
    "revision": "69090a53089721bb77f306cb443de1d9"
  },
  {
    "url": "about/introduction.html",
    "revision": "d83dba4d37148172ee25313b82315d2e"
  },
  {
    "url": "about/license.html",
    "revision": "c796b57265cde6a58256cfd4f6ead590"
  },
  {
    "url": "about/roadmap.html",
    "revision": "8f7622b337434903b5f1b3a5e92b942c"
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
    "url": "assets/js/13.ca2b9fa1.js",
    "revision": "601c45f58edd44c676f97240f22a9a4a"
  },
  {
    "url": "assets/js/14.a2b324e1.js",
    "revision": "75b550902d46d22c1e755dd3220ff109"
  },
  {
    "url": "assets/js/15.9bbd50db.js",
    "revision": "fbead732846508e4e102f01f5a6d7131"
  },
  {
    "url": "assets/js/16.44dac775.js",
    "revision": "b9a970c58c281038c2c9cae9a8413c7a"
  },
  {
    "url": "assets/js/17.9e98a625.js",
    "revision": "48ba920e427ced0dd17ebdd8f13a8b5a"
  },
  {
    "url": "assets/js/18.1ab9354d.js",
    "revision": "fdc391c4f64fcc2aa0d68b28aef55625"
  },
  {
    "url": "assets/js/19.906b4498.js",
    "revision": "f6115c19dddb3f6ae7cc4fef71f8cfe0"
  },
  {
    "url": "assets/js/2.dcc45cf2.js",
    "revision": "296444c686755f74c5e9abd025a29dbd"
  },
  {
    "url": "assets/js/20.98eddd6f.js",
    "revision": "5171ae908d9aad3c70014532237c961e"
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
    "url": "assets/js/8.23c5b8a0.js",
    "revision": "efd589cb3e55f5c7af3af1869e4e0147"
  },
  {
    "url": "assets/js/9.3e172d96.js",
    "revision": "29c8391357e8b01ab072c808e26656f7"
  },
  {
    "url": "assets/js/app.d8219798.js",
    "revision": "8e1ada79b77e9b373a08e1c3c0eff6f0"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "0ebc91539137060415e95c4559c64e26"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "7337a360118ff7b31ad3ee6f051ed9a9"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "4992d916322c33aa135c8421a31aebcc"
  },
  {
    "url": "index.html",
    "revision": "8446d44e0d3cce4e73cdd831276cdd54"
  },
  {
    "url": "reference/api.html",
    "revision": "caebdd563b3c095735d56d3c5f8342f9"
  },
  {
    "url": "reference/configuration.html",
    "revision": "28176615112e5752b5fd4c3d3a9fa27d"
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
