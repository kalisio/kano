module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.OSM_BOUNDARIES',
    description: 'Layers.OSM_BOUNDARIES_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OSM_BOUNDARIES: 'Limites administratives - OpenStreetMap (par niveau)',
          OSM_BOUNDARIES_DESCRIPTION: 'Limites administratives - OpenStreetMap (par niveau)',
          OSM_BOUNDARIES_LEVEL_2: 'Niveau 2',
          OSM_BOUNDARIES_LEVEL_3: 'Niveau 3',
          OSM_BOUNDARIES_LEVEL_4: 'Niveau 4',
          OSM_BOUNDARIES_LEVEL_5: 'Niveau 5',
          OSM_BOUNDARIES_LEVEL_6: 'Niveau 6',
          OSM_BOUNDARIES_LEVEL_7: 'Niveau 7',
          OSM_BOUNDARIES_LEVEL_8: 'Niveau 8'
        }
      },
      en: {
        Layers: {
          OSM_BOUNDARIES: 'Administrative limits - OpenStreetMap (by level)',
          OSM_BOUNDARIES_DESCRIPTION: 'Administrative limits - OpenStreetMap (by level)',
          OSM_BOUNDARIES_LEVEL_2: 'Level 2',
          OSM_BOUNDARIES_LEVEL_3: 'Level 3',
          OSM_BOUNDARIES_LEVEL_4: 'Level 4',
          OSM_BOUNDARIES_LEVEL_5: 'Level 5',
          OSM_BOUNDARIES_LEVEL_6: 'Level 6',
          OSM_BOUNDARIES_LEVEL_7: 'Level 7',
          OSM_BOUNDARIES_LEVEL_8: 'Level 8'
        }
      }
    },
    tags: ['administrative'],
    attribution: 'OSM Boundaries © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, distributed by <a href="https://www.geofabrik.de/">Geofabrik</a>, <a href="https://opendatacommons.org/licenses/odbl/">ODbL</a> license.',
    type: 'OverlayLayer',
    service: 'osm-boundaries',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    // No unique identifier, used default generated ID
    //featureId: 'name:en',
    featureLabel: ['name', 'name:en', 'name:fr'],
    filters: [{
      label: 'Layers.OSM_BOUNDARIES_LEVEL_2',
      isActive: true,
      active: { 'properties.admin_level': 2 },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_LEVEL_3',
      isActive: false,
      active: { 'properties.admin_level': 3 },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_LEVEL_4',
      isActive: false,
      active: { 'properties.admin_level': 4 },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_LEVEL_5',
      isActive: false,
      active: { 'properties.admin_level': 5 },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_LEVEL_6',
      isActive: false,
      active: { 'properties.admin_level': 6 },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_LEVEL_7',
      isActive: false,
      active: { 'properties.admin_level': 7 },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_LEVEL_8',
      isActive: false,
      active: { 'properties.admin_level': 8 },
      inactive: {}
    }
  ],
    leaflet: {
      type: 'geoJson',
      source: '/api/osm-boundaries',
      realtime: true, 
      tiled: true,
      minZoom: 7,
      'fill-opacity': 0
    }
  }, {
    name: 'Layers.OSM_BOUNDARIES_PMTILES',
    description: 'Layers.OSM_BOUNDARIES_PMTILES_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OSM_BOUNDARIES_PMTILES: 'Limites administratives - OpenStreetMap Vectoriel (par niveau)',
          OSM_BOUNDARIES_PMTILES_DESCRIPTION: 'Limites administratives - OpenStreetMap (par niveau)',
          OSM_BOUNDARIES_PMTILES_LEVEL_2: 'Niveau 2',
          OSM_BOUNDARIES_PMTILES_LEVEL_3: 'Niveau 3',
          OSM_BOUNDARIES_PMTILES_LEVEL_4: 'Niveau 4',
          OSM_BOUNDARIES_PMTILES_LEVEL_5: 'Niveau 5',
          OSM_BOUNDARIES_PMTILES_LEVEL_6: 'Niveau 6',
          OSM_BOUNDARIES_PMTILES_LEVEL_7: 'Niveau 7',
          OSM_BOUNDARIES_PMTILES_LEVEL_8: 'Niveau 8'
        }
      },
      en: {
        Layers: {
          OSM_BOUNDARIES_PMTILES: 'Administrative limits - OpenStreetMap Vector (by level)',
          OSM_BOUNDARIES_PMTILES_DESCRIPTION: 'Administrative limits - OpenStreetMap (by level)',
          OSM_BOUNDARIES_PMTILES_LEVEL_2: 'Level 2',
          OSM_BOUNDARIES_PMTILES_LEVEL_3: 'Level 3',
          OSM_BOUNDARIES_PMTILES_LEVEL_4: 'Level 4',
          OSM_BOUNDARIES_PMTILES_LEVEL_5: 'Level 5',
          OSM_BOUNDARIES_PMTILES_LEVEL_6: 'Level 6',
          OSM_BOUNDARIES_PMTILES_LEVEL_7: 'Level 7',
          OSM_BOUNDARIES_PMTILES_LEVEL_8: 'Level 8'
        }
      }
    },
    tags: ['administrative'],
    attribution: 'OSM Boundaries © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, distributed by <a href="https://www.geofabrik.de/">Geofabrik</a>, <a href="https://opendatacommons.org/licenses/odbl/">ODbL</a> license.',
    type: 'OverlayLayer',
    filters: [{
      label: 'Layers.OSM_BOUNDARIES_PMTILES_LEVEL_2',
      isActive: true,
      active: { 'properties.admin_level': 2 },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_PMTILES_LEVEL_3',
      isActive: false,
      active: { 'properties.admin_level': 3 },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_PMTILES_LEVEL_4',
      isActive: false,
      active: { 'properties.admin_level': 4 },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_PMTILES_LEVEL_5',
      isActive: false,
      active: { 'properties.admin_level': 5 },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_PMTILES_LEVEL_6',
      isActive: false,
      active: { 'properties.admin_level': 6 },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_PMTILES_LEVEL_7',
      isActive: false,
      active: { 'properties.admin_level': 7 },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_PMTILES_LEVEL_8',
      isActive: false,
      active: { 'properties.admin_level': 8 },
      inactive: {}
    }
  ],
    leaflet: {
      type: 'pmtiles',
      url: `${s3Url}/kargo/data/PMTiles/osm-boundaries.pmtiles`,
      devicePixelRatio: 3,
      style: {
        line: {
          dataLayer: 'osm-boundaries',
          symbolizer: {
            type: 'LineSymbolizer',
            color: `<% if (properties.admin_level === 2) { %>rgba(255, 0, 0, 1)<% }
                      else if (properties.admin_level === 3) { %>rgba(255, 0, 255, 1)<% }
                      else if (properties.admin_level === 4) { %>rgba(255, 255, 0, 1)<% }
                      else if (properties.admin_level === 5) { %>rgba(0, 255, 255, 1)<% }
                      else if (properties.admin_level === 6) { %>rgba(0, 255, 0, 1)<% }
                      else if (properties.admin_level === 7) { %>rgba(255, 255, 255, 153)<% }
                      else { %>rgba(0, 0, 255, 1)<% } %>`,
            width: 2,
            opacity: 1
          }
        }
      },
      template: ['style.line.symbolizer.color']
    }
  }]
}
