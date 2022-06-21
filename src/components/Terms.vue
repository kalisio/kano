<template>
  <div class="q-pa-md">
	  <q-card>
	    <q-card-section>
	      <KMarkdownViewer :url="`/kano-terms_${locale}.md`" />
	    </q-card-section>
	  </q-card>
	</div>
</template>

<script>
import { utils } from '@kalisio/kdk/core.client'

export default {
  name: 'terms',
  components: {
    KMarkdownViewer: utils.loadComponent('media/KMarkdownViewer')
  },
  data () {
    return {
      locale: utils.getAppLocale()
    }
  }
}
</script>
