import path from 'path'
import _ from 'lodash'
import logger from 'winston'
import kCore from 'kCore'
import kTeam from 'kTeam'
import kMap from 'kMap'
import kNotify from 'kNotify'
import kEvent from 'kEvent'
import packageInfo from '../../package.json'

const servicesPath = path.join(__dirname, '..', 'services')
module.exports = async function () {
  const app = this

  // Set up our plugin services
  try {
    app.use(app.get('apiPath') + '/capabilities', (req, res, next) => {
      let response = {
        name: 'aktnmap',
        domain: app.get('domain'),
        version: packageInfo.version,
        billing: app.get('billing')
      }
      if (process.env.BUILD_NUMBER) {
        response.buildNumber = process.env.BUILD_NUMBER
      }
      res.json(response)
    })
    await app.configure(kCore)
    // Add hook to automatically create a new organisation, add verification, send verification email,
    // register devices, etc. when creating a new user or authenticating
    app.configureService('users', app.getService('users'), servicesPath)
    app.configureService('authentication', app.getService('authentication'), servicesPath)
    // Add hooks for topic (un)subscription on (un)authorisation
    app.configureService('authorisations', app.getService('authorisations'), servicesPath)

    // Add hooks for topic creation/removal on org/group/tag object creation/removal
    app.on('service', service => {
      if (service.name === 'groups' || service.name === 'members' || service.name === 'tags') {
        app.configureService(service.name, service, servicesPath)
      }
    })
    await app.configure(kTeam)
    app.configureService('organisations', app.getService('organisations'), servicesPath)

    await app.configure(kNotify)
    app.configureService('devices', app.getService('devices'), servicesPath)
    await app.configure(kMap)
    await app.configure(kEvent)
  } catch (error) {
    logger.error(error.message)
  }

  let usersService = app.getService('users')
  let pusherService = app.getService('pusher')
  let defaultUsers = app.get('authentication').defaultUsers
  if (defaultUsers) {
    // Create default users if not already done
    const users = await usersService.find({ paginate: false })
    for (let i = 0; i < defaultUsers.length; i++) {
      const defaultUser = defaultUsers[i]
      let createdUser = _.find(users, user => user.email === defaultUser.email)
      if (!createdUser) {
        logger.info('Initializing default user (email = ' + defaultUser.email + ', password = ' + defaultUser.password + ')')
        let user = await usersService.create(_.omit(defaultUser, 'device'))
        // Register user device if any
        if (defaultUser.device) {
          await pusherService.create({
            action: 'device',
            device: defaultUser.device
          }, {
            user
          })
        }
      }
    }
  }
}
