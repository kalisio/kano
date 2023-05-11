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
    "revision": "829672f87ec9fcba62bd55ce3a6726a8"
  },
  {
    "url": "about/contact.html",
    "revision": "b26a9d86a8718648d0f9d66c9ca708f5"
  },
  {
    "url": "about/contributing.html",
    "revision": "083943e36cc31f47bccb7cf8a382657c"
  },
  {
    "url": "about/introduction.html",
    "revision": "64ff2a687388ae0733de40479496af1d"
  },
  {
    "url": "about/license.html",
    "revision": "a10be9a460e39bd891f486a3c59d8818"
  },
  {
    "url": "about/roadmap.html",
    "revision": "21421e822c9c85864569b20d187707bf"
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
    "url": "assets/js/10.8d4e53ea.js",
    "revision": "ddb26a82357a22dbaaf5e58747267692"
  },
  {
    "url": "assets/js/11.2ccf5be2.js",
    "revision": "3b7d29b38299e6874136309afe2199f4"
  },
  {
    "url": "assets/js/12.132019ab.js",
    "revision": "4272a2fef57f96eab8fe12fff7f5ce00"
  },
  {
    "url": "assets/js/13.f1ad4689.js",
    "revision": "0d7e1d7a17cfa75a74818c4c4222648f"
  },
  {
    "url": "assets/js/14.bb2e373e.js",
    "revision": "d15fca1fa072f20fe4b27b63d1fb8cf0"
  },
  {
    "url": "assets/js/15.00cefd42.js",
    "revision": "2776686cc591fc2586694675c2e31d3a"
  },
  {
    "url": "assets/js/16.7f7c26e8.js",
    "revision": "d8454de0d8b55edfd284ebd8e12f9973"
  },
  {
    "url": "assets/js/17.b4e01f1a.js",
    "revision": "ebb4d8da76f63f73665e7e3c8a90b309"
  },
  {
    "url": "assets/js/18.d3ef47c0.js",
    "revision": "aaaf9009ebebf1110c4f0a96fd5fe643"
  },
  {
    "url": "assets/js/19.c0914811.js",
    "revision": "6c79487c1a235a560da3a9f6af7dceb2"
  },
  {
    "url": "assets/js/2.c39cf7f0.js",
    "revision": "a0243aee84b352cef27d4338aa9ab4f3"
  },
  {
    "url": "assets/js/20.02a7913e.js",
    "revision": "2c23435a65d2592e3c41e1d4a1097753"
  },
  {
    "url": "assets/js/21.527d25bc.js",
    "revision": "2f31db16863fadc612137afec77b8889"
  },
  {
    "url": "assets/js/22.43492189.js",
    "revision": "3dfa9b6eed460e1f61f9329c0c41d3ee"
  },
  {
    "url": "assets/js/23.e6eb0021.js",
    "revision": "23aab45aee4ec5ee8ba314d19d04896b"
  },
  {
    "url": "assets/js/24.61a1899f.js",
    "revision": "be1e89bd4bbb36829cb1921854ac5279"
  },
  {
    "url": "assets/js/25.fdc2cb85.js",
    "revision": "18e275a0b7b1ff0a86ac44ea9c8843b5"
  },
  {
    "url": "assets/js/26.364ee830.js",
    "revision": "8ec937707afd13eaf7c2429625275f6f"
  },
  {
    "url": "assets/js/3.4a14a5fa.js",
    "revision": "bbd38ab260e52154483e96a7b8262278"
  },
  {
    "url": "assets/js/4.940eff30.js",
    "revision": "dcd4690fcfbc99d3abd10d155ed99793"
  },
  {
    "url": "assets/js/5.6956b8f0.js",
    "revision": "2ac2fa41f4124e4b12e07c3252b72b1f"
  },
  {
    "url": "assets/js/6.a37922b3.js",
    "revision": "cbf5c8b0cb728c5f785d3d28232eb6e0"
  },
  {
    "url": "assets/js/7.1ae5bebf.js",
    "revision": "350eb1181393cf24846256ff69207ece"
  },
  {
    "url": "assets/js/8.983d7a96.js",
    "revision": "c0869d1a1e60293eb881adbaa1a25f19"
  },
  {
    "url": "assets/js/9.39afd16b.js",
    "revision": "b6375d8300f17dbeee679889081bd920"
  },
  {
    "url": "assets/js/app.ebc1edf8.js",
    "revision": "a9efd74ec72ff2e942c9e4fba8f13be5"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "f444297f5f9ca21fec795b4c43315a0a"
  },
  {
    "url": "guides/customizing-kano.html",
    "revision": "6ad99ef6e2df397ce806666fe21c71e8"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "9e689a90ae8bbd879d0c034bae487147"
  },
  {
    "url": "guides/installing-kano.html",
    "revision": "86610458d01570f2fe1957e9a504ab9f"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "b31e67d062027fc23d1cf928979acbf7"
  },
  {
    "url": "index.html",
    "revision": "4ffb56773e1514639c214ce3f038c3f9"
  },
  {
    "url": "reference/api.html",
    "revision": "a290fd29799c5c3f5163a88e85e9bdc0"
  },
  {
    "url": "reference/configuration.html",
    "revision": "cbe81e880f6c8d788dedfabca13f8715"
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
