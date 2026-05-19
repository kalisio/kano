module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [
    {
      name: 'Layers.ESPACES_MARITIMES',
      description: 'Layers.ESPACES_MARITIMES_DESCRIPTION',
      i18n: {
        fr: {
          Layers: {
            ESPACES_MARITIMES: 'Espaces Maritimes',
            ESPACES_MARITIMES_DESCRIPTION: 'Délimitation des espaces maritimes (ZEE, mer territoriale, zone contiguë...)',
            ESPACES_MARITIMES_ZEE: 'Zone Économique Exclusive (ZEE)',
            ESPACES_MARITIMES_MER_TERRITORIALE: 'Mer territoriale (12 nm)',
            ESPACES_MARITIMES_ZONE_CONTIGUE: 'Zone contiguë (24 nm)',
            ESPACES_MARITIMES_PLATEAU_CONTINENTAL: 'Plateau continental'
          }
        },
        en: {
          Layers: {
            ESPACES_MARITIMES: 'Maritime Spaces',
            ESPACES_MARITIMES_DESCRIPTION: 'Delimitation of maritime spaces (EEZ, territorial sea, contiguous zone...)',
            ESPACES_MARITIMES_ZEE: 'Exclusive Economic Zone (EEZ)',
            ESPACES_MARITIMES_MER_TERRITORIALE: 'Territorial sea (12 nm)',
            ESPACES_MARITIMES_ZONE_CONTIGUE: 'Contiguous zone (24 nm)',
            ESPACES_MARITIMES_PLATEAU_CONTINENTAL: 'Continental shelf'
          }
        }
      },
      tags: ['maritime'],
      iconUrl: '',
      icon: 'las la-water',
      attribution: '© <a href="https://www.shom.fr">SHOM</a>',
      legend: [{
        type: 'symbols',
        label: 'Layers.ESPACES_MARITIMES_DESCRIPTION',
        content: {
          symbols: [
            { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#1565C0', opacity: 0.5 } } }, label: 'Layers.ESPACES_MARITIMES_ZEE' },
            { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#6A0DAD', opacity: 0.5 } } }, label: 'Layers.ESPACES_MARITIMES_MER_TERRITORIALE' },
            { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#0D1B6E', opacity: 0.5 } } }, label: 'Layers.ESPACES_MARITIMES_ZONE_CONTIGUE' },
            { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#FFD600', opacity: 0.5 } } }, label: 'Layers.ESPACES_MARITIMES_PLATEAU_CONTINENTAL' }
          ]
        }
      }],
      type: 'OverlayLayer',
      leaflet: {
        type: 'tileLayer',
        source: `${tmsUrl}/espaces_maritimes@GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png`,
        opacity: 0.6,
        minZoom: 3,
        maxZoom: 21,
        maxNativeZoom: 12,
        tms: true
      }
    },
    {
      name: 'Layers.DELIMITATIONS_MARITIMES',
      description: 'Layers.DELIMITATIONS_MARITIMES_DESCRIPTION',
      i18n: {
        fr: {
          Layers: {
            DELIMITATIONS_MARITIMES: 'Délimitations Maritimes',
            DELIMITATIONS_MARITIMES_DESCRIPTION: 'Lignes de délimitation des espaces maritimes (ligne de base, mer territoriale, ZEE...)',
            DELIMITATIONS_MARITIMES_LIGNE_BASE: 'Ligne de base droite',
            DELIMITATIONS_MARITIMES_MER_TERRITORIALE: 'Mer territoriale',
            DELIMITATIONS_MARITIMES_ZONE_CONTIGUE: 'Zone contiguë',
            DELIMITATIONS_MARITIMES_ZEE: 'Zone économique exclusive',
            DELIMITATIONS_MARITIMES_PLATEAU_CONTINENTAL: 'Plateau continental',
            DELIMITATIONS_MARITIMES_EAUX_INTERIEURES: 'Eaux intérieures',
            DELIMITATIONS_MARITIMES_ZPE: 'Zone de protection écologique'
          }
        },
        en: {
          Layers: {
            DELIMITATIONS_MARITIMES: 'Maritime Boundaries',
            DELIMITATIONS_MARITIMES_DESCRIPTION: 'Maritime boundary lines (baseline, territorial sea, EEZ...)',
            DELIMITATIONS_MARITIMES_LIGNE_BASE: 'Straight baseline',
            DELIMITATIONS_MARITIMES_MER_TERRITORIALE: 'Territorial sea',
            DELIMITATIONS_MARITIMES_ZONE_CONTIGUE: 'Contiguous zone',
            DELIMITATIONS_MARITIMES_ZEE: 'Exclusive Economic Zone',
            DELIMITATIONS_MARITIMES_PLATEAU_CONTINENTAL: 'Continental shelf',
            DELIMITATIONS_MARITIMES_EAUX_INTERIEURES: 'Internal waters',
            DELIMITATIONS_MARITIMES_ZPE: 'Ecological protection zone'
          }
        }
      },
      tags: ['maritime'],
      iconUrl: '',
      icon: 'las la-map-marked',
      attribution: '© <a href="https://www.shom.fr">SHOM</a>',
      legend: [{
        type: 'symbols',
        label: 'Layers.DELIMITATIONS_MARITIMES_DESCRIPTION',
        content: {
          symbols: [
            { symbol: { 'media/KShape': { options: { shape: 'line', color: '#e74c3c', opacity: 1 } } }, label: 'Layers.DELIMITATIONS_MARITIMES_LIGNE_BASE' },
            { symbol: { 'media/KShape': { options: { shape: 'line', color: '#2980b9', opacity: 1 } } }, label: 'Layers.DELIMITATIONS_MARITIMES_MER_TERRITORIALE' },
            { symbol: { 'media/KShape': { options: { shape: 'line', color: '#27ae60', opacity: 1 } } }, label: 'Layers.DELIMITATIONS_MARITIMES_ZONE_CONTIGUE' },
            { symbol: { 'media/KShape': { options: { shape: 'line', color: '#f39c12', opacity: 1 } } }, label: 'Layers.DELIMITATIONS_MARITIMES_ZEE' },
            { symbol: { 'media/KShape': { options: { shape: 'line', color: '#8e44ad', opacity: 1 } } }, label: 'Layers.DELIMITATIONS_MARITIMES_PLATEAU_CONTINENTAL' },
            { symbol: { 'media/KShape': { options: { shape: 'line', color: '#16a085', opacity: 1 } } }, label: 'Layers.DELIMITATIONS_MARITIMES_EAUX_INTERIEURES' },
            { symbol: { 'media/KShape': { options: { shape: 'line', color: '#d35400', opacity: 1 } } }, label: 'Layers.DELIMITATIONS_MARITIMES_ZPE' }
          ]
        }
      }],
      type: 'OverlayLayer',
      leaflet: {
        type: 'pmtiles',
        url: `${s3Url}/kargo/data/PMTiles/delmar.pmtiles`,
        devicePixelRatio: 3,
        style: {
          line: {
            dataLayer: 'delmar',
            symbolizer: {
              type: 'LineSymbolizer',
              color: `<% if      (properties.nature === 'Ligne de base droite')           { %>rgba(231, 76,  60,  1)<%
                } else if (properties.nature === 'Mer territoriale')               { %>rgba( 41, 128, 185, 1)<%
                } else if (properties.nature === 'Zone contiguë')             { %>rgba( 39, 174,  96, 1)<%
                } else if (properties.nature === 'Zone économique exclusive') { %>rgba(243, 156,  18, 1)<%
                } else if (properties.nature === 'Plateau continental')            { %>rgba(142,  68, 173, 1)<%
                } else if (properties.nature === 'Eaux intérieures')          { %>rgba( 22, 160, 133, 1)<%
                } else if (properties.nature === 'Zone de protection écologique') { %>rgba(211,  84,   0, 1)<%
                } else                                                              { %>rgba(153, 153, 153, 1)<% } %>`,
              width: 2,
              opacity: 1
            }
          }
        },
        template: ['style.line.symbolizer.color']
      }
    }
  ]
}