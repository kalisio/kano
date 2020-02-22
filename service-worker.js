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
    "revision": "f222c18267f185bbe835b71b7d1b8456"
  },
  {
    "url": "about/contact.html",
    "revision": "2579d394108e3eed71f269942a21ee83"
  },
  {
    "url": "about/contributing.html",
    "revision": "a7d6f3481dfeb7334a5649b68cff82bb"
  },
  {
    "url": "about/introduction.html",
    "revision": "859918845f2c1ccba6265ddaf9d36d94"
  },
  {
    "url": "about/license.html",
    "revision": "5ba7e273c704e9320ed681f2f247de19"
  },
  {
    "url": "about/roadmap.html",
    "revision": "f19a9a73e7133cb2a97612a4e94337b2"
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
    "url": "assets/js/10.fd31af73.js",
    "revision": "4c775b92be2847b9796f297bf89a9a0b"
  },
  {
    "url": "assets/js/11.5f54ffdf.js",
    "revision": "88ef6fe83dd70175adf902c480562a5d"
  },
  {
    "url": "assets/js/12.6f32cd49.js",
    "revision": "d865402eb32d80007231b9537cca15f5"
  },
  {
    "url": "assets/js/13.9c2082cc.js",
    "revision": "5d8722ffd65a5caa1db8763554baa72f"
  },
  {
    "url": "assets/js/14.f813f6c9.js",
    "revision": "3cdc1cae1ea4f454fcf3fe6de0f438ce"
  },
  {
    "url": "assets/js/15.adca4878.js",
    "revision": "e62aff35074fb531b921a8ed4452239b"
  },
  {
    "url": "assets/js/16.ea94cc60.js",
    "revision": "7ed0acb935b0850ee364e50ad0a8a75b"
  },
  {
    "url": "assets/js/17.4c9c4cec.js",
    "revision": "ba51c54ba7efc8b7c55721f1bad5432e"
  },
  {
    "url": "assets/js/18.a61b639f.js",
    "revision": "ae4d7e013c44fffeba1676076b21f18c"
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
    "url": "assets/js/4.f8739072.js",
    "revision": "8031b0a3089315ad664cfd322a23e5e7"
  },
  {
    "url": "assets/js/5.35d4035f.js",
    "revision": "e1ab26dd3feb14f78b18f32f98b20b00"
  },
  {
    "url": "assets/js/6.e630bb9f.js",
    "revision": "94fd0bf790ff4f65fb7480dda1b397b4"
  },
  {
    "url": "assets/js/7.62f0c0f7.js",
    "revision": "abb339b171ceaa97c6b20ac5ce040cf4"
  },
  {
    "url": "assets/js/8.2a2a3f52.js",
    "revision": "92465267541f01f2047d96a942183017"
  },
  {
    "url": "assets/js/9.96713510.js",
    "revision": "c68626bd92046e59fa57f526cd26c698"
  },
  {
    "url": "assets/js/app.f91068c8.js",
    "revision": "c51414f9ce99d6b18580d2e0037d0985"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "d9ae6c5abe1044a8c52e8f5b15841ddb"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "8eb9b14dd75f268d4cc5f0f8a8ecda35"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "c25d56b458a8e7e25654f540f18bd128"
  },
  {
    "url": "index.html",
    "revision": "fa20adb4dd64e8a6ce9086832b3acb75"
  },
  {
    "url": "reference/api.html",
    "revision": "539b8ee2f1cdbe00d74059f85eb7e9fa"
  },
  {
    "url": "reference/configuration.html",
    "revision": "45103d2a40090793683d43091549a74f"
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
