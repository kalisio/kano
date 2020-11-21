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
    "revision": "b26ac7e3f1f73933364d9d63f1aab439"
  },
  {
    "url": "about/contact.html",
    "revision": "157ac153acd7c7e2b191cb5389832bb8"
  },
  {
    "url": "about/contributing.html",
    "revision": "6086c84eb393f234d410fb6f7a56e853"
  },
  {
    "url": "about/introduction.html",
    "revision": "ad08cf47f27f0a80b0909eea2a50c551"
  },
  {
    "url": "about/license.html",
    "revision": "e6be6d03f8d5f887d3284d14762173d7"
  },
  {
    "url": "about/roadmap.html",
    "revision": "7ccb90bee1a314ae8ff0ee3b90a86bc4"
  },
  {
    "url": "assets/css/0.styles.cdd4485d.css",
    "revision": "8549cdbf676521177ef4db5c23634b5a"
  },
  {
    "url": "assets/img/kano-components.281bbce1.png",
    "revision": "281bbce1d1da3a6231654e3afd3ac0ba"
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
    "url": "assets/js/10.9ea42f12.js",
    "revision": "dea904edddaed8f70a1d7838a33e8a27"
  },
  {
    "url": "assets/js/11.c8f537ad.js",
    "revision": "303c5f16894cfa3ad1dbac45d427e8a8"
  },
  {
    "url": "assets/js/12.0649f471.js",
    "revision": "b3e3e94c14290d4659f3f219f349aaaf"
  },
  {
    "url": "assets/js/13.9e2cace5.js",
    "revision": "62437046397a38623203107aacff2ca7"
  },
  {
    "url": "assets/js/14.672325f9.js",
    "revision": "8caac51aac2bf3a00242fc62f2877821"
  },
  {
    "url": "assets/js/15.eef4d95a.js",
    "revision": "1d05da4a4f2e662bf24644ad956ab77a"
  },
  {
    "url": "assets/js/16.57a517bd.js",
    "revision": "0d369ce5215a1f7c161d8063ed421bc6"
  },
  {
    "url": "assets/js/17.f392bf81.js",
    "revision": "2235d3c65264ac48589ca7e71c72be7c"
  },
  {
    "url": "assets/js/18.068401d9.js",
    "revision": "618c2dad181850def0f11db51341238e"
  },
  {
    "url": "assets/js/19.a99bff4f.js",
    "revision": "976ecfc9a4031546c2a43f7dbec17abf"
  },
  {
    "url": "assets/js/2.4e87fba6.js",
    "revision": "1b654ca6165cfad7efab7e7ea20f877b"
  },
  {
    "url": "assets/js/3.d9a8bf66.js",
    "revision": "0881e0adc651e92c136761d68cb0854b"
  },
  {
    "url": "assets/js/4.012724ec.js",
    "revision": "0237549b9386cbad6dbf631f05732b4e"
  },
  {
    "url": "assets/js/5.50eb6191.js",
    "revision": "5f0c60aaf4ef35992375e648805a1b19"
  },
  {
    "url": "assets/js/6.e06a4ad9.js",
    "revision": "bdce1620895964ee5649c14a5b9cb70b"
  },
  {
    "url": "assets/js/7.0b802c99.js",
    "revision": "0fc033e0e1a5901d5c5de95b7b3d1dd3"
  },
  {
    "url": "assets/js/8.a6076d44.js",
    "revision": "10c188de6082bfec8f00f273d59a16ad"
  },
  {
    "url": "assets/js/9.722eafc5.js",
    "revision": "646a835454d05dbf489e5ac804a416ae"
  },
  {
    "url": "assets/js/app.1bfbdf81.js",
    "revision": "7797d9031013448d70f6ce9a1967d130"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "0f8aba8ef7516e60e34394d4535042d8"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "c69b2839c2433c7a509d0dba858a0ff6"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "36bc93fe9c77419b113d0d9f223ce733"
  },
  {
    "url": "index.html",
    "revision": "4f7f5455125e8fc4e4f4b49742b6bd87"
  },
  {
    "url": "reference/api.html",
    "revision": "49565c610eb02b947bc7043fe28336ca"
  },
  {
    "url": "reference/configuration.html",
    "revision": "6b5a7bfd35707f4ea5643541a475cdbd"
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
