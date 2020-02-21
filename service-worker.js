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
    "revision": "b2b55d8c221f3f9a0b126e14fe5788dd"
  },
  {
    "url": "about/contact.html",
    "revision": "bf59649ed9610c43ae4401fafa7c54b2"
  },
  {
    "url": "about/contributing.html",
    "revision": "fcdfd01a6b09e04ccb4d83327479ce67"
  },
  {
    "url": "about/introduction.html",
    "revision": "e150c5ac8ac386ef80188bdb4d4f3c73"
  },
  {
    "url": "about/license.html",
    "revision": "ea238894c7024fdad470eab70cc11a25"
  },
  {
    "url": "about/roadmap.html",
    "revision": "e46da7c8cfaf8c5d1eb2c8dd3819c718"
  },
  {
    "url": "assets/css/0.styles.fff2c21d.css",
    "revision": "3f18e0cb604a75884acf5568bce78757"
  },
  {
    "url": "assets/img/kano-screenshot.2b6d4bbf.png",
    "revision": "2b6d4bbfa0992bbbbaae5745b2a7db4b"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.d95a0b3b.js",
    "revision": "d0b7f8e6ade825834fa25783331d0666"
  },
  {
    "url": "assets/js/11.59ebd755.js",
    "revision": "a9b64d27bf57ae1822169b4cb1d1c932"
  },
  {
    "url": "assets/js/12.3577c5ed.js",
    "revision": "0878f4fc91a9520f24160c5470e9117e"
  },
  {
    "url": "assets/js/13.9e7465d2.js",
    "revision": "edc0c7c5160463a1f7bec127fcd53302"
  },
  {
    "url": "assets/js/14.cabe22c0.js",
    "revision": "bb807ad1028927279e4aa3816c080009"
  },
  {
    "url": "assets/js/15.6667658c.js",
    "revision": "19d6ea2ff89197f4751aebfb74acd1f8"
  },
  {
    "url": "assets/js/16.db65713d.js",
    "revision": "19d0637c95a17ca895bfae393b62b24a"
  },
  {
    "url": "assets/js/17.3427f132.js",
    "revision": "b60b6bf8b8e9bd6a766b83c4814b8e16"
  },
  {
    "url": "assets/js/2.3b36b8fe.js",
    "revision": "7e678fe35dfcadf884a455517a1c6d64"
  },
  {
    "url": "assets/js/3.7d5ad290.js",
    "revision": "46d59587b9a2ff379755dfac0d10166d"
  },
  {
    "url": "assets/js/4.339f8db2.js",
    "revision": "0bb1949cdefffd1bbc15a33ecc951319"
  },
  {
    "url": "assets/js/5.05848fef.js",
    "revision": "e662f8c09aed91fe84919e42b24395ad"
  },
  {
    "url": "assets/js/6.78351c61.js",
    "revision": "61ce0dcde003a40a55de07b5ee7a5150"
  },
  {
    "url": "assets/js/7.99c031ec.js",
    "revision": "07688665c20f23a65138ddd25c3506d7"
  },
  {
    "url": "assets/js/8.8d207d3f.js",
    "revision": "e458feeade97b6a4ac902877a550d2b3"
  },
  {
    "url": "assets/js/9.e37340cc.js",
    "revision": "a93754f6358b3f2828657a5c476a55f6"
  },
  {
    "url": "assets/js/app.bc54b8d0.js",
    "revision": "7ba3b774975b55b4957ccfc0e33ed9bc"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "4e974dfba81344eb12f5ccc88c92e958"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "4114ce0f0314fe40a86b41d4dafc5e57"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "c16a97061c0c4a051e4112225ac76f77"
  },
  {
    "url": "index.html",
    "revision": "456bb6241ed1d6cb85c09e072a85b36a"
  },
  {
    "url": "reference/api.html",
    "revision": "aa92903a5ee3ef2317bc9f803a063ac5"
  },
  {
    "url": "reference/configuration.html",
    "revision": "7fca6be89ed915397ced21fa1598f14b"
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
