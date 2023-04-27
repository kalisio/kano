module.exports = [{
  target: '#logout',
  title: 'tours.side-nav.LOGOUT_LABEL',
  content: 'tours.side-nav.SESSION_LABEL',
  params: {
    placement: 'top',
    clickOnNext: '#left-opener',
  }
}, {
  target: '#edit-settings',
  content: 'tours.side-nav.SETTINGS_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: '#left-opener',
    clickOnNext: '#left-opener',
    previousDelay: 500
  }
}, {
  target: '#online-help',
  link: 'tours.side-nav.HELP_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: '#left-opener',
    clickOnNext: '#left-opener',
    clickOnLink: '#online-help'
  }
}, {
  target: '#contextual-help',
  content: 'tours.side-nav.CONTEXT_HELP_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: '#left-opener',
    clickOnNext: '#left-opener'
  }
}, {
  target: '#about',
  content: 'tours.side-nav.ABOUT_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: '#left-opener',
    clickOnNext: ['#left-opener', '#about'],
    nextDelay: 1000
  }
}, {
  target: '#report-bug',
  content: 'tours.side-nav.BUG_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: ['#ok-action', '#left-opener'],
    clickOnNext: '#ok-action',
    previousDelay: 500
  }
}]