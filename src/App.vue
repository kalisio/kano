<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-ajax-bar ref="bar" position="bottom" size="8px" color="primary" :delay="250"></q-ajax-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import _ from 'lodash'
import logger from 'loglevel'
import { utils as kdkCoreUtils } from '@kalisio/kdk/core.client'

export default {
  data () {
    return {
      progressBarActive: false
    }
  },
  methods: {
    showError (error) {
      // Check if this error is a quiet one or not
      if (error.ignore) {
        // In this case simply log
        logger.error(error)
        return
      }
      const options = { message: error.message || error.error_message, html: true }
      // Check if user can retry to avoid this error
      if (error.retryHandler) {
        options.actions = [{
          label: this.$t('RETRY'),
          handler: error.retryHandler
        }]
        // Increase timeout so that user has a chance to retry
        options.timeout = 20000
      }
      this.$notify(options)
    },
    showRouteError (route) {
      // We handle error on any page with query string
      if (route.query && route.query.error_message) {
        this.showError(route.query)
      }
    },
    startProgress () {
      const progressBar = this.$refs.bar
      if (progressBar && !this.progressBarActive && (this.nbRequests > this.nbCompletedRequests)) {
        progressBar.start()
        this.progressBarActive = true
      }
    },
    stopProgress () {
      const progressBar = this.$refs.bar
      if (progressBar && this.progressBarActive && (this.nbRequests <= this.nbCompletedRequests)) {
        this.progressBarActive = false
        progressBar.stop()
      }
    }
  },
  watch: {
    $route (to, from) {
      // Check for error when navigating
      this.showRouteError(to)
    }
  },
  beforeCreate () {
    // Request counter used to display progress bar
    this.nbRequests = 0
    this.nbCompletedRequests = 0
  },
  created () {
    // Install the icon mapping function to handle kdk icons
    this.$q.iconMapFn = kdkCoreUtils.mapIconFunction
  },
  mounted () {
    // Check for error on refresh
    this.showRouteError(this.$route)
    this.$events.on('error-hook', hook => {
      this.nbCompletedRequests++
      this.stopProgress()
      // Forward to global error handler
      this.$events.emit('error', hook.error)
    })
    this.$events.on('error', error => {
      // Translate the message if a translation key exists
      const translation = _.get(error, 'data.translation')
      if (translation) {
        error.message = this.$t('errors.' + translation.key, translation.params)
        if (translation.keys) {
          translation.keys.forEach(key => {
            error.message += '<br/>' + this.$t('errors.' + key, translation.params)
          })
        }
      } else {
        // Overwrite the message using error code
        if (error.code) {
          error.message = this.$t('errors.' + error.code)
        }
      }
      this.showError(error)
    })
    this.$events.on('before-hook', hook => {
      this.nbRequests++
      this.startProgress()
    })
    this.$events.on('after-hook', hook => {
      this.nbCompletedRequests++
      this.stopProgress()
    })
  }
}
</script>
