const path = require('path')

// Use default app config
const config = require(path.join(__dirname, '../../config/default.cjs'))

// Simply changes outputs so we don't pollute DB, logs, etc.
config.logs.DailyRotateFile.dirname = path.join(__dirname, '..', 'logs')
config.db.url = config.db.url.replace('kano', 'kano-test')
if (config.db.secondaries) config.db.secondaries.data = config.db.secondaries.data.replace('odk', 'odk-test')
delete config.authentication.defaultUsers

module.exports = config
