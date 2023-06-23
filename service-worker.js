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
    "revision": "fdb4259d247aae5d667fa1aa7c24ec01"
  },
  {
    "url": "about/contact.html",
    "revision": "210422a7b3185db726c9c6d76a905880"
  },
  {
    "url": "about/contributing.html",
    "revision": "0417cd94daeb9112b464741f42fda99b"
  },
  {
    "url": "about/introduction.html",
    "revision": "d04084447bdac49eb7bcda0408572529"
  },
  {
    "url": "about/license.html",
    "revision": "bce709f10477680b9882efdf6197eca8"
  },
  {
    "url": "about/roadmap.html",
    "revision": "ca6591e074eb3576e1f51a3c5fe4e77a"
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
    "url": "assets/js/10.73a71374.js",
    "revision": "288db4fc49a683633369405bb638e24a"
  },
  {
    "url": "assets/js/11.06debaf7.js",
    "revision": "c84e09d3a0365c345253b344275b55d0"
  },
  {
    "url": "assets/js/12.c788a561.js",
    "revision": "14b576d6045c60e7780b77ca3e86c2cb"
  },
  {
    "url": "assets/js/13.888b7091.js",
    "revision": "1bcef65df6ff2ae574dcd3f6df8d982d"
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
    "url": "assets/js/23.19e71002.js",
    "revision": "7197ac8813486e13f6a405fe77608580"
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
    "url": "assets/js/5.feda81d9.js",
    "revision": "cf216dd4220f5812a2d129730f3d1954"
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
    "url": "assets/js/app.431cf27b.js",
    "revision": "b32b44d4d522bf89392359515ded9b08"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "62a01a4a2e245bec78c7196071726498"
  },
  {
    "url": "guides/customizing-kano.html",
    "revision": "02ff621b57a97662834acf03b74875fc"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "5524282425741e11c254492654172433"
  },
  {
    "url": "guides/installing-kano.html",
    "revision": "dae12fb8670d445e2a8e40aa3a7a9512"
  },
  {
    "url": "guides/kano-api.html",
    "revision": "bd87909fa2b01c7e794011d198a78622"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "d50e120eb1af22623ea8ab2bbcd0dc80"
  },
  {
    "url": "index.html",
    "revision": "4295edbf34e75a7aa98ef2152c8a1691"
  },
  {
    "url": "reference/api.html",
    "revision": "9adbae1bb809b156923ff69360f11f34"
  },
  {
    "url": "reference/configuration.html",
    "revision": "c80073cd25759d600c52feace0cbbf83"
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
