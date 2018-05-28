const winston = require('winston')
const feathers = require('feathers-client')
const io = require('socket.io-client')
const feathersHooks = require('feathers-hooks')
const util = require('util')
const randomScenario = require('./scenarios')

const level = process.env.LOG_LEVEL || 'info'
const logger = new winston.Logger({ level, transports: [ new winston.transports.Console({ colorize: true }) ] })

async function connectClient(url, id) {
  const start = process.hrtime()
  // Configure our client (hooks, auth, connection)
  let client = feathers()
  client.data = { id, durations: { } }
  client.configure(feathersHooks())
  let socket = io(url, { transports: ['websocket'], path: '/apiws' })
  client.configure(feathers.socketio(socket, { timeout: 10000 }))
  client.configure(feathers.authentication({ path: '/api/authentication' }))
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
  return client
}

async function authenticateClient(client) {
  const start = process.hrtime()
  let response = await client.authenticate({
    strategy: 'local',
    email: 'kalisio@kalisio.xyz',
    password: 'Pass;word1'
  })
  logger.verbose('Authenticated new client ' + client.data.id)
  // We always need to get the user after authenticating
  const payload = await client.passport.verifyJWT(response.accessToken)
  client.data.user = await client.service('/api/users').get(payload.userId)
  client.setDuration('authenticate', start)
  return client
}

async function disconnectClient(client) {
  const start = process.hrtime()
  await client.logout()
  logger.verbose('Closed client ' + client.data.id)
  client.setDuration('disconnect', start)
}

module.exports = async function (options, callback) {
  const { url, level, index, nbScenarios, rampUp, rampDown } = options
  try {
    logger.verbose('Initiating client ' + index)
    // We don't start all clients at the same time to avoid overflowing,
    // let them start continuously during the ramp up duration
    if (rampUp) {
      const pause = Math.random() * 1000 * rampUp
      logger.verbose('Pausing client ' + index + ' for ' + pause)
      await util.promisify(setTimeout)(pause)
    }
    let client = await connectClient(url, index)
    await authenticateClient(client)
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
