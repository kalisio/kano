<template>
  <div>
    <k-signup-alert :isVerified="isUserVerified" :email="userEmail"></k-signup-alert>
    <router-view class="layout-view"></router-view>
  </div>
</template>

<script>
import { Toast, Events } from 'quasar'
import { mixins, beforeGuard } from 'kCore/client'
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
      }
      else if (!result) {
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
  created () {
    this.$options.components['k-signup-alert'] = utils.loadComponent('account/KSignupAlert')
    // initialize the user
    this.user = this.$store.get('user')
  },
  computed: {
    isUserVerified () {
      return (this.user ? this.user.isVerified : true)
    },
    userEmail () {
      return (this.user ? this.user.email : '')
    }
  },
  mounted () {
    this.restoreSession()
      .then(user => {
        this.user = user
        Toast.create.positive('Restoring previous session')
        // No need to redirect here since the user should be set thus managed by event handler below
      })
      .catch(() => {
        this.user = null
        // Check if we need to redirect based on the fact there is no authenticated user
        this.redirect()
      })

    Events.$on('user-changed', user => {
      this.user = user
      // Check if we need to redirect based on the fact there is an authenticated user
      this.redirect()
    })
  }
}
</script>
