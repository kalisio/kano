<template>
  <div>
    <q-list>
      <q-separator />
      <!--
        Edit link
      -->
      <q-item id="edit-settings" clickable @click="editSettings">
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ $t('sideNav.SETTINGS') }}
          </q-item-label>
        </q-item-section>
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
      @applied="onSettingsEdited" />
  </div>
</template>

<script>
export default {
  name: 'settings',
  methods: {
    editSettings () {
      //this.sideNav.klayout.hideLetDrawer()
      this.$refs.editor.open()
    },
    onSettingsEdited () {
      this.$refs.editor.close()
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-modal-editor'] = this.$load('editor/KModalEditor')
  }
}
</script>