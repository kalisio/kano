const glob = require('glob')
const path = require('path')
const { getLayers } = require('@kalisio/kdk/map.config.cjs')

// Override defaults if env provided
const kargoDomain = (process.env.SUBDOMAIN ? process.env.SUBDOMAIN : 'test.kalisio.xyz')
const wmtsUrl = (process.env.API_GATEWAY_URL ? process.env.API_GATEWAY_URL + '/wmts/1.0.0' : 'https://mapcache.' + kargoDomain + '/mapcache/wmts/1.0.0')
const tmsUrl = (process.env.API_GATEWAY_URL ? process.env.API_GATEWAY_URL + '/tms/1.0.0' : 'https://mapcache.' + kargoDomain + '/mapcache/tms/1.0.0')
const wmsUrl = (process.env.API_GATEWAY_URL ? process.env.API_GATEWAY_URL + '/wms' : 'https://mapcache.' + kargoDomain + '/mapcache')
const wcsUrl = (process.env.API_GATEWAY_URL ? process.env.API_GATEWAY_URL + '/wcs' : 'https://mapserver.' + kargoDomain + '/cgi-bin/ows')
const k2Url = (process.env.API_GATEWAY_URL ? process.env.API_GATEWAY_URL + '/k2' : 'https://k2.' + kargoDomain)
const s3Url = (process.env.API_GATEWAY_URL ? process.env.API_GATEWAY_URL + '/s3' : 'https://s3.eu-central-1.amazonaws.com')

module.exports = getLayers(glob.sync(path.join(__dirname, 'layers/**/*.cjs')), { wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url })
