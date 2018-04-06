<template>
  <div v-if="contextLoaded">
    <router-view />
  </div>
</template>

<script>
import { mixins } from 'kCore/client'

export default {
  name: 'context',
  mixins: [mixins.baseContext],
  methods: {
    refresh () {
      window.location.reload()
    },
    getActionsForContext (context) {
      let actions = { toolbar: [], menu: [] }
      if (this.$can('service', 'events', context._id)) {
        actions.toolbar.push({ name: 'events', icon: 'whatshot', label: this.$t('Context.EVENTS'), route: { name: 'events-activity', params: { operation: 'current-events', contextId: context._id } } })
      }
      if (this.$can('service', 'members', context._id)) {
        actions.toolbar.push({ name: 'members', icon: 'group', label: this.$t('Context.MEMBERS'), route: { name: 'members-activity', params: { contextId: context._id } } })
      }
      actions.toolbar.push({ name: 'refresh', icon: 'refresh', label: this.$t('Context.REFRESH'), handler: this.refresh })
      if (this.$can('update', 'organisations', context._id, { _id: context._id })) {
        actions.menu.push({ name: 'settings', icon: 'settings', label: this.$t('Context.SETTINGS'), route: { name: 'settings-activity', params: { perspective: 'properties', contextId: context._id } } })
      }
      return actions
    }
  }
}
</script>
