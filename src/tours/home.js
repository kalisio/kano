module.exports = [{
  target: '#left-opener',
  title: 'tours.home.SIDENAV_LABEL',
  link: 'tours.home.SIDENAV_LINK_LABEL',
  params: {
    placement: 'right',
    hoverClickOnLink: '#left-opener',
    tour: 'side-nav'
  }
}, {
  target: '#top-opener',
  title: 'tours.home.NAVIGATION_BAR_LABEL',
  link: 'tours.home.NAVIGATION_BAR_LINK_LABEL',
  params: {
    placement: 'bottom',
    tour: 'navigation-bar'
  }
}, {
  target: '#right-opener',
  title: 'tours.home.CATALOG_LABEL',
  link: 'tours.home.CATALOG_LINK_LABEL',
  params: {
    placement: 'left',
    hoverClickOnLink: '#right-opener',
    tour: 'catalog-panel'
  }
}, {
  target: '#bottom-opener',
  title: 'tours.home.TIMELINE_LABEL',
  link: 'tours.home.TIMELINE_LINK_LABEL',
  params: {
    placement: 'top',
    hoverClickOnLink: '#bottom-opener',
    tour: 'timeline'
  }
}, {
  target: '#fab',
  title: 'tours.home.FAB_LABEL',
  link: 'tours.home.FAB_LINK_LABEL',
  params: {
    placement: 'top',
    hoverClickOnLink: 'div.q-fab__icon-holder',
    tour: 'fab'
  }
}]
