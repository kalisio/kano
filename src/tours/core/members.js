module.exports = [{
  target: '#members',
  title: 'tours.members.MEMBERS_LABEL',
  content: 'tours.members.MEMBER_DEFINITION_LABEL',
  params: {
    placement: 'bottom'
  }
}, {
  target: '#app-bar-overflow-menu',
  content: 'tours.members.OVERFLOW_MENU_LABEL',
  params: {
    placement: 'left',
    clickOn: '#app-bar-overflow-menu',
    clickDelay: 500,
    clickOnNext: '#app-bar-overflow-menu',
    nextDelay: 500,
    clickOnPrevious: '#app-bar-overflow-menu',
    previousDelay: 500
  }
}, {
  target: '#search',
  title: 'tours.members.SEARCH_LABEL',
  content: 'tours.members.SEARCH_MORE_LABEL',
  params: {
    placement: 'left'
  }
}, {
  target: '#fab',
  content: 'tours.members.ADD_INVITE_MEMBER_LABEL',
  params: {
    placement: 'left',
    clickOn: 'div.q-fab__icon-holder',
    clickDelay: 500,
    nextDelay: 500
  }
}, {
  target: '#add-member',
  content: 'tours.members.ADD_MEMBER_LABEL',
  link: 'tours.members.ADD_MEMBER_LINK_LABEL',
  params: {
    placement: 'left',
    clickOnPrevious: '#fab',
    previousDelay: 500,
    route: { name: 'add-member' }
  }
}, {
  target: '#invite-member',
  content: 'tours.members.INVITE_MEMBER_LABEL',
  link: 'tours.members.INVITE_MEMBER_LINK_LABEL',
  params: {
    placement: 'left',
    clickOnNext: 'div.q-fab__icon-holder',
    nextDelay: 500,
    route: { name: 'invite-member' }
  }
}, {
  target: 'div.q-card.q-card--bordered',
  content: 'tours.members.MEMBER_CARD_LABEL',
  params: {
    placement: 'right',
    clickOnPrevious: 'div.q-fab__icon-holder',
    previousDelay: 500
  }
}, {
  target: '#role-badge',
  content: 'tours.members.ROLE_LABEL',
  params: {
    placement: 'bottom'
  }
}, {
  target: '#tags-pane',
  content: 'tours.members.TAGS_LABEL',
  params: {
    placement: 'right'
  }
}, {
  target: '#join-group',
  content: 'tours.members.JOIN_GROUP_LABEL',
  link: 'tours.members.JOIN_GROUP_LINK_LABEL',
  params: {
    placement: 'right',
    clickOnLink: '#join-group'
  }
}, {
  target: '#group-button',
  content: 'tours.members.GROUP_LABEL',
  params: {
    placement: 'right',
    clickOn: '#group-button'
  }
}, {
  target: '#change-role-group',
  content: 'tours.members.CHANGE_GROUP_ROLE_LABEL',
  params: {
    placement: 'bottom'
  }
}, {
  target: '#leave-group',
  content: 'tours.members.LEAVE_GROUP_LABEL',
  params: {
    placement: 'bottom'
  }
}, {
  target: '#tag-member',
  content: 'tours.members.TAG_MEMBER_LABEL',
  link: 'tours.members.TAGS_LINK_LABEL',
  params: {
    placement: 'bottom',
    clickOnLink: '#tag-member'
  }
}, {
  target: '#change-role',
  content: 'tours.members.CHANGE_ROLE_LABEL',
  link: 'tours.members.CHANGE_ROLE_LINK_LABEL',
  params: {
    placement: 'bottom',
    clickOnLink: '#change-role'
  }
}, {
  target: '#card-overflow-menu',
  content: 'tours.members.MEMBER_OVERFLOW_MENU_LABEL',
  params: {
    placement: 'top',
    clickOnNext: '#card-overflow-menu',
    nextDelay: 500
  }
}, {
  target: '#remove-member',
  title: 'tours.members.REMOVE_MEMBER_LABEL',
  content: 'tours.members.REMOVE_CONFIRMATION_LABEL',
  params: {
    placement: 'left',
    clickOnPrevious: '#card-overflow-menu',
    previousDelay: 500
  }
}]
