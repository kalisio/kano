<template>
  <div>
    <k-tour ref="tour" />
    <k-welcome />
    <router-view></router-view>
  </div>
</template>

<script>
import logger from 'loglevel'
import { Loading, Dialog } from 'quasar'
import { mixins, beforeGuard } from '@kalisio/kdk/core.client'
import config from 'config'
import utils from '../utils'

export default {
  name: 'index',
  // authorisation mixin is required to automatically update user' abilities on update
  mixins: [mixins.authentication, mixins.authorisation],
  methods: {
    redirect () {
      // Run registered guards to redirect accordingly if required
      const result = beforeGuard(this.$route)
      if (typeof result === 'string') {
        // Redirect to a given route based on authentication state
        this.$router.push({ name: result })
      } else if (!result) {
        // This route was previously allowed but due to changes in authorisations it is not anymore
        this.$router.push({ name: (this.user ? 'home' : 'login') })
      }
      // The first time initialize guards after the app has been correctly setup,
      // ie either with or without a restored user
      if (!this.initialized) {
        this.$router.beforeEach(beforeGuard)
        this.initialized = true
      }
    }
  },
  data () {
    return {
      user: null
    }
  },
  async created () {
    this.$options.components['k-welcome'] = utils.loadComponent('layout/KWelcome')
    this.$options.components['k-tour'] = utils.loadComponent('layout/KTour')
    // initialize the user
    this.user = this.$store.get('user')
    if (this.$api.socket) {
      // Display error message if we cannot contact the server
      this.$api.socket.on('reconnect_error', () => {
        // Display it only the first time the error appears because multiple attempts will be tried
        if (!this.pendingReconnection) {
          logger.error(new Error('Socket has been disconnected'))
          // This will ensure any operation in progress will not keep a "dead" loading indicator
          // as this error might appear under-the-hood without notifying service operations
          Loading.hide()
          this.pendingReconnection = Dialog.create({
            title: this.$t('Index.ALERT'),
            message: this.$t('Index.DISCONNECT'),
            html: true,
            persistent: true
          }).onDismiss(() => { this.pendingReconnection = null })
        }
      })
      // Handle reconnection correctly, otherwise auth seems to be lost
      // Also easier to perform a full refresh instead of handling this specifically on each activity
      this.$api.socket.on('reconnect', () => {
        // Dismiss pending reconnection error message
        if (this.pendingReconnection) {
          this.pendingReconnection.hide()
        }
        // Causes problems with hot reload in dev
        if (this.$config('flavor') !== 'dev') {
          Loading.show({message: this.$t('Index.RECONNECT')})
          setTimeout(() => {
            window.location.reload()
          }, 3000)
        } else {
          logger.error(new Error('Socket disconnected, not trying to reconnect automatically in development mode please refresh page manually'))
        }
      })
    }
    // Check for API version, this one is not a service but a basic route so we don't use Feathers client
    this.$store.set('capabilities.client', {
      version: config.version,
      buildNumber: config.buildNumber,
      domain: config.domain
    })
    const response = await window.fetch(this.$api.getBaseUrl() + config.apiPath + '/capabilities')
    const api = await response.json()
    this.$store.set('capabilities.api', api)
    // FIXME: we should elaborate a more complex check between compatible versions
    if (api.version === config.version) {
      if (this.$config('flavor') === 'prod') return
      // Local dev has not the concept of build number
      else if (!api.buildNumber) return
      // On staging check it because we do not increase version number on each change
      // and would like to know if the mobile client is up-to-date
      else if (api.buildNumber === config.buildNumber) return
    }
    this.$toast({ message: this.$t('Index.VERSION_MISMATCH') })
  },
  async mounted () {
    this.$events.$on('user-changed', user => {
      this.user = user
      // Check if we need to redirect based on the fact there is an authenticated user
      this.redirect()
    })

    try {
      // No need to update/redirect here since the user should be managed by event handler above
      await this.restoreSession()
    } catch (_) {
      this.user = null
      // Check if we need to redirect based on the fact there is no authenticated user
      this.redirect()
    }
  }
}
</script>
