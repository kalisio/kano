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
    "revision": "c66b3277589561520b37cb83600ff7cf"
  },
  {
    "url": "about/contact.html",
    "revision": "464f9ecdfadfa43e73aeb07d327809f7"
  },
  {
    "url": "about/contributing.html",
    "revision": "16cbdeee7d3131ce3a3c917570bb94bb"
  },
  {
    "url": "about/introduction.html",
    "revision": "ec00a0393c56bf01ce5d545fd3c70939"
  },
  {
    "url": "about/license.html",
    "revision": "5582e4b79de5a509378280e562fe0f4d"
  },
  {
    "url": "about/roadmap.html",
    "revision": "b1165b571a0d6ceb9a2714f460f994cf"
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
    "url": "assets/js/10.ccfbf97d.js",
    "revision": "4e774b29ada4571c69fb7a935a6e9382"
  },
  {
    "url": "assets/js/11.5f54ffdf.js",
    "revision": "88ef6fe83dd70175adf902c480562a5d"
  },
  {
    "url": "assets/js/12.13029cd7.js",
    "revision": "071ce7be8222994f44a974e2d0f1a696"
  },
  {
    "url": "assets/js/13.d79daec9.js",
    "revision": "adb73936bd9287cd4ff2f7fd93cf0ec2"
  },
  {
    "url": "assets/js/14.0696301b.js",
    "revision": "f5b80f547ecaef5df448fdbffc2444f7"
  },
  {
    "url": "assets/js/15.83a54f28.js",
    "revision": "1e33ebad0b1751f8e6b8d517e9c367b1"
  },
  {
    "url": "assets/js/16.3eabaf33.js",
    "revision": "8965262d090185383834cae47e9994cd"
  },
  {
    "url": "assets/js/17.31896ead.js",
    "revision": "e2bce342e3b3586aa45921577bdb9c2d"
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
    "url": "assets/js/5.ee981082.js",
    "revision": "542440056866c1cb8314da3708e15f28"
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
    "url": "assets/js/9.b3189330.js",
    "revision": "efbd235c5e2a81d6bd792ef5695b753d"
  },
  {
    "url": "assets/js/app.3dd2366b.js",
    "revision": "b390d59ddcbf6a90d8303e66103593d8"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "eb10a43724207431ab1a67d084c93866"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "bd7675ad5594a57edc1ef1e2aa40294b"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "25d4ce22ccb352bb3b0a770884c46658"
  },
  {
    "url": "index.html",
    "revision": "3f7481ba5fab3791192ba32baa7c4930"
  },
  {
    "url": "reference/api.html",
    "revision": "6e536594b6c67dd5dbf6b9fbf3b52909"
  },
  {
    "url": "reference/configuration.html",
    "revision": "d7a79da9edd5309b560d572bffda9f1e"
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
