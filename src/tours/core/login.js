module.exports = [{
  target: '#email-field',
  title: 'tours.login.LOCAL_LABEL',
  content: 'tours.login.EMAIL_LABEL',
  params: {
    placement: 'left'
  }
}, {
  target: '#password-field',
  content: 'tours.login.PASSWORD_LABEL',
  params: {
    placement: 'left'
  }
}, {
  target: '#password-field-visibility',
  content: 'tours.login.PASSWORD_VISIBILITY_LABEL',
  params: {
    placement: 'top',
    clickDelay: 1000
  }
}, {
  target: '#local',
  content: 'tours.login.LOGIN_LABEL',
  params: {
    placement: 'right'
  }
}, {
  target: '#reset-password-link',
  link: 'tours.login.LOST_PASSWORD_LINK_LABEL',
  params: {
    placement: 'bottom',
    route: { name: 'send-reset-password' }
  }
}, {
  target: '#register-link',
  link: 'tours.login.REGISTER_LINK_LABEL',
  params: {
    placement: 'bottom',
    route: { name: 'register' }
  }
}, {
  target: '#google',
  title: 'tours.login.SOCIAL_LABEL',
  content: 'tours.login.GOOGLE_LABEL',
  params: {
    placement: 'bottom'
  }
}]
