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
    "revision": "7abb1988b3019f1c196da2d0277d2849"
  },
  {
    "url": "about/contact.html",
    "revision": "6d551e9c1048ac8ac807fa1e5ead19e8"
  },
  {
    "url": "about/contributing.html",
    "revision": "3bf840aa4b1d091812da795fd04abdcd"
  },
  {
    "url": "about/introduction.html",
    "revision": "e90f25e6c79a4337e321e58f1a606267"
  },
  {
    "url": "about/license.html",
    "revision": "2961a6442e3c8b1a59afe494367e1313"
  },
  {
    "url": "about/roadmap.html",
    "revision": "c76fb0f8ccd61df3bca3241f4c2295e5"
  },
  {
    "url": "assets/css/0.styles.082ff60f.css",
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
    "url": "assets/js/10.ea1bff34.js",
    "revision": "870d59701b3bbf5851bedfec1cc5a873"
  },
  {
    "url": "assets/js/11.7a233730.js",
    "revision": "b622f2fbe2e1eb06a76c208810fe2764"
  },
  {
    "url": "assets/js/12.7ca28c19.js",
    "revision": "8f137bd5c47215f0371d08bcf56733bc"
  },
  {
    "url": "assets/js/13.e963ad5e.js",
    "revision": "a718082641d85326ea7ebde5005776eb"
  },
  {
    "url": "assets/js/14.c640e7e7.js",
    "revision": "0df1aa6b0f212a06c8b361ca424a163d"
  },
  {
    "url": "assets/js/15.8ac19cab.js",
    "revision": "b7b3099d0b0c488b9aa19381b6f80fbc"
  },
  {
    "url": "assets/js/16.ea94cc60.js",
    "revision": "7ed0acb935b0850ee364e50ad0a8a75b"
  },
  {
    "url": "assets/js/17.91e9d2d0.js",
    "revision": "f70eb8dc946b3e1cbfbaef56965ce681"
  },
  {
    "url": "assets/js/18.01f81efa.js",
    "revision": "003232bf5205171a2d50cce77e3be0d2"
  },
  {
    "url": "assets/js/19.22431170.js",
    "revision": "5288a7dacc311de538d053ce8ff48c28"
  },
  {
    "url": "assets/js/2.22f3cf03.js",
    "revision": "ed61744e779f4e29f9526460a6d60388"
  },
  {
    "url": "assets/js/20.06eabe83.js",
    "revision": "f43c1a36ba1477b99f69594b2c096a03"
  },
  {
    "url": "assets/js/3.5fd83cbf.js",
    "revision": "367aac5ba2961688dce1122522e00e7d"
  },
  {
    "url": "assets/js/4.dd846b71.js",
    "revision": "51a5050943a9b8eb556eec9aed565fd7"
  },
  {
    "url": "assets/js/5.00ba5636.js",
    "revision": "ba2c45910d2a38822f2c101236fb13ab"
  },
  {
    "url": "assets/js/6.1cc7ff4c.js",
    "revision": "ce1cda7c35b8db0f25a91dab45127a17"
  },
  {
    "url": "assets/js/7.d45bd771.js",
    "revision": "e873138e442e540463bec92b2bff63bb"
  },
  {
    "url": "assets/js/8.e5e126b4.js",
    "revision": "2f78f40200204e0308a779668a8e00f2"
  },
  {
    "url": "assets/js/9.c09b0d29.js",
    "revision": "69f5983744880298469079af537a6a77"
  },
  {
    "url": "assets/js/app.f440fd78.js",
    "revision": "85a44f9e0e8b1e9729c7f3937cf276da"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "5472c22eac60d31a4f82d14f4dbde739"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "df648b039316e380e2659e9a9b0df807"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "60a8996f45d015d11ee34d5a043d4025"
  },
  {
    "url": "index.html",
    "revision": "3c6a02950f6c6ff12ee23702d0686ea6"
  },
  {
    "url": "reference/api.html",
    "revision": "a4023a5d73ea02dbadfccd35b0228710"
  },
  {
    "url": "reference/configuration.html",
    "revision": "8055f4bc074a2412bf7a11ad36e8959e"
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