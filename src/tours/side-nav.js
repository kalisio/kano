const _ = require('lodash')
const tour = require('./map/side-nav')

module.exports = [
  _.find(tour, { target: '#logout' }), {
  target: '#edit-settings',
  content: 'tours.side-nav.SETTINGS_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: '#left-opener',
    clickOnNext: '#left-opener',
    previousDelay: 500
  }
}, 
_.find(tour, { target: '#contextual-help' }), 
_.find(tour, { target: '#about' }), 
_.find(tour, { target: '#report-bug' })
]