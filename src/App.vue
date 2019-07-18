<template>
  <div id="q-app">
    <q-ajax-bar ref="ajax-bar" position="bottom" size="8px" color="primary" :delay="250" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'k-app'
}
</script>

<style>
</style>
