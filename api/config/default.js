var path = require('path')
var containerized = require('containerized')()

const serverPort = process.env.PORT || 8081
// Required to know webpack port so that in dev we can build correct URLs
const clientPort = process.env.CLIENT_PORT || 8080
const API_PREFIX = '/api'
let domain
// If we build a specific staging instance
if (process.env.NODE_APP_INSTANCE === 'dev') {
  domain = 'https://app.dev.aktnmap.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'test') {
  domain = 'https://app.test.aktnmap.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'prod') {
  domain = 'https://app.aktnmap.xyz'
} else {
  // Otherwise we are on a developer machine
  if (process.env.NODE_ENV === 'development') {
    domain = 'http://localhost:' + clientPort
  } else {
    domain = 'http://localhost:' + serverPort
  }
}

module.exports = {
  // Proxy your API if using any.
  // Also see /build/script.dev.js and search for "proxy api requests"
  // https://github.com/chimurai/http-proxy-middleware
  proxyTable: {},
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
    github: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: domain + '/auth/github/callback',
      successRedirect: domain + '/',
      failureRedirect: domain + '/#/login' +
        '?error_message=An error occured while authenticating with GitHub, check you correctly authorized the application and have a valid public email in your profile'
    },
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: domain + '/auth/google/callback',
      successRedirect: domain + '/',
      failureRedirect: domain + '/#/login' +
        '?error_message=An error occured while authenticating with Google, check you correctly authorized the application and have a valid public email in your profile',
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
  billing: {
    bronze: {
      limits: {
        users: 10,
        storage: 50
      },
      price: 0
    },
    silver: {
      limits: {
        users: 50,
        storage: 250
      },
      price: 99
    },
    gold: {
      limits: {
        users: 250,
        storage: 1000
      },
      price: 399
    }
  },
  mailer: {
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_MAIL_USER,
      pass: process.env.GOOGLE_MAIL_PASSWORD
    },
    templateDir: path.join(__dirname, 'email-templates')
  },
  pusher: {
    accessKeyId: process.env.SNS_ACCESS_KEY,
    secretAccessKey: process.env.SNS_SECRET_ACCESS_KEY,
    region: 'eu-west-1',
    apiVersion: '2010-03-31',
    platforms: {
      ANDROID: process.env.SNS_ANDROID_ARN
    }
  },
  geocoder: {
    provider: 'opendatafrance'
  },
  logs: {
    Console: {
      colorize: true,
      level: (process.env.NODE_ENV === 'development' ? 'verbose' : 'info')
    },
    DailyRotateFile: {
      dirname: path.join(__dirname, '..', 'logs'),
      filename: 'aktnmap-',
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
    url: process.env.DB_URL || (containerized ? 'mongodb://mongodb:27017/aktnmap' : 'mongodb://127.0.0.1:27017/aktnmap')
  },
  storage: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    bucket: process.env.S3_BUCKET
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
