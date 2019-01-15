// Override defaults if env provided
const kargoDomain = (process.env.SUBDOMAIN ? process.env.SUBDOMAIN : 'kargo.kalisio.xyz')
const mapproxyUrl = 'https://mapproxy.' + kargoDomain

module.exports = [
  {
    name: 'Sentinel 2',
    description: 'Cloudless',
    tags: [
      'satellite'
    ],
    iconUrl: `${mapproxyUrl}/wmts/s2/GLOBAL_WEBMERCATOR/0/0/0.jpeg`,
    icon: 'satellite',
    attribution: 'Sentinel-2 cloudless <a href="https://s2maps.eu">by EOX IT Services GmbH </a>',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${mapproxyUrl}/wmts/s2/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.jpeg`,
      maxZoom: 18
    },
    cesium: {
      type: 'OpenStreetMap',
      isVisible: true,
      fileExtension: 'jpeg',
      url: `${mapproxyUrl}/wmts/s2/GLOBAL_WEBMERCATOR`
    }
  },
  {
    name: 'OSM Bright',
    description: 'OpenStreetMap',
    tags: [
      'street'
    ],
    iconUrl: `${mapproxyUrl}/wmts/osm-bright/GLOBAL_WEBMERCATOR/0/0/0.png`,
    icon: 'streetview',
    attribution: 'OpenMapTiles © <a href="https://openmaptiles.com">OpenMapTiles</a> & OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      isVisible: true,
      source: `${mapproxyUrl}/wmts/osm-bright/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png`,
      maxZoom: 18
    },
    cesium: {
      type: 'OpenStreetMap',
      url: `${mapproxyUrl}/wmts/osm-bright/GLOBAL_WEBMERCATOR`
    }
  },
  {
    name: 'OSM Dark',
    description: 'OpenStreetMap',
    tags: [
      'street'
    ],
    iconUrl: `${mapproxyUrl}/wmts/osm-dark/GLOBAL_WEBMERCATOR/0/0/0.png`,
    icon: 'streetview',
    attribution: 'OpenMapTiles © <a href="https://openmaptiles.com">OpenMapTiles</a> & OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${mapproxyUrl}/wmts/osm-dark/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png`,
      maxZoom: 18
    },
    cesium: {
      type: 'OpenStreetMap',
      url: `${mapproxyUrl}/wmts/osm-dark/GLOBAL_WEBMERCATOR`
    }
  },
  {
    name: 'OSMT bright',
    description: 'OpenStreetMap & Terrain',
    tags: [
      'street',
      'terrain'
    ],
    iconUrl: `${mapproxyUrl}/wmts/osm-terrain-bright/GLOBAL_WEBMERCATOR/0/0/0.png`,
    icon: 'terrain',
    attribution: 'OpenMapTiles © <a href="https://openmaptiles.com">OpenMapTiles</a> & OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${mapproxyUrl}/wmts/osm-terrain-bright/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png`,
      maxZoom: 18
    },
    cesium: {
      type: 'OpenStreetMap',
      url: `${mapproxyUrl}/wmts/osm-terrain-bright/GLOBAL_WEBMERCATOR`
    }
  },
  {
    name: 'OSMT dark',
    description: 'OpenStreetMap & Terrain',
    tags: [
      'street',
      'terrain'
    ],
    iconUrl: `${mapproxyUrl}/wmts/osm-terrain-dark/GLOBAL_WEBMERCATOR/0/0/0.png`,
    icon: 'terrain',
    attribution: 'OpenMapTiles © <a href="https://openmaptiles.com">OpenMapTiles</a> & OpenStreetMap © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    type: 'BaseLayer',
    leaflet: {
      type: 'tileLayer',
      source: `${mapproxyUrl}/wmts/osm-terrain-dark/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png`,
      maxZoom: 18
    },
    cesium: {
      type: 'OpenStreetMap',
      url: `${mapproxyUrl}/wmts/osm-terrain-dark/GLOBAL_WEBMERCATOR`
    }
  },
  {
    name: 'WGS84',
    description: 'Standard Ellipsoid',
    tags: [
      'terrain'
    ],
    iconUrl: 'statics/Cesium/Widgets/Images/TerrainProviders/Ellipsoid.png',
    icon: 'fiber_manual_record',
    attribution: '',
    'default': true,
    type: 'TerrainLayer',
    cesium: {
      type: 'Ellipsoid',
      isVisible: true
    }
  },
  {
    name: 'Cesium Terrain',
    description: 'World-wide 30m',
    tags: [
      'terrain'
    ],
    iconUrl: 'statics/Cesium/Widgets/Images/TerrainProviders/CesiumWorldTerrain.png',
    icon: 'terrain',
    attribution: 'High-resolution, mesh-based terrain for the entire globe.\nBy https://cesiumjs.org',
    type: 'TerrainLayer',
    cesium: {
      type: 'Cesium',
      requestWaterMask: 'true',
      requestVertexNormals: 'true'
    }
  },
  {
    name: 'Kalisio Terrain',
    description: 'World-wide 30m',
    tags: [
      'terrain'
    ],
    iconUrl: 'statics/Cesium/Widgets/Images/TerrainProviders/CesiumWorldTerrain.png',
    icon: 'terrain',
    attribution: 'High-resolution, mesh-based terrain for the entire globe.\nBy http://www.kalisio.com',
    type: 'TerrainLayer',
    cesium: {
      type: 'Cesium',
      url: 'http://cesiumterrainserver.kalisio.xyz/tilesets/md15-tiles',
      requestWaterMask: 'true',
      requestVertexNormals: 'true'
    }
  },
  {
    name: 'Wind',
    description: 'Speed and direction',
    tags: [
      'weather'
    ],
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/wind.jpg',
    attribution: 'Forecast data from <a href="http://www.meteofrance.com">Météo-France</a>',
    type: 'OverlayLayer',
    variables: [
      {
        name: 'windSpeed',
        label: 'Variables.WIND_SPEED',
        units: [
          'm/s', 'km/h', 'kt'
        ],
        chartjs: {
          backgroundColor: 'rgba(255, 159, 64, 128)',
          borderColor: 'rgb(255, 159, 64)',
          fill: false
        },
        chromajs: {
          scale: 'RdYlBu',
          domain: [20, 3]
        }
      },
      {
        name: 'windDirection',
        label: 'Variables.WIND_DIRECTION',
        units: [
          'deg'
        ],
        chartjs: {
          backgroundColor: 'rgba(191, 191, 63, 128)',
          borderColor: 'rgb(191, 191, 63)',
          fill: false
        }
      }
    ],
    leaflet: {
      type: 'weacast.flowLayer',
      elements: [
        'u-wind',
        'v-wind'
      ],
      lineWidth: 4,
      frameRate: 20,
      particleMultiplier: 0.001,
      displayValues: false
      /*
      displayOptions: {
        velocityType: 'Wind',
        position: 'bottomright',
        emptyString: 'No wind data',
        angleConvention: 'meteoCW',
        speedUnit: 'm/s'
      }
      */
    }
  },
  {
    name: 'Gust',
    description: 'Max wind speed',
    tags: [
      'weather'
    ],
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/gust.jpg',
    attribution: 'Forecast data from <a href="http://www.meteofrance.com">Météo-France</a>',
    type: 'OverlayLayer',
    variables: [
      {
        name: 'gust',
        label: 'Variables.WIND_GUST',
        units: [
          'm/s', 'km/h', 'kt'
        ],
        chartjs: {
          backgroundColor: 'rgba(255, 99, 132, 128)',
          borderColor: 'rgb(255, 99, 132)',
          fill: false
        },
        chromajs: {
          scale: 'OrRd'
        }
      }
    ],
    leaflet: {
      type: 'weacast.scalarLayer',
      elements: [
        'gust'
      ],
      mesh: true
    }
  },
  {
    name: 'Precipitations',
    description: '3h accumulation',
    tags: [
      'weather'
    ],
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/precipitations.png',
    attribution: 'Forecast data from <a href="http://www.meteofrance.com">Météo-France</a>',
    type: 'OverlayLayer',
    variables: [
      {
        name: 'precipitations',
        label: 'Variables.PRECIPITATIONS',
        units: [
          'mm'
        ],
        chartjs: {
          backgroundColor: 'rgba(54, 162, 235, 128)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false
        },
        chromajs: {
          scale: 'BuPu',
          classes: [
            0,
            1,
            2,
            4,
            10,
            25,
            50,
            100,
            300
          ]
        }
      }
    ],
    leaflet: {
      type: 'weacast.scalarLayer',
      elements: [
        'precipitations'
      ],
      mesh: true
    }
  },
  {
    name: 'Vigicrues',
    description: 'Flooding alerts',
    tags: [
      'measure'
    ],
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/vigicrues-icon.png',
    attribution: '',
    type: 'OverlayLayer',
    featureId: 'gid',
    service: 'vigicrues-sections',
    leaflet: {
      type: 'geoJson',
      source: '/api/vigicrues-sections',
      realtime: true,
      interval: 900000,
      popup: {
        pick: [
          'NomEntVigiCru'
        ]
      }
    },
    cesium: {
      type: 'geoJson',
      source: '/api/vigicrues-sections',
      realtime: true,
      interval: 900000
    }
  },
  {
    name: 'Vigiprobes',
    description: 'Level and rate',
    tags: [
      'measure'
    ],
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/vigicrues-icon.png',
    attribution: '',
    type: 'OverlayLayer',
    service: 'vigicrues-observations',
    probeService: 'vigicrues-stations',
    featureId: 'CdStationHydro',
    history: 604800,
    variables: [
      {
        name: 'H',
        label: 'Variables.H',
        units: [
          'm'
        ],
        chartjs: {
          backgroundColor: 'rgba(63, 63, 191, 128)',
          borderColor: 'rgb(63, 63, 191)',
          fill: false
        }
      },
      {
        name: 'Q',
        label: 'Variables.Q',
        units: [
          'm3/h'
        ],
        chartjs: {
          backgroundColor: 'rgba(54, 162, 235, 128)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false
        }
      }
    ],
    leaflet: {
      type: 'geoJson',
      source: '/api/vigicrues-observations',
      realtime: true,
      interval: 900000,
      container: 'markerClusterGroup',
      'marker-color': '#00a9ce',
      'icon-color': 'white',
      'icon-classes': 'fa fa-tint',
      popup: {
        pick: [
          'LbStationHydro'
        ]
      },
      tooltip: {
        template: '<% if (properties.H) { %>H = <%= properties.H.toFixed(2) %> m<% }\
                   if (feature.time && feature.time.H) { %></br><%= new Date(feature.time.H).toLocaleString() %><% }\
                   if (properties.Q) { %></br>Q = <%= properties.Q.toFixed(2) %> m3/h<% }\
                   if (feature.time && feature.time.Q) { %></br><%= new Date(feature.time.Q).toLocaleString() %><% } %>'
      }
    },
    cesium: {
      type: 'geoJson',
      source: '/api/vigicrues-observations',
      realtime: true,
      interval: 900000,
      cluster: {
        pixelRange: 50
      },
      'marker-symbol': 'water',
      'marker-color': '#00a9ce'
    }
  },
  {
    name: 'Téléray',
    description: 'Dose rate',
    tags: [
      'measure'
    ],
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/teleray-icon.jpg',
    attribution: '',
    type: 'OverlayLayer',
    featureId: 'irsnId',
    leaflet: {
      type: 'geoJson',
      source: 'https://s3.eu-central-1.amazonaws.com/kargo/teleray.json',
      realtime: true,
      interval: 600000,
      container: 'markerClusterGroup',
      popup: {
        pick: [
          'name'
        ]
      },
      tooltip: {
        template: '<% if (properties.value) { %>Dose = <%= properties.value.toFixed(2) %> nSv/h</br>\
                   <%= new Date(properties.measureDateFormatted).toLocaleString() %><% } %>'
      }
    },
    cesium: {
      type: 'geoJson',
      source: 'https://s3.eu-central-1.amazonaws.com/kargo/teleray.json',
      realtime: true,
      interval: 600000,
      cluster: {
        pixelRange: 50
      },
      'marker-symbol': 'lighthouse',
      'marker-color': '#180EF1'
    }
  },
  {
    name: 'Sites',
    description: 'Nuclear sites',
    tags: [
      'business'
    ],
    icon: 'star',
    attribution: '',
    type: 'OverlayLayer',
    probe: 'nuclear-sites',
    leaflet: {
      type: 'geoJson',
      source: 'https://s3.eu-central-1.amazonaws.com/kargo/nuclear-sites.json',
      cluster: {},
      'marker-color': 'orange',
      'icon-color': 'white',
      'icon-classes': 'fa fa-star',
      popup: {
        pick: [
          'NAME'
        ]
      },
      tooltip: {
        property: 'LABEL'
      }
    },
    cesium: {
      type: 'geoJson',
      source: 'https://s3.eu-central-1.amazonaws.com/kargo/nuclear-sites.json',
      cluster: {
        pixelRange: 50
      },
      'marker-symbol': 'star',
      'marker-color': '#FFA500'
    }
  },
  {
    name: 'Airports',
    description: 'Major airports',
    tags: [
      'business'
    ],
    icon: 'local_airport',
    attribution: '',
    type: 'OverlayLayer',
    probe: 'ne_10m_airports',
    leaflet: {
      type: 'geoJson',
      source: 'https://s3.eu-central-1.amazonaws.com/kargo/ne_10m_airports.json',
      cluster: {},
      'marker-color': 'blue',
      'icon-color': 'white',
      'icon-classes': 'fa fa-plane',
      popup: {
        pick: [
          'NAME'
        ]
      },
      tooltip: {
        property: 'LABEL'
      }
    },
    cesium: {
      type: 'geoJson',
      source: 'https://s3.eu-central-1.amazonaws.com/kargo/ne_10m_airports.json',
      cluster: {
        pixelRange: 50
      },
      'marker-symbol': 'airfield',
      'marker-color': '#00A5FF'
    }
  },
  {
    name: 'Airbus EV ADS-B',
    description: 'Flight positions',
    tags: [
      'business'
    ],
    icon: 'flight',
    iconUrl: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/adsb-icon.jpg',
    attribution: '',
    type: 'OverlayLayer',
    featureId: 'icao',
    leaflet: {
      type: 'geoJson',
      source: 'https://s3-eu-west-1.amazonaws.com/gift-backbone-adsb/adsb-airline-one.json',
      realtime: true,
      interval: 5000,
      'marker-symbol': '/statics/paper-plane.png',
      'marker-size': 32,
      'icon-anchor': [
        16,
        32
      ],
      popup: {
        pick: [
          'icao'
        ]
      },
      tooltip: {
        property: 'callsign'
      }
    },
    cesium: {
      type: 'geoJson',
      source: 'https://s3-eu-west-1.amazonaws.com/gift-backbone-adsb/adsb-airline-one.json',
      realtime: true,
      interval: 5000,
      'marker-symbol': 'airport',
      'marker-color': '#57D824'
    }
  },
  {
    name: 'Wind speed',
    description: 'Isobaric surface',
    tags: [
      'weather'
    ],
    icon: 'fingerprint',
    attribution: 'ARPEGE © <a href="http://www.meteofrance.com">Météo-France</a>',
    type: 'OverlayLayer',
    leaflet: {
      type: 'tileLayer.wms',
      source: `${mapproxyUrl}/service?`,
      timeDimension: {},
      version: '1.3.0',
      format: 'image/png',
      transparent: true,
      layers: 'ARPEGE_05_WIND_SPEED__ISOBARIC_SURFACE'
    }
  },
  {
    name: 'Total precipitation',
    description: 'Ground or water',
    tags: [
      'weather'
    ],
    icon: 'fingerprint',
    attribution: 'ARPEGE © <a href="http://www.meteofrance.com">Météo-France</a>',
    type: 'OverlayLayer',
    leaflet: {
      type: 'tileLayer.wms',
      source: `${mapproxyUrl}/service?`,
      timeDimension: {},
      version: '1.3.0',
      format: 'image/png',
      transparent: true,
      layers: 'ARPEGE_05_TOTAL_WATER_PRECIPITATION__GROUND_OR_WATER_SURFACE'
    }
  },
  {
    name: 'Temperature',
    description: 'Isobaric surface',
    tags: [
      'weather'
    ],
    icon: 'fingerprint',
    attribution: 'ARPEGE © <a href="http://www.meteofrance.com">Météo-France</a>',
    type: 'OverlayLayer',
    leaflet: {
      type: 'tileLayer.wms',
      source: `${mapproxyUrl}/service?`,
      timeDimension: {},
      version: '1.3.0',
      format: 'image/png',
      transparent: true,
      layers: 'ARPEGE_05_TEMPERATURE__ISOBARIC_SURFACE'
    }
  },
  {
    name: 'Radar des précipitations',
    description: 'Cumuls de lames d\'eau estimés à partir de données radar (en mm/h) ',
    tags: [
      'weather'
    ],
    icon: 'beach_access',
    attribution: 'SYCAMORE © <a href="http://www.meteofrance.com">Météo-France</a>',
    type: 'OverlayLayer',
    variables: [
      {
        name: 'rainFall',
        label: 'Radar des précipitations',
        units: [
          'mm/h'
        ],
        chromajs: {
          scale: [ 
            "#ffffff00", 
            "indigo", 
            "mediumblue", 
            "dodgerblue", 
            "skyblue",
            "forestgreen",
            "mediumseagreen", 
            "turquoise",
            "springgreen",
            "yellow", 
            "palegoldenrod", 
            "peachpuff", 
            "orange",
            "saddlebrown",
            "red"
          ],
          domain: [0, 500],
          classes: [0, 0.2, 0.6, 1.2, 2.1, 3.6, 6.5, 11.5, 20.5, 36.5, 64.8, 115.3, 205, 364.6, 500]
        }
      }
    ],
    leaflet: {
      type: 'geotiff',
      interval: 5 * 60 * 1000,
      // FIXME the year/month/day should be templated too
      url: 'https://thredds.irsn.kalisio.xyz/thredds/fileServer/mf-radar/2018/12/12/RD_CPO_NAT100.SYCOMORE.V_EUR_COMPO.LAME_DEAU__20181212<%= hh %><%= mm %>00.tif'
    }
  }
]