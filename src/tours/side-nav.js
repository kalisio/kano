const sideNav = require('./map/side-nav')

module.exports = [
  sideNav.logout(),
  {
    target: '#settings-action',
    content: 'tours.side-nav.SETTINGS_LABEL',
    params: {
      placement: 'top',
      clickOnPrevious: '#left-opener',
      clickOnNext: '#left-opener',
      previousDelay: 500
    }
  },
  sideNav.contextualHelp({ target: '#contextual-help-action' }),
  sideNav.about({
    target: '#about-action',
    params: {
      placement: 'top',
      clickOnPrevious: '#left-opener',
      clickOnNext: ['#left-opener', '#about-action', '#left-opener'],
      nextDelay: 500
    }
  }),
  sideNav.reportBug({ target: '#report-bug' })
]
