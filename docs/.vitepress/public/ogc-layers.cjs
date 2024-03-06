module.exports = [{
  name: 'Layers.POPULATION_DENSITY_WMTS',
  description: 'Layers.POPULATION_DENSITY_WMTS_DESCRIPTION',
  i18n: {
    fr: {
      Layers: {
        POPULATION_DENSITY_WMTS: 'Densité (WMTS)',
        POPULATION_DENSITY_WMTS_DESCRIPTION: 'Densité de population (IGN)'
      }
    },
    en: {
      Layers: {
        POPULATION_DENSITY_WMTS: 'Density (WMTS)',
        POPULATION_DENSITY_WMTS_DESCRIPTION: 'Population density (IGN)'
      }
    }
  },
  type: 'OverlayLayer',
  attribution: '© <a href="https://ign.fr">IGN</a>',
  tags: ['population'],
  cesium: {
    type: 'WebMapTileService',
    url: 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=INSEE.FILOSOFI.POPULATION&STYLE=INSEE&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}',
    format: 'image/png',
    layer: 'INSEE.FILOSOFI.POPULATION',
    style: 'INSEE',
    tileMatrixSetID: 'PM',
    isVisible: false
  },
  leaflet: {
    type: 'tileLayer',
    source: 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=INSEE.FILOSOFI.POPULATION&STYLE=INSEE&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    bounds: [ [40, -5], [50, 10] ],
    opacity: 0.5,
    isVisible: false
  },
  legendUrl: 'https://data.geopf.fr/annexes/ressources/legendes/INSEE.FILOSOFI.POPULATION-tot-legend-2017.png'
}, {
  name: 'Layers.POPULATION_DENSITY_WMS',
  description: 'Layers.POPULATION_DENSITY_WMS_DESCRIPTION',
  i18n: {
    fr: {
      Layers: {
        POPULATION_DENSITY_WMS: 'Densité (WMS)',
        POPULATION_DENSITY_WMS_DESCRIPTION: 'Densité de population (IGN)'
      }
    },
    en: {
      Layers: {
        POPULATION_DENSITY_WMS: 'Density (WMS)',
        POPULATION_DENSITY_WMS_DESCRIPTION: 'Population density (IGN)'
      }
    }
  },
  type: 'OverlayLayer',
  attribution: '© <a href="https://ign.fr">IGN</a>',
  tags: ['population'],
  cesium: {
    type: 'WebMapService',
    url: 'https://data.geopf.fr/wms-r/wms',
    layers: 'INSEE.FILOSOFI.POPULATION',
    parameters: {
      version: '1.3.0',
      format: 'image/png',
      transparent: true,
      styles: 'INSEE'
    },
    isVisible: false
  },
  leaflet: {
    type: 'tileLayer.wms',
    source: 'https://data.geopf.fr/wms-r/wms',
    layers: 'INSEE.FILOSOFI.POPULATION',
    version: '1.3.0',
    format: 'image/png',
    transparent: true,
    bgcolor: 'FFFFFFFF',
    styles: 'INSEE',
    opacity: 0.5,
    isVisible: false
  },
  legendUrl: 'https://data.geopf.fr/annexes/ressources/legendes/INSEE.FILOSOFI.POPULATION-tot-legend-2017.png'
}, {
  name: 'Layers.AIRPORTS_WFS',
  description: 'Layers.AIRPORTS_WFS_DESCRIPTION',
  i18n: {
    fr: {
      Layers: {
        AIRPORTS_WFS: 'Aérodromes (WFS)',
        AIRPORTS_WFS_DESCRIPTION: 'Aérodromes (IGN)'
      }
    },
    en: {
      Layers: {
        AIRPORTS_WFS: 'Airports (WFS)',
        AIRPORTS_WFS_DESCRIPTION: 'Airports (IGN)'
      }
    }
  },
  type: 'OverlayLayer',
  icon: 'las la-plane',
  tags: ['administrative'],
  bbox: [
    -63.1537116941531,
    -21.3898266619462,
    55.8367758165235,
    51.3150480097903
  ],
  featureId: 'toponyme',
  wfs: {
    url: 'https://data.geopf.fr/wfs/ows',
    version: '2.0.0',
    searchParams: {},
    outputFormat: 'json',
    layer: 'BDCARTO_V5:aerodrome'
  },
  leaflet: {
    type: 'geoJson',
    realtime: true,
    tiled: true,
    minZoom: 10
  },
  cesium: {
    type: 'geoJson',
    realtime: true
  }
}]
