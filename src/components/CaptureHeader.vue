<template>
  <KCaptureTextArea :text="props.text" :position="props.position"/>
</template>

<script setup>
import KCaptureTextArea from '@kalisio/kdk/map/client/components/KCaptureTextArea'

// props
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: 'header'
  }
})
</script>
