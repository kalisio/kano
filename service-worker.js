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
    "revision": "99a94d95dbac1ae5f47c88387806e921"
  },
  {
    "url": "about/contact.html",
    "revision": "63c15a8768ee73042f0e9faf45f0bc08"
  },
  {
    "url": "about/contributing.html",
    "revision": "4893610c2cc70b45ba4026b65c9d0733"
  },
  {
    "url": "about/introduction.html",
    "revision": "5b17da441c6f1e8a79e13cc419d7c5e8"
  },
  {
    "url": "about/license.html",
    "revision": "f9967b859d24953682b7fd80e8ef1528"
  },
  {
    "url": "about/roadmap.html",
    "revision": "7da4d6f76299626e4d525d2a15cba3ea"
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
    "url": "assets/js/10.4f94ac3f.js",
    "revision": "3204fbab6723cd05796444ec3bd333ce"
  },
  {
    "url": "assets/js/11.8b3f1c12.js",
    "revision": "2688522c05d11fd6107a492bb3f2e2ce"
  },
  {
    "url": "assets/js/12.1c45dcab.js",
    "revision": "abb4223c30d3feabde4e49b24089447b"
  },
  {
    "url": "assets/js/13.065455cd.js",
    "revision": "ea608fc596a033060224fbf2cf7b8533"
  },
  {
    "url": "assets/js/14.8dddbf11.js",
    "revision": "2e730e6062c483e7b2a98aa7b3891715"
  },
  {
    "url": "assets/js/15.08b31a2e.js",
    "revision": "c1b5ba8f54485d65defbb1e8036fe7de"
  },
  {
    "url": "assets/js/16.0f9e037c.js",
    "revision": "80968a12a6d62426a91429d0e5a6c542"
  },
  {
    "url": "assets/js/17.f5bd28a7.js",
    "revision": "af9e863f2ddd344857433d5b95e4d113"
  },
  {
    "url": "assets/js/18.69c2f844.js",
    "revision": "30c18de363ab02d5459711a3a89ec753"
  },
  {
    "url": "assets/js/19.c602178f.js",
    "revision": "f8eed947ae26841c80dba5ef88c1854a"
  },
  {
    "url": "assets/js/2.def827b9.js",
    "revision": "fc2ba1764fd6f2e6aa4e13cd6d24f595"
  },
  {
    "url": "assets/js/20.d58c7e15.js",
    "revision": "5047e1e56c122a9a836244dc3a3e0556"
  },
  {
    "url": "assets/js/21.da63df49.js",
    "revision": "418ca030092d903dc9f94bb24eafcf78"
  },
  {
    "url": "assets/js/22.dd80c8b2.js",
    "revision": "faf1127878aa93c5eae6c22227df3746"
  },
  {
    "url": "assets/js/23.91d7fb10.js",
    "revision": "7a0346692cf6d2d56f702be2e78a4f4e"
  },
  {
    "url": "assets/js/24.a773c2f2.js",
    "revision": "a29bcaa37a08bf8e582e15bfb84b2570"
  },
  {
    "url": "assets/js/25.22f883fd.js",
    "revision": "b7d9493eed31f0f70909b1637a4af0d6"
  },
  {
    "url": "assets/js/26.e2e80dd0.js",
    "revision": "fcaa9b923d509adebd72728361d7eb7f"
  },
  {
    "url": "assets/js/3.73723b4e.js",
    "revision": "5bbb622b71a0ba75074dbdabe91f4995"
  },
  {
    "url": "assets/js/4.a8f8801a.js",
    "revision": "db61373fd472cc4060dfddf125d670ab"
  },
  {
    "url": "assets/js/5.cf96d9c0.js",
    "revision": "85d9f8d40811932f26495baedabf4b8f"
  },
  {
    "url": "assets/js/6.7ff2cb4e.js",
    "revision": "8fd60d3c980b7269558631a8762a76ec"
  },
  {
    "url": "assets/js/7.4450af35.js",
    "revision": "0bf7b3cf2e6283a33e496af99474fdd5"
  },
  {
    "url": "assets/js/8.3c4b0630.js",
    "revision": "3acce1ed794be3f3177248c1bd2414f5"
  },
  {
    "url": "assets/js/9.4e38fd8c.js",
    "revision": "f06fd340697251cced55953aadd1248b"
  },
  {
    "url": "assets/js/app.5f21b54f.js",
    "revision": "b7a241556037e8c06b77c0365dcbe8b7"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "b15dfbe6dfcc0930fac76edb1a0abecc"
  },
  {
    "url": "guides/customizing-kano.html",
    "revision": "565c85a04ca67d41a628af01afdfd39e"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "57b469adaa46e37d23c17cdb2623565b"
  },
  {
    "url": "guides/installing-kano.html",
    "revision": "de011d88d5c58249fd16a0ae447dab81"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "d543f87c6377c5a7f29a1bc0fc584780"
  },
  {
    "url": "index.html",
    "revision": "e5f352dcf98e83a672d36792af54844c"
  },
  {
    "url": "reference/api.html",
    "revision": "894be867157537b2cd71f404751be442"
  },
  {
    "url": "reference/configuration.html",
    "revision": "0e6b83bca842de1bd06f84f5153fcd29"
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
