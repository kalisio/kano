module.exports = {
  apiPath: '/api',
  transport: 'websocket', // Could be 'http' or 'websocket',
  appName: 'kApp',
  logs: {
    level: (process.env.NODE_ENV === 'development' ? 'debug' : 'info')
  }
}
