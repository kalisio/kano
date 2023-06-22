module.exports = {
  base: '/kano/',
  title: 'Kano',
  description: 'A powerful real-time Geovisualizer',
  head: [
    ['link', { rel: 'icon', href: `https://s3.eu-central-1.amazonaws.com/kalisioscope/kano/kano-icon-64x64.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: "stylesheet", href: "https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css" }]
  ],
  theme: 'kalisio',
  themeConfig: {
    docsDir: 'docs',
    nav: [
      { text: 'About', link: '/about/introduction' },
      { text: 'Guides', link: '/guides/understanding-kano' },
      { text: 'Reference', link: '/reference/configuration' },
      { text: 'GitHub', link: 'https://github.com/kalisio/kano' }
    ],
    sidebar: {
      '/about/': getAboutSidebar(),
      '/guides/': getGuidesSidebar(),
      '/reference/': getReferenceSidebar()
    },
    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkZXYua2FsaXNpby54eXoiLCJpc3MiOiJrYWxpc2lvIn0.CGvJwPPkuiFvNzo3zUBb-_vwD0CKbUfm7w7TkCY-Ts4',
    domain: 'dev.kalisio.xyz'
  }
}

function getAboutSidebar () {
  return [
    'introduction',
    'roadmap',
    'contributing',
    'license',
    'contact'
  ] 
}

function getGuidesSidebar () {
  return [
    'understanding-kano',
    'getting-started',
    'installing-kano',
    'customizing-kano',
    'advanced-usage',
    'kano-api'
  ]
}

function getReferenceSidebar () {
  return [
    'configuration',
    'api'
  ]
}
