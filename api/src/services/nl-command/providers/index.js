import MockProvider from './mock.js'

const providerCache = new Map()

export default async function getProvider (config, providerOverride) {
  const providerName = providerOverride || config.provider || 'mock'

  if (providerCache.has(providerName)) return providerCache.get(providerName)

  let provider
  switch (providerName) {
    case 'claude': {
      const mod = await import('./claude.js')
      provider = new mod.default(config)
      break
    }
    case 'openai': {
      const mod = await import('./openai.js')
      provider = new mod.default(config)
      break
    }
    case 'ollama': {
      const mod = await import('./ollama.js')
      provider = new mod.default(config)
      break
    }
    case 'mock':
    default:
      provider = new MockProvider()
      break
  }

  providerCache.set(providerName, provider)
  return provider
}
