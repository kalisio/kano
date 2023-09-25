<template>
  <div style="margin-top: 50px; ">
    <h4 class="title-footer">Trusted by</h4>
    <div style="display: flex; align-items: center; justify-content: center;">
      <a href="https://www.airbus.com/"><img src="https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/logos/airbus.png"></a>
      &nbsp;&nbsp;
      <a href="https://www.irsn.fr/"><img src="https://s3.eu-central-1.amazonaws.com/kalisioscope/assets/logos/irsn.png"></a>
    </div>
    <br />
    <h3 class="title-footer">Sponsored by</h3> 
    <a href="https://kalisio.com">
      <img class="logo-footer" :src="computedLogo">
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

// computed
const computedLogo = computed(() => {
  if (useData().isDark.value) return 'https://s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-white-256x84.png'
  return 'https://s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-black-256x84.png'
})
</script>

<style>
  .title-footer {
    text-align: center;
    font-size: 20px; 
    font-weight: 700
  }
  .logo-footer {
    margin-left: auto; 
    margin-right: auto
  }
</style>
