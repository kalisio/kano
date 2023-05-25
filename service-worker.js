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
    "revision": "7a7f56079eeaf7119b4871b3ea9e307a"
  },
  {
    "url": "about/contact.html",
    "revision": "60f8cb82fa217a79890118f043eac7ca"
  },
  {
    "url": "about/contributing.html",
    "revision": "f21f4c4defc76917c3d57106e7e8f87e"
  },
  {
    "url": "about/introduction.html",
    "revision": "d0a6132134231aa6561431d382710d03"
  },
  {
    "url": "about/license.html",
    "revision": "2486e6921e7482093b8f20536cb171d1"
  },
  {
    "url": "about/roadmap.html",
    "revision": "70fceddd6808fc27269570a0d1358b25"
  },
  {
    "url": "assets/css/0.styles.d1ec09a8.css",
    "revision": "6a0271c667fa4963c28e586d1fd9d796"
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
    "url": "assets/js/10.9b41e5ea.js",
    "revision": "64f627b37ce5f522971368335b9377bf"
  },
  {
    "url": "assets/js/11.08470120.js",
    "revision": "853e3bb33a819173da55aa68d9aa7996"
  },
  {
    "url": "assets/js/12.7f563567.js",
    "revision": "ae3c14e49fb18c5ac1ee1b4e1d545373"
  },
  {
    "url": "assets/js/13.3339197f.js",
    "revision": "2ef09a7b6f2db47b01f56738f55bae7d"
  },
  {
    "url": "assets/js/14.ffcbfb0f.js",
    "revision": "ae24ede5a0884457baf5f999dd3acdd0"
  },
  {
    "url": "assets/js/15.18ad442d.js",
    "revision": "96758d4b59d7c12def79c957e3d60bde"
  },
  {
    "url": "assets/js/16.68410a22.js",
    "revision": "f5da38ce59f1bb553f2d59b52f76f08e"
  },
  {
    "url": "assets/js/17.9806bcd3.js",
    "revision": "a1dead21ce569fa8981e2cd8c2dbc2c7"
  },
  {
    "url": "assets/js/18.2e361fdf.js",
    "revision": "45616e2c718df830f783c547ea51bdb4"
  },
  {
    "url": "assets/js/19.b7175f2a.js",
    "revision": "2be50665d04d2015b4ace5d554da3964"
  },
  {
    "url": "assets/js/2.e3e12afb.js",
    "revision": "0470fa1723e67120862a6b393f4881d0"
  },
  {
    "url": "assets/js/20.e07620cd.js",
    "revision": "9f81df089ef34ca4a4900c43c1a30833"
  },
  {
    "url": "assets/js/21.62d5c4bc.js",
    "revision": "ca2b0852330cbb3edb5014842567ee32"
  },
  {
    "url": "assets/js/22.78858b6e.js",
    "revision": "8a8f88af81d826cf355b8f2f7eed57ed"
  },
  {
    "url": "assets/js/23.f3b3f6f1.js",
    "revision": "48ad6e5e58b15975f39b5bbeb9616016"
  },
  {
    "url": "assets/js/24.c3243c5b.js",
    "revision": "17c4c67a69906bf89665ea8513e2dcdf"
  },
  {
    "url": "assets/js/25.58377fdb.js",
    "revision": "99f83f26cbdde2eb0d9e9182a301bc20"
  },
  {
    "url": "assets/js/26.1eb03d8f.js",
    "revision": "12a30fd971ecb95c8ba6e8dbb8cbd84c"
  },
  {
    "url": "assets/js/27.e40a42e7.js",
    "revision": "fbe47544e68677f52661b62fb03c1c96"
  },
  {
    "url": "assets/js/3.278c2319.js",
    "revision": "08b06cbbb0d9a3d6459691016ed081f7"
  },
  {
    "url": "assets/js/4.bf0a81b2.js",
    "revision": "add3f48ab1aed31d854981e254a535ef"
  },
  {
    "url": "assets/js/5.fd70421c.js",
    "revision": "b8a16e6df7303d092c4490a31e374752"
  },
  {
    "url": "assets/js/6.4ab8cca7.js",
    "revision": "c1147289f3a7d8606b5c0ec53e2c6ebe"
  },
  {
    "url": "assets/js/7.edfcac75.js",
    "revision": "7715a2d252e2d2b1c0ff3346c1419f1c"
  },
  {
    "url": "assets/js/8.47b55259.js",
    "revision": "cbb231e73d4546c38b1ce8e04924bea5"
  },
  {
    "url": "assets/js/9.fefef793.js",
    "revision": "7079dc3fbe0910b46ce10d77ee554284"
  },
  {
    "url": "assets/js/app.27412df5.js",
    "revision": "94f0af1725d017dbfd3ea4c93c26d9c7"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "bb774123b78c95b52b04265238018908"
  },
  {
    "url": "guides/customizing-kano.html",
    "revision": "516b36ca1854fa1e442fae23f7bf382b"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "36408b496cdff764f15b34fd756602e2"
  },
  {
    "url": "guides/installing-kano.html",
    "revision": "72619c1edabd1788f88ff4c007bd9198"
  },
  {
    "url": "guides/kano-api.html",
    "revision": "63b93ceeaa1a2049f9fe19b3665c6f1d"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "d1e387c70db28c306dea9d33abc20fae"
  },
  {
    "url": "index.html",
    "revision": "4c7906fcc7d8cc76d1ad17cb86875cbf"
  },
  {
    "url": "reference/api.html",
    "revision": "b403cf0120c20e0e772334264932c8ce"
  },
  {
    "url": "reference/configuration.html",
    "revision": "cd55c9e9bcd86a2a758765d0d6ed8556"
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
