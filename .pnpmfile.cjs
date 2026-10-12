const path = require('path')
const kliFile = process.env.KLI_FILE || path.join(__dirname, '../development/workspaces/apps/kano/dev/kano-ekosystem.js')

let hooks = {}
// Hooks are shared with the KDK, which is only required to be there when linking
if (process.env.LINK) {
  const { createHooks } = require('../kdk/.pnpmfile.cjs')
  hooks = createHooks(kliFile)
}

module.exports = {
  hooks
}
