<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <!-- Progress bar -->
    <KRequestProgressBar />
    <!-- App content -->
    <router-view v-if="isKDKCoreInitialized && isKDKMapInitialized">
    </router-view>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { Store, composables as kdkCoreComposables, utils as kdkCoreUtils } from '@kalisio/kdk/core.client'
import KRequestProgressBar from '@kalisio/kdk/core/client/components/app/KRequestProgressBar.vue'

const $q = useQuasar()
kdkCoreComposables.useErrors()

// Data
const isKDKCoreInitialized = Store.get('kdk.core.initialized')
const isKDKMapInitialized = Store.get('kdk.map.initialized')

// Immediate
$q.iconMapFn = kdkCoreUtils.mapIconFunction
</script>
