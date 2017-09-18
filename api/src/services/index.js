import logger from 'winston'
import kCore from 'kCore'
import kTeam from 'kTeam'
import kNotify from 'kNotify'

module.exports = async function () {
  const app = this
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

  // Create default users if not already done
  await usersService.find({
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
