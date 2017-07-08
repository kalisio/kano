module.exports = {
  apiPath: '/api',
  transport: 'websocket', // Could be 'http' or 'websocket',
  appName: 'kApp',
  logs: {
    level: (process.env.NODE_ENV === 'development' ? 'debug' : 'info')
  },
  layout: {
    appBar: 'KAppBar',
    sideNav: 'KSideNav'
  },
  sideNav: {
    idenity: 'KIdentity',
    links: [
      { label: 'Users', icon: 'person', route: 'users' },
      { label: 'Groups', icon: 'group', route: 'groups' },
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
  groups: {
    renderer: 'collection/CardItem',
    // nbItemsPerPage: '8',
    mixins: [ 'collectionBase', 'createItem', 'editItem', 'deleteItem' ]
  },
  organizations: {
    // renderer: 'collection/ListItem',
    // nbItemsPerPage: '8',
    mixins: [ 'collectionBase', 'createItem', 'editItem', 'deleteItem' ]
  }
}
