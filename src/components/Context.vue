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
    getActionsForContext (context) {
      let actions = { toolbar: [], menu: [] }
      if (this.$can('service', 'events', context._id)) {
        actions.toolbar.push({ icon: 'whatshot', route: { name: 'events-activity', params: { operation: 'current-events', contextId: context._id } } })
        // actions.toolbar.push({ scope: 'toolbar', icon: 'map', route: { name: 'map', params: { contextId: context._id } } })
        // actions.push({ icon: 'terrain', route: { name: 'globe', params: { contextId: context._id } } })
      }
      if (this.$can('service', 'members', context._id)) {
        actions.toolbar.push({ icon: 'group', label: 'Members & groups', route: { name: 'members-activity', params: { contextId: context._id } } })
      }
      if (this.$can('update', 'organisations', context._id, { _id: context._id })) {
        actions.menu.push({ icon: 'settings', label: 'Settings', route: { name: 'settings-activity', params: { perspective: 'properties', contextId: context._id } } })
      }
      return actions
    }
  }
}
</script>
