<template>
  <div>
    <KTour />
    <KWelcome />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { composables } from '@kalisio/kdk/core.client'

composables.useSession()
</script>
