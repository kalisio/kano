module.exports = [{
  target: '#logout',
  title: 'tours.home.LOGOUT_LABEL',
  content: 'tours.home.SESSION_LABEL',
  params: {
    placement: 'top',
    clickOnNext: '#left-opener',
  }
}, {
  target: '#edit-settings',
  content: 'tours.home.SETTINGS_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: '#left-opener',
    clickOnNext: '#left-opener',
    previousDelay: 500
  }
}, {
  target: '#online-help',
  link: 'tours.home.HELP_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: '#left-opener',
    clickOnNext: '#left-opener',
    clickOnLink: '#online-help'
  }
}, {
  target: '#contextual-help',
  content: 'tours.home.CONTEXT_HELP_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: '#left-opener',
    clickOnNext: '#left-opener'
  }
}, {
  target: '#about',
  content: 'tours.home.ABOUT_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: '#left-opener',
    clickOnNext: ['#left-opener', '#about'],
    nextDelay: 1000
  }
}, {
  target: '#report-bug',
  content: 'tours.home.BUG_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: ['#ok-action', '#left-opener'],
    clickOnNext: '#ok-action',
    previousDelay: 500
  }
}]