module.exports = [{
  target: '#logout',
  title: 'tours.home.LOGOUT_LABEL',
  content: 'tours.home.SESSION_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: '#online-help',
    previousDelay: 500
  }
}, {
  target: '#help',
  link: 'tours.home.HELP_LABEL',
  params: {
    placement: 'top',
    clickOnLink: '#help'
  }
}, {
  target: '#edit-settings',
  content: 'tours.home.SETTINGS_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: '#about',
    previousDelay: 500
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
    clickOnPrevious: ['#close-action', '#opener-left'],
    previousDelay: 500
  }
}]
