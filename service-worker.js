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
    "revision": "1a331efa81399cc1a191f181c8a505fd"
  },
  {
    "url": "about/contact.html",
    "revision": "e1536dea2fdcf9752145fd76be403ce6"
  },
  {
    "url": "about/contributing.html",
    "revision": "2b532686d52f43933de602cd15725048"
  },
  {
    "url": "about/introduction.html",
    "revision": "ef9875d85da96f3b8ead131d3a79d5d8"
  },
  {
    "url": "about/license.html",
    "revision": "479ca52a2f73b9fa9aa2b7eec5ece256"
  },
  {
    "url": "about/roadmap.html",
    "revision": "f8140a8e1e6c91818beecdb97a92e1fa"
  },
  {
    "url": "assets/css/0.styles.115df119.css",
    "revision": "567b537603cb179f668eeb9e80d3ad39"
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
    "url": "assets/js/10.53f923c8.js",
    "revision": "01e47602a284353bf6dbbad4286c141a"
  },
  {
    "url": "assets/js/11.230a8efd.js",
    "revision": "45496041e0cbe80940bb6306dec25a9c"
  },
  {
    "url": "assets/js/12.8d1223bd.js",
    "revision": "18fabf58c26c9402f92d35658196cdad"
  },
  {
    "url": "assets/js/13.42f5f6f6.js",
    "revision": "0941b077614ad21cd2e1dbcabbc43990"
  },
  {
    "url": "assets/js/14.81e37cd1.js",
    "revision": "82a9fab35747df93101378041eea011c"
  },
  {
    "url": "assets/js/15.0c4aac3b.js",
    "revision": "f943eed7131c8070cfaaf105240574d6"
  },
  {
    "url": "assets/js/16.a69c5949.js",
    "revision": "c32d15b322eec589b1790423b834c790"
  },
  {
    "url": "assets/js/17.350a7eb7.js",
    "revision": "ad0862d6ff96844a5c3841c5c829aca2"
  },
  {
    "url": "assets/js/18.0acb2525.js",
    "revision": "c70a0f77b326853ed2280c88afe36c70"
  },
  {
    "url": "assets/js/19.f8fd735e.js",
    "revision": "0b739ae8fbc39fa23504a46e76a92110"
  },
  {
    "url": "assets/js/2.72aaa9f5.js",
    "revision": "ff4b0732106d13399242a2f3589908af"
  },
  {
    "url": "assets/js/20.cdf89f4a.js",
    "revision": "ae3fcb704fb6a50061cd78a585a630da"
  },
  {
    "url": "assets/js/21.f7fa2867.js",
    "revision": "66490f1466eb62dbc4b8cb950ad377a4"
  },
  {
    "url": "assets/js/22.a2deebad.js",
    "revision": "14521e409687e335859a7259f152dede"
  },
  {
    "url": "assets/js/23.07caecfc.js",
    "revision": "cc82bbff5db7e53889753a36726a3d07"
  },
  {
    "url": "assets/js/24.450d8095.js",
    "revision": "ce43e9db834dfa2adb1a5833d25cbe08"
  },
  {
    "url": "assets/js/25.53c81840.js",
    "revision": "6f5107be94faee82bbbf0e2aa6e5a3b4"
  },
  {
    "url": "assets/js/26.1c2a7bda.js",
    "revision": "7f9cc94bf522041062a032eea3fa6439"
  },
  {
    "url": "assets/js/3.8a319d0a.js",
    "revision": "42c9307879304e90b60f4b6df4e8b41e"
  },
  {
    "url": "assets/js/4.281c020d.js",
    "revision": "57c43c0c2a5d2d7e35f2574fbedbb222"
  },
  {
    "url": "assets/js/5.5a4c1e1d.js",
    "revision": "57c5e8659ccf173def8d4998b910727f"
  },
  {
    "url": "assets/js/6.72cc9e0c.js",
    "revision": "1b5fcc14c85ec22cccc44f5ede66f2b1"
  },
  {
    "url": "assets/js/7.60820639.js",
    "revision": "94c1d2dce936a89cb45652830dfebe8a"
  },
  {
    "url": "assets/js/8.fe1cc5ff.js",
    "revision": "d273373f0e68ce4d99c66bd5b2785160"
  },
  {
    "url": "assets/js/9.0964cc15.js",
    "revision": "2e5c414e5a9c7c4101a416ab81d8f5bd"
  },
  {
    "url": "assets/js/app.8014d8da.js",
    "revision": "67373d66492d7b7ad34c80133449db67"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "a8b66fc184e009e6ea8bf7ac9d126f25"
  },
  {
    "url": "guides/customizing-kano.html",
    "revision": "b871aab9da15efdce7dc8a90d46b838b"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "36f0fcc8c6196b24c04a87e74bde778d"
  },
  {
    "url": "guides/installing-kano.html",
    "revision": "a114c2c4f544cb65a8c1d5d653dd1301"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "0d30de06e3c27a66f428fac5cc42dc87"
  },
  {
    "url": "index.html",
    "revision": "725d504ee802e7887ecd8d2282f0861c"
  },
  {
    "url": "local.js",
    "revision": "d61b602a8f8f19bbf0a7bb042e5c75c8"
  },
  {
    "url": "my-layers.js",
    "revision": "97c6024a2dc3a87b549dd34cbe060c6a"
  },
  {
    "url": "reference/api.html",
    "revision": "4a19826cc672bda96a5e45b07610b085"
  },
  {
    "url": "reference/configuration.html",
    "revision": "4c6b369c6aea579bfeb86928eee5726a"
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
