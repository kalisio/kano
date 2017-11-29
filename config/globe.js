module.exports = {
  viewer: {
    sceneMode : 3, // SceneMode.COLUMBUS_VIEW = 1, SceneMode.SCENE3D = 3,
    sceneModePicker : false,
    scene3DOnly : true,
    homeButton : false,
    geocoder : false,
    navigationHelpButton : true,
    baseLayerPicker : true,
    vrButton: true,
    animation: false,
    //creditContainer: 'xxx',
    timeline: false
  },
  baseLayers: [{
    name: 'Mapbox Satellite',
    tooltip: 'Mapbox satellite imagery https://www.mapbox.com/maps/',
    iconUrl: 'Widgets/Images/ImageryProviders/mapboxSatellite.png',
    type: 'Mapbox',
    mapId: 'mapbox.satellite'
  }, {
    name: 'Mapbox Streets',
    tooltip: 'Mapbox streets imagery https://www.mapbox.com/maps/',
    iconUrl: 'Widgets/Images/ImageryProviders/mapboxTerrain.png',
    type: 'Mapbox',
    mapId: 'mapbox.streets'
  }],
  terrainLayers: [{
    name : 'WGS84 Ellipsoid',
    iconUrl: 'Widgets/Images/TerrainProviders/Ellipsoid.png',
    tooltip : 'WGS84 standard ellipsoid, also known as EPSG:4326',
    type: 'Ellipsoid'
  }, {
    name : 'STK World Terrain meshes',
    iconUrl : 'Widgets/Images/TerrainProviders/STK.png',
    tooltip : 'High-resolution, mesh-based terrain for the entire globe. Free for use on the Internet. Closed-network options are available.\nhttp://www.agi.com',
    type: 'Cesium',
    url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles',
    requestWaterMask : true,
    requestVertexNormals : true
  }],
  fileLayers: {
    clearOnDrop : false,
    flyToOnDrop: true,
    clampToGround: true
  },
  // Default GeoJSON layer style for points/polygons/lines in simple style spec
  featureStyle: {
    'marker-symbol': 'airport',
    'marker-color': '#57D824'
  }
}
