import { i18n } from '@kalisio/kdk/core.client'

export default async ({ app }) => {
  await i18n.initialize(app, ['core', 'map', 'app'])
}
