<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <!-- Progress bar -->
    <q-ajax-bar
      ref="progessBarRef" 
      position="bottom" 
      size="8px" 
      color="primary" 
      :delay="250">
    </q-ajax-bar>
    <!-- App content -->
    <router-view v-if="isKDKCoreInitialized && isKDKMapInitialized">
    </router-view>
  </div>
</template>

<script setup>
import _ from 'lodash'
import logger from 'loglevel'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { Store, Events, i18n, utils as kdkCoreUtils } from '@kalisio/kdk/core.client'

// Data
const $q = useQuasar()
const Route = useRoute()
const isKDKCoreInitialized = Store.get('kdk.core.initialized')
const isKDKMapInitialized = Store.get('kdk.map.initialized')
const progessBarRef = ref(null)
let nbRequests = 0
let nbCompletedRequests = 0
let isProgressBarActive = false

// Funcrions
function showError (error) {
  // Check if this error is a quiet one or not
  if (error.ignore) {
    // In this case simply log
    logger.error(error)
    return
  }
  const notification = { type: 'negative', message: error.message || error.error_message || error.error, html: true }
  // Check if user can retry to avoid this error
  if (error.retryHandler) {
    notification.actions = [{
      label: this.$t('RETRY'),
      handler: error.retryHandler
    }]
    // Increase timeout so that user has a chance to retry
    notification.timeout = 20000
  }
  $q.notify(notification)
}
function showRouteError (route) {
  // We handle error on any page with query string
  if (route.query && (route.query.error_message || route.query.error)) {
    showError(route.query)
  }
  // OAuth login is using token set as route param like 'access_token=jwt'.
  // However in case of error it will be like 'error=message' instead.
  else if (route.params && route.params.token && route.params.token.startsWith('error=')) {
    showError({ message: route.params.token.split('=')[1] })
  }
}
function addRequest (hook) {
  // Check if this request is a quiet one or not
  if (hook.params.ignore) return
  nbRequests++
  if (progessBarRef.value && !isProgressBarActive && (nbRequests > nbCompletedRequests)) {
    progessBarRef.value.start()
    isProgressBarActive = true
  }
}
function addCompletedRequest (hook) {
  // Check if this request is a quiet one or not
  if (hook.params.ignore) return
  nbCompletedRequests++
  if (progessBarRef.value && isProgressBarActive && (nbRequests <= nbCompletedRequests)) {
    isProgressBarActive = false
    progessBarRef.value.stop()
  }
}

// Watch
watch(Route, (to, from) => showRouteError(to))

// Hooks
onMounted(() => {
  showRouteError(Route)
  Events.on('before-hook', hook => { addRequest(hook) })
  Events.on('after-hook', hook => { addCompletedRequest(hook) })
  Events.on('error-hook', hook => {
    addCompletedRequest(hook)
    // Forward to global error handler
    Events.emit('error', hook.error)
  })
  Events.on('error', error => {
    // Translate the message if a translation key exists
    const translation = _.get(error, 'data.translation')
    if (translation) {
      error.message = i18n.tie('errors.' + translation.key, translation.params)
      if (translation.keys) {
        translation.keys.forEach(key => {
          error.message += '<br/>' + i18n.tie('errors.' + key, translation.params)
        })
      }
    } else {
      // Overwrite the message using error code
      if (error.code) {
        error.message = i18n.tie('errors.' + error.code)
      }
    }
    showError(error)
  })
})

// Immediate
$q.iconMapFn = kdkCoreUtils.mapIconFunction
</script>
