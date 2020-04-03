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
    "revision": "7017b84b4411cb81bd260c4ba9a48960"
  },
  {
    "url": "about/contact.html",
    "revision": "6ae7cc2a44de4dd88fbfc14777a91c9e"
  },
  {
    "url": "about/contributing.html",
    "revision": "f09735a99bf137456aabe9930617e8bc"
  },
  {
    "url": "about/introduction.html",
    "revision": "e729d815cf1e9f0a27a9a7d27525471a"
  },
  {
    "url": "about/license.html",
    "revision": "f1997c40a7960ed15e1732dbcae67c54"
  },
  {
    "url": "about/roadmap.html",
    "revision": "18ccd44a1c863690b73d92a6050c087d"
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
    "url": "assets/js/17.0fb71cae.js",
    "revision": "c14b17184901d03e417c68bf63ff16ce"
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
    "url": "assets/js/app.f1d6acd4.js",
    "revision": "c3c25bf30a50e30cf28e64af3001cdb1"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "6b46b90c96fd51dae71db1b045642c88"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "b19189739d60d46a9cffb179c703a52f"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "f6b0e98f0582a863fe0bfd4ae3de2384"
  },
  {
    "url": "index.html",
    "revision": "108fe7bfe4a942b01e1b77c11a30fca1"
  },
  {
    "url": "reference/api.html",
    "revision": "2c64c63d0ac56b2208dccfa514ce2f8c"
  },
  {
    "url": "reference/configuration.html",
    "revision": "a0bc538d0c43d888b465407dc3e6e5cf"
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
