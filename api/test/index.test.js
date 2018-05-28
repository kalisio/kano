import fs from 'fs-extra'
import path from 'path'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import server from '../src/main'

describe('kapp', () => {
  let userService

  before(() => {
    chailint(chai, util)
  })

  it('is CommonJS compatible', () => {
    expect(typeof server).to.equal('object')
  })

  it('initialize the server', (done) => {
    server.run().then(() => done())
  })
  // Let enough time to process
  .timeout(10000)

  it('registers the services', () => {
    userService = server.app.getService('users')
    expect(userService).toExist()
  })

  // Cleanup
  after(() => {
    fs.emptyDirSync(path.join(__dirname, 'logs'))
    server.app.db.instance.dropDatabase()
  })
})
