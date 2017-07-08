<template>
  <k-layout />
</template>

<script>
import config from 'config'
import { KLayout } from 'kClient'

export default {
  components: {
    KLayout
  },
  data () {
    return {
      appName: 'kApp'
    }
  },
  computed: {
  },
  methods: {
  },
  created () {
    // Apply app name if given
    if (config.appName) this.appName = config.appName
  },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>
