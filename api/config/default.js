var path = require('path')
var containerized = require('containerized')()
var clientConfig = require('../../config')

var API_PREFIX = '/api'

module.exports = {
  client: clientConfig,

  // Proxy your API if using any.
  // Also see /build/script.dev.js and search for "proxy api requests"
  // https://github.com/chimurai/http-proxy-middleware
  proxyTable: {},

  domain: (process.env.NODE_ENV === 'development' ? 'http://localhost:' + clientConfig.dev.port : 'http://www.kalisio.xyz'),
  host: 'localhost',
  port: process.env.PORT || 8081,
  /* To enable HTTPS
  https: {
    key: path.join(__dirname, 'server.key'),
    cert: path.join(__dirname, 'server.crt'),
    port: process.env.HTTPS_PORT || 8084
  },
  */

  apiPath: API_PREFIX,

  paginate: {
    default: 10,
    max: 50
  },
  authentication: {
    secret: 'b5KqXTye4fVxhGFpwMVZRO3R56wS5LNoJHifwgGOFkB5GfMWvIdrWyQxEJXswhAC',
    strategies: [
      'jwt',
      'local'
    ],
    path: API_PREFIX + '/authentication',
    service: API_PREFIX + '/users',
    defaultUsers: [
      {
        email: 'kalisio@kalisio.xyz',
        password: 'kalisio',
        name: 'Kalisio'
      }
    ],
    github: {
      clientID: '157fe8bd095367192168',
      clientSecret: '5dd578eb36bf00d0c7c8dbee6ea36d44529d97cf',
      callbackURL: (process.env.NODE_ENV === 'development' ? 'http://localhost:' + clientConfig.dev.port + '/auth/github/callback' : '/auth/github/callback'),
      successRedirect: (process.env.NODE_ENV === 'development' ? 'http://localhost:' + clientConfig.dev.port + '/' : '/')
    },
    google: {
      clientID: '761859104517-4j6qul9rds52immbhm0ggrq2jbb4fvqk.apps.googleusercontent.com',
      clientSecret: 'a03PrspLJLIUqnJ7ANtLgutd',
      callbackURL: (process.env.NODE_ENV === 'development' ? 'http://localhost:' + clientConfig.dev.port + '/auth/google/callback' : '/auth/google/callback'),
      successRedirect: (process.env.NODE_ENV === 'development' ? 'http://localhost:' + clientConfig.dev.port + '/' : '/'),
      scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
    },
    // Required for OAuth2 to work correctly
    cookie: {
      enabled: true,
      name: 'feathers-jwt',
      httpOnly: false,
      secure: false
    }
  },
  authorisation: {
    cache: {
      maxUsers: 1000
    }
  },
  mailer: {
    service: 'gmail',
    auth: {
      user: 'support@kalisio.xyz',
      pass: 'kalisio2017'
    },
    templateDir: path.join(__dirname, 'email-templates')
  },
  pusher: {
    accessKeyId: 'AKIAJFKD4XALWT7LKJNQ',
    secretAccessKey: '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',
    region: 'eu-west-1',
    apiVersion: '2010-03-31',
    platforms: {
      ANDROID: 'arn:aws:sns:eu-west-1:348995669582:app/GCM/kApp'
    }
  },
  logs: {
    Console: {
      colorize: true,
      level: (process.env.NODE_ENV === 'development' ? 'verbose' : 'info')
    },
    DailyRotateFile: {
      dirname: path.join(__dirname, '..', 'logs'),
      filename: 'kApp-',
      datePattern: 'yyyy-MM-dd.log'
      /* Possible in next version of the logger : see https://github.com/winstonjs/winston-daily-rotate-file/pull/45
      filename: path.join(__dirname, '..', 'logs'),
      datePattern: '/yyyy/MM/dd.log',
      createTree: true
      */
    }
  },
  db: {
    adapter: 'mongodb',
    url: process.env.DB_URL || (containerized ? 'mongodb://mongodb:27017/kApp' : 'mongodb://127.0.0.1:27017/kApp')
  }
}

/*
 * proxyTable example:
 *
   proxyTable: {
      // proxy all requests starting with /api
      '/api': {
        target: 'https://some.address.com/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
 */
