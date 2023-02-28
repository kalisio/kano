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
    "revision": "983c6046c4ea889decb1a3d3c01147dc"
  },
  {
    "url": "about/contact.html",
    "revision": "c265c211947d0bbfc28a560f76389a09"
  },
  {
    "url": "about/contributing.html",
    "revision": "73d34f9f4e350b57e75753f903efedef"
  },
  {
    "url": "about/introduction.html",
    "revision": "f248944522f5dcd93b383fe0bb1a0a12"
  },
  {
    "url": "about/license.html",
    "revision": "fd387c7032d311c93fa7bc33a074e954"
  },
  {
    "url": "about/roadmap.html",
    "revision": "bc2e4e880ba1185be8e02e06748e7c9b"
  },
  {
    "url": "assets/css/0.styles.d1ec09a8.css",
    "revision": "6a0271c667fa4963c28e586d1fd9d796"
  },
  {
    "url": "assets/img/kano-components.281bbce1.png",
    "revision": "281bbce1d1da3a6231654e3afd3ac0ba"
  },
  {
    "url": "assets/img/kano-installation.bfcc84a4.png",
    "revision": "bfcc84a40b98f561acb9133a40a87bcf"
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
    "url": "assets/js/10.bcb63c4f.js",
    "revision": "e4f569be1e4b36ede4db0fea4f80ca65"
  },
  {
    "url": "assets/js/11.a4866ba2.js",
    "revision": "ab50f17ec47116fe5129c0bded7174bd"
  },
  {
    "url": "assets/js/12.cb79ef89.js",
    "revision": "f546d0ab1a7afd97095f3a4518638438"
  },
  {
    "url": "assets/js/13.9f304f41.js",
    "revision": "89046e0d209d638c84eecadb6e860497"
  },
  {
    "url": "assets/js/14.ef6a6fba.js",
    "revision": "e89edf53736a42bb3e9d3717bf7b2771"
  },
  {
    "url": "assets/js/15.99efcbc3.js",
    "revision": "fb5fb8809d9b9780fc50c5f3a603276f"
  },
  {
    "url": "assets/js/16.07c05a94.js",
    "revision": "c4a97f0d208bdf30743c537ac8aa8cab"
  },
  {
    "url": "assets/js/17.d77503f0.js",
    "revision": "9251d141d56124ee1550f6dbb32303b7"
  },
  {
    "url": "assets/js/18.8603d375.js",
    "revision": "2d5948fdf2d32fef5736c8ecdf044eaa"
  },
  {
    "url": "assets/js/19.75842ddc.js",
    "revision": "b72403ce322531196e45b7a31fae2e8d"
  },
  {
    "url": "assets/js/2.37645233.js",
    "revision": "98d6b70d5d9e7bafc50c24756768662e"
  },
  {
    "url": "assets/js/20.c59c5a39.js",
    "revision": "851168e1c4b84f87a490099935da06c3"
  },
  {
    "url": "assets/js/21.fce70cf3.js",
    "revision": "9ea4d51d7d07cdfd5b8a4bca9891bc9b"
  },
  {
    "url": "assets/js/22.b3ab36da.js",
    "revision": "5960c06ab49f3dddf4ca790c6ed65f93"
  },
  {
    "url": "assets/js/23.4942fe56.js",
    "revision": "2021ac97e80b00075975195711113281"
  },
  {
    "url": "assets/js/24.7d7782ad.js",
    "revision": "fa4e73de3550fa2a0c7f0a328e36d4b6"
  },
  {
    "url": "assets/js/25.53ee270b.js",
    "revision": "c18bf838380ceded267c93a7f0a36e77"
  },
  {
    "url": "assets/js/26.938ee502.js",
    "revision": "df21d4fe3c63ee4df2cee3aff0581b39"
  },
  {
    "url": "assets/js/3.7c4e88e5.js",
    "revision": "ebfcfe57b9af63f921dd227d5a8dc2a0"
  },
  {
    "url": "assets/js/4.d2b79aec.js",
    "revision": "a084678a6e8f7f3933559bf754195322"
  },
  {
    "url": "assets/js/5.14da82af.js",
    "revision": "ae19d840879e86d63441a50b37203821"
  },
  {
    "url": "assets/js/6.bc5ffcad.js",
    "revision": "a69577873b2b2e9072d635d2aed3c853"
  },
  {
    "url": "assets/js/7.198a05ac.js",
    "revision": "4c238cbd6427c6aa266f06a3c75f183b"
  },
  {
    "url": "assets/js/8.1ea2a240.js",
    "revision": "8160bfe3fa65a4ad72cd52e88b7dc0f1"
  },
  {
    "url": "assets/js/9.cbdb3658.js",
    "revision": "3b4e99350589b58f3aec9d8e2f88915b"
  },
  {
    "url": "assets/js/app.2f60f2f6.js",
    "revision": "94574875159dcf3b936e157d4e5a5e8e"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "66da137c875741a52024f33c50fa4321"
  },
  {
    "url": "guides/customizing-kano.html",
    "revision": "d87f954bb3916118170621368ad69132"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "7f47cd0b25d2c1dfa9062b5438ddcd17"
  },
  {
    "url": "guides/installing-kano.html",
    "revision": "9445dddd94ebc72c9203dbe8bb6fa977"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "6917f799ad37cd52145d96f53695cd38"
  },
  {
    "url": "index.html",
    "revision": "ec3320811d9b13ab3cd5aa31ca5402fe"
  },
  {
    "url": "reference/api.html",
    "revision": "7d53757f9a1e70e0719622d38e20cb4d"
  },
  {
    "url": "reference/configuration.html",
    "revision": "ce97b07b9fda6983212a0ad0e03754f4"
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
