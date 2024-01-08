module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
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
          'OSM_BOUNDARIES_DESCRIPTION': 'OpenStreetMap Administrative limits',
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
    /* No unique identifier, used default generated ID
    featureId: 'name:en',
    featureLabel: 'name:en',
    */
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
      tiled: true,
      minZoom: 7,
      'fill-opacity': 0
    }
  },
  {
    name: `Layers.OSM_BOUNDARIES_TL`,
    description: `Layers.OSM_BOUNDARIES_TL_DESCRIPTION`,
    i18n: {
    fr: {
        Layers: {
        [`OSM_BOUNDARIES_TL`]: `OpenStreetMap - Limites administratives`,
        [`OSM_BOUNDARIES_TL_DESCRIPTION`]: `OpenStreetMap - Limites administratives`
        }
    },
    en: {
        Layers: {
        [`OSM_BOUNDARIES_TL`]: `OpenStreetMap - Administratives limits`,
        [`OSM_BOUNDARIES_TL_DESCRIPTION`]: `OpenStreetMap - Administrative limits`
        }
    }
    },
    tags: [
    'administrative'
    ],
    iconUrl: `http://localhost:8080/styles/osm-dark/9/260/187.png`,
    attribution: '© <a href="https://https://openstreetmap.org">OpenStreetMap</a>',
    type: 'OverlayLayer',
    leaflet: {
        type: 'tileLayer',
        source: `http://localhost:8080/styles/osm-dark/{z}/{x}/{y}.png`,
        maxZoom: 21,
        maxNativeZoom: 19,
        tms: true
    },
    cesium: {
        type: 'TileMapService',
        url: `http://localhost:8080/styles/osm-dark`
    }
  }]
}