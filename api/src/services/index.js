import _ from 'lodash'
import logger from 'winston'
import kCore from 'kCore'
import kTeam from 'kTeam'
import kNotify, { hooks } from 'kNotify'

module.exports = async function () {
  const app = this

  app.on('service', service => {
    // Add hooks for topic creation/removal on org object creation/removal
    if (service.name === 'groups' || service.name === 'organisations') {
      service.hooks({
        after: {
          create: hooks.createTopic,
          remove: hooks.removeTopic
        }
      })
    }
    // Add hooks for topic (un)subscription on (un)authorisation
    if (service.name === 'authorisations') {
      service.hooks({
        after: {
          create: hooks.subscribeSubjectsToResourceTopic,
          remove: hooks.unsubscribeSubjectsFromResourceTopic
        }
      })
    }
  })

  // Set up our plugin services
  try {
    await app.configure(kCore)
    await app.configure(kTeam)
    await app.configure(kNotify)
  }
  catch (error) {
    logger.error(error.message)
  }

  let usersService = app.getService('users')
  let pusherService = app.getService('pusher')

  // Create default users if not already done
  await usersService.find({
    paginate: false
  })
  .then(users => {
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
              deviceId: defaultUser.device.registrationId,
              devicePlatform: defaultUser.device.platform
            }, {
              user
            })
          }
        })
      }
    })
  })
}
