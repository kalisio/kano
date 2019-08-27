import fs from 'fs-extra'
import path from 'path'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import server from '../src/main'

describe('kano', () => {
  let connection, userService

  before(() => {
    chailint(chai, util)
  })

  it('is CommonJS compatible', () => {
    expect(typeof server).to.equal('object')
  })

  it('initialize the server', async () => {
    connection = await server.run()
  })
  // Let enough time to process
    .timeout(10000)

  it('registers the services', () => {
    userService = server.app.getService('users')
    expect(userService).toExist()
  })

  // Cleanup
  after(async () => {
    if (connection) await connection.close()
    fs.emptyDirSync(path.join(__dirname, 'logs'))
    await server.app.db.instance.dropDatabase()
    await server.app.db.disconnect()
  })
})
