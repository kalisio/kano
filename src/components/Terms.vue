<template>
  <q-card>
    <q-card-section>
      <KMarkdownViewer url="statics/kapp-terms.md" />
    </q-card-section>
  </q-card>
</template>

<script>
import { utils as kdkCoreUtils } from '@kalisio/kdk/core.client'

export default {
  components: {
    KMarkdownViewer: kdkCoreUtils.loadComponent('media/KMarkdownViewer')
  }
}
</script>
