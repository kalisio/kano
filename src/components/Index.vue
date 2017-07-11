<template>
  <div>
    <div v-if="isAuthenticated">
      <k-layout />
    </div>
    <div v-else>
      <router-view class="layout-view"></router-view>
    </div>
  </div>
</template>

<script>
import { Toast, Events } from 'quasar'
import { authenticationMixin, KLayout } from 'kClient'

export default {
  name: 'index',
  components: {
    KLayout
  },
  dependencies: ['store', 'api'],
  data () {
    return {
      user: null
    }
  },
  mixins: [authenticationMixin],
  computed: {
    isAuthenticated () {
      return this.user !== null
    }
  },
  created () {
    Events.$on('user-changed', user => {
      if (user) {
        this.user = user
        this.$router.push({name: 'home'})
      }
      else {
        this.user = null
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
