import fs from 'fs-extra'
import _ from 'lodash'
import { Server } from './server'

let server

function createServer () {
  server = new Server()

  const config = server.app.get('logs')
  const logPath = _.get(config, 'DailyRotateFile.dirname')
  if (logPath) {
    // This will ensure the log directory does exist
    fs.ensureDirSync(logPath)
  }

  process.on('unhandledRejection', (reason, p) =>
    server.app.logger.error('Unhandled Rejection: ', reason)
  )
}

async function runServer () {
  await server.run()
  server.app.logger.info('Server started listening')
}

if (require.main === module) {
  if (process.env.LAUNCH_DELAY) {
    console.log(`Waiting ${process.env.LAUNCH_DELAY / 1000}s for server to start...`)
    setTimeout(() => {
      createServer()
      runServer()
    }, process.env.LAUNCH_DELAY)
  } else {
    createServer()
    runServer()
  }
} else {
  createServer()
}

export default server
