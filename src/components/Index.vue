<template>
  <router-view class="layout-view"></router-view>
</template>

<script>
import { Toast, Events } from 'quasar'
import { mixins } from 'kComponents'

export default {
  name: 'index',
  dependencies: ['api'],
  data () {
    return {
    }
  },
  mixins: [mixins.authentication],
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
