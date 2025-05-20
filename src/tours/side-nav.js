const sideNav = require('./map/side-nav')

module.exports = [
  sideNav.logout(),
  {
    target: '#edit-settings',
    content: 'tours.side-nav.SETTINGS_LABEL',
    params: {
      placement: 'top',
      clickOnPrevious: '#left-opener',
      clickOnNext: '#left-opener',
      previousDelay: 500
    }
  },
  sideNav.contextualHelp(),
  sideNav.about(),
  sideNav.reportBug({ target: '#report-bug' })
]
