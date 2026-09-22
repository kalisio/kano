import makeDebug from 'debug'

const debug = makeDebug('kano:nl-command:ollama')

// Small models need explicit rules to pick the right tool
const TOOL_RULES = `
TOOL SELECTION rules (MUST follow strictly):
1. The user asks about stations, water, hydro, débit, niveau d'eau, rivière, 水文, 水位, 流量 around a place → call rank_stations ONLY, it also moves the map and shows the layer.
2. The user only wants to see a place → call navigate_to_location ONLY.
3. The user only wants to show or hide a layer → call show_layer ONLY.
Always provide latitude and longitude.`

function buildTools (tools) {
  return tools.map(tool => ({
    type: 'function',
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters
    }
  }))
}

export default class OllamaProvider {
  constructor (config) {
    this.baseUrl = config.ollamaUrl || 'http://localhost:11434'
    this.model = config.ollamaModel || 'qwen2.5:7b'
  }

  async chat ({ system, messages, tools }) {
    const hasTools = tools && tools.length > 0
    debug('Sending %d message(s) to Ollama model %s', messages.length, this.model)

    const body = {
      model: this.model,
      messages: [{ role: 'system', content: hasTools ? system + TOOL_RULES : system }, ...messages],
      stream: false
    }
    if (hasTools) body.tools = buildTools(tools)

    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Ollama API error ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    const toolCalls = []
    let message = data.message.content || ''

    if (data.message.tool_calls) {
      for (const tc of data.message.tool_calls) {
        toolCalls.push({
          id: tc.id || `ollama_${Date.now()}_${tc.function.name}`,
          name: tc.function.name,
          params: tc.function.arguments
        })
      }
    }

    // Fallback: small models sometimes write tool calls as text instead of using
    // the proper tool_calls format. Parse them from the message content.
    if (hasTools && toolCalls.length === 0 && message) {
      const toolNames = tools.map(t => t.name)
      // Match patterns like: navigate_to_location({"location": "Paris", ...})
      const fnCallRe = new RegExp(`(${toolNames.join('|')})\\s*\\(\\s*(\\{[\\s\\S]*?\\})\\s*\\)`, 'g')
      let match
      while ((match = fnCallRe.exec(message)) !== null) {
        try {
          const params = JSON.parse(match[2])
          toolCalls.push({
            id: `ollama_fallback_${Date.now()}_${match[1]}`,
            name: match[1],
            params
          })
          debug('Fallback parsed tool call from text: %s', match[1])
        } catch (e) {
          debug('Fallback parse failed for %s: %s', match[1], e.message)
        }
      }
      // Clean tool call text from the message if we extracted any
      if (toolCalls.length > 0) {
        message = message.replace(fnCallRe, '').replace(/```[^`]*```/g, '').trim()
      }
    }

    const usage = { input_tokens: data.prompt_eval_count || 0, output_tokens: data.eval_count || 0 }
    debug('Ollama response: tools=%d, message_len=%d', toolCalls.length, message.length)

    return { toolCalls, message, usage }
  }
}
