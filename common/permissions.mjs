import { permissions } from '@kalisio/kdk/core.common.js'

// Hook computing  catalog, features, etc. abilities for a given user
export function defineUserAbilities (subject, can, cannot, app) {
  can('service', 'events')
  can('create', 'events')
  if (subject && subject._id) {
    if (subject.catalog) {
      const catalog = subject.catalog
      const role = permissions.Roles[catalog.permissions]
      if (role >= permissions.Roles.manager) {
        // Can manage layers, projects and alerts
        can('all', 'catalog')
        can('all', 'projects')
        can(['create', 'remove'], 'authorisations', { resourcesService: 'projects', scope: 'projects' })
        can('all', 'alerts')
        // Can manage features on user-defined layers
        can('all', 'features')
        // Can authorize users on specific layers
        can(['create', 'remove'], 'authorisations')
      }
    }
    if (subject.projects) {
      const projects = subject.projects
      subject.projects.forEach(project => {
        const role = permissions.Roles[project.permissions]
        if (role >= permissions.Roles.manager) {
          can('update', { _id: project._id })
          can(['create', 'remove'], 'authorisations', { resource: project._id, permissions: 'member' })
          can(['create', 'remove'], 'authorisations', { resource: project._id, permissions: 'manager' })
        }
        if (role >= permissions.Roles.owner) {
          can('remove', { _id: project._id })
          can(['create', 'remove'], 'authorisations', { resource: project._id, permissions: 'owner' })
        }
      })
    }
    if (subject.layers) {
      subject.layers.forEach(layer => {
        const role = permissions.Roles[layer.permissions]
        if (role >= permissions.Roles.manager) {
          // A manager can manager features in layer
          can(['create', 'update', 'remove'], layer.service)
          if (layer.probeService) can(['create', 'update', 'remove'], layer.probeService)
        }
      })
    }
  }
}
