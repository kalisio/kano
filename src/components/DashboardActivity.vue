<template>
  <div class="row justify-center items-center">
    <h2>TODO</h2>
  </div>
</template>

<script>
import { mixins } from 'kCore/client'

export default {
  name: 'dashboard',
  mixins: [mixins.baseActivity],
  methods: {
    refreshActions () {
      this.clearActions()
      // Update the AppBar
      this.$store.patch('appBar', { title: 'Dashboard', subtitle: '', toolbar: [], actions: [] })
    }
  }
}
</script>