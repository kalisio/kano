module.exports = [{
  name: 'Layers.SENSORS',
  description: 'Layers.SENSORS_DESCRIPTION',
  i18n: {
    fr: {
      Layers: {
        SENSORS: 'Capteurs',
        SENSORS_DESCRIPTION: 'Réseau de capteurs'
      },
      Variables: {
        TEMPERATURE: 'Température'
      }
    },
    en: {
      Layers: {
        SENSORS: 'Sensors',
        SENSORS_DESCRIPTION: 'Sensors network'
      },
      Variables: {
        TEMPERATURE: 'Temperature'
      }
    }
  },
  tags: ['sensors'],
  type: 'OverlayLayer',
  service: 'sensors-observations',
  probeService: 'sensors-stations',
  ttl: 7 * 24 * 60 * 60,
  featureId: 'id',
  featureLabel: 'name',
  from: 'P-7D',
  to: 'PT-1M',
  every: 'PT10M',
  queryFrom: 'PT-1H',
  variables: [
    {
      name: 'temperature',
      label: 'Variables.TEMPERATURE',
      unit: 'degC',
      range: [-50, 127],
      step: 5,
      chartjs: {
        backgroundColor: 'rgba(255, 99, 132, 128)',
        borderColor: 'rgb(255, 99, 132)',
        fill: false
      }
    }
  ],
  leaflet: {
    type: 'geoJson',
    realtime: true,
    tiled: true,
    cluster: { disableClusteringAtZoom: 18 },
    'marker-color': `<% if (properties.status === 'OK') { %>green<% }
                        else { %>red<% } %>`,
    'icon-classes': 'fa fa-wifi',
    'icon-x-offset': -2,
    'icon-color': '#FFF',
    template: ['marker-color'],
    tooltip: {
      template: '<%= properties.name %>: <%= properties.temperature %>°C'
    }
  },
  cesium: {
    type: 'geoJson',
    realtime: true,
    cluster: { pixelRange: 50 },
    'marker-symbol': 'lighthouse',
    'marker-color': '#180EF1',
    tooltip: {
      template: '<%= properties.name %>: <%= properties.temperature %>°C'
    }
  }
}]
