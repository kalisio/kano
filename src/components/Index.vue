<template>
  <h1>
    Hello world !
  </h1>
</template>

<script>
import config from 'config'

export default {
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

<style lang="styl">

</style>
