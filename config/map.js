module.exports = {
  baseLayers: [
    {
      type: 'tileLayer',
      arguments: [
        'https://mapproxy.kargo.kalisio.xyz/wmts/s2/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.jpeg',
        {
          maxZoom: 18,
          label: 'Kalisio Sentinel 2 Cloudless',
          attribution: 'Sentinel-2 cloudless <a href="https://s2maps.eu">by EOX IT Services GmbH </a>'
        }
      ]
    },
    {
      type: 'tileLayer',
      arguments: [
        'https://mapproxy.kargo.kalisio.xyz/wmts/osm-bright/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          label: 'Kalisio OpenStreetMap (bright rendering)',
          attribution: 'OpenMapTiles © <a href="https://openmaptiles.com">OpenMapTiles</a> & OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        }
      ]
    },
    {
      type: 'tileLayer',
      arguments: [
        'https://mapproxy.kargo.kalisio.xyz/wmts/osm-dark/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          label: 'Kalisio OpenStreetMap (dark rendering)',
          attribution: 'OpenMapTiles © <a href="https://openmaptiles.com">OpenMapTiles</a> & OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        }
      ]
    },
    {
      type: 'tileLayer',
      arguments: [
        'https://mapproxy.kargo.kalisio.xyz/wmts/osm-terrain/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          label: 'Kalisio OpenStreetMap & Terrain',
          attribution: 'OpenMapTiles © <a href="https://openmaptiles.com">OpenMapTiles</a> & OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        }
      ]
    },
    {
      type: 'tileLayer',
      arguments: [
        'http://mapproxy.kargo.kalisio.xyz/wmts/bdortho-5m/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          label: 'BD Ortho (5m) & Aeroway data',
          attribution: 'BDORTHO © <a href="https://http://www.ign.fr/">IGN</a>'
        }
      ]
    },
    {
      type: 'tileLayer',
      arguments: [
        'http://mapproxy.kargo.kalisio.xyz/wmts/mosaik/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.jpeg',
        {
          maxZoom: 18,
          label: 'Kalisio Mosaik',
          attribution: 'OpenMapTiles © <a href="https://openmaptiles.com">OpenMapTiles</a> & OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors & Sentinel-2 cloudless <a href="https://s2maps.eu">by EOX IT Services GmbH </a> & BDORTHO © <a href="https://http://www.ign.fr/">IGN</a>'
        }
      ]
    }
  ],
  overlayLayers: [
    {
      type: 'realtime',
      name: 'Vigicrues',
      arguments: [
        'https://s3.eu-central-1.amazonaws.com/kargo/vigicrues.json',
        {
          interval: 15 * 60 * 1000,
          id: 'properties.gid'
        }
      ]
    },
    {
      type: 'realtime',
      name: 'Téléray',
      arguments: [
        'https://s3.eu-central-1.amazonaws.com/kargo/teleray.json',
        {
          interval: 10 * 60 * 1000,
          id: 'properties.irsnId',
          container: 'markerClusterGroup'
        }
      ]
    },
    {
      type: 'realtime',
      name: 'ADS-B',
      arguments: [
        'https://s3-eu-west-1.amazonaws.com/gift-backbone-adsb/adsb-airline-one.json',
        {
          interval: 5 * 1000,
          id: 'properties.icao'
        }
      ]
    },
    {
      type: 'timeDimension.layer.wms',
      name: 'Wind speed - Isobaric surface',
      arguments: [
        'https://mapproxy.kargo.dev.kalisio.xyz/service?',
        {
          version: '1.3.0',
          format: 'image/png',
          transparent: true,
          layers: 'ARPEGE_05_WIND_SPEED__ISOBARIC_SURFACE',
          attribution: 'ARPEGE © <a href="http://www.meteofrance.com">Météo-France</a>'
        }
      ]
    },
    {
      type: 'timeDimension.layer.wms',
      name: 'Total water precipitation - Ground or water surface',
      arguments: [
        'https://mapproxy.kargo.dev.kalisio.xyz/service?',
        {
          version: '1.3.0',
          format: 'image/png',
          transparent: true,
          layers: 'ARPEGE_05_TOTAL_WATER_PRECIPITATION__GROUND_OR_WATER_SURFACE',
          attribution: 'ARPEGE © <a href="http://www.meteofrance.com">Météo-France</a>'
        }
      ]
    },
    {
      type: 'timeDimension.layer.wms',
      name: 'Temperature - Isobaric surface',
      arguments: [
        'https://mapproxy.kargo.dev.kalisio.xyz/service?',
        {
          version: '1.3.0',
          format: 'image/png',
          transparent: true,
          layers: 'ARPEGE_05_TEMPERATURE__ISOBARIC_SURFACE',
          attribution: 'ARPEGE © <a href="http://www.meteofrance.com">Météo-France</a>'
        }
      ]
    }
  ]
}
