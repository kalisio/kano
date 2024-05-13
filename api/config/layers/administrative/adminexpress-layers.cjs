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
  }, {
    name: 'Layers.ADMINEXPRESS_FILTERED',
    description: 'Layers.ADMINEXPRESS_FILTERED__DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          ADMINEXPRESS_FILTERED: 'Limites administratives (filtrées)',
          ADMINEXPRESS_FILTERED_DESCRIPTION: 'Limites administratives (Admin Express COG, ING)',
          ADMINEXPRESS_FILTERED_ARRONDISSEMENT: 'Niveau des arrondissements',
          ADMINEXPRESS_FILTERED_DEPARTEMENT: 'Niveau départemental',
          ADMINEXPRESS_FILTERED_CANTON: 'Niveau cantonal',
          ADMINEXPRESS_FILTERED_EPCI: 'Niveau des ECPI',
          ADMINEXPRESS_FILTERED_COLLECTIVITE_TERRITORIALE: 'Niveau des collectivités territoriales',
          ADMINEXPRESS_FILTERED_REGION: 'Niveau régional',
          ADMINEXPRESS_FILTERED_COMMUNE: 'Niveau communal'
        }
      },
      en: {
        Layers: {
          ADMINEXPRESS_FILTERED: 'Administrative limits (filtered)',
          ADMINEXPRESS_FILTERED_DESCRIPTION: 'Administrative limits (Admin Express COG, ING)',
          ADMINEXPRESS_FILTERED_ARRONDISSEMENT: 'Disctrict level',
          ADMINEXPRESS_FILTERED_DEPARTEMENT: 'Departemental level',
          ADMINEXPRESS_FILTERED_CANTON: 'Cantonal level',
          ADMINEXPRESS_FILTERED_EPCI: 'ECPI level',
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
    }  
    ],
    leaflet: {
      type: 'geoJson',
      source: '/api/admin-express',
      realtime: true, 
      tiled: true,
      maxZoom: 21,
      'fill-opacity': 0
    }
  }]
}