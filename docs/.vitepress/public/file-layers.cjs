// Base URL to public files hosted in the docs
const baseUrl = (process.env.NODE_ENV === 'development' ? 'http://localhost:8082' : 'https://kalisio.github.io/kano')

module.exports = [{
  name: 'Layers.REGIONS',
  description: 'Layers.REGIONS_DESCRIPTION',
  i18n: {
    fr: {
      Layers: {
        REGIONS: 'Régions',
        REGIONS_DESCRIPTION: 'Régions Françaises'
      }
    },
    en: {
      Layers: {
        REGIONS: 'Regions',
        REGIONS_DESCRIPTION: 'French regions'
      }
    }
  },
  tags: ['administrative'],
  type: 'OverlayLayer',
  featureId: 'code',
  leaflet: {
    type: 'geoJson',
    source: `${baseUrl}/regions.geojson`,
    'stroke-color': 'blue',
    'fill-opacity': 0,
    popup: { pick: [] },
    tooltip: {
      template: '<b><%= properties.nom %></b>'
    }
  },
  cesium: {
    type: 'geoJson',
    source: `${baseUrl}/regions.geojson`,
    'stroke-color': 'blue',
    'fill-opacity': 0,
    popup: { pick: [] },
    tooltip: {
      template: '<%= properties.nom %>'
    }
  }
}, {
  name: 'Layers.DEPARTMENTS',
  description: 'Layers.DEPARTMENTS_DESCRIPTION',
  i18n: {
    fr: {
      Layers: {
        DEPARTMENTS: 'Départements',
        DEPARTMENTS_DESCRIPTION: 'Départements Français'
      }
    },
    en: {
      Layers: {
        DEPARTMENTS: 'Departments',
        DEPARTMENTS_DESCRIPTION: 'French departments'
      }
    }
  },
  tags: ['administrative'],
  type: 'OverlayLayer',
  featureId: 'code',
  service: 'airports',
  probe: 'Airports',
  url: `${baseUrl}/departments.geojson`,
  // Could also be a file path to a GeoJson or a gzipped GeoJson
  //fileName: path.join(__dirname, '../../../docs/.vitepress/public/departements.geojson'),
  leaflet: {
    type: 'geoJson',
    source: '/api/departments',
    'stroke-color': 'red',
    'fill-opacity': 0,
    popup: { pick: [] },
    tooltip: {
      template: '<b><%= properties.nom %></b>'
    }
  },
  cesium: {
    type: 'geoJson',
    source: '/api/departments',
    'stroke-color': 'red',
    'fill-opacity': 0,
    popup: { pick: [] },
    tooltip: {
      template: '<%= properties.nom %>'
    }
  }
}]
