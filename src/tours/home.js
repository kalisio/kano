const home = require('./kdk/layout')

module.exports = [
  home.leftOpener(),
  {
    target: '#top-opener',
    content: 'tours.home.NAVIGATION_BAR_LABEL',
    link: 'tours.home.NAVIGATION_BAR_LINK_LABEL',
    params: {
      placement: 'bottom',
      tour: 'navigation-bar'
    }
  },
  home.rightOpener(),
  {
    target: '#bottom-opener',
    content: 'tours.home.TIMELINE_LABEL',
    link: 'tours.home.TIMELINE_LINK_LABEL',
    params: {
      placement: 'top',
      hoverClickOnLink: '#bottom-opener',
      tour: 'timeline'
    }
  },
  home.fab({
    params: {
      placement: 'top',
      hoverClickOnLink: 'div.q-fab__icon-holder',
      tour: 'fab'
    }
  })
]
