<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-ajax-bar ref="bar" position="bottom" size="8px" color="#027be3" :delay="250"></q-ajax-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import { Toast, Events, QAjaxBar } from 'quasar'

/*
 * Root component
 */
export default {
  components: {
    QAjaxBar
  },
  methods: {
    startProgress () {
      let progressBar = this.$refs.bar
      if (progressBar && !progressBar.active && (this.nbRequests > this.nbCompletedRequests)) {
        progressBar.start()
      }
    },
    stopProgress () {
      let progressBar = this.$refs.bar
      if (progressBar && progressBar.active && (this.nbRequests <= this.nbCompletedRequests)) {
        progressBar.stop()
      }
    }
  },
  beforeCreate () {
    // Request counter used to display progress bar
    this.nbRequests = 0
    this.nbCompletedRequests = 0
  },
  mounted () {
    Events.$on('error-hook', hook => {
      this.nbCompletedRequests++
      this.stopProgress()
      // Forward to global error handler
      Events.$emit('error', hook.error)
    })
    Events.$on('error', error => {
      // When trying to access an unauthorized resource redirect to home
      if (error.code === 403) {
        this.$router.push({ name: 'home' })
      }
      Toast.create.negative({
        html: error.message,
        timeout: 5000
      })
    })
    Events.$on('before-hook', hook => {
      this.nbRequests++
      this.startProgress()
    })
    Events.$on('after-hook', hook => {
      this.nbCompletedRequests++
      this.stopProgress()
    })
  }
}
</script>
