import path from 'path'
import _ from 'lodash'
import logger from 'winston'
import kCore from 'kCore'
import kTeam from 'kTeam'
import kNotify, { hooks } from 'kNotify'

const servicesPath = path.join(__dirname, '..', 'services')

module.exports = async function () {
  const app = this

  // Set up our plugin services
  try {
    await app.configure(kCore)
    // Add hook to automatically create a new organisation, add verification, send verification email,
    // register devices, etc. when creating a new user or authenticating
    app.configureService('users', app.getService('users'), servicesPath)
    app.configureService('authentication', app.getService('authentication'), servicesPath)
  
    // Add hooks for topic creation/removal on org/group object creation/removal
    /*app.on('service', service => {
      if (service.name === 'groups' || service.name === 'organisations') {
        app.configureService(service.name, service, servicesPath)
      }
    })*/
    await app.configure(kTeam)
    // Add hooks for topic (un)subscription on (un)authorisation
    app.configureService('authorisations', app.getService('authorisations'), servicesPath)

    await app.configure(kNotify)
  }
  catch (error) {
    logger.error(error.message)
  }

  let usersService = app.getService('users')
  let pusherService = app.getService('pusher')

  // Create default users if not already done
  let users = await usersService.find({ paginate: false })
  
  app.get('authentication').defaultUsers.forEach(defaultUser => {
    let createdUser = users.find(user => user.email === defaultUser.email)
    if (!createdUser) {
      logger.info('Initializing default user (email = ' + defaultUser.email + ', password = ' + defaultUser.password + ')')
      usersService.create(_.omit(defaultUser, 'device'))
      .then(user => {
        // Register user device if any
        if (defaultUser.device) {
          pusherService.create({
            action: 'device',
            device: defaultUser.device
          }, {
            user
          })
        }
      })
    }
  })
}
