module.exports = [{
  target: '#user-field',
  content: 'tours.add-member.MEMBER_NAME_LABEL',
  params: {
    placement: 'top'
  }
}, {
  target: '#role-field',
  title: 'tours.add-member.MEMBER_ROLE_LABEL',
  content: 'tours.add-member.ROLES_LABEL',
  params: {
    placement: 'left',
    clickDelay: 500,
    clickOnNext: '#role-field',
    nextDelay: 500,
    clickOnPrevious: '#role-field',
    previousDelay: 500
  }
}, {
  target: '#add-button',
  content: 'tours.add-member.ADD_MEMBER_LABEL',
  params: {
    placement: 'left',
    clickOnNext: '#close-action',
    nextDelay: 500
  }
}]
