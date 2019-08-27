import fs from 'fs-extra'
import logger from 'winston'
import _ from 'lodash'
import { Server } from './server'

const server = new Server()

const config = server.app.get('logs')
const logPath = _.get(config, 'DailyRotateFile.dirname')
if (logPath) {
  // This will ensure the log directory does exist
  fs.ensureDirSync(logPath)
}

if (require.main === module) {
  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
  )

  server.run().then(() => {
    logger.info('Server started listening')
  })
}

export default server
