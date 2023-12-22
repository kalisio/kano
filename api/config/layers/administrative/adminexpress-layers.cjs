module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.ADMINEXPRESS',
    description: 'Layers.ADMINEXPRESS_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          ADMINEXPRESS: 'Limites administratives',
          ADMINEXPRESS_DESCRIPTION: 'Limites administratives (Admin Express COG, ING)'
        }
      },
      en: {
        Layers: {
          ADMINEXPRESS: 'Administrative limits',
          ADMINEXPRESS_DESCRIPTION: 'Administrative limits (Admin Express COG, ING)'
        }
      }
    },
    tags: [
      'administrative'
    ],
    attribution: 'Admin Express © <a href="http://www.ign.fr">IGN</a> contributors',
    type: 'OverlayLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${tmsUrl}/admin-express@GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png`,
      maxZoom: 21,
      maxNativeZoom: 15,
      tms: true
    },
    cesium: {
      type: 'TileMapService',
      url: `${tmsUrl}/admin-express@GLOBAL_WEBMERCATOR`
    }
  },
  {
    name: 'Layers.OSM_BOUNDARIES',
    description: 'Layers.OSM_BOUNDARIES_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          'OSM_BOUNDARIES': 'Limites administratives OSM',
          'OSM_BOUNDARIES_DESCRIPTION': 'Limites administratives OSM',
          'OSM_BOUNDARIES_LEVEL_2': 'Niveau 2',
          'OSM_BOUNDARIES_LEVEL_3': 'Niveau 3',
          'OSM_BOUNDARIES_LEVEL_4': 'Niveau 4',
          'OSM_BOUNDARIES_LEVEL_5': 'Niveau 5',
          'OSM_BOUNDARIES_LEVEL_6': 'Niveau 6',
          'OSM_BOUNDARIES_LEVEL_7': 'Niveau 7',
          'OSM_BOUNDARIES_LEVEL_8': 'Niveau 8'
        }
      },
      en: {
        Layers: {
          'OSM_BOUNDARIES': 'Administrative limits',
          'OSM_BOUNDARIES_DESCRIPTION': 'Administrative limits OSM',
          'OSM_BOUNDARIES_LEVEL_2': 'Level 2',
          'OSM_BOUNDARIES_LEVEL_3': 'Level 3',
          'OSM_BOUNDARIES_LEVEL_4': 'Level 4',
          'OSM_BOUNDARIES_LEVEL_5': 'Level 5',
          'OSM_BOUNDARIES_LEVEL_6': 'Level 6',
          'OSM_BOUNDARIES_LEVEL_7': 'Level 7',
          'OSM_BOUNDARIES_LEVEL_8': 'Level 8'
        }
      }
    },
    tags: ['administrative'],
    attribution: 'OpenStreetMap © <a href="https://www.geofabrik.de/">Geofabrik</a> contributors',
    type: 'OverlayLayer',
    service: 'osm-boundaries',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    featureId: 'ref',
    featureLabel: 'name:en',
    filters: [{
      label: 'Layers.OSM_BOUNDARIES_LEVEL_2',
      isActive: true,
      active: { 'properties.admin_level': '2' },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_LEVEL_3',
      isActive: false,
      active: { 'properties.admin_level': '3' },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_LEVEL_4',
      isActive: false,
      active: { 'properties.admin_level': '4' },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_LEVEL_5',
      isActive: false,
      active: { 'properties.admin_level': '5' },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_LEVEL_6',
      isActive: false,
      active: { 'properties.admin_level': '6' },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_LEVEL_7',
      isActive: false,
      active: { 'properties.admin_level': '7' },
      inactive: {}
    }, {
      label: 'Layers.OSM_BOUNDARIES_LEVEL_8',
      isActive: false,
      active: { 'properties.admin_level': '8' },
      inactive: {}
    }
  ],
    leaflet: {
      type: 'geoJson',
      source: '/api/osm-boundaries',
      realtime: true, 
      'marker-color': `<% if (properties.admin_level === '2') { %>#ee000066<% }
                            else if (properties.admin_level === '3') { %>#0000ee66<% }
                            else { %>#0000ee66<% } %>`,
        template: ['marker-color', 'icon-color'],
      }
    }
  ]
}
