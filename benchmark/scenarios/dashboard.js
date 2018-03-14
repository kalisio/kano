const winston = require('winston')

async function dashboard(client) {
  const start = process.hrtime()
  // On the home page we get the org list and the event dashboard
  let response = await client.service('/api/organisations').find({})
  const organisations = response.data
  // These requests are sent in parallel
  await Promise.all(organisations.map(organisation => client.service('/api/' + organisation._id + '/events').find({})))
  winston.verbose('Retrieved dashboard events for client ' + client.data.id)
  client.setDuration('dashboard', start)
}

module.exports = dashboard
