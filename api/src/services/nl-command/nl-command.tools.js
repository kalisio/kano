// Tool definitions, prompts and data queries of the NL command service.
// Kept dependency-free so it can be imported and tested on its own.

// The map/table/chart are driven by the server result, not by the LLM,
// so the prompt does not need to describe any output format
export const SYSTEM_PROMPT = 'You are the map assistant of Kano (Kalisio). Call tools to act on the map or to answer data questions. The app itself moves the map, shows the layer and renders the table and chart from the tool result. Call tools directly, without any text.'

// Second call: no tools, no history, only the compact result to phrase
export const VERBALIZE_PROMPT = 'Rédige la réponse en français, 2 phrases max, à partir de la question et du résultat JSON fournis. Cite la valeur clé. Pas de tableau ni de coordonnées.'

// Layers that can be ranked, add an entry to open a new one to the assistant
export const LAYERS = {
  hydrometrie: {
    stationsService: 'hubeau-hydro-stations',
    observationsService: 'hubeau-hydro-observations',
    featureId: 'code_station',
    metrics: { Q: 'm³/s', H: 'm' },
    defaultMetric: 'Q',
    // Observations older than this are not "current" anymore
    maxAgeHours: 24
  }
}

// Catalog name of the layers the assistant can show
export const LAYER_NAMES = {
  hydrometrie: 'Layers.HUBEAU_HYDRO',
  piezometrie: 'Layers.HUBEAU_PIEZO',
  temperature: 'Layers.TEMPERATURE_TILED',
  wind: 'Layers.WIND_TILED',
  radar: 'Layers.METEORADAR',
  vigicrues: 'Layers.VIGICRUES',
  openaq: 'Layers.OPENAQ',
  teleray: 'Layers.TELERAY'
}

export const TOOLS = [
  {
    name: 'rank_stations',
    description: 'Find the stations of a layer around a place and rank them by their latest measurement. Also centers the map and shows the layer, no other tool is needed.',
    parameters: {
      type: 'object',
      properties: {
        layer: { type: 'string', enum: Object.keys(LAYERS) },
        place: { type: 'string', description: 'Place name' },
        latitude: { type: 'number' },
        longitude: { type: 'number' },
        radius_km: { type: 'number', description: 'Default 50' },
        metric: { type: 'string', description: 'Q = flow, H = water level' },
        order: { type: 'string', enum: ['max', 'min'] }
      },
      required: ['layer', 'place', 'latitude', 'longitude']
    }
  },
  {
    name: 'navigate_to_location',
    description: 'Center the map on a place.',
    parameters: {
      type: 'object',
      properties: {
        location: { type: 'string' },
        latitude: { type: 'number' },
        longitude: { type: 'number' },
        zoom: { type: 'number', description: '5 country, 7 region, 8 city, 10 town' }
      },
      required: ['location', 'latitude', 'longitude']
    }
  },
  {
    name: 'show_layer',
    description: 'Show or hide a layer: hydrometrie, piezometrie, temperature, wind, radar, vigicrues, openaq, teleray.',
    parameters: {
      type: 'object',
      properties: {
        layer: { type: 'string' },
        visible: { type: 'boolean' }
      },
      required: ['layer']
    }
  }
]

// Zoom level showing the whole search circle
export function zoomForRadius (radiusKm) {
  if (radiusKm <= 10) return 11
  if (radiusKm <= 25) return 10
  if (radiusKm <= 60) return 9
  return 8
}

function asFeatures (result) {
  if (Array.isArray(result)) return result
  return result.features || result.data || []
}

function distanceKm (lat1, lon1, lat2, lon2) {
  const toRad = x => x * Math.PI / 180
  const a = Math.sin(toRad(lat2 - lat1) / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(toRad(lon2 - lon1) / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(a))
}

// Stations in a true circle + latest value of each one, using what the KDK features services
// already provide: proximity query (centerLon/centerLat/distance) and $groupBy/$aggregate,
// ie the same query as the one issued by the Kano client to display the layer
export async function rankStations (app, { layer, place, latitude, longitude, radius_km: radiusKm = 50, metric, order = 'max' }) {
  const config = LAYERS[layer]
  if (!config) throw new Error(`Layer ${layer} cannot be ranked`)
  if (!config.metrics[metric]) metric = config.defaultMetric

  const stations = asFeatures(await app.getService(config.stationsService).find({
    query: { centerLon: longitude, centerLat: latitude, distance: radiusKm * 1000 },
    paginate: false
  }))
  const stationIds = stations.map(station => station.properties[config.featureId])

  let observations = []
  if (stationIds.length > 0) {
    const now = new Date()
    observations = asFeatures(await app.getService(config.observationsService).find({
      query: {
        [`properties.${config.featureId}`]: { $in: stationIds },
        time: { $gte: new Date(now - config.maxAgeHours * 3600 * 1000).toISOString(), $lte: now.toISOString() },
        $groupBy: config.featureId,
        $aggregate: [metric],
        $sort: { time: -1 },
        $limit: 1
      },
      paginate: false
    }))
  }
  const latest = new Map(observations.map(observation => [observation.properties[config.featureId], observation]))

  const rows = stations.map(station => {
    const [lon, lat] = station.geometry.coordinates
    const observation = latest.get(station.properties[config.featureId])
    return {
      name: station.properties.name,
      river: station.properties.libelle_cours_eau,
      value: observation ? observation.properties[metric] : null,
      time: observation ? (observation.time[metric] || observation.time) : null,
      distance_km: Math.round(distanceKm(latitude, longitude, lat, lon) * 10) / 10,
      latitude: lat,
      longitude: lon
    }
  })
  // Stations without any recent value last
  const sign = (order === 'min' ? 1 : -1)
  rows.sort((a, b) => {
    if (a.value === null || b.value === null) return (a.value === null) - (b.value === null)
    return sign * (a.value - b.value)
  })
  const withData = rows.filter(row => row.value !== null)

  return {
    // Whole ranking for the frontend (table, chart)
    data: { type: 'ranking', layer, place, radius_km: radiusKm, metric, unit: config.metrics[metric], order, rows },
    // Only the head for the LLM
    summary: {
      place,
      radius_km: radiusKm,
      metric,
      unit: config.metrics[metric],
      order,
      stations: rows.length,
      with_recent_data: withData.length,
      top: withData.slice(0, 3).map(row => ({ name: row.name, value: row.value, time: row.time }))
    }
  }
}
