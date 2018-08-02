<template>
  <div>
    <k-modal ref="modal" :route="true" :toolbar="[]" :buttons="[]" :options="{ padding: '0px', maximized: true }">
      <div slot="modal-content" class="column xs-gutter">
        <div id="panorama" ref="panorama" :style="panoramaStyle"/>
      </div>
    </k-modal>
    <q-fixed-position corner="top-right" :offset="[0, -100]">
      <q-btn flat big color="white" @click="doClose" icon="zoom_out" />
    </q-fixed-position>
  </div>
</template>

<script>
// Importing using webpack does not work, even when following https://github.com/pchen66/panolens.js/issues/130
// FIXME: for now we inject it in the index.html file
//import 'three'
//import Panolens from '../panolens.js'
import { QFixedPosition, QBtn } from 'quasar'
import { mixins as kCoreMixins } from 'kCore/client'

export default {
  name: 'k-panorama',
  components: {
    QFixedPosition,
    QBtn
  },
  mixins: [
    kCoreMixins.refsResolver(['modal', 'panorama'])
  ],
  computed: {
    panoramaStyle () {
      return 'width: 100%; height: 100%; fontWeight: normal; zIndex: 0; position: absolute'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    doClose (event, done) {
      this.$refs.modal.close()
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-modal'] = this.$load('frame/KModal')
  },
  async mounted () {
    this.loadRefs()
    .then(() => {
      this.$refs.modal.open()
      const panorama = new PANOLENS.ImagePanorama('https://s3.eu-central-1.amazonaws.com/kargo/panorama.jpg')
      this.viewer = new PANOLENS.Viewer({ container: this.$refs.panorama })
      this.viewer.add(panorama)
    })
  },
  beforeDestroy () {
  }
}
</script>
