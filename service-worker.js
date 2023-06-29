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
    "revision": "acdb4af8a1524818e81c258e5161b277"
  },
  {
    "url": "about/contact.html",
    "revision": "b035e30b1a83e265c10ab4ec4b039975"
  },
  {
    "url": "about/contributing.html",
    "revision": "38abb19ba583d5957719f69550d4c4f8"
  },
  {
    "url": "about/introduction.html",
    "revision": "17d527d8f32cab464d74135ee7ed4a7f"
  },
  {
    "url": "about/license.html",
    "revision": "b0514ca728aa9973230f2f79881eeca1"
  },
  {
    "url": "about/roadmap.html",
    "revision": "27e456be9e15794cfa9ef0ec795c58a4"
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
    "url": "assets/img/hubeau-installation.caeebce3.png",
    "revision": "caeebce3ea6fdbbeb4dde5dbc2bd2725"
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
    "url": "assets/img/weacast-installation.f0ba0ff1.png",
    "revision": "f0ba0ff1ba00eb7ea597c81bb4486f0b"
  },
  {
    "url": "assets/js/10.ff66544d.js",
    "revision": "7027b6370252c9d002cfd83ce6ec0db7"
  },
  {
    "url": "assets/js/11.523b55a5.js",
    "revision": "8a1fe09e969d72f0e825ccef01e7e252"
  },
  {
    "url": "assets/js/12.c46caaff.js",
    "revision": "0fc7f1b8f6b0526d96d17f09d3f602ee"
  },
  {
    "url": "assets/js/13.bd0d2f02.js",
    "revision": "30b031d83cfdf46d06ddaf5f506a34cf"
  },
  {
    "url": "assets/js/14.3741d9a4.js",
    "revision": "cca2f909e492486cbf75e3ddc405f401"
  },
  {
    "url": "assets/js/15.fe1f68cd.js",
    "revision": "df79d92632af62a24525f357ea14957c"
  },
  {
    "url": "assets/js/16.c062275a.js",
    "revision": "b8de00682d369bfe72db90d7b998ad45"
  },
  {
    "url": "assets/js/17.7e45e00a.js",
    "revision": "a9febf886db4b1b7d434b97d0d44a3b7"
  },
  {
    "url": "assets/js/18.ca7617f2.js",
    "revision": "7bedd774e19fad981807d94f07ed461c"
  },
  {
    "url": "assets/js/19.243847d9.js",
    "revision": "31b7fa79bc2c341929e60b62b75ab1b6"
  },
  {
    "url": "assets/js/2.efec6978.js",
    "revision": "53faccc98271b482c356c712e978a2b7"
  },
  {
    "url": "assets/js/20.c96ec8ea.js",
    "revision": "39881b43d3355101e2253ee9dcd7b171"
  },
  {
    "url": "assets/js/21.a1de5e6d.js",
    "revision": "36532b031693d9bd51ad9fc7fe447dfe"
  },
  {
    "url": "assets/js/22.788d1b33.js",
    "revision": "07391b53f16af07885ec5e627ffe9104"
  },
  {
    "url": "assets/js/23.d07facad.js",
    "revision": "0edae438ec86d935d4eb781815fb5b0b"
  },
  {
    "url": "assets/js/24.acd993f1.js",
    "revision": "394cc1fe639092b7a6825a193b2e2392"
  },
  {
    "url": "assets/js/25.fd34231a.js",
    "revision": "4252410fa6541a768d9ea653f75e2b14"
  },
  {
    "url": "assets/js/27.047bfc0d.js",
    "revision": "c0d5916f583b7284263266ecf4b46cd7"
  },
  {
    "url": "assets/js/28.4cbfeff4.js",
    "revision": "8093ed38ce3726bc486f1704db418990"
  },
  {
    "url": "assets/js/3.d6202c9a.js",
    "revision": "eb94d2061042f1d9e9b82b758998541e"
  },
  {
    "url": "assets/js/4.8afb5b97.js",
    "revision": "afaf04659c2579c3de1babdbd5914d31"
  },
  {
    "url": "assets/js/5.04634595.js",
    "revision": "82e8324fa87359a3d7e8b8b444b32f1f"
  },
  {
    "url": "assets/js/6.9c363e68.js",
    "revision": "5f8bae468d702141c149746e1c594d2a"
  },
  {
    "url": "assets/js/7.b89860ce.js",
    "revision": "e2c6a972af5a4971ec7c295680f22305"
  },
  {
    "url": "assets/js/8.f1ba6db4.js",
    "revision": "fbd2e713980adeef0aac7ecc6f3648a3"
  },
  {
    "url": "assets/js/9.7cc6c3f3.js",
    "revision": "06865d972325305c501b332fe7bcb11c"
  },
  {
    "url": "assets/js/app.0c401913.js",
    "revision": "8e7293b4b20677b0398ee595bfe2403d"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "7191a08214315d1c08ab945e2c36ce70"
  },
  {
    "url": "guides/customizing-kano.html",
    "revision": "93c5bf163d9c2a5f91344e5c1ea679f9"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "47d9ed6a13c83e35f7b17ac0522df18c"
  },
  {
    "url": "guides/installing-kano.html",
    "revision": "bb9ad666935839cc8469c2a1a3cf4c98"
  },
  {
    "url": "guides/kano-api.html",
    "revision": "f7889779ff0f1c1c4e1ed513e80c9683"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "59bba45466f0846453e38d26b1f29d22"
  },
  {
    "url": "index.html",
    "revision": "91fb484c7ddcd71efb5c7f7efb4dbc23"
  },
  {
    "url": "reference/api.html",
    "revision": "581cd0970d7b17cbba1cbd2e547cfae0"
  },
  {
    "url": "reference/configuration.html",
    "revision": "ade3608dd0dd1b4674309937f333252c"
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
