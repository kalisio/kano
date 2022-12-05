<template>
  <div>
    <KTour />
    <KWelcome />
    <router-view></router-view>
  </div>
</template>

<script setup>
import logger from 'loglevel'
import { useRouter, useRoute } from 'vue-router'
import { watch, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api, i18n, beforeGuard, composables } from '@kalisio/kdk/core.client'

// Data
const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const { User, restoreSession, updateAbilities } = composables.useUser()
const { Version } = composables.useVersion()
let isInitialized = false
let pendingReconnection = null

// Functions
function redirect () {
  // Run registered guards to redirect accordingly if required
  const result = beforeGuard(route)
  if (typeof result === 'string') {
    // Redirect to a given route based on authentication state
    router.push({ name: result })
  } else if (!result) {
    // This route was previously allowed but due to changes in authorisations it is not anymore
    router.push({ name: (User ? 'home' : 'login') })
  }
  // The first time initialize guards after the app has been correctly setup,
  // ie either with or without a restored user
  if (!isInitialized) {
    router.beforeEach(beforeGuard)
    isInitialized = true
  }
} 

// Watch
watch(User, async () => { 
  await updateAbilities()
  redirect() 
})

// Hooks
onMounted(async () => { 
  try { 
    await restoreSession()
  } catch (error) {
    redirect()
  }
})

// Immediate
// handle socket connexion
if (api.socket) {
  // Display error message if we cannot contact the server
  api.socket.on('reconnect_error', () => {
    // Display it only the first time the error appears because multiple attempts will be tried
    if (!pendingReconnection) {
      logger.error(new Error('Socket has been disconnected'))
      // This will ensure any operation in progress will not keep a "dead" loading indicator
      // as this error might appear under-the-hood without notifying service operations
      Loading.hide()
      pendingReconnection = $q.dialog({
        title: i18n.t('Index.ALERT'),
        message: i18n.t('Index.DISCONNECT'),
        html: true,
        persistent: true
      }).onDismiss(() => { pendingReconnection = null })
    }
  })
  // Handle reconnection correctly, otherwise auth seems to be lost
  // Also easier to perform a full refresh instead of handling this specifically on each activity
  api.socket.on('reconnect', () => {
    // Dismiss pending reconnection error message
    if (pendingReconnection) {
      pendingReconnection.hide()
    }
    // Causes problems with hot reload in dev
    if (Version.flavor !== 'dev') {
      Loading.show({ message: i18n.t('Index.RECONNECT') })
      setTimeout(() => { window.location.reload() }, 3000)
    } else {
      logger.error(new Error('Socket disconnected, not trying to reconnect automatically in development mode please refresh page manually'))
    }
  })
}
</script>
