module.exports = [{
  target: '#group-field',
  content: 'tours.join-group.GROUP_NAME_LABEL',
  params: {
    placement: 'top'
  }
}, {
  target: '#role-field',
  title: 'tours.join-group.MEMBER_ROLE_LABEL',
  content: 'tours.join-group.ROLES_LABEL',
  params: {
    placement: 'left',
    clickDelay: 500,
    clickOnNext: '#role-field',
    nextDelay: 500,
    clickOnPrevious: '#role-field',
    previousDelay: 500
  }
}, {
  target: '#join-button',
  content: 'tours.join-group.ADD_MEMBER_LABEL',
  params: {
    placement: 'left'
  }
}]
