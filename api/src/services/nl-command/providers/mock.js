import makeDebug from 'debug'

const debug = makeDebug('kano:nl-command:mock')

// Known locations for the mock provider
const LOCATIONS = {
  paris: { lat: 48.8566, lon: 2.3522, zoom: 12 },
  lyon: { lat: 45.7640, lon: 4.8357, zoom: 12 },
  marseille: { lat: 43.2965, lon: 5.3698, zoom: 12 },
  toulouse: { lat: 43.6047, lon: 1.4442, zoom: 12 },
  bordeaux: { lat: 44.8378, lon: -0.5792, zoom: 12 },
  nantes: { lat: 47.2184, lon: -1.5536, zoom: 12 },
  strasbourg: { lat: 48.5734, lon: 7.7521, zoom: 12 },
  lille: { lat: 50.6292, lon: 3.0573, zoom: 12 },
  nice: { lat: 43.7102, lon: 7.2620, zoom: 12 },
  montpellier: { lat: 43.6108, lon: 3.8767, zoom: 12 },
  rennes: { lat: 48.1173, lon: -1.6778, zoom: 12 },
  grenoble: { lat: 45.1885, lon: 5.7245, zoom: 12 },
  brest: { lat: 48.3904, lon: -4.4861, zoom: 12 },
  france: { lat: 46.6034, lon: 1.8883, zoom: 6 },
  london: { lat: 51.5074, lon: -0.1278, zoom: 11 },
  berlin: { lat: 52.5200, lon: 13.4050, zoom: 11 },
  madrid: { lat: 40.4168, lon: -3.7038, zoom: 11 },
  rome: { lat: 41.9028, lon: 12.4964, zoom: 11 },
  tokyo: { lat: 35.6762, lon: 139.6503, zoom: 11 },
  'new york': { lat: 40.7128, lon: -74.0060, zoom: 11 }
}

// Layer keyword matching
const LAYER_KEYWORDS = {
  hydrometrie: ['hydrométrie', 'hydrometrie', 'hydro', 'water level', 'niveau eau', '水位', 'hubeau-hydro', 'stations hydro'],
  piezometrie: ['piézométrie', 'piezometrie', 'piezo', 'groundwater', 'nappe', 'eau souterraine', 'hubeau-piezo'],
  temperature: ['température', 'temperature', 'temp', '温度'],
  wind: ['vent', 'wind', '风'],
  radar: ['radar', 'météoradar', 'meteoradar', '雷达'],
  vigicrues: ['vigicrues', 'flood', 'crue', 'inondation', '洪水'],
  openaq: ['air quality', 'qualité air', 'openaq', 'pollution', '空气质量'],
  teleray: ['radioactivité', 'radioactivity', 'teleray', 'radiation', '辐射']
}

function findLocation (text) {
  const lower = text.toLowerCase()
  for (const [name, coords] of Object.entries(LOCATIONS)) {
    if (lower.includes(name)) {
      return { name, ...coords }
    }
  }
  return null
}

function findLayer (text) {
  const lower = text.toLowerCase()
  for (const [layer, keywords] of Object.entries(LAYER_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        return layer
      }
    }
  }
  return null
}

export default class MockProvider {
  async chat ({ messages }) {
    const text = messages[messages.length - 1].content
    debug('Mock provider processing:', text)
    const toolCalls = []
    let message = ''

    // Check for navigation intent
    const navigatePatterns = [
      /(?:montre|show|go|aller|navigate|navigue|voir|affiche|emmène|amène|va|centre|zoom|fly)/i,
      /(?:où est|where is|找|去)/i
    ]
    const hasNavigateIntent = navigatePatterns.some(p => p.test(text))
    const location = findLocation(text)

    if (location && hasNavigateIntent) {
      toolCalls.push({
        name: 'navigate_to_location',
        params: { location: location.name, latitude: location.lat, longitude: location.lon, zoom: location.zoom }
      })
      message = `Navigating to ${location.name.charAt(0).toUpperCase() + location.name.slice(1)}.`
    } else if (location) {
      toolCalls.push({
        name: 'navigate_to_location',
        params: { location: location.name, latitude: location.lat, longitude: location.lon, zoom: location.zoom }
      })
      message = `Here is ${location.name.charAt(0).toUpperCase() + location.name.slice(1)}.`
    }

    // Check for layer intent
    const layerPatterns = [
      /(?:affiche|show|display|montre|active|enable|ajoute|add|couche|layer|overlay)/i,
      /(?:cache|hide|désactive|disable|enlève|remove|supprime)/i
    ]
    const hidePatterns = /(?:cache|hide|désactive|disable|enlève|remove|supprime)/i
    const layer = findLayer(text)

    if (layer) {
      const visible = !hidePatterns.test(text)
      toolCalls.push({
        name: 'show_layer',
        params: { layer, visible }
      })
      message += (message ? ' ' : '') + (visible ? `Showing ${layer} layer.` : `Hiding ${layer} layer.`)
    }

    // If nothing matched
    if (toolCalls.length === 0) {
      message = "I can help you navigate the map and control layers. Try asking me to show a city (e.g., 'Show me Lyon') or toggle a layer (e.g., 'Show hydrométrie layer')."
    }

    return { toolCalls, message }
  }
}
