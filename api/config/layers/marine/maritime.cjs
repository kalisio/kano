module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [
    {
      name: 'Layers.ESPACES_MARITIMES',
      description: 'Layers.ESPACES_MARITIMES_DESCRIPTION',
      i18n: {
        fr: {
          Layers: {
            ESPACES_MARITIMES: 'Espaces maritimes sous juridiction française',
            ESPACES_MARITIMES_DESCRIPTION: 'Espaces maritimes sous juridiction française - édition 2022 (SHOM)',
            ESPACES_MARITIMES_ZEE: 'Zone Économique Exclusive (ZEE)',
            ESPACES_MARITIMES_MER_TERRITORIALE: 'Mer territoriale (12 nm)',
            ESPACES_MARITIMES_ZONE_CONTIGUE: 'Zone contiguë (24 nm)',
            ESPACES_MARITIMES_PLATEAU_CONTINENTAL: 'Plateau continental'
          }
        },
        en: {
          Layers: {
            ESPACES_MARITIMES: 'Maritime areas under French jurisdiction',
            ESPACES_MARITIMES_DESCRIPTION: 'Maritime areas under French jurisdiction - 2022 edition (SHOM)',
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
            { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#6A0DAD', opacity: 0.5 } } }, label: 'Layers.ESPACES_MARITIMES_MER_TERRITORIALE' },
            { symbol: { 'media/KShape': { options: { shape: 'rect', color: '#1565C0', opacity: 0.5 } } }, label: 'Layers.ESPACES_MARITIMES_ZEE' },
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
            DELIMITATIONS_MARITIMES: 'Délimitations des espaces maritimes sous juridiction française',
            DELIMITATIONS_MARITIMES_DESCRIPTION: 'Délimitations des espaces maritimes sous juridiction française - édition 2022 (SHOM)',
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
            DELIMITATIONS_MARITIMES: 'Delimitation of maritime areas under French jurisdiction',
            DELIMITATIONS_MARITIMES_DESCRIPTION: 'Delimitation of Maritime Areas under French Jurisdiction - 2022 edition (SHOM)',
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
            { symbol: { 'media/KShape': { options: { shape: 'line', color: '#e74c3c', opacity: 1 } } }, label: 'Layers.DELIMITATIONS_MARITIMES_LIGNE_BASE' },        // STSLNE
            { symbol: { 'media/KShape': { options: { shape: 'line', color: '#2980b9', opacity: 1 } } }, label: 'Layers.DELIMITATIONS_MARITIMES_MER_TERRITORIALE' },   // marlim_12M
            { symbol: { 'media/KShape': { options: { shape: 'line', color: '#27ae60', opacity: 1 } } }, label: 'Layers.DELIMITATIONS_MARITIMES_ZONE_CONTIGUE' },      // marlim_24M
            { symbol: { 'media/KShape': { options: { shape: 'line', color: '#f39c12', opacity: 1 } } }, label: 'Layers.DELIMITATIONS_MARITIMES_ZEE' },                // marbdy_accord
            { symbol: { 'media/KShape': { options: { shape: 'line', color: '#d35400', opacity: 1 } } }, label: 'Layers.DELIMITATIONS_MARITIMES_ZPE' },                // marbdy_revendiquee
            { symbol: { 'media/KShape': { options: { shape: 'line', color: '#8e44ad', opacity: 1 } } }, label: 'Layers.DELIMITATIONS_MARITIMES_PLATEAU_CONTINENTAL' } // marlim_pc
          ]
        }
      }],
      type: 'OverlayLayer',
      leaflet: {
        type: 'pmtiles',
        url: `${s3Url}/ovh/kargo/data/PMTiles/delmar.pmtiles`,
        devicePixelRatio: 3,
        style: {
          line: {
            dataLayer: 'delmar',
            symbolizer: {
              type: 'LineSymbolizer',
              color: `<% if      (properties.type === 'STSLNE')              { %>rgba(231,  76,  60, 1)<%
                      } else if (properties.type === 'marlim_12M')           { %>rgba( 41, 128, 185, 1)<%
                      } else if (properties.type === 'marlim_24M')           { %>rgba( 39, 174,  96, 1)<%
                      } else if (properties.type === 'marbdy_accord')        { %>rgba(243, 156,  18, 1)<%
                      } else if (properties.type === 'marbdy_revendiquee')   { %>rgba(211,  84,   0, 1)<%
                      } else if (properties.type === 'marlim_pc')            { %>rgba(142,  68, 173, 1)<%
                      } else                                                  { %>rgba(153, 153, 153, 1)<% } %>`,
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
