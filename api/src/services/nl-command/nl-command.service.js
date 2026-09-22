import _ from 'lodash'
import makeDebug from 'debug'
import getProvider from './providers/index.js'
import { TOOLS, SYSTEM_PROMPT, VERBALIZE_PROMPT, LAYER_NAMES, rankStations, zoomForRadius } from './nl-command.tools.js'

const debug = makeDebug('kano:nl-command')

// Only the last exchanges are sent back to the LLM
const HISTORY_SIZE = 6

// Fallback well-known locations
const KNOWN_LOCATIONS = {
  paris: { lat: 48.8566, lon: 2.3522 },
  lyon: { lat: 45.7640, lon: 4.8357 },
  marseille: { lat: 43.2965, lon: 5.3698 },
  toulouse: { lat: 43.6047, lon: 1.4442 },
  bordeaux: { lat: 44.8378, lon: -0.5792 },
  nantes: { lat: 47.2184, lon: -1.5536 },
  strasbourg: { lat: 48.5734, lon: 7.7521 },
  lille: { lat: 50.6292, lon: 3.0573 },
  nice: { lat: 43.7102, lon: 7.2620 },
  montpellier: { lat: 43.6108, lon: 3.8767 },
  grenoble: { lat: 45.1885, lon: 5.7245 },
  albi: { lat: 43.9297, lon: 2.148 }
}

function fallbackGeocode (location) {
  const lower = location.toLowerCase().trim()
  for (const [name, coords] of Object.entries(KNOWN_LOCATIONS)) {
    if (lower.includes(name) || name.includes(lower)) {
      return { latitude: coords.lat, longitude: coords.lon, name: location }
    }
  }
  return null
}

async function geocode (geocoderUrl, location) {
  if (!geocoderUrl) return null
  try {
    const url = `${geocoderUrl}/geocoder/forward?q=${encodeURIComponent(location)}`
    debug('Geocoding:', url)
    const response = await fetch(url)
    if (!response.ok) return null
    const data = await response.json()
    if (data && data.length > 0) {
      const result = data[0]
      return {
        latitude: result.lat || result.latitude,
        longitude: result.lon || result.longitude,
        name: result.display_name || result.name || location
      }
    }
  } catch (err) {
    debug('Geocoding failed:', err.message)
  }
  return null
}

// When a location name is provided, prefer geocoding/fallback over LLM coordinates
// (small models often return inaccurate coordinates)
async function locate (geocoderUrl, name, latitude, longitude) {
  const result = name && (await geocode(geocoderUrl, name) || fallbackGeocode(name))
  return result || { latitude, longitude, name }
}

function addUsage (total, usage) {
  if (!usage) return
  total.input_tokens += usage.input_tokens || 0
  total.output_tokens += usage.output_tokens || 0
}

// "de Albi" -> "d'Albi"
function about (place) {
  return (/^[aeiouyàâéèêëîïôöùûü]/i.test(place) ? `d'${place}` : `de ${place}`)
}

function templateMessage (summary) {
  if (summary.error) return `Impossible d'interroger les stations autour ${about(summary.place)} : ${summary.error}`
  if (summary.with_recent_data === 0) {
    return `${summary.stations} station(s) dans un rayon de ${summary.radius_km} km autour ${about(summary.place)}, aucune mesure récente.`
  }
  const top = summary.top[0]
  return `${summary.stations} station(s) dans un rayon de ${summary.radius_km} km autour ${about(summary.place)}. ` +
    `${summary.metric} ${summary.order === 'min' ? 'le plus faible' : 'le plus élevé'} : **${top.name}**, ${top.value} ${summary.unit}.`
}

export default function (name, app, options) {
  return {
    async create (data, params) {
      const { text, conversationHistory, provider: providerOverride } = data
      if (!text) {
        throw new Error('text is required')
      }
      const config = app.get('nlCommand') || { provider: 'mock' }
      const provider = await getProvider(config, providerOverride)
      debug('Processing NL command:', text, 'with provider:', providerOverride || config.provider || 'mock')

      const totalUsage = { input_tokens: 0, output_tokens: 0 }
      const history = (conversationHistory || [])
        .filter(m => (m.role === 'user' || m.role === 'assistant') && m.text !== text)
        .slice(-HISTORY_SIZE)
        .map(m => ({ role: m.role, content: m.text }))

      // First call: the LLM only translates the request into tool calls
      const plan = await provider.chat({
        system: SYSTEM_PROMPT,
        messages: [...history, { role: 'user', content: text }],
        tools: TOOLS
      })
      addUsage(totalUsage, plan.usage)

      // Tools are executed here, their result is never sent back with the tool definitions
      const actions = []
      const rankings = []
      for (const { name, params: p } of plan.toolCalls || []) {
        if (name === 'navigate_to_location') {
          const location = await locate(config.geocoderUrl, p.location, p.latitude, p.longitude)
          if (location.latitude && location.longitude) {
            actions.push({ type: 'navigate', latitude: location.latitude, longitude: location.longitude, zoom: Math.min(p.zoom || 8, 10), name: p.location })
          }
        } else if (name === 'show_layer') {
          actions.push({ type: 'showLayer', layer: p.layer, name: LAYER_NAMES[p.layer] || p.layer, visible: p.visible !== false })
        } else if (name === 'rank_stations') {
          const location = await locate(config.geocoderUrl, p.place, p.latitude, p.longitude)
          try {
            const ranking = await rankStations(app, Object.assign({}, p, { latitude: location.latitude, longitude: location.longitude }))
            rankings.push(ranking)
            actions.push({ type: 'showLayer', layer: p.layer, name: LAYER_NAMES[p.layer], visible: true })
            actions.push({ type: 'navigate', latitude: location.latitude, longitude: location.longitude, zoom: zoomForRadius(ranking.data.radius_km), name: p.place })
          } catch (error) {
            debug('rank_stations failed:', error.message)
            rankings.push({ summary: { place: p.place, error: error.message } })
          }
        }
      }

      let message = plan.message || ''
      if (rankings.length > 0) {
        const summaries = rankings.map(ranking => ranking.summary)
        // Fixed sentence by default. NL_VERBALIZE=true lets the LLM phrase the answer with
        // a second call: no tools, no history, only the summaries
        message = ''
        if (config.verbalize) {
          try {
            const answer = await provider.chat({
              system: VERBALIZE_PROMPT,
              messages: [{ role: 'user', content: `Question : ${text}\nRésultat : ${JSON.stringify(summaries)}` }]
            })
            addUsage(totalUsage, answer.usage)
            message = answer.message
          } catch (error) {
            debug('Verbalize call failed:', error.message)
          }
        }
        if (!message) message = summaries.map(templateMessage).join('\n\n')
      }

      return {
        actions,
        message,
        data: rankings.filter(ranking => ranking.data).map(ranking => ranking.data),
        usage: totalUsage,
        model: provider.model
      }
    }
  }
}
