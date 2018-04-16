var
  shell = require('shelljs'),
  path = require('path')

shell.rm('-rf', path.resolve(__dirname, '../kCore/*'))
shell.rm('-rf', path.resolve(__dirname, '../kCore/.*'))
shell.rm('-rf', path.resolve(__dirname, '../kTeam/*'))
shell.rm('-rf', path.resolve(__dirname, '../kTeam/.*'))
shell.rm('-rf', path.resolve(__dirname, '../kNotify/*'))
shell.rm('-rf', path.resolve(__dirname, '../kNotify/.*'))
shell.rm('-rf', path.resolve(__dirname, '../kEvent/*'))
shell.rm('-rf', path.resolve(__dirname, '../kEvent/.*'))
shell.rm('-rf', path.resolve(__dirname, '../kMap/*'))
shell.rm('-rf', path.resolve(__dirname, '../kMap/.*'))
shell.rm('-rf', path.resolve(__dirname, '../dist/*'))
shell.rm('-rf', path.resolve(__dirname, '../dist/.*'))
console.log(' Cleaned build artifacts.\n')
