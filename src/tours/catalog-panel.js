const catalogPanel = require('./map/catalog-panel')

module.exports = [
  catalogPanel.catalogTabBar(),
  catalogPanel.userLayers(),
  catalogPanel.manageLayers(),
  catalogPanel.userViews(),
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
  catalogPanel.removeView(),
  catalogPanel.layerCategory(),
  catalogPanel.layerDark(),
  catalogPanel.layerBright(),
  catalogPanel.forecastModel(),
  catalogPanel.layerWind()
]
