module.exports = {
  apiPath: '/api',
  transport: 'websocket', // Could be 'http' or 'websocket',
  appName: 'kApp',
  logs: {
    level: (process.env.NODE_ENV === 'development' ? 'debug' : 'info')
  },
  layout: {
    appBar: 'layout/KAppBar',
    sideNav: 'layout/KSideNav'
  },
  appBar: {
    title: 'kApp',
    subtitle: 'A template application powered by Kaelia'
  },
  sideNav: {
    identity: 'layout/KIdentity',
    links: [
      { label: 'Users', icon: 'person', route: 'users' },
      { label: 'Organizations', icon: 'domain', route: 'organizations' },
      { }, // separator
      { label: 'Logout', icon: 'exit_to_app', route: 'logout' }
    ]
  },
  users: {
    renderer: 'users/UserCardItem',
    // nbItemsPerPage: '8',
    mixins: [ 'collectionBase', 'createItem', 'editItem', 'deleteItem' ]
  },
  organizations: {
    // renderer: 'collection/ListItem',
    // nbItemsPerPage: '8',
    mixins: [ 'collectionBase', 'createItem', 'editItem', 'deleteItem' ]
  }
}
