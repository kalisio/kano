const winston = require('winston')
const feathers = require('feathers-client')
const io = require('socket.io-client')
const feathersHooks = require('feathers-hooks')
const util = require('util')
const randomScenario = require('./scenarios')

async function connectClient(url, id) {
  const start = process.hrtime()
  let client = feathers()
  client.data = { id, durations: { } }
  client.configure(feathersHooks())
  let socket = io(url, {
    transports: ['websocket'],
    path: '/apiws'
  })
  client.configure(feathers.socketio(socket, { timeout: 10000 }))
  client.configure(feathers.authentication({
    path: '/api/authentication'
  }))
  client.setDuration = function (key, start) {
    const end = process.hrtime()
    client.data.durations[key] = (end[0] + end[1] / 1000000000) - (start[0] + start[1] / 1000000000)
  }
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
    password: 'kalisio'
  })
  winston.verbose('Authenticated new client ' + client.data.id)
  const payload = await client.passport.verifyJWT(response.accessToken)
  client.data.user = await client.service('/api/users').get(payload.userId)
  client.setDuration('authenticate', start)
  return client
}

async function disconnectClient(client) {
  const start = process.hrtime()
  await client.logout()
  client.setDuration('disconnect', start)
}

module.exports = async function (options, callback) {
  const { id, nbScenarios, pause } = options
  try {
    // We don't start all clients at the same time to avoid overflow
    // but let them start continuously during the pause phase
    await util.promisify(setTimeout)(Math.random() * pause)
    winston.verbose('Initiating client ' + id)
    let client = await connectClient('http://localhost:8081', id)
    await authenticateClient(client)
    // Play random scenarios
    for (var i = 0; i < nbScenarios; i++) {
      const scenario = randomScenario()
      winston.verbose('Running scenario ' + scenario + ' on client ' + id)
      await require('./scenarios/' + scenario)(client)
      winston.verbose('Pausing client ' + id)
      await client.wait(pause)
    }
    await disconnectClient(client)
    winston.verbose('Closing client ' + id)
    callback(null, client.data)
  } catch (error) {
    callback(error)
  }
}
