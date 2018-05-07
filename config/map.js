module.exports = {
  baseLayers: [
    {
      type: 'tileLayer',
      arguments: [
        'http://mapproxy.kalisio.xyz/wmts/osm/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          label: 'OpenStreetMap',
          attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        }
      ]
    }
  ],
  overlayLayers: [
    {
      type: 'vectorGrid.protobuf',
      name: 'Airports',
      arguments: [
        'http://tileservergl.kalisio.xyz/data/airports/{z}/{x}/{y}.pbf',
        {
          rendererFactory: 'canvas.tile',
          maxNativeZoom: 14,
          maxZoom: 20,
          label: 'Airports',
          interactive: true,
          vectorTileLayerStyles: {
            airports: {
              weight: 2,
              color: 'red',
              opacity: 1,
              fillColor: 'yellow',
              fill: true,
              radius: 6,
              fillOpacity: 0.7
            }
          }
        }
      ]
    }
  ],
  // Default GeoJSON layer style for polygons/lines
  featureStyle: {
    opacity: 1,
    radius: 6,
    color: 'red',
    fillOpacity: 0.5,
    fillColor: 'green',
    popup: {
      excludedProperties: ['wikipedia']
    }
  },
  // Default GeoJSON layer style for points
  pointStyle: {
    type: 'circleMarker',
    options: {
      opacity: 1,
      color: 'red',
      fillOpacity: 0.5,
      fillColor: 'green'
    }
  }
}
