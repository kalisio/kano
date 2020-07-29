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
    "revision": "ccd06cd50dc55e32a674476a7e122f68"
  },
  {
    "url": "about/contact.html",
    "revision": "8bca6b6a4e3a6e2a093dafb28cb92599"
  },
  {
    "url": "about/contributing.html",
    "revision": "f15fe15eb9d4fbea357a9456ff396c09"
  },
  {
    "url": "about/introduction.html",
    "revision": "538e97894563931eea0cbe442b88409d"
  },
  {
    "url": "about/license.html",
    "revision": "b311f4a4a4591ab3857cefc46ab42c24"
  },
  {
    "url": "about/roadmap.html",
    "revision": "b6a9e0c3e53fb96c0bb2815a18e9e493"
  },
  {
    "url": "assets/css/0.styles.cdd4485d.css",
    "revision": "8549cdbf676521177ef4db5c23634b5a"
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
    "url": "assets/js/10.81bbd05f.js",
    "revision": "6b8ab612c92beef1dc4cc26f310a23c4"
  },
  {
    "url": "assets/js/11.9c674a35.js",
    "revision": "6aee3121a3e09b0955c1350e83deae77"
  },
  {
    "url": "assets/js/12.1a2fd7c3.js",
    "revision": "27b7e9742ab90f99ab8b678c75945fac"
  },
  {
    "url": "assets/js/13.e95bf20f.js",
    "revision": "ec84d0d2cb86d619196385c120126815"
  },
  {
    "url": "assets/js/14.aa2135b5.js",
    "revision": "d3b966d52abd9f85df33fc8ad43bde4d"
  },
  {
    "url": "assets/js/15.1d6618a1.js",
    "revision": "5b0cb8fa7cf383934d7c3bc9f9402c07"
  },
  {
    "url": "assets/js/16.2fd4ba97.js",
    "revision": "e0bb8f30a4cf0d9315ca674a0c661668"
  },
  {
    "url": "assets/js/17.14434c17.js",
    "revision": "70ad3dba72739f5aca0090715074650b"
  },
  {
    "url": "assets/js/18.90dde133.js",
    "revision": "554f2a8dabe839ca64465b367aa58cde"
  },
  {
    "url": "assets/js/19.ed1459d5.js",
    "revision": "aaccd9d9622282c675506f4a06d75fe8"
  },
  {
    "url": "assets/js/2.152a493a.js",
    "revision": "4d4d712b33ef70aea9fc1431279f383f"
  },
  {
    "url": "assets/js/3.7964aa4b.js",
    "revision": "beaed78c873d345744ee0fbb058eaeda"
  },
  {
    "url": "assets/js/4.812c3db4.js",
    "revision": "88a92042cfd2838310da6e20a67a2966"
  },
  {
    "url": "assets/js/5.289f55d9.js",
    "revision": "91e190b138266dfd21a4115675d13f64"
  },
  {
    "url": "assets/js/6.0f436cef.js",
    "revision": "89fea1ab04c8b20e5cfb8ee8441d87bb"
  },
  {
    "url": "assets/js/7.3a0e51d9.js",
    "revision": "de5002f68439ad0bc85099ef8cb7bc15"
  },
  {
    "url": "assets/js/8.1f952311.js",
    "revision": "9ac97261f92dd2876390fbfaa9436d0e"
  },
  {
    "url": "assets/js/9.88334582.js",
    "revision": "63cce31800091b4a99fb3973ae568833"
  },
  {
    "url": "assets/js/app.d5813b7c.js",
    "revision": "c60e61bea968b367886fa1e9675bffac"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "7f17d2fca2c75412d0bb6231ff59a797"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "1d8ca2b13f99d06c6948846bb359ba63"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "c89488f878f850450b03f906e8293d28"
  },
  {
    "url": "index.html",
    "revision": "9fc95c4ac576ecbcaf355949808ff89a"
  },
  {
    "url": "reference/api.html",
    "revision": "cd69657667ea00136083a53d40357c59"
  },
  {
    "url": "reference/configuration.html",
    "revision": "8a41dc172a805b32bf0e96cc9546707b"
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
