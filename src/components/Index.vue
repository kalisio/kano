<template>
  <div>
    <KTour v-if="isInitialized"/>
    <KWelcome />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { composables } from '@kalisio/kdk/core.client'

const { isInitialized } = composables.useSession()
</script>
