module.exports = {
  INFORMATION_BOX: {
    id: 'information-box',
    label: 'KInformationBox.LABEL',
    icon: 'las la-digital-tachograph',
    scrollable: true,
    content: { component: 'widget/KInformationBox' },
    header: [{
      id: 'center-view',
      icon: 'las la-eye',
      tooltip: 'KInformationBox.CENTER_ON',
      visible: 'hasFeature',
      handler: 'onCenterOn'
    }, {
      id: 'copy-properties',
      icon: 'las la-clipboard',
      tooltip: 'KInformationBox.COPY_PROPERTIES',
      visible: 'hasProperties',
      handler: 'onCopyProperties'
    }, {
      id: 'export-feature',
      icon: 'kdk:json.svg',
      tooltip: 'KInformationBox.EXPORT_FEATURE',
      visible: 'hasFeature',
      handler: 'onExportFeature'
    }]
  }, 
  TIME_SERIES: {
    id: 'time-series',
    label: 'TimeSeries.LABEL',
    icon: 'las la-chart-line',
    content: { component: 'TimeSeries' },
    header: [{ component: 'TimeSeriesToolbar' }]
  }, 
  ELEVATION_PROFILE: {
    id: 'elevation-profile',
    label: 'KElevationProfile.LABEL',
    icon: 'las la-mountain',
    content: { component: 'widget/KElevationProfile' },
    header: [{
      id: 'center-view',
      icon: 'las la-eye',
      tooltip: 'KElevationProfile.CENTER_ON',
      visible: 'hasFeature',
      handler: 'onCenterOn'
    }, {
      id: 'copy-properties',
      icon: 'las la-clipboard',
      tooltip: 'KElevationProfile.COPY_PROFILE',
      visible: 'hasProfile',
      handler: 'onCopyProfile'
    }, {
      id: 'export-feature',
      icon: 'kdk:json.svg',
      tooltip: 'KElevationProfile.EXPORT_PROFILE',
      visible: 'profile',
      handler: 'onExportProfile'
    }]
  }, 
  MAPILLARY_VIEWER: {
    id: 'mapillary-viewer',
    label: 'KMapillaryViewer.LABEL',
    icon: 'kdk:mapillary.png',
    content: { component: 'widget/KMapillaryViewer' },
    header: [{
      id: 'center',
      icon: 'las la-eye',
      tooltip: 'KMapillaryViewer.CENTER_ON',
      visible: 'hasImage',
      handler: 'centerMap'
    }]
  }
}