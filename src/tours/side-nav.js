module.exports = [{
  target: '#logout',
  title: 'tours.home.LOGOUT_LABEL',
  content: 'tours.home.SESSION_LABEL',
  params: {
    placement: 'top'
  }
}, {
  target: '#edit-settings',
  content: 'tours.home.SETTINGS_LABEL',
  params: {
    placement: 'top',
    previousDelay: 500
  }
}, {
  target: '#online-help',
  link: 'tours.home.HELP_LABEL',
  params: {
    placement: 'top',
    clickOnLink: '#online-help'
  }
}, {
  target: '#contextual-help',
  content: 'tours.home.CONTEXT_HELP_LABEL',
  params: {
    placement: 'top'
  }
}, {
  target: '#about',
  content: 'tours.home.ABOUT_LABEL',
  params: {
    placement: 'top',
    clickOnNext: '#about',
    nextDelay: 500
  }
}, {
  target: '#report-bug',
  content: 'tours.home.BUG_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: ['#close-action', '#left-opener'],
    previousDelay: 500
  }
}]
