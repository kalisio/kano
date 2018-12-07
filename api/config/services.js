const serverPort = process.env.PORT || 8081
// Required to know webpack port so that in dev we can build correct URLs
const clientPort = process.env.CLIENT_PORT || 8080
let weacastDomain
// If we build a specific staging instance
if (process.env.NODE_APP_INSTANCE === 'dev') {
  weacastDomain = 'https://weacast.dev.kalisio.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'test') {
  weacastDomain = 'https://weacast.test.kalisio.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'prod') {
  weacastDomain = 'https://weacast.kalisio.xyz'
} else {
  // Otherwise we are on a developer machine
  if (process.env.NODE_ENV === 'development') {
    weacastDomain = 'http://localhost:' + (clientPort+2) // Weacast app client/server port = 8082/8083
  } else {
    weacastDomain = 'http://localhost:' + (serverPort+1) // Weacast app client/server port = 8082
  }
}
// Override defaults if env provided
if (process.env.SUBDOMAIN) {
  weacastDomain = 'https://weacast.' + process.env.SUBDOMAIN
}

module.exports = [
  {
    name: 'weacast',
    description: 'Weather service',
    tags: [
      'weather'
    ],
    iconUrl: '',
    icon: 'satellite',
    type: 'service',
    endpoint: weacastDomain
  }
]