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
    },
    {
      type: 'tileLayer',
      arguments: [
        'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png',
        {
          maxZoom: 20,
          label: 'Satellite',
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
                      'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }
      ]
    },
    {
      type: 'tileLayer',
      arguments: [
        'http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png',
        {
          maxZoom: 20,
          label: 'Neutral',
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
                       'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        }
      ]
    },
    {
      type: 'tileLayer.wms',
      arguments: [
        'https://geoservices.meteofrance.fr/api/__1sTDhRuCpiY-Be1-yROnR2E4VKXbZk46Ry3oeZjBNSg__/PPERO_01WMS',
        {
          layers: 'FL__ISO_0',
          version: '1.3.0',
          transparent: true,
          crs: 'CRS.EPSG3857',
          format: 'image/png',
          dim_reference_time: '2017-10-12T00:00:00Z',
          time: '2017-10-13T00:00:00Z',
          styles: 'FLP__ISO_0__NO_SHADING',
          //  elevation: '100',
          uppercase: true,
          maxZoom: 20,
          label: 'MF-FL_ISO_0'
        }
      ]
    },
    {
      type: 'vectorGrid.protobuf',
      arguments: [
        'http://tileservergl.kalisio.xyz/data/planet/{z}/{x}/{y}.pbf',
        {
          rendererFactory: 'canvas.tile',
          maxNativeZoom: 14,
          maxZoom: 20,
          label: 'Custom OSM',
          vectorTileLayerStyles: {
            water: {
              fill: true,
              weight: 1,
              fillColor: '#06cccc',
              color: '#06cccc',
              fillOpacity: 0.2,
              opacity: 0.4,
            },
            admin: {
              weight: 1,
              fillColor: 'pink',
              color: 'pink',
              fillOpacity: 0.2,
              opacity: 0.4
            },
            waterway: {
              weight: 1,
              fillColor: '#2375e0',
              color: '#2375e0',
              fillOpacity: 0.2,
              opacity: 0.4
            },
            landcover: {
              fill: true,
              weight: 1,
              fillColor: '#53e033',
              color: '#53e033',
              fillOpacity: 0.2,
              opacity: 0.4,
            },
            landuse: {
              fill: true,
              weight: 1,
              fillColor: '#e5b404',
              color: '#e5b404',
              fillOpacity: 0.2,
              opacity: 0.4
            },
            park: {
              fill: true,
              weight: 1,
              fillColor: '#84ea5b',
              color: '#84ea5b',
              fillOpacity: 0.2,
              opacity: 0.4
            },
            boundary: {
              weight: 1,
              fillColor: '#c545d3',
              color: '#c545d3',
              fillOpacity: 0.2,
              opacity: 0.4
            },
            aeroway: {
              weight: 1,
              fillColor: '#51aeb5',
              color: '#51aeb5',
              fillOpacity: 0.2,
              opacity: 0.4
            },
            road: { // mapbox & mapzen only
              weight: 1,
              fillColor: '#f2b648',
              color: '#f2b648',
              fillOpacity: 0.2,
              opacity: 0.4
            },
            tunnel: { // mapbox only
              weight: 0.5,
              fillColor: '#f2b648',
              color: '#f2b648',
              fillOpacity: 0.2,
              opacity: 0.4,
      //          dashArray: [4, 4]
            },
            bridge: { // mapbox only
              weight: 0.5,
              fillColor: '#f2b648',
              color: '#f2b648',
              fillOpacity: 0.2,
              opacity: 0.4,
      //          dashArray: [4, 4]
            },
            transportation: { // openmaptiles only
              weight: 0.5,
              fillColor: '#f2b648',
              color: '#f2b648',
              fillOpacity: 0.2,
              opacity: 0.4,
      //          dashArray: [4, 4]
            },
            transit: {  // mapzen only
              weight: 0.5,
              fillColor: '#f2b648',
              color: '#f2b648',
              fillOpacity: 0.2,
              opacity: 0.4,
      //          dashArray: [4, 4]
            },
            building: {
              fill: true,
              weight: 1,
              fillColor: '#2b2b2b',
              color: '#2b2b2b',
              fillOpacity: 0.2,
              opacity: 0.4
            },
            water_name: {
              weight: 1,
              fillColor: '#022c5b',
              color: '#022c5b',
              fillOpacity: 0.2,
              opacity: 0.4
            },
            transportation_name: {
              weight: 1,
              fillColor: '#bc6b38',
              color: '#bc6b38',
              fillOpacity: 0.2,
              opacity: 0.4
            },
            place: {
              weight: 1,
              fillColor: '#f20e93',
              color: '#f20e93',
              fillOpacity: 0.2,
              opacity: 0.4
            },
            housenumber: {
              weight: 1,
              fillColor: '#ef4c8b',
              color: '#ef4c8b',
              fillOpacity: 0.2,
              opacity: 0.4
            },
            poi: {
              weight: 1,
              fillColor: '#3bb50a',
              color: '#3bb50a',
              fillOpacity: 0.2,
              opacity: 0.4
            },
            earth: {  // mapzen only
              fill: true,
              weight: 1,
              fillColor: '#c0c0c0',
              color: '#c0c0c0',
              fillOpacity: 0.2,
              opacity: 0.4
            },


            // Do not symbolize some stuff for mapbox
            country_label: [],
            marine_label: [],
            state_label: [],
            place_label: [],
            waterway_label: [],
            poi_label: [],
            road_label: [],
            housenum_label: [],


            // Do not symbolize some stuff for openmaptiles
            country_name: [],
            marine_name: [],
            state_name: [],
            place_name: [],
            waterway_name: [],
            poi_name: [],
            road_name: [],
            housenum_name: [],
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
