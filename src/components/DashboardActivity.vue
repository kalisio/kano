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
    refreshActivity () {
      this.clearActivity()
      this.setTitle('Dashboard')
    }
  }
}
</script>