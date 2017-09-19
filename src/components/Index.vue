<template>
  <router-view class="layout-view"></router-view>
</template>

<script>
import { Toast, Events } from 'quasar'
import { mixins as authMixins, beforeGuard } from 'kCore/client'
import { mixins as teamMixins } from 'kTeam/client'

export default {
  name: 'index',
  data () {
    return {
    }
  },
  // authorisation mixin is required to automatically update user' abilities on update
  mixins: [authMixins.authentication, teamMixins.authorisation],
  methods: {
    redirect (user) {
      // Run registered guards to redirect accordingly if required
      const result = beforeGuard(this.$route)
      if (typeof result === 'string') {
        // Redirect to a given route based on authentication state
        this.$router.push({ name: result })
      }
      else if (!result) {
        // This route was previously allowed but due to changes in authorisations it is not anymore
        this.$router.push({ name: (user ? 'home' : 'login') })
      }
      // The first time initialize guards after the app has been correctly setup,
      // ie either with or without a restored user
      if (!this.initialized) {
        this.$router.beforeEach(beforeGuard)
        this.initialized = true
      }
    }
  },
  mounted () {
    this.restoreSession()
      .then(user => {
        Toast.create.positive('Restoring previous session')
        // No need to redirect here since the user should be set thus managed by event handler below
      })
      .catch(_ => {
        // Check if we need to redirect based on the fact there is no authenticated user
        this.redirect()
      })

    Events.$on('user-changed', user => {
      // Check if we need to redirect based on the fact there is an authenticated user
      this.redirect(user)
    })
  }
}
</script>
