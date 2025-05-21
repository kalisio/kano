const navigationBar = require('./map/navigation-bar')

module.exports = [
  navigationBar.toggleMap(),
  navigationBar.toggleGlobe({ target: '#globe-activity-action' }),
  navigationBar.zoomIn(),
  navigationBar.locateUser(),
  navigationBar.searchLocation(),
  navigationBar.searchTool(),
  navigationBar.restoreDefault({
    target: '#back',
    params: {
      placement: 'bottom',
      clickOnNext: '#back',
      nextDelay: 500
    }
  }),
  navigationBar.tools(),
  navigationBar.togglePosition(),
  navigationBar.positionIndicator(),
  navigationBar.copyPosition(),
  navigationBar.closePosition(),
  navigationBar.toggleNorthArrow({ params: { clickOnNext: '#tools' } }),
  navigationBar.measureTool(),
  navigationBar.measureDistance(),
  navigationBar.measureArea(),
  navigationBar.measureFeature(),
  navigationBar.measureCircle(),
  navigationBar.clearMeasurements(),
  navigationBar.restoreDefault({
    target: '#back',
    params: {
      placement: 'bottom',
      clickOnNext: '#back',
      nextDelay: 500
    }
  }),
  navigationBar.captureMap(),
  // {
  //   target: '#capture-button',
  //   title: 'tours.navigation-bar.CAPTURE_BUTTON_LABEL',
  //   params: {
  //     placement: 'bottom',
  //   }
  // }, {
  //   target: '#restore-default',
  //   title: 'tours.navigation-bar.CAPTURE_BACK_LABEL',
  //   params: {
  //     placement: 'bottom',
  //     clickOnNext: '#restore-default',
  //     nextDelay: 500
  //   }
  // },
  navigationBar.toggleVr(),
  navigationBar.toggleFullscreen()
]
