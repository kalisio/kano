<template>
  <router-view class="layout-view"></router-view>
</template>

<script>
import { Toast, Events } from 'quasar'
import { mixins as authMixins } from 'kCore/client'
import { mixins as teamMixins } from 'kTeam/client'

export default {
  name: 'index',
  data () {
    return {
    }
  },
  mixins: [authMixins.authentication, teamMixins.authorisation],
  created () {
    Events.$on('user-changed', user => {
      if (user) {
        if (this.$route.path === '/') {
          this.$router.push({ name: 'home' })
        }
      }
    })
  },
  mounted () {
    this.restoreSession()
      .then(user => {
        Toast.create.positive('Restoring previous session')
      })
      .catch(_ => {
        // If private routes while not logged in redirect to login
        if (!this.$route.meta || !this.$route.meta.public) {
          this.$router.push({ name: 'login' })
        }
      })
  }
}
</script>
