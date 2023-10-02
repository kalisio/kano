const glob = require('glob')
const path = require('path')
const { getSublegends } = require('@kalisio/kdk/map.config.cjs')

// Override defaults if env provided
module.exports = getSublegends(glob.sync(path.join(__dirname, 'sublegends/**/*.cjs')))