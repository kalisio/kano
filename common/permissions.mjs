import { permissions } from '@kalisio/kdk/core.common.js'

// Hook computing  catalog, features, etc. abilities for a given user
export function defineUserAbilities (subject, can, cannot, app) {
  // Contextual services distributed by other apps
  can('service', '*/catalog')
  can('service', '*/features')
  can('service', '*/projects')
  can('service', '*/styles')
  can('service', '*/tags')
  can('service', '*/alerts')
  can('service', 'events')
  can('create', 'events')
  can('service', '*/configurations')
  can(['find', 'get'], 'configurations')
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
        // Can manage styles
        can('all', 'styles')
        can('all', 'tags')
        // Can manage configurations for layer order
        can('all', 'configurations')
      }
    }
    if (subject.projects) {
      const projects = subject.projects
      subject.projects.forEach(project => {
        const role = permissions.Roles[project.permissions]
        if (role >= permissions.Roles.manager) {
          can('update', 'projects', { _id: project._id })
          can(['create', 'remove'], 'authorisations', { resource: project._id, permissions: 'member' })
          can(['create', 'remove'], 'authorisations', { resource: project._id, permissions: 'manager' })
        }
        if (role >= permissions.Roles.owner) {
          can('remove', 'projects', { _id: project._id })
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
