import makeDebug from 'debug'

const debug = makeDebug('kano:nl-command:openai')

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

export default class OpenAIProvider {
  constructor (config) {
    this.apiKey = config.openaiApiKey
    if (!this.apiKey) {
      throw new Error('NL_OPENAI_API_KEY is required for OpenAI provider')
    }
  }

  async chat ({ system, messages, tools }) {
    debug('OpenAI provider processing %d message(s)', messages.length)

    const body = {
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: system }, ...messages]
    }
    if (tools && tools.length > 0) Object.assign(body, { tools: buildTools(tools), tool_choice: 'auto' })

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`OpenAI API error ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    const choice = data.choices[0]
    const toolCalls = []
    const message = choice.message.content || ''

    if (choice.message.tool_calls) {
      for (const tc of choice.message.tool_calls) {
        toolCalls.push({
          name: tc.function.name,
          params: JSON.parse(tc.function.arguments)
        })
      }
    }

    const usage = { input_tokens: data.usage?.prompt_tokens || 0, output_tokens: data.usage?.completion_tokens || 0 }
    return { toolCalls, message, usage }
  }
}
