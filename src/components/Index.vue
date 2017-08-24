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
        this.$router.push({name: 'home'})
      }
    })
  },
  mounted () {
    this.restoreSession()
    .then(user => {
      Toast.create.positive('Restoring previous session')
    })
    .catch(_ => {
      this.$router.push({name: 'login'})
    })
  }
}
</script>
