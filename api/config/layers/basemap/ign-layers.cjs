module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.IGN_PLAN',
    description: 'Layers.IGN_PLAN_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          IGN_PLAN: 'Plan (IGN)',
          IGN_PLAN_DESCRIPTION: 'Cartographie multi-échelles sur la France issue des bases de données vecteur de l\'IGN'
        }
      },
      en: {
        Layers: {
          IGN_PLAN: 'Plan (IGN)',
          IGN_PLAN_DESCRIPTION: 'Multi-scale French map based on IGN vector databases'
        }
      }
    },
    tags: [
      'maps'
    ],
    iconUrl: 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX=9&TILEROW=187&TILECOL=260',
    icon: 'streetview',
    attribution: '© <a href="https://ign.fr">IGN</a>',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
      maxZoom: 21,
      maxNativeZoom: 19
    },
    cesium: {
      type: 'WebMapTileService',
      url: 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}',
      format: 'image/png',
      layer: 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2',
      style: 'normal',
      tileMatrixSetID: 'PM'
    }
  }, {
    name: 'Layers.IGN_IMAGERY',
    description: 'Layers.IGN_IMAGERY_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          IGN_IMAGERY: 'Imagerie (IGN)',
          IGN_IMAGERY_DESCRIPTION: 'Photographies aériennes issue des bases de données de l\'IGN'
        }
      },
      en: {
        Layers: {
          IGN_IMAGERY: 'Imagerie (IGN)',
          IGN_IMAGERY_DESCRIPTION: 'Aerial imagery based on IGN databases'
        }
      }
    },
    tags: [
      'maps'
    ],
    iconUrl: 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX=9&TILEROW=187&TILECOL=260',
    icon: 'satellite',
    attribution: '© <a href="https://ign.fr">IGN</a>',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
      maxZoom: 21,
      maxNativeZoom: 19
    },
    cesium: {
      type: 'WebMapTileService',
      url: 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}',
      format: 'image/png',
      layer: 'ORTHOIMAGERY.ORTHOPHOTOS',
      style: 'normal',
      tileMatrixSetID: 'PM'
    }
  }]
}
