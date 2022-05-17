<template>
  <q-card>
    <q-card-section>
      <k-markdown-viewer url="statics/kapp-terms.md"></k-markdown-viewer>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'terms',
  created () {
    KMarkdownViewer: import('@components/media/KMarkdownViewer.vue')
  }
}
</script>
