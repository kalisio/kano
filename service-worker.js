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
    "revision": "be04bf9448d058b87dd0a1389b89eea5"
  },
  {
    "url": "about/contact.html",
    "revision": "5c46bcc10f36659eb0aa4613dccc91b7"
  },
  {
    "url": "about/contributing.html",
    "revision": "466e11b37f0acf979e2843b2a9bfce8f"
  },
  {
    "url": "about/introduction.html",
    "revision": "6cd7415bf11f830fab5bba5ddaf8146b"
  },
  {
    "url": "about/license.html",
    "revision": "288a23110dca546b44b2f0044e483ec2"
  },
  {
    "url": "about/roadmap.html",
    "revision": "9714c309090cd28b4d7791cccc6476b5"
  },
  {
    "url": "assets/css/0.styles.cdd4485d.css",
    "revision": "8549cdbf676521177ef4db5c23634b5a"
  },
  {
    "url": "assets/img/kano-components.3e3830a1.png",
    "revision": "3e3830a14b45912839e8f34fe5bb4c76"
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
    "url": "assets/js/10.ad3e25bc.js",
    "revision": "69dc71452d7dea8786d3835f6ff290a5"
  },
  {
    "url": "assets/js/11.a81db617.js",
    "revision": "920c47eda10bb9a4ca40698ca9c9bd78"
  },
  {
    "url": "assets/js/12.61f3ccd7.js",
    "revision": "549e1cc7ed91a43142f4bbe1e07329d9"
  },
  {
    "url": "assets/js/13.c16743b3.js",
    "revision": "d7644bf5d65ab8e4138d6f35960802f2"
  },
  {
    "url": "assets/js/14.00ec3d7f.js",
    "revision": "51e8b29390367b0b178c2c6664d680ee"
  },
  {
    "url": "assets/js/15.8961250e.js",
    "revision": "e54abbfc2cdafdb137f4e8654b1ca254"
  },
  {
    "url": "assets/js/16.c8743988.js",
    "revision": "39964219e390c70ba70271ca3181ee66"
  },
  {
    "url": "assets/js/17.ab075fe0.js",
    "revision": "f00e9325d741ff168c2877e8b48f4cff"
  },
  {
    "url": "assets/js/18.b1f28b09.js",
    "revision": "8637507ba16a25359510f07097028906"
  },
  {
    "url": "assets/js/19.1761d51a.js",
    "revision": "c9c9d5d9c91acbc4a76f674890760956"
  },
  {
    "url": "assets/js/2.3a0cead2.js",
    "revision": "191670bffd2c8009def21b460d00e616"
  },
  {
    "url": "assets/js/3.e5425bc9.js",
    "revision": "ec385dd55c5aa424a2830bbd802de4f2"
  },
  {
    "url": "assets/js/4.ee60b431.js",
    "revision": "e02eb71c6804462147f0fcb5c051498d"
  },
  {
    "url": "assets/js/5.a5152bf8.js",
    "revision": "3c92bdb421eeecd96bfb75d0f32ee23c"
  },
  {
    "url": "assets/js/6.eb76727d.js",
    "revision": "c4aa111411470c19cfc45030506e2411"
  },
  {
    "url": "assets/js/7.3658d3f9.js",
    "revision": "d909dd69c78fb97061ae562b83c43949"
  },
  {
    "url": "assets/js/8.b6ecc4d1.js",
    "revision": "00b08c9b2ec8c549e2aecf3a46c5b492"
  },
  {
    "url": "assets/js/9.2138219e.js",
    "revision": "dbf2439390c4e33edc30e48cbcce7df4"
  },
  {
    "url": "assets/js/app.298ba9db.js",
    "revision": "cee46413c4ca676ea8a4b4927731a1d6"
  },
  {
    "url": "guides/advanced-usage.html",
    "revision": "77db6a499a38b043596c5ec5e351ef80"
  },
  {
    "url": "guides/getting-started.html",
    "revision": "9a8d042c63910b4d1b16c37a1ea7482a"
  },
  {
    "url": "guides/understanding-kano.html",
    "revision": "2630b777b72a440fec2e7c8e05948aca"
  },
  {
    "url": "index.html",
    "revision": "9603aa38d54077e6320a62f3d6f737b9"
  },
  {
    "url": "reference/api.html",
    "revision": "c08acf65353def7c3968e52e2abed830"
  },
  {
    "url": "reference/configuration.html",
    "revision": "a8fe659eaf0806120f38bfeca019d6d1"
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
