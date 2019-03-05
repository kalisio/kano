<template>
  <div>
    <q-list link no-border>
      <!--
        Edit link
      -->
      <q-item id="edit-settings" @click="editSettings">
        <q-item-side icon="settings" />
        <q-item-main :label="$t('sideNav.SETTINGS')" />
      </q-item>
    </q-list>
    <!--
      Create editor
     -->
    <k-modal-editor
      id="editor"
      ref="editor" 
      service="settings"
      objectId="settings"
      :route="false"
      @closed="onSettingsClosed"
      @applied="onSettingsEdited" />
  </div>
</template>

<script>
import { QList, QItem, QItemMain, QItemSide } from 'quasar'

export default {
  name: 'settings',
  inject: ['sideNav'],
  components: {
    QList,
    QItem,
    QItemMain,
    QItemSide
  },
  methods: {
    editSettings () {
      this.$refs.editor.open()
    },
    onSettingsClosed () {
      this.sideNav.layout.hideCurrentSide()
    },
    onSettingsEdited () {
      this.$refs.editor.close(() => this.sideNav.layout.hideCurrentSide())
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-modal-editor'] = this.$load('editor/KModalEditor')
  }
}
</script>