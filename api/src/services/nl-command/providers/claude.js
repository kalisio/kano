import makeDebug from 'debug'

const debug = makeDebug('kano:nl-command:claude')

function buildTools (tools) {
  return tools.map(tool => ({
    name: tool.name,
    description: tool.description,
    input_schema: tool.parameters
  }))
}

export default class ClaudeProvider {
  constructor (config) {
    this.apiKey = config.anthropicApiKey
    if (!this.apiKey) {
      throw new Error('NL_ANTHROPIC_API_KEY is required for Claude provider')
    }
    this.model = process.env.NL_ANTHROPIC_MODEL || 'claude-sonnet-4-6'
  }

  async chat ({ system, messages, tools }) {
    debug('Claude provider processing %d message(s), %d tool(s)', messages.length, tools ? tools.length : 0)

    const body = { model: this.model, max_tokens: 1024, system, messages }
    // Tool definitions are only sent when needed as they are billed on each call
    if (tools && tools.length > 0) body.tools = buildTools(tools)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Claude API error ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    const toolCalls = []
    let message = ''

    for (const block of data.content) {
      if (block.type === 'tool_use') {
        toolCalls.push({
          id: block.id,
          name: block.name,
          params: block.input
        })
      } else if (block.type === 'text') {
        message += block.text
      }
    }

    const usage = data.usage || {}
    debug('Claude response: tools=%d, message_len=%d, stop=%s, input_tokens=%d, output_tokens=%d',
      toolCalls.length, message.length, data.stop_reason, usage.input_tokens || 0, usage.output_tokens || 0)

    return { toolCalls, message, usage }
  }
}
