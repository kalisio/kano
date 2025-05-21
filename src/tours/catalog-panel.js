const catalogPanel = require('./map/catalog-panel')

module.exports = [
  catalogPanel.catalogTabBar(),
  catalogPanel.userLayers({ target: '#user-layers' }),
  catalogPanel.manageLayers({
    params: {
      placement: 'left',
      clickOnLink: '#manage-layer-categories',
      clickOnNext: '#user-views',
      nextDelay: 500
    }
  }),
  catalogPanel.userViews({
    target: '#user-views',
    params: {
      placement: 'top',
      hoverClickOnLink: 'div.q-fab__icon-holder',
      clickOnPrevious: '#user-layers',
      tour: 'fab'
    }
  }),
  catalogPanel.viewsFilter(),
  {
    target: '#views-sorter',
    title: 'tours.catalog-panel.USER_VIEWS_SORTER_LABEL',
    params: {
      placement: 'top',
      blockOnMiss: 'div [component="catalog/KViewSelector"]'
    }
  },
  catalogPanel.viewSelector(),
  catalogPanel.setHomeView(),
  catalogPanel.removeView({
    params: {
      placement: 'bottom',
      clickOnNext: '#catalog-layers',
      nextDelay: 500
    }
  }),
  catalogPanel.layerCategory(),
  catalogPanel.layerDark(),
  catalogPanel.layerBright(),
  catalogPanel.forecastModel(),
  catalogPanel.layerWind()
]
