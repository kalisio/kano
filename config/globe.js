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
    name: 'Kalisio  Sentinel 2 Cloudless',
    tooltip: 'Sentinel-2 cloudless.\nby EOX IT Services GmbH https://s2maps.eu',
    iconUrl: 'Widgets/Images/ImageryProviders/mapboxSatellite.png',
    type: 'OpenStreetMap',
    url: 'https://mapproxy.kargo.kalisio.xyz/wmts/s2/GLOBAL_WEBMERCATOR',
    fileExtension: 'jpeg'
  }, {
    name: 'Kalisio Open\u00adStreet\u00adMap',
    tooltip: 'OpenStreetMap (OSM) data.\nBy http://www.kalisio.com',
    iconUrl: 'Widgets/Images/ImageryProviders/openStreetMap.png',
    type: 'OpenStreetMap',
    url: 'http://tileservergl.xwind-ai.com/styles/osm-terrain',
  }],
  terrainLayers: [{
    name : 'Kalisio Terrain',
    iconUrl : 'Widgets/Images/TerrainProviders/CesiumWorldTerrain.png',
    tooltip : 'High-resolution, mesh-based terrain for the entire globe.\nBy http://www.kalisio.com',
    type: 'Cesium',
    url : 'http://cesiumterrainserver.kalisio.xyz/tilesets/md15-tiles',
    requestWaterMask : true,
    requestVertexNormals : true
  },
  {
    name : 'WGS84 Ellipsoid',
    iconUrl: 'Widgets/Images/TerrainProviders/Ellipsoid.png',
    tooltip : 'WGS84 standard ellipsoid',
    type: 'Ellipsoid'
  }],
  overlayLayers: [
    {
      type: 'geoJson',
      name: 'Téléray',
      arguments: [
        'https://s3.eu-central-1.amazonaws.com/kargo/teleray.json',
        {
          interval: 10 * 60 * 1000,
          clustering: { pixelRange: 50 },
          'marker-symbol': 'lighthouse',
          'marker-color': '#180EF1'
        }
      ]
    }
  ],
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
