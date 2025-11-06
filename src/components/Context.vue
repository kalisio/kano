<template>
  <router-view />
</template>

<script setup>
import logger from 'loglevel'
import { watch, onUnmounted } from 'vue'
import { composables as kdkCoreComposables } from '@kalisio/kdk/core.client'

// Data
const { Context, setContext, clearContext } = kdkCoreComposables.useContext({ fallbackRoute: 'map-activity' })

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

onUnmounted(() => {
  logger.debug('[KANO] Clearing context')
  clearContext()
})
</script>
