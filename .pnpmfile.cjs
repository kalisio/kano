const path = require('path')
const kliFile = process.env.KLI_FILE || path.join(__dirname, '../development/workspaces/apps/kano/dev/kano-ekosystem.js')
const { readPackageHook } = require('../kdk/.pnpmfile.cjs')

module.exports = {
  hooks: {
    readPackage: readPackageHook(kliFile)
  }
}