<template>
  <q-card>
    <q-card-main>
      <k-markdown-viewer url="statics/aktnmap-terms.md"></k-markdown-viewer>
    </q-card-main>
  </q-card>
</template>

<script>
import utils from '../utils'
import { QCard, QCardTitle, QCardMain } from 'quasar'

export default {
  name: 'terms',
  components: {
    QCard,
    QCardTitle,
    QCardMain
  },
  created () {
    this.$options.components['k-screen'] = utils.loadComponent('frame/KScreen')
    this.$options.components['k-markdown-viewer'] = utils.loadComponent('media/KMarkdownViewer')
  }
}
</script>
