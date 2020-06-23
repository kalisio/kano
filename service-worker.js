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
    "revision": "7fd28ff934e235a280eca7b80ffe16f2"
  },
  {
    "url": "about/contact.html",
    "revision": "2a6be40d1a7b69ecb898f1778a93bd80"
  },
  {
    "url": "about/contributing.html",
    "revision": "0aa18b7fb63137b769e6ec558276f9a6"
  },
  {
    "url": "about/introduction.html",
    "revision": "513d60ae9ce8df04caeaa269187a57cf"
  },
  {
    "url": "about/license.html",
    "revision": "6108eeee28e2c6c193a2f92573e1f1a9"
  },
  {
    "url": "about/roadmap.html",
    "revision": "5e6ac10ff956a057ba74f88813fb0a64"
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
    "url": "assets/js/10.4e1e246f.js",
    "revision": "df058e0abb5a882ac2885ebbf3e7dbc3"
  },
  {
    "url": "assets/js/11.8e2b7142.js",
    "revision": "b2718197fbfdd256ad6182cbc7ecb493"
  },
  {
    "url": "assets/js/12.47b6819e.js",
    "revision": "80d75a8853f5bb7c9c03b2e2b2c8bcb4"
  },
  {
    "url": "assets/js/13.8f314768.js",
    "revision": "0d122942d120b8ed4c505cb3396e7bc4"
  },
  {
    "url": "assets/js/14.ea559124.js",
    "revision": "8b0c781d3b5fb19a49f4fd5e7f63b3b3"
  },
  {
    "url": "assets/js/15.1f87c6d9.js",
    "revision": "6fab7c9b52db3cc988c44e00fff162a1"
  },
  {
    "url": "assets/js/16.1a118f2f.js",
    "revision": "52af6695c79c42f4b7223cf63f780906"
  },
  {
    "url": "assets/js/17.41bbab5a.js",
    "revision": "6e359373663e285cbe9f94a603ade119"
  },
  {
    "url": "assets/js/18.9a5449b1.js",
    "revision": "f94f18121d2f8751a5ce0d8af6c0c034"
  },
  {
    "url": "assets/js/19.e033e349.js",
    "revision": "23dd95c1c578f81af031a4a34cdeaf84"
  },
  {
    "url": "assets/js/2.4213bfb0.js",
    "revision": "836e3395f0999db04d606212fe7cd167"
  },
  {
    "url": "assets/js/3.0bd06729.js",
    "revision": "6a0806e8a22e341c09214b9343591e9e"
  },
  {
    "url": "assets/js/4.3c5afdf5.js",
    "revision": "bce91879a21602d7f2f1fe9b3835c334"
  },
  {
    "url": "assets/js/5.d89342f8.js",
    "revision": "50a1021bbc66d0e3fad8133a9642a4f5"
  },
  {
    "url": "assets/js/6.41b587b7.js",
    "revision": "433f5a72b6fe84adecdb094fcbcab957"
  },
  {
    "url": "assets/js/7.05e19b01.js",
    "revision": "d2a4cb0eb15e94fc3efb2205a6ef0584"
  },
  {
    "url": "assets/js/8.0730485c.js",
    "revision": "13327b455a50ceb8ec607ae76890ad72"
  },
  {
    "url": "assets/js/9.4860933c.js",
    "revision": "b1f1632b75fe7e62ae5cc0d88218018b"
  },
  {
    "url": "assets/js/app.4ccb2c3c.js",
    "revision": "cd60c97e84bb59deda7a77e7e2dd31f2"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "b59634f21415d695f77a1bfff2319da8"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "6da808cd0a865e44a8a7e75c89f6c441"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "2f12ffa266e70c42cddf9e1548b86f6f"
  },
  {
    "url": "index.html",
    "revision": "94c1c4390f3edb45d05a2acfe1992861"
  },
  {
    "url": "reference/api.html",
    "revision": "c7ae0b66b87739ed1b934d759aa5322a"
  },
  {
    "url": "reference/configuration.html",
    "revision": "42b0518fa4056d2f3dea3139249a262f"
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
