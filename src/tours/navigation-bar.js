const navigationBar = require('./map/navigation-bar')

module.exports = [
  navigationBar.toggleMap(),
  navigationBar.toggleGlobe(),
  navigationBar.zoomIn(),
  navigationBar.locateUser(),
  navigationBar.searchLocation(),
  navigationBar.searchTool(),
  navigationBar.restoreDefault(),
  navigationBar.tools(),
  navigationBar.togglePosition(),
  navigationBar.positionIndicator(),
  navigationBar.copyPosition(),
  navigationBar.restoreDefault({
    params: {
      placement: 'bottom',
      clickOnNext: ['#back', '#restore-default', '#tools'],
      nextDelay: 500
    }
  }),
  navigationBar.measureTool(),
  navigationBar.measureDistance(),
  navigationBar.measureArea(),
  navigationBar.measureFeature(),
  navigationBar.measureCircle(),
  navigationBar.clearMeasurements(),
  navigationBar.restoreDefault({
    params: {
      placement: 'bottom',
      clickOnNext: ['#back', '#restore-default', '#tools'],
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
