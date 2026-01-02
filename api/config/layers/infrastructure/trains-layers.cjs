module.exports = function ({ wmtsUrl, tmsUrl, wmsUrl, wcsUrl, k2Url, s3Url }) {
  return [{
    name: 'Layers.OPENRAILWAYMAPS',
    description: 'Layers.OPENRAILWAYMAPS_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OPENRAILWAYMAPS: 'OpenrailwaysMaps',
          OPENRAILWAYMAPS_DESCRIPTION: 'Lignes de train / metro et autres infrastructure ferroviaire (avec les anciennes lignes'
        }
      },
      en: {
        Layers: {
          OPENRAILWAYMAPS: 'OpenrailwaysMaps',
          OPENRAILWAYMAPS_DESCRIPTION: 'Trains lines / metro and others railway infrastrure (including old lines)'
        }
      }
    },
    tags: [
      'infrastructure'
    ],
    attribution: '',
    type: 'OverlayLayer',
    leaflet: {
      type: 'tileLayer',
      source: `https://tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png`,
      maxZoom: 21,
      maxNativeZoom: 21,
      crossOrigin: false
    }
  },
  {
    name: 'Layers.OPENRAILWAYMAPS_SIGNALS',
    description: 'Layers.OPENRAILWAYMAPS_SIGNALS_DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OPENRAILWAYMAPS_SIGNALS: 'OpenrailwaysMaps signals',
          OPENRAILWAYMAPS_SIGNALS_DESCRIPTION: 'Lignes de train / metro et autres infrastructure ferroviaire (avec les anciennes lignes'
        }
      },
      en: {
        Layers: {
          OPENRAILWAYMAPS_SIGNALS: 'OpenrailwaysMaps signals',
          OPENRAILWAYMAPS_SIGNALS_DESCRIPTION: 'Trains lines / metro and others railway infrastrure (including old lines)'
        }
      }
    },
    tags: [
      'infrastructure'
    ],
    attribution: '',
    type: 'OverlayLayer',
    leaflet: {
      type: 'tileLayer',
      source: `https://tiles.openrailwaymap.org/signals/{z}/{x}/{y}.png`,
      maxZoom: 21,
      maxNativeZoom: 21,
      crossOrigin: false
    }
  },
  {
    name: 'Layers.OPENRAILWAYMAPS_MAXSPEED',
    description: 'Layers._DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OPENRAILWAYMAPS_MAXSPEED: 'OpenrailwaysMaps mapspeed',
          OPENRAILWAYMAPS_MAXSPEED_DESCRIPTION: 'Lignes de train / metro et autres infrastructure ferroviaire (avec les anciennes lignes'
        }
      },
      en: {
        Layers: {
          OPENRAILWAYMAPS_MAXSPEED: 'OpenrailwaysMaps mapspeed',
          OPENRAILWAYMAPS_MAXSPEED_DESCRIPTION: 'Trains lines / metro and others railway infrastrure (including old lines)'
        }
      }
    },
    tags: [
      'infrastructure'
    ],
    attribution: '',
    type: 'OverlayLayer',
    leaflet: {
      type: 'tileLayer',
      source: `https://tiles.openrailwaymap.org/maxspeed/{z}/{x}/{y}.png`,
      maxZoom: 21,
      maxNativeZoom: 21,
      crossOrigin: false
    }
  },
  {
    name: 'Layers.OPENRAILWAYMAPS_ELECTRIFICATION',
    description: 'Layers._DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OPENRAILWAYMAPS_ELECTRIFICATION: 'OpenrailwaysMaps electrification',
          OPENRAILWAYMAPS_ELECTRIFICATION_DESCRIPTION: 'Lignes de train / metro et autres infrastructure ferroviaire (avec les anciennes lignes'
        }
      },
      en: {
        Layers: {
          OPENRAILWAYMAPS_ELECTRIFICATION: 'OpenrailwaysMaps electrification',
          OPENRAILWAYMAPS_ELECTRIFICATION_DESCRIPTION: 'Trains lines / metro and others railway infrastrure (including old lines)'
        }
      }
    },
    tags: [
      'infrastructure'
    ],
    attribution: '',
    type: 'OverlayLayer',
    leaflet: {
      type: 'tileLayer',
      source: `https://tiles.openrailwaymap.org/electrification/{z}/{x}/{y}.png`,
      maxZoom: 21,
      maxNativeZoom: 21,
      crossOrigin: false
    }
  },
  {
    name: 'Layers.OPENRAILWAYMAPS_GAUGE',
    description: 'Layers._DESCRIPTION',
    i18n: {
      fr: {
        Layers: {
          OPENRAILWAYMAPS_GAUGE: 'OpenrailwaysMaps ecartements',
          OPENRAILWAYMAPS_GAUGE_DESCRIPTION: 'Lignes de train / metro et autres infrastructure ferroviaire (avec les anciennes lignes'
        }
      },
      en: {
        Layers: {
          OPENRAILWAYMAPS_GAUGE: 'OpenrailwaysMaps gauge',
          OPENRAILWAYMAPS_GAUGE_DESCRIPTION: 'Trains lines / metro and others railway infrastrure (including old lines)'
        }
      }
    },
    tags: [
      'infrastructure'
    ],
    attribution: '',
    type: 'OverlayLayer',
    leaflet: {
      type: 'tileLayer',
      source: `https://tiles.openrailwaymap.org/gauge/{z}/{x}/{y}.png`,
      maxZoom: 21,
      maxNativeZoom: 21,
      crossOrigin: false
    }
  }]
}