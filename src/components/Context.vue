<template>
  <div v-if="contextLoaded">
    <router-view />
  </div>
</template>

<script>
import { mixins } from 'kCore/client'

export default {
  name: 'context',
  mixins: [ mixins.baseContext ],
  methods: {
    getActionsForContext (context) {
      let actions = []
      if (this.$can('service', 'events', context._id)) {
        actions.push({ icon: 'whatshot', route: { name: 'events-activity', params: { operation: 'current-events', contextId: context._id } } })
        actions.push({ icon: 'map', route: { name: 'map', params: { contextId: context._id } } })
        actions.push({ icon: 'terrain', route: { name: 'globe', params: { contextId: context._id } } })
      }
      if (this.$can('create', 'authorisations', context._id, { resource: context._id })) {
        actions.push({ icon: 'group', route: { name: 'members-activity', params: { contextId: context._id } } })
      }
      if (this.$can('update', 'organisations', context._id, { _id: context._id })) {
        actions.push({ icon: 'settings', route: { name: 'settings-activity', params: { perspective: 'properties', contextId: context._id } } })
      }
      return actions
    }
  }
}
</script>
