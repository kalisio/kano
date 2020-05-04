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
    "revision": "01b5335bfbb8ba3bae922f95bfe8c5e5"
  },
  {
    "url": "about/contact.html",
    "revision": "3f32ba922a41e7c129d71a1763e61636"
  },
  {
    "url": "about/contributing.html",
    "revision": "aaf4144c1cb47677c06b5afafa0a9bb1"
  },
  {
    "url": "about/introduction.html",
    "revision": "8e3eb5aa50d1c42cd40ad9dad42b3600"
  },
  {
    "url": "about/license.html",
    "revision": "88f00c8c3fac7258079f063d73ce60c5"
  },
  {
    "url": "about/roadmap.html",
    "revision": "56cea7993f7a24e2061cc45dd74f435e"
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
    "url": "assets/js/9.de807a29.js",
    "revision": "7a3d1fa190dd4568dab3f516071bd6f4"
  },
  {
    "url": "assets/js/app.3dec440e.js",
    "revision": "bed58204c4ffb69bd8d910b5a8e64d94"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "f7968d3262e79e663286769cfb4c8a83"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "afdf43618c901b57d916ef71a136be71"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "70d0aa41098867223a93c08add96cc9e"
  },
  {
    "url": "index.html",
    "revision": "716ca6159fb2a1a3a3a1a4c66d2d8c29"
  },
  {
    "url": "reference/api.html",
    "revision": "61713dd1b786ff976d3e26ca68d86a67"
  },
  {
    "url": "reference/configuration.html",
    "revision": "3501de6736256d0a5bc012dd2aee576a"
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
