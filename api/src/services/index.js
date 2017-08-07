import logger from 'winston'
import kCore from 'kCore'
import kTeam from 'kTeam'

module.exports = function () {
  const app = this
  // Set up our plugin services
  try {
    app.configure(kCore)
    app.configure(kTeam)
  }
  catch (error) {
    logger.error(error.message)
  }

  let usersService = app.getService('users')

  // Create default users if not already done
  usersService.find({
    paginate: false
  })
  .then(users => {
    app.get('authentication').defaultUsers.forEach(defaultUser => {
      let createdUser = users.find(user => user.email === defaultUser.email)
      if (!createdUser) {
        logger.info('Initializing default user (email = ' + defaultUser.email + ', password = ' + defaultUser.password + ')')
        usersService.create(defaultUser)
      }
    })
  })
}
