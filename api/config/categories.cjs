const glob = require('glob')
const path = require('path')
const { getCategories } = require('@kalisio/kdk/map.config.cjs')

// Override defaults if env provided
const domain = (process.env.SUBDOMAIN ? process.env.SUBDOMAIN : 'test.kalisio.xyz')

module.exports = getCategories(glob.sync(path.join(__dirname, 'categories/**/*.cjs')), { domain })
