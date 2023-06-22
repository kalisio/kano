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
    "revision": "7c25c8b4881a00d1410856d16ce3387b"
  },
  {
    "url": "about/contact.html",
    "revision": "be6597402cfba2eaa0f8a48e8839c076"
  },
  {
    "url": "about/contributing.html",
    "revision": "75a80e2fdfece248ba90d81b91b4f37a"
  },
  {
    "url": "about/introduction.html",
    "revision": "a008bf3f9a26d9a411077a00f95ffb3d"
  },
  {
    "url": "about/license.html",
    "revision": "16d2be60de5bd30b3fdc60929d7fb4de"
  },
  {
    "url": "about/roadmap.html",
    "revision": "28948d5f4233d469b57c86568bb9a346"
  },
  {
    "url": "assets/css/0.styles.a3ae50c2.css",
    "revision": "7ce06a10bdc697379b97b761d4802742"
  },
  {
    "url": "assets/img/grafana-rte-architecture.38f90550.png",
    "revision": "38f90550bd0e841496536f6ec21e3388"
  },
  {
    "url": "assets/img/grafana-rte-details.6e8e4d1c.png",
    "revision": "6e8e4d1c2ed7df9e7b7e22204874beea"
  },
  {
    "url": "assets/img/grafana-rte-overview.1e46dc5a.png",
    "revision": "1e46dc5af4359a70e7062b6490c775d4"
  },
  {
    "url": "assets/img/kano-components.281bbce1.png",
    "revision": "281bbce1d1da3a6231654e3afd3ac0ba"
  },
  {
    "url": "assets/img/kano-covid-19-layers-3D.03da5215.png",
    "revision": "03da52154b48ed21b843e1fcde364a76"
  },
  {
    "url": "assets/img/kano-covid-19-layers.52e949e8.png",
    "revision": "52e949e850d99ce80cf4aaee8146ec6a"
  },
  {
    "url": "assets/img/kano-file-layers.a0f67c66.png",
    "revision": "a0f67c66007afc822e22392d6d112bf1"
  },
  {
    "url": "assets/img/kano-installation.bfcc84a4.png",
    "revision": "bfcc84a40b98f561acb9133a40a87bcf"
  },
  {
    "url": "assets/img/kano-ogc-layers.00dcca9c.png",
    "revision": "00dcca9c7e76a43991cd0a89c533af4e"
  },
  {
    "url": "assets/img/kano-rte.4abe3aab.jpg",
    "revision": "4abe3aaba5305122df7a6382b55476cc"
  },
  {
    "url": "assets/img/kano-screenshot.b497d7cf.png",
    "revision": "b497d7cf9c1c251461efe52328e9bb6b"
  },
  {
    "url": "assets/img/kano-sensors-layers.b8ce7d75.png",
    "revision": "b8ce7d75bc9b6d3b5badfe0917374642"
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
    "url": "assets/js/10.ce068dd7.js",
    "revision": "5fbc219d67d71be51c4e52b97031a429"
  },
  {
    "url": "assets/js/11.06debaf7.js",
    "revision": "c84e09d3a0365c345253b344275b55d0"
  },
  {
    "url": "assets/js/12.c39e57d7.js",
    "revision": "21205a5875b733ec8d5ea4436c67c1ca"
  },
  {
    "url": "assets/js/13.ee096c3a.js",
    "revision": "b1d68dae83fbd86566be23801f9f889f"
  },
  {
    "url": "assets/js/14.fa3819dd.js",
    "revision": "619e426ddc243dabda23e097ee6ed6a3"
  },
  {
    "url": "assets/js/15.d0995b7e.js",
    "revision": "eab19155fd78745d79dc3abc17373759"
  },
  {
    "url": "assets/js/16.70381cf9.js",
    "revision": "3cc2dcca91f6760267f34b067a76ff54"
  },
  {
    "url": "assets/js/17.3b014dfe.js",
    "revision": "13473fea637c2995cf6937a66be794af"
  },
  {
    "url": "assets/js/18.e06a587d.js",
    "revision": "744979777df36a98f5a006d2553a1375"
  },
  {
    "url": "assets/js/19.337e0be4.js",
    "revision": "615a6303693ce2847d20cb91aa10ae06"
  },
  {
    "url": "assets/js/2.7897599c.js",
    "revision": "ec44f5de1cccb931edadf7d331ca4472"
  },
  {
    "url": "assets/js/20.76efdce8.js",
    "revision": "5a263be23774c9167029b4a538d6dfc9"
  },
  {
    "url": "assets/js/21.d8edd03f.js",
    "revision": "9fda23e99de1a109e767cccdacb02fcf"
  },
  {
    "url": "assets/js/22.1a67d7ed.js",
    "revision": "b9e2594f065dc61bfea584dee0e0fc08"
  },
  {
    "url": "assets/js/23.9e171ee8.js",
    "revision": "5fd01fd5dbc7433d050bf6cfef87c1c8"
  },
  {
    "url": "assets/js/24.8c82e054.js",
    "revision": "d88fca8a2899cf79d08cd11c355232eb"
  },
  {
    "url": "assets/js/25.cabc61cb.js",
    "revision": "4a4983e9d28345b22b51ecef6047e5e8"
  },
  {
    "url": "assets/js/27.07d5d5aa.js",
    "revision": "4a220fd22673feb83e2bb952280361c8"
  },
  {
    "url": "assets/js/28.cba869f5.js",
    "revision": "2041065e9c41d06379edf17bea8b3ce6"
  },
  {
    "url": "assets/js/3.b9c7b6af.js",
    "revision": "25df4a2b39a6879e8f9209b22c858b2c"
  },
  {
    "url": "assets/js/4.0d4b3b7a.js",
    "revision": "1d817a1ec984c08932efcc6eea36af64"
  },
  {
    "url": "assets/js/5.6dfa8220.js",
    "revision": "421626292a023346a84a1bd43d7ef885"
  },
  {
    "url": "assets/js/6.d7eb46ad.js",
    "revision": "e55d2769835e8382be8c7bed8e2aaaa5"
  },
  {
    "url": "assets/js/7.15569f83.js",
    "revision": "bd0ec1a029a055f3b3b29f5c4373f811"
  },
  {
    "url": "assets/js/8.13830906.js",
    "revision": "845c1210d8c5c4420af09bf8a07e08d4"
  },
  {
    "url": "assets/js/9.f82d5afe.js",
    "revision": "1357e5f885376722ae9698e4f186b953"
  },
  {
    "url": "assets/js/app.cd45f676.js",
    "revision": "33db6e1031f413a902ae873411e1602b"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "7b758d058e39cccf05c2065449bfb1e3"
  },
  {
    "url": "guides/customizing-kano.html",
    "revision": "cac2ec44f53234118c241cefbdb2b1a7"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "477fd97251ea9c0b6e4ba825d62502e8"
  },
  {
    "url": "guides/installing-kano.html",
    "revision": "78b2766b08baeda4daebb91a7ebd6903"
  },
  {
    "url": "guides/kano-api.html",
    "revision": "b1a80b937f4bceb4e6781694c777f849"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "ac6c508d0069cb40d2047895fb8d75f5"
  },
  {
    "url": "index.html",
    "revision": "23c983ee70ed0f62a3072029840c8c97"
  },
  {
    "url": "reference/api.html",
    "revision": "a176800c06b43750fdd6fbc4f0b5ad3a"
  },
  {
    "url": "reference/configuration.html",
    "revision": "0b43059497b263ddb04aa5a204756acb"
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
