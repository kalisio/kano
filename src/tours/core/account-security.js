module.exports = [{
  target: '#password-block',
  link: 'tours.account.PASSWORD_LINK_LABEL',
  params: {
    placement: 'top',
    route: { name: 'change-password' }
  }
}, {
  target: '#email-block',
  link: 'tours.account.EMAIL_LINK_LABEL',
  params: {
    placement: 'top',
    route: { name: 'send-change-identity' }
  }
}, {
  target: '#devices-block',
  title: 'tours.account.DEVICES_LABEL',
  content: 'tours.account.UNLINK_LABEL',
  params: {
    placement: 'top'
  }
}, {
  target: '#danger-zone',
  link: 'tours.account.DANGER_ZONE_LABEL',
  params: {
    placement: 'bottom',
    clickOnLink: '#danger-zone',
    tour: 'account-activity/danger-zone'
  }
}]
