<template>
  <div>
    <KTour v-if="isInitialized"/>
    <Suspense>
      <router-view />
    </Suspense>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { composables } from '@kalisio/kdk/core.client'

// Data
const { isInitialized } = composables.useSession()
const { installPwa } = composables.usePwa()
composables.useWelcome()

// Hooks
onMounted(() => {
  installPwa()
})
</script>
