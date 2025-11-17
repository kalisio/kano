module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.ADMINEXPRESS',
    description: 'Layers.ADMINEXPRESS_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          ADMINEXPRESS: 'Limites administratives',
          ADMINEXPRESS_DESCRIPTION: 'Limites administratives (Admin Express COG, IGN)'
        }
      },
      en: {
        Layers: {
          ADMINEXPRESS: 'Administrative limits',
          ADMINEXPRESS_DESCRIPTION: 'Administrative limits (Admin Express COG, IGN)'
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
  }, {
    name: 'Layers.ADMINEXPRESS_FILTERED',
    description: 'Layers.ADMINEXPRESS_FILTERED_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          ADMINEXPRESS_FILTERED: 'Limites administratives (par niveau)',
          ADMINEXPRESS_FILTERED_DESCRIPTION: 'Limites administratives (Admin Express COG, IGN)',
          ADMINEXPRESS_FILTERED_PAYS: 'Niveau des pays',
          ADMINEXPRESS_FILTERED_ARRONDISSEMENT: 'Niveau des arrondissements',
          ADMINEXPRESS_FILTERED_DEPARTEMENT: 'Niveau départemental',
          ADMINEXPRESS_FILTERED_CANTON: 'Niveau cantonal',
          ADMINEXPRESS_FILTERED_EPCI: 'Niveau des EPCI',
          ADMINEXPRESS_FILTERED_COLLECTIVITE_TERRITORIALE: 'Niveau des collectivités territoriales',
          ADMINEXPRESS_FILTERED_REGION: 'Niveau régional',
          ADMINEXPRESS_FILTERED_COMMUNE: 'Niveau communal'
        }
      },
      en: {
        Layers: {
          ADMINEXPRESS_FILTERED: 'Administrative limits (by level)',
          ADMINEXPRESS_FILTERED_DESCRIPTION: 'Administrative limits (Admin Express COG, IGN)',
          ADMINEXPRESS_FILTERED_PAYS: 'Country level',
          ADMINEXPRESS_FILTERED_ARRONDISSEMENT: 'Disctrict level',
          ADMINEXPRESS_FILTERED_DEPARTEMENT: 'Departemental level',
          ADMINEXPRESS_FILTERED_CANTON: 'Cantonal level',
          ADMINEXPRESS_FILTERED_EPCI: 'EPCI level',
          ADMINEXPRESS_FILTERED_COLLECTIVITE_TERRITORIALE: 'Territorial collectivities level',
          ADMINEXPRESS_FILTERED_REGION: 'Regional level',
          ADMINEXPRESS_FILTERED_COMMUNE: 'Municipal level'
        }
      }
    },
    tags: [
      'administrative'
    ],
    attribution: 'Admin Express © <a href="http://www.ign.fr">IGN</a> contributors',
    type: 'OverlayLayer',
    service: 'admin-express',
    dbName: (process.env.DATA_DB_URL ? 'data' : undefined),
    // No unique identifier, used default generated ID
    //featureId: 'name:en',
    featureLabel: ['NOM', 'NOM_M'],
    filters: [{
      label: 'Layers.ADMINEXPRESS_FILTERED_PAYS',
      isActive: false,
      active: { 'properties.layer': 'PAYS' },
      inactive: {}
    },{
      label: 'Layers.ADMINEXPRESS_FILTERED_REGION',
      isActive: true,
      active: { 'properties.layer': 'REGION' },
      inactive: {}
    },{
      label: 'Layers.ADMINEXPRESS_FILTERED_COLLECTIVITE_TERRITORIALE',
      isActive: false,
      active: { 'properties.layer': 'COLLECTIVITE_TERRITORIALE' },
      inactive: {}
    },{
      label: 'Layers.ADMINEXPRESS_FILTERED_EPCI',
      isActive: false,
      active: { 'properties.layer': 'EPCI' },
      inactive: {}
    },{
      label: 'Layers.ADMINEXPRESS_FILTERED_CANTON',
      isActive: false,
      active: { 'properties.layer': 'CANTON' },
      inactive: {}
    },{
      label: 'Layers.ADMINEXPRESS_FILTERED_DEPARTEMENT',
      isActive: false,
      active: { 'properties.layer': 'DEPARTEMENT' },
      inactive: {}
    },{
      label: 'Layers.ADMINEXPRESS_FILTERED_ARRONDISSEMENT',
      isActive: false,
      active: { 'properties.layer': 'ARRONDISSEMENT' },
      inactive: {}
    },{
      label: 'Layers.ADMINEXPRESS_FILTERED_COMMUNE',
      isActive: false,
      active: { 'properties.layer': 'COMMUNE' },
      inactive: {}
    }],
    leaflet: {
      type: 'geoJson',
      source: '/api/admin-express',
      realtime: true, 
      tiled: true,
      maxZoom: 21,
      'fill-opacity': 0
    }
  }, {
    name: 'Layers.ADMINEXPRESS_FILTERED_PMTILES',
    description: 'Layers.ADMINEXPRESS_FILTERED_PMTILES_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          ADMINEXPRESS_FILTERED_PMTILES: 'Limites administratives (par niveau) - Vectoriel',
          ADMINEXPRESS_FILTERED_PMTILES_DESCRIPTION: 'Limites administratives (Admin Express COG, IGN)',
          ADMINEXPRESS_FILTERED_PMTILES_PAYS: 'Niveau des pays',
          ADMINEXPRESS_FILTERED_PMTILES_ARRONDISSEMENT: 'Niveau des arrondissements',
          ADMINEXPRESS_FILTERED_PMTILES_DEPARTEMENT: 'Niveau départemental',
          ADMINEXPRESS_FILTERED_PMTILES_CANTON: 'Niveau cantonal',
          ADMINEXPRESS_FILTERED_PMTILES_EPCI: 'Niveau des EPCI',
          ADMINEXPRESS_FILTERED_PMTILES_COLLECTIVITE_TERRITORIALE: 'Niveau des collectivités territoriales',
          ADMINEXPRESS_FILTERED_PMTILES_REGION: 'Niveau régional',
          ADMINEXPRESS_FILTERED_PMTILES_COMMUNE: 'Niveau communal'
        }
      },
      en: {
        Layers: {
          ADMINEXPRESS_FILTERED_PMTILES: 'Administrative limits (by level) - Vector',
          ADMINEXPRESS_FILTERED_PMTILES_DESCRIPTION: 'Administrative limits (Admin Express COG, IGN)',
          ADMINEXPRESS_FILTERED_PMTILES_PAYS: 'Country level',
          ADMINEXPRESS_FILTERED_PMTILES_ARRONDISSEMENT: 'Disctrict level',
          ADMINEXPRESS_FILTERED_PMTILES_DEPARTEMENT: 'Departemental level',
          ADMINEXPRESS_FILTERED_PMTILES_CANTON: 'Cantonal level',
          ADMINEXPRESS_FILTERED_PMTILES_EPCI: 'EPCI level',
          ADMINEXPRESS_FILTERED_PMTILES_COLLECTIVITE_TERRITORIALE: 'Territorial collectivities level',
          ADMINEXPRESS_FILTERED_PMTILES_REGION: 'Regional level',
          ADMINEXPRESS_FILTERED_PMTILES_COMMUNE: 'Municipal level'
        }
      }
    },
    tags: [
      'administrative'
    ],
    type: 'OverlayLayer',
    filters: [{
      label: 'Layers.ADMINEXPRESS_FILTERED_PMTILES_PAYS',
      isActive: false,
      active: { 'properties.layer': 'PAYS' },
      inactive: {}
    },{
      label: 'Layers.ADMINEXPRESS_FILTERED_PMTILES_REGION',
      isActive: true,
      active: { 'properties.layer': 'REGION' },
      inactive: {}
    },{
      label: 'Layers.ADMINEXPRESS_FILTERED_PMTILES_COLLECTIVITE_TERRITORIALE',
      isActive: false,
      active: { 'properties.layer': 'COLLECTIVITE_TERRITORIALE' },
      inactive: {}
    },{
      label: 'Layers.ADMINEXPRESS_FILTERED_PMTILES_EPCI',
      isActive: false,
      active: { 'properties.layer': 'EPCI' },
      inactive: {}
    },{
      label: 'Layers.ADMINEXPRESS_FILTERED_PMTILES_CANTON',
      isActive: false,
      active: { 'properties.layer': 'CANTON' },
      inactive: {}
    },{
      label: 'Layers.ADMINEXPRESS_FILTERED_PMTILES_DEPARTEMENT',
      isActive: false,
      active: { 'properties.layer': 'DEPARTEMENT' },
      inactive: {}
    },{
      label: 'Layers.ADMINEXPRESS_FILTERED_PMTILES_ARRONDISSEMENT',
      isActive: false,
      active: { 'properties.layer': 'ARRONDISSEMENT' },
      inactive: {}
    },{
      label: 'Layers.ADMINEXPRESS_FILTERED_PMTILES_COMMUNE',
      isActive: false,
      active: { 'properties.layer': 'COMMUNE' },
      inactive: {}
    }],
    leaflet: {
      type: 'pmtiles',
      url: `${s3Url}/kargo/data/PMTiles/admin-express.pmtiles`,
      devicePixelRatio: 3,
      style: {
        line: {
          dataLayer: 'admin-express',
          symbolizer: {
            type: 'LineSymbolizer',
            color: `<% if     (properties.layer === 'REGION') { %>rgba(255, 0, 0, 1)<% }
                      else if (properties.layer === 'COLLECTIVITE_TERRITORIALE') { %>rgba(255, 0, 255, 1)<% }
                      else if (properties.layer === 'EPCI') { %>rgba(255, 255, 0, 1)<% }
                      else if (properties.layer === 'CANTON') { %>rgba(0, 255, 255, 1)<% }
                      else if (properties.layer === 'DEPARTEMENT') { %>rgba(0, 255, 0, 1)<% }
                      else if (properties.layer === 'ARRONDISSEMENT') { %>rgba(255, 255, 255, 153)<% }
                      else if (properties.layer === 'PAYS') { %>rgba(128, 128, 128, 1)<% }
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
