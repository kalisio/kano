<template>
  <router-view />
</template>

<script setup>
import logger from 'loglevel'
import { watch, onBeforeMount, onUnmounted } from 'vue'
import { api, composables as kdkCoreComposables } from '@kalisio/kdk/core.client'

// Data
const { setContext, clearContext } = kdkCoreComposables.useContext({ fallbackRoute: 'map-activity' })

// Props
const props = defineProps({
  contextId: {
    type: String
  }
})

// Watch
watch(() => props.contextId, async (contextId) => {
  // Set current context
  if (contextId) {
    logger.debug(`[KANO] Switching to context ${contextId}. Setting up context`)
    await setContext(contextId)
  }
}, { immediate: true })

// Hooks
onBeforeMount(() => {
  const catalogService = api.getServiceInstance('catalog', props.contextId, { create: false })
  if (catalogService) return
  // Declare the organisation services if not already done
  api.createService('catalog', { context: props.contextId })
  api.createService('features', { context: props.contextId })
  api.createService('styles', { context: props.contextId })
  api.createService('projects', { context: props.contextId })
  api.createService('alerts', { context: props.contextId })
  logger.debug('[KANO] Services created for context', props.contextId)
})
onUnmounted(() => {
  logger.debug('[KANO] Clearing context')
  clearContext()
})
</script>
