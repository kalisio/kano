module.exports = [{
  target: '#tags',
  title: 'tours.tags.TAGS_LABEL',
  content: 'tours.tags.TAG_DEFINITION_LABEL',
  params: {
    placement: 'bottom'
  }
}, {
  target: '#app-bar-overflow-menu',
  content: 'tours.tags.OVERFLOW_MENU_LABEL',
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
  content: 'tours.tags.SEARCH_LABEL',
  link: 'tours.tags.CREATE_TAG_LINK_LABEL',
  params: {
    placement: 'left',
    blockOnMiss: 'div.q-card.q-card--bordered',
    route: { name: 'members-activity' }
  }
}, {
  target: 'div.q-card.q-card--bordered',
  content: 'tours.tags.TAG_CARD_LABEL',
  params: {
    placement: 'right'
  }
}, {
  target: '#tag-count',
  title: 'tours.tags.TAG_COUNT_LABEL',
  content: 'tours.tags.REMOVE_TAG_LABEL',
  params: {
    placement: 'bottom'
  }
}, {
  target: '#edit-tag',
  content: 'tours.tags.UPDATE_TAG_LABEL',
  params: {
    placement: 'bottom'
  }
}]
