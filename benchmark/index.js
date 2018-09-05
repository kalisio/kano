const program = require('commander')
const clui = require('clui')
const winston = require('winston')
const workerFarm = require('worker-farm')

program
    .usage('[options]')
    .option('-u, --url [url]', 'Base URL of the application to be tested', 'http://localhost:8081')
    .option('-t, --total [total]', 'Total # of virtual clients to be created', '1000')
    .option('-c, --concurrency [concurrency]', '# of concurrent clients during the steady phase', '100')
    .option('-s, --scenarios [scenarios]', 'Total # of scenarios performed by each virtual client before disconnecting', '100')
    .option('-r, --ramp [ramp]', 'Duration in seconds of the ramp up/down phases', '1800')
    .option('-T, --transport [transport]', 'Transport to be used (either websocket or http)', 'websocket')
    .option('-j, --jwt [ratio]', 'Ratio of authentication using JWT instead of local login', '0.9')
    .parse(process.argv)

// Parse options requiring type conversion from string
const total = parseInt(program.total)
const concurrency = parseInt(program.concurrency)
const nbScenarios = parseInt(program.scenarios)
const ramp = parseInt(program.ramp)
const level = process.env.LOG_LEVEL || 'info'
const logger = new winston.Logger({ level, transports: [ new winston.transports.Console({ colorize: true }) ] })
// Number of virtual clients/errors already launched/gathered
let n = 0
let nbErrors = 0
// Perform some maths so that we get the closest possible of the concurrency with the same number of clients per CPU
const cpus = require('os').cpus().length
const options = {
  maxConcurrentWorkers: (concurrency < cpus ? concurrency : cpus),
  maxCallsPerWorker: Infinity,
  maxConcurrentCallsPerWorker: (concurrency <= cpus ? 1 : Math.floor(concurrency / cpus)),
  maxConcurrentCalls: Infinity
}
// Total durations of client operations
let durations = {}
// Our farm of virtual clients
const workers = workerFarm(options, require.resolve('./client'))

logger.info('Launching ' + cpus * options.maxConcurrentCallsPerWorker +
            ' concurrent client(s) with ' + cpus + ' CPUs until ' + total + ' have been executed')
let countdown = new clui.Spinner('Please wait...')
if (!process.env.LOG_LEVEL) countdown.start()
const start = process.hrtime()

for (var i = 0; i < total; i++) {
  // Default options include URL, client ID and the # of scenarios it has to execute
  let workerOptions = { url: program.url, transport: program.transport, jwtRatio: parseFloat(program.jwt), index: i + 1, nbScenarios }
  // For the first/last clients include the ramp option as well
  if (i < concurrency) workerOptions.rampUp = ramp
  if (i > total - concurrency) workerOptions.rampDown = ramp
  workers(workerOptions, (err, client) => {
    n++
    if (!process.env.LOG_LEVEL) countdown.message(`Processed ${n} clients, please wait...`)
    if (!err) {
      Object.entries(client.durations).forEach(([key, value]) => {
        // Add client durations to total durations
        if (!durations[key]) durations[key] = 0
        durations[key] += client.durations[key]
      })
    } else {
      nbErrors++
      logger.error(err)
    }
    if (n === total) {
      const end = process.hrtime()
      countdown.stop()
      workerFarm.end(workers)
      // Display total/averaged durations and error ratio
      const duration = (end[0] + end[1] / 1000000000) - (start[0] + start[1] / 1000000000)
      logger.info('Total test time = ' + duration.toFixed(2) + ' (s)')
      Object.entries(durations).forEach(([key, value]) => {
        logger.info('Total ' + key + ' time = ' + durations[key].toFixed(2) + ' (s)')
        logger.info('Average ' + key + ' time = ' + (durations[key] / total).toFixed(2) + ' (s)')
      })
      logger.info('Error ratio = ' + (100 * nbErrors / total).toFixed(2) + ' %')
    }
  })
}
