const program = require('commander')
const winston = require('winston')
const workerFarm = require('worker-farm')

program
    .usage('[options]')
    .option('-t, --total [total]', 'Total # of clients to be created', '1000')
    .option('-c, --concurrency [concurrency]', 'Allowed client concurrency', '100')
    .option('-s, --scenarios [scenarios]', 'Total # of scenarios performed by each client before exiting', '100')
    .option('-p, --pause [pause]', 'Pause in ms between each scenario run', '5000')
    .option('-l, --level [level]', 'Log level to be used', 'info')
    .parse(process.argv)

// Total # of clients to be created
const total = parseInt(program.total)
// Allowed client concurrency
const concurrency = parseInt(program.concurrency)
// Total # of scenarios performed by each client before exiting
const nbScenarios = parseInt(program.scenarios)
// Pause between scenarios
const pause = parseInt(program.pause)
winston.default.transports.console.level = program.level

let n = 0
let nbErrors = 0
const cpus = require('os').cpus().length
const options = {
  maxConcurrentWorkers: cpus,
  maxCallsPerWorker: Infinity,
  maxConcurrentCallsPerWorker: Math.floor(concurrency / cpus),
  maxConcurrentCalls: Infinity
}
let durations = {}

const workers = workerFarm(options, require.resolve('./client'))

winston.info('Launching ' + cpus * options.maxConcurrentCallsPerWorker + ' concurrent client(s) with ' + cpus + ' CPUs until ' + total + ' have been executed, please wait...')
for (var i = 0; i < total; i++) {
  workers({ id: i + 1, nbScenarios, pause }, (err, client) => {
    n++
    if (!err) {
      Object.entries(client.durations).forEach(([key, value]) => {
        // Add client durations to total durations
        if (!durations[key]) durations[key] = 0
        durations[key] += client.durations[key]
      })
    } else {
      nbErrors++
      winston.error(err)
    }
    if (n === total) {
      workerFarm.end(workers)
      Object.entries(durations).forEach(([key, value]) => {
        winston.info('Average ' + key + ' time = ' + durations[key] / total + ' (s)')
      })
      winston.info('Error ratio = ' + 100 * (nbErrors / total) + ' %')
    }
  })
}
