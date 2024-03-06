module.exports = [{
    name: 'Layers.OSM',
    description: 'Layers.OSM_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OSM: 'OSM',
          OSM_DESCRIPTION: 'Données OpenStreetMap'
        }
      },
      en: {
        Layers: {
          OSM: 'OSM',
          OSM_DESCRIPTION: 'OpenStreeMap data'
        }
      }
    },
    tags: [
      'street'
    ],
    iconUrl: `http://a.tile.osm.org/0/0/0.png`,
    icon: 'streetview',
    attribution: 'OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      isVisible: true,
      source: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      maxZoom: 21,
      maxNativeZoom: 18
    },
    cesium: {
      type: 'OpenStreetMap',
      url: `http://a.tile.osm.org`
    }
  },
  {
    name: 'Layers.PLAN_IGN',
    description: 'Layers.PLAN_IGN_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          PLAN_IGN: 'Plan IGN',
          PLAN_IGN_DESCRIPTION: 'Plan IGN v2'
        }
      },
      en: {
        Layers: {
          PLAN_IGN: 'Plan IGN',
          PLAN_IGN_DESCRIPTION: 'Plan IGN v2'
        }
      }
    },
    tags: [
      'street'
    ],
    type: 'BaseLayer',
    iconUrl: 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX=8&TILEROW=92&TILECOL=132',
    icon: 'las la-plug',
    attribution: '<a href="https://www.ign.fr/">IGN</a>',
    cesium: {
      type: 'WebMapTileService',
      url: 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}',
      format: 'image/png',
      layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
      style: 'normal',
      tileMatrixSetID: 'PM'
    },
    leaflet: {
      type: 'tileLayer',
      source: 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    }
  }
]


