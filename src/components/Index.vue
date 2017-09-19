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
    redirect () {
      console.log(this.$route)
      // Run registered guards to redirect accordingly if required
      const result = beforeGuard(this.$route)
      console.log('redirect to', result)
      if (typeof result === 'string') {
        this.$router.push({ name: result })
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
    console.log(this.$route)
    this.restoreSession()
      .then(user => {
        console.log('restore')
        Toast.create.positive('Restoring previous session')
      })
      .catch(_ => {
        console.log('norestore')
        this.redirect()
      })

    Events.$on('user-changed', user => {
      console.log('user')
      this.redirect()
    })
  }
}
</script>
