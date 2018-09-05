const winston = require('winston')
const feathers = require('@feathersjs/client')
const io = require('socket.io-client')
const fetch = require('node-fetch')
const https = require('https')
const util = require('util')
const randomScenario = require('./scenarios')

const level = process.env.LOG_LEVEL || 'info'
const logger = new winston.Logger({ level, transports: [ new winston.transports.Console({ colorize: true }) ] })
const authenticate = true
let accessToken

async function connectClient(url, transport, id) {
  const start = process.hrtime()
  // Configure our client (hooks, auth, connection)
  let client = feathers()
  client.data = { id, durations: { } }
  if (transport === 'websocket') {
    client.socket = io(url, { transports: ['websocket'], path: '/apiws', rejectUnauthorized: false })
    client.configure(feathers.socketio(client.socket, { timeout: 20000 }))
  } else {
    if (url.startsWith('https')) {
      const agent = new https.Agent({ rejectUnauthorized: false })
      client.configure(feathers.rest(url).fetch((url, options) => fetch(url, Object.assign({ agent }, options))))
    } else {
      client.configure(feathers.rest(url).fetch(fetch))
    }
  }
  client.configure(feathers.authentication({ path: '/api/authentication', timeout: 20000 }))
  // Helper to store the duration of a particular operation giving its start time
  client.setDuration = function (key, start) {
    const end = process.hrtime()
    client.data.durations[key] = (end[0] + end[1] / 1000000000) - (start[0] + start[1] / 1000000000)
  }
  // Helper to make the client wait simulating a "human"
  client.wait = async function (duration) {
    await util.promisify(setTimeout)(duration)
  }
  client.setDuration('connect', start)
  logger.verbose('Configured new client ' + client.data.id)
  return client
}

async function authenticateClient(client, strategy) {
  const start = process.hrtime()
  // When no JWT make a local login first to retrieve it
  let response = (accessToken && strategy === 'jwt' ? await client.authenticate({
    strategy: 'jwt',
    accessToken
  }) : await client.authenticate({
    strategy: 'local',
    email: 'kalisio@kalisio.xyz',
    password: 'Pass;word1'
  }))
  logger.verbose('Authenticated new client ' + client.data.id + ' with ' + strategy + ' strategy')
  accessToken = response.accessToken
  // We always need to get the user after authenticating
  const payload = await client.passport.verifyJWT(accessToken)
  client.data.user = await client.service('/api/users').get(payload.userId)
  client.setDuration('authenticate', start)
  return client
}

async function disconnectClient(client) {
  const start = process.hrtime()
  if (authenticate) await client.logout()
  if (client.socket) client.socket.disconnect()
  logger.verbose('Closed client ' + client.data.id)
  client.setDuration('disconnect', start)
}

module.exports = async function (options, callback) {
  const { url, transport, jwtRatio, index, nbScenarios, rampUp, rampDown } = options
  try {
    logger.verbose('Initiating client ' + index)
    // We don't start all clients at the same time to avoid overflowing,
    // let them start continuously during the ramp up duration
    if (rampUp) {
      const pause = Math.random() * 1000 * rampUp
      logger.verbose('Pausing client ' + index + ' for ' + pause)
      await util.promisify(setTimeout)(pause)
    }
    let client = await connectClient(url, transport, index)
    if (authenticate) {
      // Do we use local authentication or JWT based ?
      await authenticateClient(client, Math.random() <= jwtRatio ? 'jwt' : 'local')
    }
    // During the ramp down phase create "dummy" clients exiting randomly
    if (rampDown) {
      const pause = Math.random() * 1000 * rampDown
      logger.verbose('Pausing client ' + index + ' for ' + pause)
      await client.wait(pause)
    } else {
      // Play random scenarios
      for (var i = 0; i < nbScenarios; i++) {
        const scenario = randomScenario()
        logger.verbose('Running scenario ' + scenario + ' on client ' + index)
        await require('./scenarios/' + scenario)(client, logger)
      }
    }
    await disconnectClient(client)
    callback(null, client.data)
  } catch (error) {
    callback(error)
  }
}
