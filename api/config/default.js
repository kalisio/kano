var path = require('path')
var fs = require('fs')
var containerized = require('containerized')()
const services = require('./services')
const layers = require('./layers')

const serverPort = process.env.PORT || 8081
// Required to know webpack port so that in dev we can build correct URLs
const clientPort = process.env.CLIENT_PORT || 8080
const API_PREFIX = '/api'
let domain
// If we build a specific staging instance
if (process.env.NODE_APP_INSTANCE === 'dev') {
  domain = 'https://kano.dev.kalisio.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'test') {
  domain = 'https://kano.test.kalisio.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'prod') {
  domain = 'https://kano.kalisio.xyz'
} else {
  // Otherwise we are on a developer machine
  if (process.env.NODE_ENV === 'development') {
    domain = 'http://localhost:' + clientPort // Kano app client/server port = 8080/8081
  } else {
    domain = 'http://localhost:' + serverPort // Kano app client/server port = 8081
  }
}
// Override defaults if env provided
if (process.env.SUBDOMAIN) {
  domain = 'https://kano.' + process.env.SUBDOMAIN
}

module.exports = {
  // Proxy your API if using any.
  // Also see /build/script.dev.js and search for "proxy api requests"
  // https://github.com/chimurai/http-proxy-middleware
  /*
  // Proxy weacast if required, see https://github.com/kalisio/kMap/issues/16
  proxyTable: {
    '/weacast/api': {
      target: weacastApi,
      changeOrigin: true,
      pathRewrite: {
        '^/weacast/api': '/api'
      }
    },
    '/weacast/apiws': {
      target: weacastApi,
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/weacast/apiws': '/apiws'
      }
    }
  },
  */
  domain,
  host: process.env.HOSTNAME || 'localhost',
  port: serverPort,
  /* To enable HTTPS
  https: {
    key: path.join(__dirname, 'server.key'),
    cert: path.join(__dirname, 'server.crt'),
    port: process.env.HTTPS_PORT || 8084
  },
  */
  apiPath: API_PREFIX,
  helmet: {
    /* X-Frame-Options is limited to a single domain,
    // which is not easy to use in dev mode, best to rely on Content-Security-Policy
    frameguard: {
      action: 'allow-from',
      domain: 'http://localhost'
    }
    */
    contentSecurityPolicy: {
      directives: {
        frameAncestors: [
          'http://localhost:*',
          'https://*.kalisio.xyz',
          'https://*.kalisio.com'
        ]
      }
    },
    frameguard: false
  },
  paginate: {
    default: 10,
    max: 50
  },
  authentication: {
    secret: process.env.APP_SECRET,
    strategies: [
      'jwt',
      'local'
    ],
    path: API_PREFIX + '/authentication',
    service: API_PREFIX + '/users',
    jwt: {
      header: { typ: 'access' }, // See https://tools.ietf.org/html/rfc7519#section-5.1
      audience: process.env.SUBDOMAIN || 'kalisio', // The resource server where the token is processed
      issuer: 'kalisio', // The issuing server, application or resource
      algorithm: 'HS256', // See https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
      expiresIn: '1d'
    },
    passwordPolicy: {
      minLength: 8,
      maxLength: 128,
      uppercase: true,
      lowercase: true,
      digits: true,
      symbols: true,
      prohibited: fs.readFileSync(path.join(__dirname, '10k_most_common_passwords.txt')).toString().split('\n'),
      history: 5
    },
    defaultUsers: [
      {
        email: 'kalisio@kalisio.xyz',
        password: 'Pass;word1',
        /*
        device: {
          registrationId: 'xxx',
          number: '+xxx',
          platform: 'ANDROID'
        }
        */
        name: 'Kalisio'
      }
    ],
    // Required for OAuth2 to work correctly
    cookie: {
      enabled: true,
      name: 'feathers-jwt',
      httpOnly: false,
      secure: (process.env.NODE_ENV === 'development' ? false : true)
    },
    authorisation: {
      cache: {
        maxUsers: 1000
      }
    }
  },
  catalog: {
    services,
    layers,
    paginate: {
      default: 100,
      max: 100
    }
  },
  cesium: {
    token: process.env.CESIUM_TOKEN
  },
  geocoder: {
    providers: [{ provider: 'opendatafrance' }, { provider: 'openstreetmap' }]
  },
  logs: {
    Console: {
      colorize: true,
      level: (process.env.NODE_ENV === 'development' ? 'verbose' : 'info')
    },
    DailyRotateFile: {
      dirname: path.join(__dirname, '..', 'logs'),
      filename: 'kano-',
      datePattern: 'yyyy-MM-dd.log',
      maxDays: 30
      /* Possible in next version of the logger : see https://github.com/winstonjs/winston-daily-rotate-file/pull/45
      filename: path.join(__dirname, '..', 'logs'),
      datePattern: '/yyyy/MM/dd.log',
      createTree: true
      */
    }
  },
  db: {
    adapter: 'mongodb',
    url: process.env.DB_URL || (containerized ? 'mongodb://mongodb:27017/kano' : 'mongodb://127.0.0.1:27017/kano')
  },
  storage: (process.env.S3_BUCKET ? {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    bucket: process.env.S3_BUCKET
  } : undefiend)
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
