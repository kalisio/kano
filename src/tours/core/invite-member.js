module.exports = [{
  target: '#name-field',
  content: 'tours.invite-member.MEMBER_NAME_LABEL',
  params: {
    placement: 'top'
  }
}, {
  target: '#email-field',
  title: 'tours.invite-member.MEMBER_EMAIL_LABEL',
  content: 'tours.invite-member.INVITATION_EMAIL_LABEL',
  params: {
    placement: 'left'
  }
}, {
  target: '#role-field',
  title: 'tours.invite-member.MEMBER_ROLE_LABEL',
  content: 'tours.invite-member.ROLES_LABEL',
  params: {
    placement: 'left',
    clickDelay: 500,
    clickOnNext: '#role-field',
    nextDelay: 500,
    clickOnPrevious: '#role-field',
    previousDelay: 500
  }
}, {
  target: '#invite-button',
  content: 'tours.invite-member.INVITE_MEMBER_LABEL',
  params: {
    placement: 'left'
  }
}]
