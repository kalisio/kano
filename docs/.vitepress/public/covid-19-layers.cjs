// Base URL to public files hosted in the docs
const baseUrl = (process.env.NODE_ENV === 'development' ? 'http://localhost:8082' : 'https://kalisio.github.io/kano')

module.exports = [{
  name: 'Layers.COVID_19',
  description: 'Layers.COVID_19_DESCRIPTION',
  i18n: {
    fr: {
      Layers: {
        COVID_19: 'COVID-19',
        COVID_19_DESCRIPTION: 'Hospitalisations par département'
      }
    },
    en: {
      Layers: {
        COVID_19: 'COVID-19',
        COVID_19_DESCRIPTION: 'Hospitalizations by department'
      }
    }
  },
  tags: ['health'],
  icon: 'fas fa-atlas',
  attribution: 'Santé Publique Fance / IGN / INSEE',
  type: 'OverlayLayer',
  featureId: 'code',
  every: 'P1D',
  leaflet: {
    type: 'geoJson',
    realtime: true,
    sourceTemplate: `${baseUrl}/covid-19/hospitalisations-departements-<%= time.format('YYYY-MM-DD') %>.json`,
    stroke: '#fee8c8',
    'stroke-width': 2,
    'stroke-opacity': 0.5,
    'fill-opacity': 0.5,
    'fill-color': '<%= chroma.scale(\'OrRd\').domain([0,50])(properties.taux).hex() %>',
    template: ['fill-color'],
    tooltip: {
      template: '<b><%= properties.nom %>: <%= properties.hospitalisations %> hospitalisations</b>',
      options: {
        opacity: 0.8,
        direction: 'top'
      }
    }
  },
  cesium: {
    type: 'geoJson',
    realtime: true,
    sourceTemplate: `${baseUrl}/covid-19/hospitalisations-departements-<%= time.format('YYYY-MM-DD') %>.json`,
    entityStyle: {
      polygon: {
        outline: false,
        extrudedHeight: '<%= 1000 * properties.taux %>',
        material: {
          type: 'Cesium.ColorMaterialProperty',
          options: {
            type: 'Cesium.Color.fromCssColorString',
            options: '<%= chroma.scale(\'OrRd\').domain([0,50])(properties.taux).css() %>'
          }
        }
      },
      template: ['polygon.extrudedHeight', 'polygon.material.options.options']
    },
    tooltip: {
      template: '<%= properties.nom %>: <%= properties.hospitalisations %> hospitalisations'
    }
  }
}]
